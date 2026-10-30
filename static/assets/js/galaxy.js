(() => {
  "use strict";

  const root = document.querySelector("[data-galaxy]");
  const dataElement = document.getElementById("galaxy-data");
  if (!root || !dataElement) return;

  const SVG_NS = "http://www.w3.org/2000/svg";
  const UNCATEGORIZED_ID = "uncharted";
  const rawItems = JSON.parse(dataElement.textContent);

  const hash = (value) => {
    let result = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      result ^= value.charCodeAt(index);
      result = Math.imul(result, 16777619);
    }
    return result >>> 0;
  };

  const normalizeTerm = (value) => String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const colorFor = (id) => {
    if (id === UNCATEGORIZED_ID) return "hsl(221 12% 62%)";
    return `hsl(${hash(id) % 360} 72% 68%)`;
  };

  const categoryTerms = new Map();
  const topicTerms = new Map();

  const registerTerm = (registry, value) => {
    const label = String(value).trim();
    const id = normalizeTerm(label);
    if (!id) return null;
    if (!registry.has(id)) registry.set(id, { id, label, count: 0 });
    registry.get(id).count += 1;
    return id;
  };

  const registerUniqueTerms = (registry, values) => {
    const seen = new Set();
    return (Array.isArray(values) ? values : []).reduce((ids, value) => {
      const id = normalizeTerm(value);
      if (!id || seen.has(id)) return ids;
      seen.add(id);
      const registeredId = registerTerm(registry, value);
      if (registeredId) ids.push(registeredId);
      return ids;
    }, []);
  };

  const nodes = rawItems.map((item, index) => {
    let categoryIds = registerUniqueTerms(categoryTerms, item.categories);
    const topicIds = registerUniqueTerms(topicTerms, item.tags);

    if (!categoryIds.length) {
      if (!categoryTerms.has(UNCATEGORIZED_ID)) {
        categoryTerms.set(UNCATEGORIZED_ID, { id: UNCATEGORIZED_ID, label: "Uncharted", count: 0 });
      }
      categoryTerms.get(UNCATEGORIZED_ID).count += 1;
      categoryIds = [UNCATEGORIZED_ID];
    }

    return {
      ...item,
      id: `galaxy-node-${index}`,
      categoryIds,
      topicIds,
      primaryCategory: categoryIds[0],
      searchText: [item.title, ...(item.tags || []), ...(item.categories || [])]
        .join(" ")
        .toLocaleLowerCase(),
      seed: hash(`${item.title}-${item.url}`)
    };
  });

  const categories = [...categoryTerms.values()]
    .map((category) => ({ ...category, color: colorFor(category.id) }))
    .sort((a, b) => {
      if (a.id === UNCATEGORIZED_ID) return 1;
      if (b.id === UNCATEGORIZED_ID) return -1;
      return b.count - a.count || a.label.localeCompare(b.label);
    });

  const topics = [...topicTerms.values()]
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

  const categoryById = new Map(categories.map((category) => [category.id, category]));
  const topicById = new Map(topics.map((topic) => [topic.id, topic]));

  const state = {
    kind: "all",
    category: "all",
    topic: "all",
    query: "",
    view: "map"
  };

  const map = root.querySelector("[data-galaxy-map]");
  const mapScroll = root.querySelector("[data-galaxy-map-scroll]");
  const stage = root.querySelector("[data-galaxy-stage]");
  const list = root.querySelector("[data-galaxy-list]");
  const tooltip = root.querySelector("[data-galaxy-tooltip]");
  const tooltipKind = tooltip.querySelector("[data-tooltip-kind]");
  const tooltipTitle = tooltip.querySelector("[data-tooltip-title]");
  const tooltipMeta = tooltip.querySelector("[data-tooltip-meta]");
  const emptyState = root.querySelector("[data-galaxy-empty]");
  const count = root.querySelector("[data-galaxy-count]");
  const search = root.querySelector("[data-galaxy-search]");
  const categoryFilters = root.querySelector("[data-category-filters]");
  const topicFilter = root.querySelector("[data-topic-filter]");
  const viewToggle = root.querySelector("[data-view-toggle]");
  const zoomOut = root.querySelector("[data-galaxy-zoom-out]");
  const zoomReset = root.querySelector("[data-galaxy-zoom-reset]");
  const zoomIn = root.querySelector("[data-galaxy-zoom-in]");
  const zoomValue = root.querySelector("[data-galaxy-zoom-value]");

  const createSvg = (name, attributes = {}) => {
    const element = document.createElementNS(SVG_NS, name);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, String(value)));
    return element;
  };

  const core = { x: 600, y: 360 };
  const positions = new Map();

  const layoutCategories = () => {
    let categoryIndex = 0;
    let ringIndex = 0;

    while (categoryIndex < categories.length) {
      const capacity = 7 + ringIndex * 5;
      const itemsInRing = Math.min(capacity, categories.length - categoryIndex);
      const radiusX = Math.min(485, 215 + ringIndex * 135);
      const radiusY = Math.min(300, 128 + ringIndex * 84);
      const offset = ringIndex % 2 === 0 ? -Math.PI / 2 : -Math.PI / 2 + Math.PI / itemsInRing;

      for (let ringPosition = 0; ringPosition < itemsInRing; ringPosition += 1) {
        const category = categories[categoryIndex];
        const angle = offset + (ringPosition * Math.PI * 2) / itemsInRing;
        positions.set(category.id, {
          x: core.x + Math.cos(angle) * radiusX,
          y: core.y + Math.sin(angle) * radiusY
        });
        categoryIndex += 1;
      }
      ringIndex += 1;
    }
  };

  layoutCategories();

  const drawBackground = () => {
    [82, 156, 244].forEach((radius) => {
      map.appendChild(createSvg("ellipse", {
        class: "galaxy-orbit",
        cx: core.x,
        cy: core.y,
        rx: radius * 1.55,
        ry: radius
      }));
    });

    categories.forEach((category) => {
      const position = positions.get(category.id);
      map.appendChild(createSvg("line", {
        class: "galaxy-spoke",
        x1: core.x,
        y1: core.y,
        x2: position.x,
        y2: position.y
      }));
    });
  };

  const drawCore = () => {
    const group = createSvg("g", {
      class: "galaxy-core",
      role: "button",
      tabindex: "0",
      "aria-label": "Reset galaxy filters"
    });
    group.appendChild(createSvg("circle", { class: "galaxy-core-halo", cx: core.x, cy: core.y, r: 49 }));
    group.appendChild(createSvg("circle", { class: "galaxy-core-halo", cx: core.x, cy: core.y, r: 34 }));
    group.appendChild(createSvg("circle", { class: "galaxy-core-star", cx: core.x, cy: core.y, r: 8 }));
    const label = createSvg("text", { class: "galaxy-core-label", x: core.x, y: core.y + 67 });
    label.textContent = "DAVEADS";
    group.appendChild(label);
    group.addEventListener("click", resetFilters);
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        resetFilters();
      }
    });
    map.appendChild(group);
  };

  const groupedNodes = new Map(categories.map((category) => [category.id, []]));
  nodes.forEach((node) => groupedNodes.get(node.primaryCategory).push(node));

  const nodeElements = new Map();
  const edgeElements = new Map();
  const clusterElements = new Map();

  const matches = (node) => {
    const kindMatches = state.kind === "all" || node.kind === state.kind;
    const categoryMatches = state.category === "all" || node.categoryIds.includes(state.category);
    const topicMatches = state.topic === "all" || node.topicIds.includes(state.topic);
    const queryMatches = !state.query || node.searchText.includes(state.query);
    return kindMatches && categoryMatches && topicMatches && queryMatches;
  };

  const visibleNodes = () => nodes.filter(matches);

  const setCategory = (categoryId) => {
    state.category = categoryId;
    categoryFilters.querySelectorAll("button").forEach((button) => {
      const active = button.dataset.category === categoryId;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    applyFilters();
  };

  const showTooltip = (node, event) => {
    const primary = categoryById.get(node.primaryCategory);
    const categoryLabels = node.categoryIds.map((id) => categoryById.get(id)?.label).filter(Boolean);
    const topicLabels = node.topicIds.slice(0, 3).map((id) => topicById.get(id)?.label).filter(Boolean);
    tooltip.style.setProperty("--tooltip-color", primary.color);
    tooltipKind.textContent = `${node.kind} // ${categoryLabels.join(" + ")}`;
    tooltipTitle.textContent = node.title;
    tooltipMeta.textContent = [node.date || "Undated", ...topicLabels].filter(Boolean).join(" · ");
    tooltip.hidden = false;

    const bounds = stage.getBoundingClientRect();
    const fallbackX = (node.x / 1200) * bounds.width;
    const fallbackY = (node.y / 720) * bounds.height;
    const pointerX = event && Number.isFinite(event.clientX) ? event.clientX - bounds.left : fallbackX;
    const pointerY = event && Number.isFinite(event.clientY) ? event.clientY - bounds.top : fallbackY;
    const tooltipWidth = Math.min(290, bounds.width - 32);
    const x = Math.max(16, Math.min(pointerX + 16, bounds.width - tooltipWidth - 16));
    const y = Math.max(16, Math.min(pointerY + 16, bounds.height - 112));
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  };

  const hideTooltip = () => {
    tooltip.hidden = true;
  };

  const drawClusters = () => {
    const denseLayout = categories.length > 12;

    categories.forEach((category) => {
      const position = positions.get(category.id);
      const members = groupedNodes.get(category.id);
      const cluster = createSvg("g", {
        class: "galaxy-cluster",
        "data-cluster": category.id,
        role: "button",
        tabindex: "0",
        "aria-label": `Filter by ${category.label}`
      });
      cluster.style.setProperty("--theme-color", category.color);
      cluster.appendChild(createSvg("circle", {
        class: "galaxy-cluster-dot",
        cx: position.x,
        cy: position.y,
        r: 3.2
      }));

      const label = createSvg("text", {
        class: "galaxy-cluster-label",
        x: position.x,
        y: position.y - 16
      });
      label.textContent = category.label;
      cluster.appendChild(label);

      const clusterCount = createSvg("text", {
        class: "galaxy-cluster-count",
        x: position.x,
        y: position.y + 18
      });
      clusterCount.textContent = `${members.length} objects`;
      cluster.appendChild(clusterCount);
      cluster.addEventListener("click", () => setCategory(category.id));
      cluster.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setCategory(category.id);
        }
      });
      clusterElements.set(category.id, { group: cluster, count: clusterCount });
      map.appendChild(cluster);

      members.forEach((node, index) => {
        const goldenAngle = 2.399963229728653;
        const angle = index * goldenAngle + ((node.seed % 360) * Math.PI) / 180;
        const maxDistance = denseLayout ? 49 : 108;
        const distance = Math.min(maxDistance, 20 + Math.sqrt(index + 1) * (denseLayout ? 7 : 16));
        node.x = position.x + Math.cos(angle) * distance;
        node.y = position.y + Math.sin(angle) * distance * 0.72;

        const edge = createSvg("line", {
          class: "galaxy-edge",
          x1: position.x,
          y1: position.y,
          x2: node.x,
          y2: node.y
        });
        edge.style.setProperty("--node-color", category.color);
        edgeElements.set(node.id, edge);
        map.appendChild(edge);

        const link = createSvg("a", {
          class: "galaxy-node-link",
          href: node.url,
          "aria-label": `${node.title}, ${node.kind}, ${category.label}`
        });
        const radius = node.kind === "writing" ? 7.2 : 4.2;
        const circle = createSvg("circle", {
          class: `galaxy-node ${node.kind === "writing" ? "is-writing" : "is-note"}`,
          cx: node.x,
          cy: node.y,
          r: radius
        });
        circle.style.setProperty("--node-color", category.color);
        circle.style.setProperty("--twinkle-delay", `${-(node.seed % 45) / 10}s`);
        link.appendChild(circle);
        link.addEventListener("pointerenter", (event) => showTooltip(node, event));
        link.addEventListener("pointermove", (event) => showTooltip(node, event));
        link.addEventListener("pointerleave", hideTooltip);
        link.addEventListener("focus", () => showTooltip(node));
        link.addEventListener("blur", hideTooltip);
        nodeElements.set(node.id, link);
        map.appendChild(link);
      });
    });
  };

  const renderList = (visible) => {
    list.replaceChildren();
    const groups = state.category === "all"
      ? categories.map((category) => ({
        category,
        members: visible.filter((node) => node.primaryCategory === category.id)
      }))
      : [{
        category: categoryById.get(state.category),
        members: visible.filter((node) => node.categoryIds.includes(state.category))
      }];

    groups.forEach(({ category, members }) => {
      if (!members.length) return;

      const section = document.createElement("section");
      section.className = "galaxy-list-group";
      section.style.setProperty("--group-color", category.color);
      const heading = document.createElement("h2");
      heading.textContent = `${category.label} · ${members.length}`;
      section.appendChild(heading);

      const grid = document.createElement("ul");
      grid.className = "galaxy-list-grid";
      members.forEach((node) => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = node.url;
        link.textContent = node.title;
        const meta = document.createElement("small");
        const topicLabels = node.topicIds.slice(0, 2).map((id) => topicById.get(id)?.label).filter(Boolean);
        meta.textContent = [node.kind, node.date, ...topicLabels].filter(Boolean).join(" · ");
        link.appendChild(meta);
        item.appendChild(link);
        grid.appendChild(item);
      });
      section.appendChild(grid);
      list.appendChild(section);
    });
  };

  const compactOverview = nodes.length > 280 || categories.length > 28;

  const applyFilters = () => {
    const visible = visibleNodes();
    const visibleIds = new Set(visible.map((node) => node.id));
    const hasActiveDiscovery = state.kind !== "all"
      || state.category !== "all"
      || state.topic !== "all"
      || Boolean(state.query);
    const displayStars = !compactOverview || hasActiveDiscovery;

    nodes.forEach((node) => {
      const hidden = !displayStars || !visibleIds.has(node.id);
      nodeElements.get(node.id).classList.toggle("is-hidden", hidden);
      edgeElements.get(node.id).classList.toggle("is-hidden", hidden);
    });

    categories.forEach((category) => {
      const visibleCount = visible.filter((node) => node.categoryIds.includes(category.id)).length;
      const elements = clusterElements.get(category.id);
      elements.group.classList.toggle("is-dimmed", visibleCount === 0);
      elements.count.textContent = `${visibleCount} ${visibleCount === 1 ? "object" : "objects"}`;

      const buttonCount = categoryFilters.querySelector(`[data-category-count="${category.id}"]`);
      if (buttonCount) buttonCount.textContent = String(visibleCount);
    });

    const compactHint = compactOverview && !hasActiveDiscovery ? " · choose a constellation or topic to reveal stars" : "";
    count.textContent = `${visible.length} ${visible.length === 1 ? "object" : "objects"} in view${compactHint}`;
    emptyState.hidden = visible.length !== 0 || state.view !== "map";
    renderList(visible);
  };

  const buildCategoryFilters = () => {
    const allButton = document.createElement("button");
    allButton.type = "button";
    allButton.dataset.category = "all";
    allButton.className = "is-active";
    allButton.setAttribute("aria-pressed", "true");
    allButton.style.setProperty("--theme-color", "#dce8ff");
    allButton.textContent = "All constellations";
    allButton.addEventListener("click", () => setCategory("all"));
    categoryFilters.appendChild(allButton);

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.category = category.id;
      button.setAttribute("aria-pressed", "false");
      button.style.setProperty("--theme-color", category.color);
      const label = document.createElement("span");
      label.textContent = category.label;
      const categoryCount = document.createElement("small");
      categoryCount.dataset.categoryCount = category.id;
      categoryCount.textContent = String(category.count);
      button.append(label, categoryCount);
      button.addEventListener("click", () => setCategory(category.id));
      categoryFilters.appendChild(button);
    });
  };

  const buildTopicFilter = () => {
    topics.forEach((topic) => {
      const option = document.createElement("option");
      option.value = topic.id;
      option.textContent = `${topic.label} (${topic.count})`;
      topicFilter.appendChild(option);
    });
  };

  const setView = (view) => {
    state.view = view;
    const listView = view === "list";
    stage.hidden = listView;
    list.hidden = !listView;
    viewToggle.setAttribute("aria-pressed", String(listView));
    viewToggle.innerHTML = listView
      ? '<span aria-hidden="true">✦</span> Map view'
      : '<span aria-hidden="true">☷</span> List view';
    emptyState.hidden = visibleNodes().length !== 0 || listView;
  };

  const mobileGalaxy = window.matchMedia("(max-width: 640px)");
  const mobileMapWidth = 860;
  const maxMapScale = 2.75;
  const activePointers = new Map();
  let baseMapWidth = mobileGalaxy.matches ? mobileMapWidth : mapScroll.clientWidth;
  let mapScale = 1;
  let panStart = null;
  let pinchStart = null;
  let gestureMoved = false;
  let suppressNextMapClick = false;

  const clampMapScale = (scale) => {
    const minScale = mobileGalaxy.matches ? 0.55 : 1;
    return Math.min(maxMapScale, Math.max(minScale, scale));
  };

  const updateZoomValue = () => {
    zoomValue.textContent = `${Math.round(mapScale * 100)}%`;
  };

  const centerMap = () => {
    mapScroll.scrollLeft = Math.max(0, (mapScroll.scrollWidth - mapScroll.clientWidth) / 2);
    mapScroll.scrollTop = Math.max(0, (mapScroll.scrollHeight - mapScroll.clientHeight) / 2);
  };

  const setMapScale = (nextScale, focusX = mapScroll.clientWidth / 2, focusY = mapScroll.clientHeight / 2) => {
    const boundedScale = clampMapScale(nextScale);
    const contentX = (mapScroll.scrollLeft + focusX) / mapScale;
    const contentY = (mapScroll.scrollTop + focusY) / mapScale;
    mapScale = boundedScale;
    map.style.width = `${baseMapWidth * mapScale}px`;
    map.style.minWidth = `${baseMapWidth * mapScale}px`;
    updateZoomValue();

    requestAnimationFrame(() => {
      mapScroll.scrollLeft = contentX * mapScale - focusX;
      mapScroll.scrollTop = contentY * mapScale - focusY;
    });
  };

  const resetMapZoom = () => {
    mapScale = 1;
    if (mobileGalaxy.matches) {
      baseMapWidth = mobileMapWidth;
      map.style.width = `${baseMapWidth}px`;
      map.style.minWidth = `${baseMapWidth}px`;
    } else {
      map.style.removeProperty("width");
      map.style.removeProperty("min-width");
      baseMapWidth = mapScroll.clientWidth;
    }
    updateZoomValue();
    requestAnimationFrame(centerMap);
  };

  const pointerMidpoint = () => {
    const [first, second] = [...activePointers.values()];
    return {
      x: (first.x + second.x) / 2,
      y: (first.y + second.y) / 2
    };
  };

  const pointerDistance = () => {
    const [first, second] = [...activePointers.values()];
    return Math.hypot(second.x - first.x, second.y - first.y);
  };

  const beginSinglePointerPan = () => {
    const pointer = [...activePointers.values()][0];
    if (!pointer) {
      panStart = null;
      return;
    }
    panStart = {
      x: pointer.x,
      y: pointer.y,
      scrollLeft: mapScroll.scrollLeft,
      scrollTop: mapScroll.scrollTop
    };
  };

  const captureActivePointers = () => {
    activePointers.forEach((_pointer, pointerId) => {
      if (mapScroll.hasPointerCapture(pointerId)) return;
      try {
        mapScroll.setPointerCapture(pointerId);
      } catch (_error) {
        // The pointer may have ended between move events.
      }
    });
  };

  mapScroll.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    gestureMoved = false;
    mapScroll.classList.add("is-panning");

    if (activePointers.size === 1) beginSinglePointerPan();
    if (activePointers.size === 2) {
      const midpoint = pointerMidpoint();
      pinchStart = {
        distance: pointerDistance(),
        scale: mapScale,
        contentX: (mapScroll.scrollLeft + midpoint.x - mapScroll.getBoundingClientRect().left) / mapScale,
        contentY: (mapScroll.scrollTop + midpoint.y - mapScroll.getBoundingClientRect().top) / mapScale
      };
      panStart = null;
    }
  });

  mapScroll.addEventListener("pointermove", (event) => {
    if (!activePointers.has(event.pointerId)) return;
    event.preventDefault();
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (activePointers.size === 2 && pinchStart) {
      const midpoint = pointerMidpoint();
      const bounds = mapScroll.getBoundingClientRect();
      const focusX = midpoint.x - bounds.left;
      const focusY = midpoint.y - bounds.top;
      const nextScale = clampMapScale(pinchStart.scale * (pointerDistance() / pinchStart.distance));
      if (Math.abs(nextScale - mapScale) > 0.002) {
        gestureMoved = true;
        captureActivePointers();
      }
      mapScale = nextScale;
      map.style.width = `${baseMapWidth * mapScale}px`;
      map.style.minWidth = `${baseMapWidth * mapScale}px`;
      mapScroll.scrollLeft = pinchStart.contentX * mapScale - focusX;
      mapScroll.scrollTop = pinchStart.contentY * mapScale - focusY;
      updateZoomValue();
      return;
    }

    if (activePointers.size === 1 && panStart) {
      const pointer = [...activePointers.values()][0];
      const deltaX = pointer.x - panStart.x;
      const deltaY = pointer.y - panStart.y;
      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        gestureMoved = true;
        captureActivePointers();
      }
      mapScroll.scrollLeft = panStart.scrollLeft - deltaX;
      mapScroll.scrollTop = panStart.scrollTop - deltaY;
    }
  });

  const endMapPointer = (event) => {
    if (!activePointers.has(event.pointerId)) return;
    activePointers.delete(event.pointerId);
    pinchStart = null;

    if (gestureMoved) {
      suppressNextMapClick = true;
      window.setTimeout(() => { suppressNextMapClick = false; }, 350);
    }

    if (activePointers.size === 1) beginSinglePointerPan();
    if (activePointers.size === 0) {
      panStart = null;
      mapScroll.classList.remove("is-panning");
    }
  };

  mapScroll.addEventListener("pointerup", endMapPointer);
  mapScroll.addEventListener("pointercancel", endMapPointer);
  mapScroll.addEventListener("click", (event) => {
    if (!suppressNextMapClick) return;
    event.preventDefault();
    event.stopPropagation();
    suppressNextMapClick = false;
  }, true);

  mapScroll.addEventListener("wheel", (event) => {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    const bounds = mapScroll.getBoundingClientRect();
    const focusX = event.clientX - bounds.left;
    const focusY = event.clientY - bounds.top;
    setMapScale(mapScale * Math.exp(-event.deltaY * 0.002), focusX, focusY);
  }, { passive: false });

  let nativeGestureStartScale = 1;
  mapScroll.addEventListener("gesturestart", (event) => {
    event.preventDefault();
    nativeGestureStartScale = mapScale;
  }, { passive: false });
  mapScroll.addEventListener("gesturechange", (event) => {
    event.preventDefault();
    if (activePointers.size >= 2) return;
    const bounds = mapScroll.getBoundingClientRect();
    setMapScale(
      nativeGestureStartScale * event.scale,
      event.clientX - bounds.left,
      event.clientY - bounds.top
    );
  }, { passive: false });
  mapScroll.addEventListener("gestureend", (event) => {
    event.preventDefault();
  });

  zoomOut.addEventListener("click", () => setMapScale(mapScale - 0.2));
  zoomIn.addEventListener("click", () => setMapScale(mapScale + 0.2));
  zoomReset.addEventListener("click", resetMapZoom);

  const syncMapViewport = () => {
    resetMapZoom();
  };

  mobileGalaxy.addEventListener("change", syncMapViewport);
  let resizeTimer;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(syncMapViewport, 180);
  });

  function resetFilters() {
    state.kind = "all";
    state.category = "all";
    state.topic = "all";
    state.query = "";
    search.value = "";
    topicFilter.value = "all";
    root.querySelectorAll("[data-kind]").forEach((button) => {
      const active = button.dataset.kind === "all";
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    setCategory("all");
  }

  drawBackground();
  drawCore();
  drawClusters();
  buildCategoryFilters();
  buildTopicFilter();

  root.querySelectorAll("[data-kind]").forEach((button) => {
    button.addEventListener("click", () => {
      state.kind = button.dataset.kind;
      root.querySelectorAll("[data-kind]").forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("is-active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
      applyFilters();
    });
  });

  topicFilter.addEventListener("change", () => {
    state.topic = topicFilter.value;
    applyFilters();
  });

  search.addEventListener("input", () => {
    state.query = search.value.trim().toLocaleLowerCase();
    applyFilters();
  });

  root.querySelector("[data-random-voyage]").addEventListener("click", () => {
    const visible = visibleNodes();
    if (!visible.length) return;
    const destination = visible[Math.floor(Math.random() * visible.length)];
    window.location.href = destination.url;
  });

  viewToggle.addEventListener("click", () => setView(state.view === "map" ? "list" : "map"));

  applyFilters();
  syncMapViewport();
})();

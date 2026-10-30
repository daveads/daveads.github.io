import { CORE, createSvg, hash } from "./utils.js";

export function createGalaxyMap({
  map,
  stage,
  tooltip,
  tooltipKind,
  tooltipTitle,
  tooltipMeta,
  nodes,
  categories,
  categoryById,
  topicById,
  positions,
  onReset,
  onCategory
}) {
  const groupedNodes = new Map(categories.map((category) => [category.id, []]));
  nodes.forEach((node) => groupedNodes.get(node.primaryCategory).push(node));

  const nodeElements = new Map();
  const edgeElements = new Map();
  const clusterElements = new Map();
  const orbitLayers = new Map();
  const spokeElements = new Map();
  const systemMotions = [];
  const coarsePointer = window.matchMedia("(any-pointer: coarse)").matches;

  function drawBackground() {
    [82, 156, 244].forEach((radius) => {
      map.appendChild(createSvg("ellipse", {
        class: "galaxy-orbit",
        cx: CORE.x,
        cy: CORE.y,
        rx: radius * 1.55,
        ry: radius
      }));
    });

    categories.forEach((category) => {
      const position = positions.get(category.id);
      const spoke = createSvg("line", {
        class: "galaxy-spoke",
        x1: CORE.x,
        y1: CORE.y,
        x2: position.x,
        y2: position.y
      });
      spokeElements.set(category.id, spoke);
      map.appendChild(spoke);
    });
  }

  function drawCore() {
    const group = createSvg("g", {
      class: "galaxy-core",
      role: "button",
      tabindex: "0",
      "aria-label": "Reset galaxy filters"
    });
    group.appendChild(createSvg("circle", {
      class: "galaxy-core-halo",
      cx: CORE.x,
      cy: CORE.y,
      r: 49
    }));
    group.appendChild(createSvg("circle", {
      class: "galaxy-core-halo",
      cx: CORE.x,
      cy: CORE.y,
      r: 34
    }));
    group.appendChild(createSvg("circle", {
      class: "galaxy-core-star",
      cx: CORE.x,
      cy: CORE.y,
      r: 8
    }));
    const label = createSvg("text", {
      class: "galaxy-core-label",
      x: CORE.x,
      y: CORE.y + 67
    });
    label.textContent = "DAVEADS";
    group.appendChild(label);
    group.addEventListener("click", onReset);
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onReset();
      }
    });
    map.appendChild(group);
  }

  function showTooltip(node, event) {
    const primary = categoryById.get(node.primaryCategory);
    const categoryLabels = node.categoryIds
      .map((id) => categoryById.get(id)?.label)
      .filter(Boolean);
    const topicLabels = node.topicIds
      .slice(0, 3)
      .map((id) => topicById.get(id)?.label)
      .filter(Boolean);
    tooltip.style.setProperty("--tooltip-color", primary.color);
    tooltipKind.textContent = `${node.kind} // ${categoryLabels.join(" + ")}`;
    tooltipTitle.textContent = node.title;
    tooltipMeta.textContent = [node.date || "Undated", ...topicLabels]
      .filter(Boolean)
      .join(" · ");
    tooltip.hidden = false;

    const bounds = stage.getBoundingClientRect();
    const fallbackX = (node.x / 1200) * bounds.width;
    const fallbackY = (node.y / 720) * bounds.height;
    const pointerX = event && Number.isFinite(event.clientX)
      ? event.clientX - bounds.left
      : fallbackX;
    const pointerY = event && Number.isFinite(event.clientY)
      ? event.clientY - bounds.top
      : fallbackY;
    const tooltipWidth = Math.min(290, bounds.width - 32);
    const x = Math.max(16, Math.min(pointerX + 16, bounds.width - tooltipWidth - 16));
    const y = Math.max(16, Math.min(pointerY + 16, bounds.height - 112));
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  }

  function hideTooltip() {
    tooltip.hidden = true;
  }

  function drawClusters() {
    const denseLayout = categories.length > 12;

    categories.forEach((category) => {
      const position = positions.get(category.id);
      const members = groupedNodes.get(category.id);
      const orbitSeed = hash(category.id);
      const systemLayer = createSvg("g", {
        class: "galaxy-system-layer",
        "data-system": category.id
      });
      const orbitLayer = createSvg("g", {
        class: "galaxy-orbit-layer",
        "data-orbit": category.id
      });
      orbitLayer.style.setProperty("--orbit-x", `${position.x}px`);
      orbitLayer.style.setProperty("--orbit-y", `${position.y}px`);
      orbitLayer.style.setProperty("--orbit-duration", `${90 + (orbitSeed % 61)}s`);
      orbitLayer.style.setProperty("--orbit-delay", `${-(orbitSeed % 80)}s`);
      orbitLayer.style.setProperty(
        "--orbit-direction",
        orbitSeed % 2 === 0 ? "normal" : "reverse"
      );
      orbitLayers.set(category.id, orbitLayer);
      systemMotions.push({
        categoryId: category.id,
        element: systemLayer,
        position,
        progress: 0,
        direction: orbitSeed % 2 === 0 ? 1 : -1,
        duration: (240 + (orbitSeed % 121)) * 1000,
        lastTime: null
      });

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
      cluster.addEventListener("click", () => onCategory(category.id));
      cluster.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onCategory(category.id);
        }
      });
      clusterElements.set(category.id, { group: cluster, count: clusterCount });
      systemLayer.appendChild(orbitLayer);
      systemLayer.appendChild(cluster);
      map.appendChild(systemLayer);

      members.forEach((node, index) => {
        const goldenAngle = 2.399963229728653;
        const angle = index * goldenAngle + ((node.seed % 360) * Math.PI) / 180;
        const maxDistance = denseLayout ? 49 : 108;
        const distance = Math.min(
          maxDistance,
          20 + Math.sqrt(index + 1) * (denseLayout ? 7 : 16)
        );
        node.x = position.x + Math.cos(angle) * distance;
        node.y = position.y + Math.sin(angle) * distance * 0.72;
      });
    });
  }

  function createNode(node) {
    const category = categoryById.get(node.primaryCategory);
    const position = positions.get(category.id);
    const orbitLayer = orbitLayers.get(category.id);
    const edge = createSvg("line", {
      class: "galaxy-edge",
      x1: position.x,
      y1: position.y,
      x2: node.x,
      y2: node.y
    });
    edge.style.setProperty("--node-color", category.color);
    edgeElements.set(node.id, edge);
    orbitLayer.appendChild(edge);

    const link = createSvg("a", {
      class: "galaxy-node-link",
      href: node.url,
      "aria-label": `${node.title}, ${node.kind}, ${category.label}`
    });
    const radius = node.kind === "writing" ? 7.2 : 4.2;
    const hitArea = createSvg("circle", {
      class: "galaxy-node-hit",
      cx: node.x,
      cy: node.y,
      r: coarsePointer ? 30 : 15
    });
    const circle = createSvg("circle", {
      class: `galaxy-node ${node.kind === "writing" ? "is-writing" : "is-note"}`,
      cx: node.x,
      cy: node.y,
      r: radius
    });
    circle.style.setProperty("--node-color", category.color);
    circle.style.setProperty("--twinkle-delay", `${-(node.seed % 45) / 10}s`);
    link.appendChild(hitArea);
    link.appendChild(circle);
    link.addEventListener("pointerenter", (event) => showTooltip(node, event));
    link.addEventListener("pointermove", (event) => showTooltip(node, event));
    link.addEventListener("pointerleave", hideTooltip);
    link.addEventListener("focus", () => showTooltip(node));
    link.addEventListener("blur", hideTooltip);
    nodeElements.set(node.id, link);
    orbitLayer.appendChild(link);
  }

  function renderNodes(visibleNodes) {
    const visibleIds = new Set(visibleNodes.map((node) => node.id));
    hideTooltip();

    nodeElements.forEach((element, nodeId) => {
      if (visibleIds.has(nodeId)) return;
      element.remove();
      edgeElements.get(nodeId)?.remove();
      nodeElements.delete(nodeId);
      edgeElements.delete(nodeId);
    });

    visibleNodes.forEach((node) => {
      if (!nodeElements.has(node.id)) createNode(node);
    });
  }

  drawBackground();
  drawCore();
  drawClusters();

  return {
    clusterElements,
    spokeElements,
    systemMotions,
    renderNodes
  };
}

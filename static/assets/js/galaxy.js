import { layoutCategories } from "./galaxy/layout.js";
import { createGalaxyMap } from "./galaxy/map.js";
import { buildGalaxyModel } from "./galaxy/model.js";
import { createSystemMotion } from "./galaxy/motion.js";
import { createGalaxyUi } from "./galaxy/ui.js";
import { setupGalaxyViewport } from "./galaxy/viewport.js";

const root = document.querySelector("[data-galaxy]");
const dataElement = document.getElementById("galaxy-data");

if (root && dataElement) {
  const rawItems = JSON.parse(dataElement.textContent);
  const {
    nodes,
    categories,
    topics,
    categoryById,
    topicById
  } = buildGalaxyModel(rawItems);

  const state = {
    kind: "all",
    category: "all",
    topic: "all",
    query: "",
    view: "map"
  };

  const elements = {
    map: root.querySelector("[data-galaxy-map]"),
    mapScroll: root.querySelector("[data-galaxy-map-scroll]"),
    stage: root.querySelector("[data-galaxy-stage]"),
    list: root.querySelector("[data-galaxy-list]"),
    tooltip: root.querySelector("[data-galaxy-tooltip]"),
    emptyState: root.querySelector("[data-galaxy-empty]"),
    count: root.querySelector("[data-galaxy-count]"),
    search: root.querySelector("[data-galaxy-search]"),
    categoryFilters: root.querySelector("[data-category-filters]"),
    topicFilter: root.querySelector("[data-topic-filter]"),
    viewToggle: root.querySelector("[data-view-toggle]"),
    zoomOut: root.querySelector("[data-galaxy-zoom-out]"),
    zoomReset: root.querySelector("[data-galaxy-zoom-reset]"),
    zoomIn: root.querySelector("[data-galaxy-zoom-in]"),
    zoomValue: root.querySelector("[data-galaxy-zoom-value]")
  };
  elements.tooltipKind = elements.tooltip.querySelector("[data-tooltip-kind]");
  elements.tooltipTitle = elements.tooltip.querySelector("[data-tooltip-title]");
  elements.tooltipMeta = elements.tooltip.querySelector("[data-tooltip-meta]");

  const positions = layoutCategories(categories);
  const compactOverview = nodes.length > 280 || categories.length > 28;
  let ui;
  let mapView;

  function matches(node) {
    const kindMatches = state.kind === "all" || node.kind === state.kind;
    const categoryMatches = state.category === "all"
      || node.categoryIds.includes(state.category);
    const topicMatches = state.topic === "all" || node.topicIds.includes(state.topic);
    const queryMatches = !state.query || node.searchText.includes(state.query);
    return kindMatches && categoryMatches && topicMatches && queryMatches;
  }

  function visibleNodes() {
    return nodes.filter(matches);
  }

  function setCategory(categoryId) {
    state.category = categoryId;
    ui.setCategoryActive(categoryId);
    applyFilters();
  }

  function resetFilters() {
    state.kind = "all";
    state.category = "all";
    state.topic = "all";
    state.query = "";
    elements.search.value = "";
    elements.topicFilter.value = "all";
    root.querySelectorAll("[data-kind]").forEach((button) => {
      const active = button.dataset.kind === "all";
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    setCategory("all");
  }

  mapView = createGalaxyMap({
    map: elements.map,
    stage: elements.stage,
    tooltip: elements.tooltip,
    tooltipKind: elements.tooltipKind,
    tooltipTitle: elements.tooltipTitle,
    tooltipMeta: elements.tooltipMeta,
    nodes,
    categories,
    categoryById,
    topicById,
    positions,
    onReset: resetFilters,
    onCategory: setCategory
  });

  ui = createGalaxyUi({
    list: elements.list,
    categoryFilters: elements.categoryFilters,
    topicFilter: elements.topicFilter,
    categories,
    topics,
    categoryById,
    topicById,
    onCategory: setCategory
  });

  const systemMotion = createSystemMotion({
    systemMotions: mapView.systemMotions,
    spokeElements: mapView.spokeElements,
    state,
    mapScroll: elements.mapScroll
  });
  systemMotion.start();

  setupGalaxyViewport({
    map: elements.map,
    mapScroll: elements.mapScroll,
    zoomOut: elements.zoomOut,
    zoomReset: elements.zoomReset,
    zoomIn: elements.zoomIn,
    zoomValue: elements.zoomValue
  });

  function applyFilters() {
    const visible = visibleNodes();
    const visibleIds = new Set(visible.map((node) => node.id));
    const hasActiveDiscovery = state.kind !== "all"
      || state.category !== "all"
      || state.topic !== "all"
      || Boolean(state.query);
    const displayStars = !compactOverview || hasActiveDiscovery;

    nodes.forEach((node) => {
      const hidden = !displayStars || !visibleIds.has(node.id);
      mapView.nodeElements.get(node.id).classList.toggle("is-hidden", hidden);
      mapView.edgeElements.get(node.id).classList.toggle("is-hidden", hidden);
    });

    categories.forEach((category) => {
      const visibleCount = visible.filter((node) => {
        return node.categoryIds.includes(category.id);
      }).length;
      const cluster = mapView.clusterElements.get(category.id);
      cluster.group.classList.toggle("is-dimmed", visibleCount === 0);
      cluster.count.textContent = `${visibleCount} ${visibleCount === 1 ? "object" : "objects"}`;
    });

    ui.updateCategoryCounts(visible);
    ui.renderList(visible, state);

    const compactHint = compactOverview && !hasActiveDiscovery
      ? " · choose a constellation or topic to reveal stars"
      : "";
    elements.count.textContent = `${visible.length} ${visible.length === 1 ? "object" : "objects"} in view${compactHint}`;
    elements.emptyState.hidden = visible.length !== 0 || state.view !== "map";
  }

  function setView(view) {
    state.view = view;
    const listView = view === "list";
    elements.stage.hidden = listView;
    elements.list.hidden = !listView;
    elements.viewToggle.setAttribute("aria-pressed", String(listView));
    elements.viewToggle.innerHTML = listView
      ? '<span aria-hidden="true">✦</span> Map view'
      : '<span aria-hidden="true">☷</span> List view';
    elements.emptyState.hidden = visibleNodes().length !== 0 || listView;
  }

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

  elements.topicFilter.addEventListener("change", () => {
    state.topic = elements.topicFilter.value;
    applyFilters();
  });

  elements.search.addEventListener("input", () => {
    state.query = elements.search.value.trim().toLocaleLowerCase();
    applyFilters();
  });

  root.querySelector("[data-random-voyage]").addEventListener("click", () => {
    const visible = visibleNodes();
    if (!visible.length) return;
    const destination = visible[Math.floor(Math.random() * visible.length)];
    window.location.href = destination.url;
  });

  elements.viewToggle.addEventListener("click", () => {
    setView(state.view === "map" ? "list" : "map");
  });

  applyFilters();
}

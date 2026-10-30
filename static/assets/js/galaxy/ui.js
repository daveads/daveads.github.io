export function createGalaxyUi({
  list,
  categoryFilters,
  topicFilter,
  categories,
  topics,
  categoryById,
  topicById,
  onCategory
}) {
  function buildCategoryFilters() {
    const allButton = document.createElement("button");
    allButton.type = "button";
    allButton.dataset.category = "all";
    allButton.className = "is-active";
    allButton.setAttribute("aria-pressed", "true");
    allButton.style.setProperty("--theme-color", "#dce8ff");
    allButton.textContent = "All constellations";
    allButton.addEventListener("click", () => onCategory("all"));
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
      button.addEventListener("click", () => onCategory(category.id));
      categoryFilters.appendChild(button);
    });
  }

  function buildTopicFilter() {
    topics.forEach((topic) => {
      const option = document.createElement("option");
      option.value = topic.id;
      option.textContent = `${topic.label} (${topic.count})`;
      topicFilter.appendChild(option);
    });
  }

  function setCategoryActive(categoryId) {
    categoryFilters.querySelectorAll("button").forEach((button) => {
      const active = button.dataset.category === categoryId;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function updateCategoryCounts(visible) {
    categories.forEach((category) => {
      const visibleCount = visible.filter((node) => {
        return node.categoryIds.includes(category.id);
      }).length;
      const categoryCount = categoryFilters.querySelector(
        `[data-category-count="${category.id}"]`
      );
      if (categoryCount) categoryCount.textContent = String(visibleCount);
    });
  }

  function renderList(visible, state) {
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
        const topicLabels = node.topicIds
          .slice(0, 2)
          .map((id) => topicById.get(id)?.label)
          .filter(Boolean);
        meta.textContent = [node.kind, node.date, ...topicLabels]
          .filter(Boolean)
          .join(" · ");
        link.appendChild(meta);
        item.appendChild(link);
        grid.appendChild(item);
      });
      section.appendChild(grid);
      list.appendChild(section);
    });
  }

  buildCategoryFilters();
  buildTopicFilter();

  return {
    renderList,
    setCategoryActive,
    updateCategoryCounts
  };
}

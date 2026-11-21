export function createGalaxyUi({
  list,
  mapScroll,
  categoryResults,
  categoryResultsTitle,
  categoryResultsList,
  categoryResultsEmpty,
  categoryResultsClose,
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

  function updateCategoryCounts(categoryCounts) {
    categories.forEach((category) => {
      const categoryCount = categoryFilters.querySelector(
        `[data-category-count="${category.id}"]`
      );
      if (categoryCount) {
        categoryCount.textContent = String(categoryCounts.get(category.id) || 0);
      }
    });
  }

  function createPageItem(node) {
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
    return item;
  }

  function closeCategoryResults() {
    categoryResults.hidden = true;
    categoryResultsList.replaceChildren();
    mapScroll.classList.remove("has-category-results");
  }

  function renderCategoryResults(category, members) {
    categoryResults.style.setProperty("--group-color", category.color);
    categoryResultsTitle.textContent = `${category.label} · ${members.length}`;
    categoryResultsList.replaceChildren(...members.map(createPageItem));
    categoryResultsEmpty.hidden = members.length !== 0;
    categoryResults.hidden = false;
    mapScroll.classList.add("has-category-results");
  }

  function renderList(visible, state) {
    list.replaceChildren();
    let groups;

    if (state.category === "all") {
      const membersByCategory = new Map(
        categories.map((category) => [category.id, []])
      );
      visible.forEach((node) => membersByCategory.get(node.primaryCategory).push(node));
      groups = categories.map((category) => ({
        category,
        members: membersByCategory.get(category.id)
      }));
    } else {
      groups = [{
        category: categoryById.get(state.category),
        members: visible.filter((node) => node.categoryIds.includes(state.category))
      }];
    }

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
      grid.append(...members.map(createPageItem));
      section.appendChild(grid);
      list.appendChild(section);
    });
  }

  categoryResultsClose.addEventListener("click", closeCategoryResults);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !categoryResults.hidden) closeCategoryResults();
  });

  buildCategoryFilters();
  buildTopicFilter();

  return {
    renderList,
    renderCategoryResults,
    closeCategoryResults,
    setCategoryActive,
    updateCategoryCounts
  };
}

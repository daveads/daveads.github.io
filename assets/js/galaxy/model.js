import { hash } from "./utils.js";

const UNCATEGORIZED_ID = "uncharted";

function normalizeTerm(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function colorFor(id) {
  if (id === UNCATEGORIZED_ID) return "hsl(221 12% 62%)";
  return `hsl(${hash(id) % 360} 72% 68%)`;
}

function registerTerm(registry, value) {
  const label = String(value).trim();
  const id = normalizeTerm(label);
  if (!id) return null;
  if (!registry.has(id)) registry.set(id, { id, label, count: 0 });
  registry.get(id).count += 1;
  return id;
}

function registerUniqueTerms(registry, values) {
  const seen = new Set();
  return (Array.isArray(values) ? values : []).reduce((ids, value) => {
    const id = normalizeTerm(value);
    if (!id || seen.has(id)) return ids;
    seen.add(id);
    const registeredId = registerTerm(registry, value);
    if (registeredId) ids.push(registeredId);
    return ids;
  }, []);
}

export function buildGalaxyModel(rawItems) {
  const categoryTerms = new Map();
  const topicTerms = new Map();

  const nodes = rawItems.map((item, index) => {
    let categoryIds = registerUniqueTerms(categoryTerms, item.categories);
    const topicIds = registerUniqueTerms(topicTerms, item.tags);

    if (!categoryIds.length) {
      if (!categoryTerms.has(UNCATEGORIZED_ID)) {
        categoryTerms.set(UNCATEGORIZED_ID, {
          id: UNCATEGORIZED_ID,
          label: "Uncharted",
          count: 0
        });
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

  return {
    nodes,
    categories,
    topics,
    categoryById: new Map(categories.map((category) => [category.id, category])),
    topicById: new Map(topics.map((topic) => [topic.id, topic]))
  };
}

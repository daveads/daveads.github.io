const MINIMUM_STAR_BUDGET = 42;
const MAXIMUM_STAR_BUDGET = 420;

function newestFirst(a, b) {
  return String(b.date || "").localeCompare(String(a.date || ""))
    || a.title.localeCompare(b.title);
}

export function calculateStarBudget({ width, height, scale, focused }) {
  const viewportArea = Math.max(width, 320) * Math.max(height, 480);
  const areaBudget = viewportArea / 4800;
  const focusMultiplier = focused ? 1.75 : 1;
  const zoomMultiplier = Math.max(0.75, Math.min(scale, 2.2));

  return Math.round(Math.max(
    MINIMUM_STAR_BUDGET,
    Math.min(MAXIMUM_STAR_BUDGET, areaBudget * focusMultiplier * zoomMultiplier)
  ));
}

export function selectRepresentativeNodes(nodes, budget) {
  if (nodes.length <= budget) return nodes;

  const groups = new Map();
  nodes.forEach((node) => {
    if (!groups.has(node.primaryCategory)) groups.set(node.primaryCategory, []);
    groups.get(node.primaryCategory).push(node);
  });
  groups.forEach((members) => members.sort(newestFirst));

  const selected = [];
  const categoryGroups = [...groups.values()];
  const targetCount = Math.max(budget, categoryGroups.length);
  let depth = 0;

  while (selected.length < targetCount) {
    let foundNode = false;
    categoryGroups.forEach((members) => {
      if (selected.length >= targetCount || !members[depth]) return;
      selected.push(members[depth]);
      foundNode = true;
    });
    if (!foundNode) break;
    depth += 1;
  }

  return selected;
}

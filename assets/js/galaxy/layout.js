import { CORE } from "./utils.js";

export function layoutCategories(categories) {
  const positions = new Map();
  let categoryIndex = 0;
  let ringIndex = 0;

  while (categoryIndex < categories.length) {
    const capacity = 7 + ringIndex * 5;
    const itemsInRing = Math.min(capacity, categories.length - categoryIndex);
    const radiusX = Math.min(485, 215 + ringIndex * 135);
    const radiusY = Math.min(300, 128 + ringIndex * 84);
    const offset = ringIndex % 2 === 0
      ? -Math.PI / 2
      : -Math.PI / 2 + Math.PI / itemsInRing;

    for (let ringPosition = 0; ringPosition < itemsInRing; ringPosition += 1) {
      const category = categories[categoryIndex];
      const angle = offset + (ringPosition * Math.PI * 2) / itemsInRing;
      positions.set(category.id, {
        x: CORE.x + Math.cos(angle) * radiusX,
        y: CORE.y + Math.sin(angle) * radiusY,
        angle,
        radiusX,
        radiusY
      });
      categoryIndex += 1;
    }
    ringIndex += 1;
  }

  return positions;
}

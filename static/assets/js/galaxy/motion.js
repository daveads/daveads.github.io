import { CORE } from "./utils.js";

export function createSystemMotion({
  systemMotions,
  spokeElements,
  state,
  mapScroll
}) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let animationFrame = null;

  function resetPositions() {
    systemMotions.forEach((motion) => {
      motion.progress = 0;
      motion.lastTime = null;
      motion.element.removeAttribute("transform");
      const spoke = spokeElements.get(motion.categoryId);
      spoke.setAttribute("x2", String(motion.position.x));
      spoke.setAttribute("y2", String(motion.position.y));
    });
  }

  function animate(time) {
    systemMotions.forEach((motion) => {
      if (motion.lastTime === null) motion.lastTime = time;
      const elapsed = Math.min(64, time - motion.lastTime);
      motion.lastTime = time;
      const paused = state.view !== "map"
        || document.hidden
        || mapScroll.classList.contains("is-panning")
        || motion.element.matches(":hover, :focus-within");

      if (!paused) {
        motion.progress += (elapsed / motion.duration) * Math.PI * 2 * motion.direction;
      }

      const angle = motion.position.angle + motion.progress;
      const x = CORE.x + Math.cos(angle) * motion.position.radiusX;
      const y = CORE.y + Math.sin(angle) * motion.position.radiusY;
      const translateX = x - motion.position.x;
      const translateY = y - motion.position.y;
      motion.element.setAttribute("transform", `translate(${translateX} ${translateY})`);
      const spoke = spokeElements.get(motion.categoryId);
      spoke.setAttribute("x2", String(x));
      spoke.setAttribute("y2", String(y));
    });

    animationFrame = window.requestAnimationFrame(animate);
  }

  function sync() {
    if (animationFrame !== null) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    resetPositions();
    if (!reducedMotion.matches) {
      animationFrame = window.requestAnimationFrame(animate);
    }
  }

  reducedMotion.addEventListener("change", sync);

  return { start: sync, stop: () => window.cancelAnimationFrame(animationFrame) };
}

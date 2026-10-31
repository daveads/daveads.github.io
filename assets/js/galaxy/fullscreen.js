export function setupGalaxyFullscreen({ stage, toggle, onChange }) {
  const fullscreenRoot = document.documentElement;
  const supportsNativeFullscreen = typeof stage.requestFullscreen === "function"
    && typeof document.exitFullscreen === "function";
  let fallbackActive = false;

  function galaxyIsFullscreen() {
    return document.fullscreenElement === stage || fallbackActive;
  }

  function updateControl() {
    const active = galaxyIsFullscreen();
    const action = active ? "Exit" : "Enter";
    toggle.textContent = active ? "×" : "⛶";
    toggle.setAttribute("aria-pressed", String(active));
    toggle.setAttribute("aria-label", `${action} Galaxy fullscreen`);
    toggle.title = `${action} fullscreen`;
    window.requestAnimationFrame(onChange);
  }

  function setFallbackFullscreen(active) {
    fallbackActive = active;
    stage.classList.toggle("is-galaxy-fullscreen", active);
    fullscreenRoot.classList.toggle("galaxy-fullscreen-active", active);
    updateControl();
  }

  async function toggleFullscreen() {
    if (document.fullscreenElement === stage) {
      await document.exitFullscreen();
      return;
    }

    if (fallbackActive) {
      setFallbackFullscreen(false);
      return;
    }

    if (supportsNativeFullscreen) {
      try {
        await stage.requestFullscreen();
        return;
      } catch (_error) {
        // Use the contained CSS mode if the browser rejects native fullscreen.
      }
    }

    setFallbackFullscreen(true);
  }

  toggle.addEventListener("click", toggleFullscreen);
  document.addEventListener("fullscreenchange", updateControl);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && fallbackActive) {
      setFallbackFullscreen(false);
    }
  });

  updateControl();
}

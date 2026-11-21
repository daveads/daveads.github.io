(() => {
  const storageKey = "daveads-theme";
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const themeColor = document.querySelector("[data-theme-color]");
  const systemPreference = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: light)")
    : null;

  const getSavedTheme = () => {
    try {
      const value = localStorage.getItem(storageKey);
      return value === "light" || value === "dark" ? value : null;
    } catch (error) {
      return null;
    }
  };

  const saveTheme = (theme) => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      // The selected theme still works for this page when storage is unavailable.
    }
  };

  const systemTheme = () => systemPreference && systemPreference.matches ? "light" : "dark";

  const applyTheme = (theme) => {
    const isLight = theme === "light";

    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    if (themeColor) {
      themeColor.setAttribute("content", isLight ? "#e5e1d9" : "#080808");
    }

    if (toggle) {
      const nextTheme = isLight ? "dark" : "light";
      const label = `Switch to ${nextTheme} mode`;

      toggle.hidden = false;
      toggle.setAttribute("aria-label", label);
      toggle.setAttribute("title", label);
      toggle.querySelector(".theme-toggle__label").textContent = label;
    }
  };

  applyTheme(getSavedTheme() || systemTheme());

  if (toggle) {
    toggle.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
      saveTheme(nextTheme);
      applyTheme(nextTheme);
    });
  }

  const followSystemPreference = (event) => {
    if (!getSavedTheme()) applyTheme(event.matches ? "light" : "dark");
  };

  if (systemPreference) {
    if (typeof systemPreference.addEventListener === "function") {
      systemPreference.addEventListener("change", followSystemPreference);
    } else if (typeof systemPreference.addListener === "function") {
      systemPreference.addListener(followSystemPreference);
    }
  }
})();

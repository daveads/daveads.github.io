(() => {
  const navigation = document.querySelector(".site-nav");
  const menuToggle = document.querySelector("#nav-trigger");

  if (!navigation || !menuToggle) return;

  const closeMenu = () => {
    if (menuToggle.checked) menuToggle.checked = false;
  };

  document.addEventListener("pointerdown", (event) => {
    if (!navigation.contains(event.target)) closeMenu();
  });

  window.addEventListener("scroll", closeMenu, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest(".page-link")) closeMenu();
  });
})();

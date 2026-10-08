const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");

if (header && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-menu-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? navToggle.dataset.closeLabel : navToggle.dataset.openLabel
    );
  });

  document.querySelectorAll(".primary-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-menu-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", navToggle.dataset.openLabel);
    });
  });
}

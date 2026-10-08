const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");

if (header && navToggle) {
  const closeMenu = () => {
    header.classList.remove("is-menu-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", navToggle.dataset.openLabel);
  };

  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-menu-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? navToggle.dataset.closeLabel : navToggle.dataset.openLabel
    );
  });

  document.querySelectorAll(".primary-nav a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const track = document.querySelector("[data-carousel]");
const dots = document.querySelectorAll("[data-carousel-dots] button");

if (track && dots.length) {
  const cards = Array.from(track.children);

  const setActiveDot = (index) => {
    dots.forEach((dot, dotIndex) => {
      if (dotIndex === index) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  let frame = 0;
  track.addEventListener(
    "scroll",
    () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll <= 0) return;
        if (track.scrollLeft >= maxScroll - 4) {
          setActiveDot(cards.length - 1);
          return;
        }
        const start = cards[0].offsetLeft;
        let closest = 0;
        cards.forEach((card, index) => {
          const distance = Math.abs(card.offsetLeft - start - track.scrollLeft);
          const best = Math.abs(cards[closest].offsetLeft - start - track.scrollLeft);
          if (distance < best) closest = index;
        });
        setActiveDot(closest);
      });
    },
    { passive: true }
  );

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      track.scrollTo({ left: cards[index].offsetLeft - cards[0].offsetLeft, behavior: "smooth" });
    });
  });
}

const stickyOrder = document.querySelector(".sticky-order");
const stickyTargets = document.querySelectorAll(".hero-actions, #order, .site-footer");

if (stickyOrder && stickyTargets.length && "IntersectionObserver" in window) {
  const visible = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visible.add(entry.target);
      } else {
        visible.delete(entry.target);
      }
    });
    stickyOrder.classList.toggle("is-hidden", visible.size > 0);
  });

  stickyTargets.forEach((target) => observer.observe(target));
}

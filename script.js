const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

// Footer year
document.querySelector("#year").textContent = new Date().getFullYear();

// "View Details" toggle on the IntelliView card
const detailsToggle = document.querySelector("#details-toggle");
const detailsPanel = document.querySelector("#project-details");
if (detailsToggle && detailsPanel) {
  detailsToggle.addEventListener("click", () => {
    const willOpen = detailsPanel.hidden;
    detailsPanel.hidden = !willOpen;
    detailsToggle.setAttribute("aria-expanded", String(willOpen));
    detailsToggle.textContent = willOpen ? "Hide Details" : "View Details";
  });
}

// Highlight the nav link of the section currently in view
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-link");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const match = [...links].find((link) => link.getAttribute("href") === `#${entry.target.id}`);
    if (!match) return; // sections without a nav link (e.g. Career Goals) keep the previous highlight
    links.forEach((link) => link.classList.toggle("active", link === match));
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => observer.observe(section));

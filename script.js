/* ==========================================================
   LOOPED CREATIVE STUDIO — script.js
   New Luxury Digital Studio Design

   This file controls:
   - Mobile navigation menu
   - Sticky header scroll style
   - Scroll reveal animations
   - Active navigation highlighting
   - Automatic footer copyright year
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* ========================================================
     SELECT PAGE ELEMENTS
     ======================================================== */

  const body = document.body;
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  const revealItems = document.querySelectorAll(".reveal");
  const sections = document.querySelectorAll("main section[id]");
  const yearElement = document.getElementById("year");


  /* ========================================================
     AUTOMATIC COPYRIGHT YEAR
     ======================================================== */

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* ========================================================
     MOBILE MENU
     ======================================================== */

  function openMenu() {
    if (!menuButton || !navMenu) {
      return;
    }

    menuButton.classList.add("active");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close menu");

    navMenu.classList.add("open");
    body.classList.add("menu-open");
  }

  function closeMenu() {
    if (!menuButton || !navMenu) {
      return;
    }

    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");

    navMenu.classList.remove("open");
    body.classList.remove("menu-open");
  }

  function toggleMenu() {
    if (!navMenu) {
      return;
    }

    const menuIsOpen = navMenu.classList.contains("open");

    if (menuIsOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (menuButton && navMenu) {
    menuButton.addEventListener("click", toggleMenu);

    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) {
        closeMenu();
      }
    });
  }


  /* ========================================================
     HEADER BORDER WHEN SCROLLING
     ======================================================== */

  function updateHeaderOnScroll() {
    if (!header) {
      return;
    }

    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  updateHeaderOnScroll();

  window.addEventListener("scroll", updateHeaderOnScroll, {
    passive: true
  });


  /* ========================================================
     SCROLL REVEAL ANIMATIONS
     ======================================================== */

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("visible");
    });
  }


  /* ========================================================
     ACTIVE NAVIGATION LINK WHILE SCROLLING
     ======================================================== */

  const navLinkMap = {};

  navLinks.forEach(function (link) {
    const sectionId = link.getAttribute("href").replace("#", "");
    navLinkMap[sectionId] = link;
  });

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              link.classList.remove("active");
            });

            const activeLink = navLinkMap[entry.target.id];

            if (activeLink) {
              activeLink.classList.add("active");
            }
          }
        });
      },
      {
        rootMargin: "-32% 0px -58% 0px",
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }


  /* ========================================================
     SMOOTH SCROLLING FOR INTERNAL LINKS
     ======================================================== */

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (!targetSection) {
        return;
      }

      event.preventDefault();

      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });


  /* ========================================================
     ADD SUBTLE MOVEMENT TO THE HERO ORB ON DESKTOP
     ======================================================== */

  const heroVisual = document.querySelector(".hero-right");
  const orb = document.querySelector(".orb");

  if (heroVisual && orb && window.matchMedia("(pointer: fine)").matches) {
    heroVisual.addEventListener("mousemove", function (event) {
      const bounds = heroVisual.getBoundingClientRect();

      const mouseX = event.clientX - bounds.left;
      const mouseY = event.clientY - bounds.top;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      const moveX = (mouseX - centerX) / 40;
      const moveY = (mouseY - centerY) / 40;

      orb.style.transform =
        "translate(" + moveX + "px, " + moveY + "px)";
    });

    heroVisual.addEventListener("mouseleave", function () {
      orb.style.transform = "translate(0, 0)";
    });
  }
});
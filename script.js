document.addEventListener("DOMContentLoaded", () => {
  // 1. Navbar Scroll Effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. Scroll Animation (Reveal on Scroll)
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Animasi hanya berjalan 1x
      }
    });
  }, observerOptions);

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));

  // 3. Smooth Scrolling untuk tautan Navbar
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navHeight = navbar.offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // 4. Update Active Nav Link on Scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - navbar.offsetHeight - 50) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // 5. Portfolio Tabs Logic
  const tabBtns = document.querySelectorAll(".tab-btn");
  const portfolioPanels = document.querySelectorAll(".portfolio-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active from all buttons
      tabBtns.forEach((b) => b.classList.remove("active"));
      // Add active to clicked button
      btn.classList.add("active");

      // Hide all panels
      portfolioPanels.forEach((panel) => {
        panel.classList.remove("active");
      });

      // Show targeted panel
      const targetId = btn.getAttribute("data-target");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add("active");

        // Memastikan elemen yang bersembunyi dalam panel baru bisa di-reveal ulang (jika belum terlihat)
        const hiddenInPanel = targetPanel.querySelectorAll(".hidden");
        hiddenInPanel.forEach((el) => observer.observe(el));
      }
    });
  });
});

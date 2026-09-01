(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  var stored = localStorage.getItem("theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  applyTheme(stored || (prefersDark ? "dark" : "light"));

  toggle.addEventListener("click", function () {
    var current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(current);
  });

  var burger = document.getElementById("navBurger");
  var mobileLinks = document.getElementById("navLinksMobile");
  burger.addEventListener("click", function () {
    mobileLinks.classList.toggle("is-open");
  });
  mobileLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mobileLinks.classList.remove("is-open");
    });
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach(function (el) {
    observer.observe(el);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();

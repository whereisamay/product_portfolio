(function () {
  var root = document.documentElement;
  var track = document.getElementById("deckTrack");
  var slides = Array.prototype.slice.call(track.querySelectorAll(".slide"));
  var total = slides.length;
  var current = 0;

  var currentEl = document.getElementById("slideCurrent");
  var totalEl = document.getElementById("slideTotal");
  var progressFill = document.getElementById("progressFill");
  var dotsWrap = document.getElementById("deckDots");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var deck = document.getElementById("deck");
  var fullscreenBtn = document.getElementById("fullscreenBtn");

  totalEl.textContent = total;

  // Build dots
  slides.forEach(function (_, i) {
    var dot = document.createElement("button");
    dot.className = "deck-dot";
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.addEventListener("click", function () { goTo(i); });
    dotsWrap.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function render() {
    track.style.transform = "translateX(-" + current * 100 + "%)";
    currentEl.textContent = current + 1;
    progressFill.style.width = ((current + 1) / total) * 100 + "%";
    dots.forEach(function (d, i) {
      d.classList.toggle("is-active", i === current);
    });
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
    slides[current].querySelector("h1, h2")?.setAttribute("tabindex", "-1");
    history.replaceState(null, "", "#slide-" + (current + 1));
  }

  function goTo(index) {
    current = Math.max(0, Math.min(total - 1, index));
    render();
  }

  prevBtn.addEventListener("click", function () { goTo(current - 1); });
  nextBtn.addEventListener("click", function () { goTo(current + 1); });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
      e.preventDefault();
      goTo(current + 1);
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      goTo(current - 1);
    } else if (e.key === "Home") {
      goTo(0);
    } else if (e.key === "End") {
      goTo(total - 1);
    }
  });

  // Touch swipe
  var touchStartX = null;
  track.addEventListener("touchstart", function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener("touchend", function (e) {
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      goTo(current + (dx < 0 ? 1 : -1));
    }
    touchStartX = null;
  }, { passive: true });

  // Deep-link on load
  var hashMatch = /^#slide-(\d+)$/.exec(window.location.hash);
  if (hashMatch) {
    var n = parseInt(hashMatch[1], 10) - 1;
    if (n >= 0 && n < total) current = n;
  }
  render();

  // Theme — shared with the main portfolio site
  var themeToggle = document.getElementById("themeToggle");
  var stored = localStorage.getItem("theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }
  applyTheme(stored || (prefersDark ? "dark" : "light"));

  themeToggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });

  // Fullscreen
  fullscreenBtn.addEventListener("click", function () {
    if (!document.fullscreenElement) {
      deck.requestFullscreen && deck.requestFullscreen();
    } else {
      document.exitFullscreen && document.exitFullscreen();
    }
  });

  // Hide the video placeholder once a real embed src is set
  var videoFrame = document.querySelector(".video-frame iframe");
  var videoPlaceholder = document.getElementById("videoPlaceholder");
  if (videoFrame && videoPlaceholder) {
    var src = videoFrame.getAttribute("src");
    if (src && src !== "about:blank") {
      videoPlaceholder.style.display = "none";
    }
  }
})();

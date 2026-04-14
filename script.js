// ── Hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks
  .querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("open")),
  );

// ── Header shadow on scroll
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

// ── Scroll animations (Intersection Observer)
const animEls = document.querySelectorAll(
  ".fade-in, .fade-in-left, .fade-in-right",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
animEls.forEach((el) => observer.observe(el));

// ── Counter animation
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + (target === 100 ? "" : "+");
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + (target === 100 ? "" : "+");
    }
  }, 16);
}
const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        document.querySelectorAll("[data-count]").forEach((el) => {
          animateCounter(el, parseInt(el.dataset.count));
          el.removeAttribute("data-count");
        });
        counterObs.disconnect();
      }
    });
  },
  { threshold: 0.5 },
);
const statsEl = document.querySelector(".hero-stats");
if (statsEl) counterObs.observe(statsEl);

// ── Carousel
(function () {
  const wrap = document.querySelector(".carousel-wrap");
  const track = document.getElementById("depoTrack");
  const prev = document.getElementById("depoPrev");
  const next = document.getElementById("depoNext");
  const dotsEl = document.getElementById("depoDots");
  if (!track) return;

  const GAP = 24;
  const cards = Array.from(track.children);
  let current = 0;
  let perView = 3;
  let cardW = 0;

  function getPerView() {
    return window.innerWidth <= 700 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  }

  function setCardWidths() {
    perView = getPerView();
    const wrapW = wrap.clientWidth;
    cardW = (wrapW - GAP * (perView - 1)) / perView;
    cards.forEach((c) => {
      c.style.width = cardW + "px";
      c.style.minWidth = cardW + "px";
      c.style.marginRight = GAP + "px";
    });
  }

  function totalSlides() {
    return Math.ceil(cards.length / perView);
  }

  function buildDots() {
    const total = totalSlides();
    const MAX = 5;
    const count = Math.min(total, MAX);
    let winStart = current - Math.floor(count / 2);
    winStart = Math.max(0, Math.min(winStart, total - count));
    dotsEl.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const slideIdx = winStart + i;
      const dist = Math.abs(slideIdx - current);
      const size = dist === 0 ? 8 : dist === 1 ? 6 : 4;
      const opacity = dist === 0 ? 1 : dist === 1 ? 0.6 : 0.35;
      const d = document.createElement("button");
      d.className = "carousel-dot" + (slideIdx === current ? " active" : "");
      d.style.width = size + "px";
      d.style.height = size + "px";
      d.style.opacity = opacity;
      d.setAttribute("aria-label", "Slide " + (slideIdx + 1));
      d.addEventListener("click", () => goTo(slideIdx));
      dotsEl.appendChild(d);
    }
  }

  function goTo(idx) {
    const total = totalSlides();
    current = ((idx % total) + total) % total;
    track.style.transform = `translateX(-${current * perView * (cardW + GAP)}px)`;
    buildDots();
  }

  function init() {
    setCardWidths();
    if (current >= totalSlides()) current = 0;
    buildDots();
    goTo(current);
  }

  prev.addEventListener("click", () => goTo(current - 1));
  next.addEventListener("click", () => goTo(current + 1));
  new ResizeObserver(() => requestAnimationFrame(init)).observe(wrap);
  init();

  // Auto-play
  let timer = setInterval(
    () => goTo(current + 1 >= totalSlides() ? 0 : current + 1),
    5000,
  );
  wrap.addEventListener("mouseenter", () => clearInterval(timer));
  wrap.addEventListener("mouseleave", () => {
    timer = setInterval(
      () => goTo(current + 1 >= totalSlides() ? 0 : current + 1),
      5000,
    );
  });

  // Touch/swipe
  let startX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener("touchend", (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  });
})();

// ── Carrossel Serviços
(function () {
  const wrap = document.querySelector(".services-carousel-wrap");
  const track = document.getElementById("servicosTrack");
  const prev = document.getElementById("servicosPrev");
  const next = document.getElementById("servicosNext");
  const dotsEl = document.getElementById("servicosDots");
  if (!track) return;

  const GAP = 20;
  const cards = Array.from(track.children);
  let current = 0;
  let perView = 3;
  let cardW = 0;

  function getPerView() {
    return window.innerWidth <= 700 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  }

  function setCardWidths() {
    perView = getPerView();
    const wrapW = wrap.clientWidth;
    cardW = (wrapW - GAP * (perView - 1)) / perView;
    cards.forEach((c) => {
      c.style.width = cardW + "px";
      c.style.minWidth = cardW + "px";
      c.style.marginRight = GAP + "px";
    });
  }

  function totalSlides() {
    return Math.ceil(cards.length / perView);
  }

  function buildDots() {
    const total = totalSlides();
    const MAX = 5;
    const count = Math.min(total, MAX);
    let winStart = current - Math.floor(count / 2);
    winStart = Math.max(0, Math.min(winStart, total - count));
    dotsEl.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const slideIdx = winStart + i;
      const dist = Math.abs(slideIdx - current);
      const size = dist === 0 ? 8 : dist === 1 ? 6 : 4;
      const opacity = dist === 0 ? 1 : dist === 1 ? 0.6 : 0.35;
      const d = document.createElement("button");
      d.className = "carousel-dot" + (slideIdx === current ? " active" : "");
      d.style.width = size + "px";
      d.style.height = size + "px";
      d.style.opacity = opacity;
      d.setAttribute("aria-label", "Slide " + (slideIdx + 1));
      d.addEventListener("click", () => goTo(slideIdx));
      dotsEl.appendChild(d);
    }
  }

  function goTo(idx) {
    const total = totalSlides();
    current = ((idx % total) + total) % total;
    track.style.transform = `translateX(-${current * perView * (cardW + GAP)}px)`;
    buildDots();
  }

  function init() {
    setCardWidths();
    if (current >= totalSlides()) current = 0;
    buildDots();
    goTo(current);
  }

  prev.addEventListener("click", () => goTo(current - 1));
  next.addEventListener("click", () => goTo(current + 1));
  new ResizeObserver(() => requestAnimationFrame(init)).observe(wrap);
  init();

  // Touch/swipe
  let startX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener("touchend", (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });
})();

// ── Carrossel Casos Clínicos
(function () {
  const wrap = document.querySelector(".casos-carousel-wrap");
  const track = document.getElementById("casosTrack");
  const prev = document.getElementById("casosPrev");
  const next = document.getElementById("casosNext");
  const dotsEl = document.getElementById("casosDots");
  if (!track) return;

  const GAP = 24;
  const cards = Array.from(track.children);
  let current = 0;
  let perView = 3;
  let cardW = 0;

  function getPerView() {
    return window.innerWidth <= 700 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  }

  function setCardWidths() {
    perView = getPerView();
    const wrapW = wrap.clientWidth;
    cardW = (wrapW - GAP * (perView - 1)) / perView;
    cards.forEach((c) => {
      c.style.width = cardW + "px";
      c.style.minWidth = cardW + "px";
      c.style.marginRight = GAP + "px";
    });
  }

  function totalSlides() {
    return Math.ceil(cards.length / perView);
  }

  function buildDots() {
    const total = totalSlides();
    const MAX = 5;
    const count = Math.min(total, MAX);
    let winStart = current - Math.floor(count / 2);
    winStart = Math.max(0, Math.min(winStart, total - count));
    dotsEl.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const slideIdx = winStart + i;
      const dist = Math.abs(slideIdx - current);
      const size = dist === 0 ? 8 : dist === 1 ? 6 : 4;
      const opacity = dist === 0 ? 1 : dist === 1 ? 0.6 : 0.35;
      const d = document.createElement("button");
      d.className = "carousel-dot" + (slideIdx === current ? " active" : "");
      d.style.width = size + "px";
      d.style.height = size + "px";
      d.style.opacity = opacity;
      d.setAttribute("aria-label", "Slide " + (slideIdx + 1));
      d.addEventListener("click", () => goTo(slideIdx));
      dotsEl.appendChild(d);
    }
  }

  function goTo(idx) {
    const total = totalSlides();
    current = ((idx % total) + total) % total;
    track.style.transform = `translateX(-${current * perView * (cardW + GAP)}px)`;
    buildDots();
  }

  function init() {
    setCardWidths();
    if (current >= totalSlides()) current = 0;
    buildDots();
    goTo(current);
  }

  prev.addEventListener("click", () => goTo(current - 1));
  next.addEventListener("click", () => goTo(current + 1));
  new ResizeObserver(() => requestAnimationFrame(init)).observe(wrap);
  init();

  // Touch/swipe
  let startX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener("touchend", (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });
})();

// ── Accordion
document.querySelectorAll(".accordion-trigger").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".accordion-item");
    const isOpen = item.classList.contains("open");
    document
      .querySelectorAll(".accordion-item")
      .forEach((i) => i.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

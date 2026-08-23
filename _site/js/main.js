// Thema: standaard op systeemvoorkeur, wisselen via de knop (geen opslag-API's gebruikt)
(function () {
  var root = document.documentElement;
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');

  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      root.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    });
  }
})();

// Werkgroep-kaarten laten verschijnen tijdens scrollen
(function () {
  var cards = document.querySelectorAll('.article-card');
  if (!cards.length) return;
  if (!('IntersectionObserver' in window)) {
    cards.forEach(function (c) { c.classList.add('in-view'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  cards.forEach(function (c) { io.observe(c); });
})();

// Contactformulier: voorkomt echte verzending (statische demo)
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = e.target.querySelector('.submit-btn');
    var original = btn.textContent;
    btn.textContent = 'Verzonden ✓';
    setTimeout(function () {
      btn.textContent = original;
      e.target.reset();
    }, 2200);
  });
})();

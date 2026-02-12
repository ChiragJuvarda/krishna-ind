(function() {
  const STORAGE_KEY = 'theme-preference';
  const CLASS = 'theme-black';

  function applyTheme(value) {
    if (value === 'black') {
      document.documentElement.classList.add(CLASS);
      // also apply to header/footer wrappers so per-section color classes get overridden
      document.querySelectorAll('.header-wrapper, .footer-wrapper, footer, .site-footer').forEach(el => el.classList.add(CLASS));
    } else {
      document.documentElement.classList.remove(CLASS);
      document.querySelectorAll('.header-wrapper, .footer-wrapper, footer, .site-footer').forEach(el => el.classList.remove(CLASS));
    }
  }

  function toggleTheme() {
    const current = localStorage.getItem(STORAGE_KEY) || 'white';
    const next = current === 'black' ? 'white' : 'black';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    // update toggle buttons state (if multiple)
    document.querySelectorAll('.theme-toggle-button').forEach(btn => {
      btn.setAttribute('aria-pressed', next === 'black');
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    // on load, apply stored theme
    const pref = localStorage.getItem(STORAGE_KEY) || 'white';
    applyTheme(pref);

    // attach handler to any toggle buttons
    document.querySelectorAll('.theme-toggle-button').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleTheme();
      });
      // set initial pressed state
      btn.setAttribute('aria-pressed', pref === 'black');
    });
  });
})();

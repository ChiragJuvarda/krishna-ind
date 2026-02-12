(function() {
  const STORAGE_KEY = 'theme-preference';
  const CLASS = 'theme-black';

  function applyTheme(value) {
    if (value === 'black') {
      document.documentElement.classList.add(CLASS);
      // also apply to header/footer wrappers so per-section color classes get overridden
      document.querySelectorAll('.header-wrapper, .footer-wrapper, footer, .site-footer').forEach(el => el.classList.add(CLASS));
      // add dark-theme body class for CSS-based switch visuals
      document.body.classList.add('dark-theme');
      // update any theme toggle icons
      document.querySelectorAll('#theme-toggle').forEach(icon => {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      });
    } else {
      document.documentElement.classList.remove(CLASS);
      document.querySelectorAll('.header-wrapper, .footer-wrapper, footer, .site-footer').forEach(el => el.classList.remove(CLASS));
      document.body.classList.remove('dark-theme');
      document.querySelectorAll('#theme-toggle').forEach(icon => {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      });
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

    // attach handler to any toggle buttons (and animate the inner icon)
    document.querySelectorAll('.theme-toggle-button').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        // animate inner icon when present
        const inner = btn.querySelector('#theme-toggle');
        if (inner) {
          inner.classList.toggle('fa-moon'); // optimistic toggle for instant change
          inner.classList.add('animate-toggle');
          setTimeout(() => inner.classList.remove('animate-toggle'), 600);
        }
        toggleTheme();
      });
      // set initial pressed state and icon
      btn.setAttribute('aria-pressed', pref === 'black');
      const inner = btn.querySelector('#theme-toggle');
      if (inner) {
        if (pref === 'black') {
          inner.classList.remove('fa-sun');
          inner.classList.add('fa-moon');
        } else {
          inner.classList.remove('fa-moon');
          inner.classList.add('fa-sun');
        }
      }
    });
  });
})();

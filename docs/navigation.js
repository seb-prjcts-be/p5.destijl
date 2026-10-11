(() => {
  const script = document.currentScript;
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = new URL('navigation.css', script.src).href;
  document.head.append(stylesheet);

  const narrow = matchMedia('(max-width: 760px)');
  document.querySelectorAll('nav.study-nav').forEach((nav, index) => {
    if (!nav.querySelector('a[href$="bauteile.html"]')) {
      const parts = document.createElement('a');
      parts.href = new URL('bauteile.html', script.src).href;
      parts.textContent = 'Bauteile';
      const examples = nav.querySelector('a[href$="examples.html"]');
      if (examples) examples.after(parts);
      else nav.append(parts);
    }
    const wrapper = document.createElement('div');
    wrapper.className = 'site-navigation';
    nav.before(wrapper);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'nav-toggle';
    button.innerHTML = '<span aria-hidden="true">☰</span><span>Menu</span>';
    nav.id ||= `site-menu-${index}`;
    button.setAttribute('aria-controls', nav.id);
    wrapper.append(button, nav);

    function close(returnFocus = false) {
      wrapper.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      if (returnFocus) button.focus();
    }
    close();
    button.addEventListener('click', () => {
      const open = wrapper.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(open));
    });
    wrapper.addEventListener('keydown', event => {
      if (event.key === 'Escape' && narrow.matches) close(true);
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a') && narrow.matches) close(true);
    });
    narrow.addEventListener('change', () => {
      const focusWasInNav = nav.contains(document.activeElement);
      close(narrow.matches && focusWasInNav);
      if (!narrow.matches && document.activeElement === button) nav.querySelector('a')?.focus();
    });
  });
})();

// CodeMirror 5.65.21, Elegant. Highlight code without creating an editor.
(() => {
  const base = new URL('../vendor/codemirror/', document.currentScript.src);
  const theme = document.createElement('link');
  theme.rel = 'stylesheet';
  theme.href = new URL('elegant.css', base);
  document.head.append(theme);
  function load(name) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = new URL(name, base);
      script.onload = resolve;
      script.onerror = reject;
      document.head.append(script);
    });
  }
  const rendered = new WeakMap();
  function highlight(pre) {
    const code = pre.querySelector('code') || pre;
    if (!code.textContent.trim()) return;
    const source = code.textContent;
    if (rendered.get(code) === source && pre.classList.contains('cm-s-elegant')) return;
    rendered.set(code, source);
    pre.classList.add('cm-s-elegant');
    const mode = code.classList.contains('language-html') || source.trimStart().startsWith('<') ? 'text/html' : 'javascript';
    CodeMirror.runMode(source, mode, code, { tabSize: 2 });
  }
  async function start() {
    try {
      await load('runmode.js');
      await load('javascript.js');
      await load('xml.js');
      document.querySelectorAll('pre').forEach(highlight);
      new MutationObserver(() => document.querySelectorAll('pre').forEach(highlight))
        .observe(document.body, { childList: true, subtree: true, characterData: true });
      document.addEventListener('merz:source-loaded', event => {
        const pre = event.target.closest('pre');
        if (pre) highlight(pre);
      });
    } catch (error) {
      // The original code remains readable if highlighting cannot load.
      console.warn('Code highlighting could not load.', error);
    }
  }
  start();
})();

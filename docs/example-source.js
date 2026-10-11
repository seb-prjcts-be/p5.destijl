// Show the same source file that the example runs, with a button to copy it.
(async () => {
  for (const code of document.querySelectorAll("code[data-source]")) {
    try {
      const response = await fetch(code.dataset.source);
      if (!response.ok) throw new Error("Source could not load.");
      code.textContent = await response.text();
      code.dispatchEvent(new Event('merz:source-loaded', { bubbles: true }));
      const pre = code.closest('pre');
      if (pre && navigator.clipboard) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'copy-source';
        button.textContent = 'Copy sketch';
        button.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(code.textContent);
            button.textContent = 'Copied';
          } catch {
            button.textContent = 'Could not copy';
          }
          setTimeout(() => { button.textContent = 'Copy sketch'; }, 2000);
        });
        pre.before(button);
      }
    } catch (error) {
      code.textContent = "Open the source sketch using the link above.";
    }
  }
})();

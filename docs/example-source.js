// Show the same source file that the example runs.
(async () => {
  for (const code of document.querySelectorAll("code[data-source]")) {
    try {
      const response = await fetch(code.dataset.source);
      if (!response.ok) throw new Error("Source could not load.");
      code.textContent = await response.text();
      if (window.Prism) Prism.highlightElement(code);
    } catch (error) {
      code.textContent = "Open the source sketch using the link above.";
    }
  }
})();

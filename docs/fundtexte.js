(() => {
  const list = document.getElementById('text-list');
  const status = document.getElementById('text-status');
  const find = document.getElementById('text-find');
  const kind = document.getElementById('text-kind');
  const issue = document.getElementById('text-issue');
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  let items = [];
  function render() {
    const query = normalize(find.value.trim());
    const shown = items.filter(item => (kind.value === 'all' || item.kind === kind.value) &&
      (issue.value === 'all' || item.sources.some(source => source.issue === issue.value)) &&
      normalize(item.id + ' ' + item.text).includes(query));
    status.textContent = `${shown.length} of ${items.length} texts`;
    const fragment = document.createDocumentFragment();
    for (const item of shown) {
      const card = document.createElement('article');
      card.className = 'text-card';
      const label = document.createElement('p'); label.className = 'hint'; label.textContent = `${item.id} / ${item.kind}`;
      const text = document.createElement('p'); text.className = 'found-text'; text.textContent = item.text;
      const button = document.createElement('button'); button.type = 'button'; button.textContent = 'Copy text';
      button.setAttribute('aria-label', `Copy ${item.id}`);
      button.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(item.text); button.textContent = 'Copied'; }
        catch { button.textContent = 'Select the text to copy'; }
      });
      const sources = document.createElement('ul');
      for (const source of item.sources) {
        const row = document.createElement('li');
        const link = document.createElement('a'); link.href = source.url;
        link.textContent = `Merz ${source.issue}, ${source.page}`; row.append(link); sources.append(row);
      }
      const details = document.createElement('details');
      const summary = document.createElement('summary'); summary.textContent = 'Drawing call';
      const pre = document.createElement('pre');
      const code = document.createElement('code'); code.textContent = `Merz.stempel(${JSON.stringify(item.text)}, 40, 100);`;
      pre.append(code); details.append(summary, pre);
      card.append(label, text, button, sources, details); fragment.append(card);
    }
    list.replaceChildren(fragment);
  }
  find.addEventListener('input', render); kind.addEventListener('change', render); issue.addEventListener('change', render);
  fetch('../assets/fundsachen/texts/catalogue.json').then(response => {
    if (!response.ok) throw new Error('Text catalogue could not load.');
    return response.json();
  }).then(data => { items = data; render(); }).catch(error => { status.textContent = error.message; });
})();

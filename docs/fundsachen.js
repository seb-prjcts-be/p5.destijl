const items = Merz.fundsachen.list();
const grid = document.getElementById('catalogue');
const icons = {
  download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></svg>',
  copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="1"/><path d="M16 8V3H3v13h5"/></svg>',
  info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 10v7M12 6v1"/></svg>'
};
function selectedVariant(item) {
  const variant=document.getElementById('variant').value;
  return variant==='svg'&&!item.svgFile?'ink':variant;
}
function selectedFile(item) {
  return {ink:item.inkFile,scan:item.file,svg:item.svgFile}[selectedVariant(item)];
}
function snippetFor(item) {
  const local = document.getElementById('usage').value === 'download';
  const variant=selectedVariant(item);
  if (!local && variant === 'ink') return `await Merz.fundsachen('${item.id}', 40, 40, 140);`;
  return `const piece = await Merz.fundsachen('${item.name}'${local ? `, {\n  url: '${selectedFile(item)}'\n}` : variant==='ink'?'':`, { variant: '${variant}' }`});\nMerz.stempel(piece, [{ x: 40, y: 40 }]);`;
}
for (const item of items) {
  const card = document.createElement('section');
  card.className = 'found-card'; card.id = item.name;
  card.dataset.search = `${item.id} ${item.name} ${item.label} ${item.issue}`.toLowerCase();
  card.dataset.category = item.category;
  const preview = document.createElement('div'); preview.className = 'found-preview';
  const image = document.createElement('img'); image.src = '../assets/fundsachen/' + selectedFile(item);
  image.alt = item.label + ' from ' + item.page; image.width = item.width; image.height = item.height;
  image.loading = 'lazy';
  preview.append(image); card.append(preview);
  const comparison=document.createElement('details');
  const summary=document.createElement('summary');summary.textContent=item.svgFile?'Compare PNG, SVG and scan':'Compare PNG and scan';comparison.append(summary);
  const versions=document.createElement('div');versions.className='version-grid';
  for(const [label,file] of [['PNG',item.inkFile],['SVG',item.svgFile],['Scan',item.file]]){
    if(!file)continue;
    const figure=document.createElement('figure'),frame=document.createElement('div');frame.className='found-preview';
    const sample=document.createElement('img');sample.src='../assets/fundsachen/'+file;sample.alt=item.label+' / '+label;sample.loading='lazy';frame.append(sample);
    const caption=document.createElement('figcaption');caption.textContent=label;figure.append(frame,caption);versions.append(figure);
  }
  comparison.append(versions);card.append(comparison);
  const heading = document.createElement('h2'); heading.textContent = item.id + ' / ' + item.label; card.append(heading);
  const name = document.createElement('code'); name.textContent = item.name; card.append(name);
  const details = document.createElement('p'); details.textContent = `${item.width} × ${item.height} px · `;
  const source = document.createElement('a'); source.href = item.source; source.textContent = item.page; details.append(source); card.append(details);
  const credit = document.createElement('p'); credit.textContent = item.credit; card.append(credit);
  const download = document.createElement('a'); download.href = image.src;
  download.download = selectedFile(item); download.className = 'download'; download.innerHTML = icons.download;
  download.title = 'Download PNG';
  download.setAttribute('aria-label', 'Download PNG for ' + item.id); card.append(download);
  const code = document.createElement('pre'); code.textContent = snippetFor(item); card.append(code);
  const button = document.createElement('button'); button.type = 'button'; button.innerHTML = icons.copy; button.title = 'Copy drawing call';
  button.setAttribute('aria-label', 'Copy code for ' + item.id);
  button.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(snippetFor(item)); document.getElementById('copy-status').textContent = 'Copied ' + item.id + '.'; }
    catch { document.getElementById('copy-status').textContent = 'Select and copy the code shown on the card.'; }
  });
  const actions = document.createElement('div'); actions.className = 'found-actions';
  actions.append(download, button);
  const info = document.createElement('details'); info.className = 'found-info';
  const infoTitle = document.createElement('summary'); infoTitle.innerHTML = icons.info;
  infoTitle.title = 'Code and source'; infoTitle.setAttribute('aria-label', 'Code and source for ' + item.id);
  info.append(infoTitle, code, name, details, credit, comparison);
  card.append(actions, info); grid.append(card);
  document.getElementById('usage').addEventListener('change', () => { code.textContent = snippetFor(item); });
  document.getElementById('variant').addEventListener('change', () => {
    const file=selectedFile(item),format=file.endsWith('.svg')?'SVG':'PNG';
    image.src='../assets/fundsachen/'+file;download.href=image.src;download.download=file;
    download.title='Download '+format;download.setAttribute('aria-label','Download '+format+' for '+item.id);
    code.textContent=snippetFor(item);
  });
}
function filter() {
  const query = document.getElementById('find').value.trim().toLowerCase();
  const category = document.getElementById('category').value; let count = 0;
  for (const card of grid.children) { card.hidden = !card.dataset.search.includes(query) || (category !== 'all' && card.dataset.category !== category); if (!card.hidden) count++; }
  document.getElementById('count').textContent = count ? `${count} of ${items.length} items` : 'No matching items.';
}
document.getElementById('find').addEventListener('input', filter); filter();
document.getElementById('category').addEventListener('change', filter);
document.getElementById('ground').addEventListener('change', e => { grid.dataset.ground=e.target.value; });

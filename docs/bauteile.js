(() => {
  const base = new URL('../', document.currentScript.src);
  // This same source is displayed and run in a separate global-mode sketch.
  const examples = [
    ['satz', 'A geometric letter', "Merz.satz('R', 150, 100);"],
    ['bauteile', 'The parts of a letter', "Merz.bauteile('R', 150, 100);"],
    ['bauteil', 'One letter part', "Merz.bauteil('R', 'bowl', 150, 100);"],
    ['ausschnitt', 'A rectangular cut', "Merz.ausschnitt('R', 150, 120);"],
    ['rundschnitt', 'An oval cut', "Merz.rundschnitt('R', 150, 100);"],
    ['schnitt', 'A cut with three points', "Merz.schnitt('R', 150, 100);"],
    ['splitter', 'A letter in strips', "Merz.splitter('R', 150, 90);"],
    ['riss', 'A torn edge', "Merz.riss('R', 150, 100);"],
    ['andruck', 'A printed surface', "Merz.andruck('R', 150, 100);"],
    ['stempel', 'A text stamp', "Merz.stempel('Merz', 150, 150);"]
  ];
  const list = document.getElementById('bauteile-list');
  for (const [name, title, body] of examples) {
    const source = `function setup() {\n  createCanvas(400, 300);\n  noLoop();\n  background(Merz.farbe.grau);\n\n${body.split('\n').map(line => '  ' + line).join('\n')}\n}`;
    const section = document.createElement('section');
    section.id = name;
    const heading = document.createElement('h2');
    heading.textContent = title;
    const table = document.createElement('table');
    table.className = 'bauteile-table';
    table.setAttribute('aria-label', `${title}: code and object`);
    table.innerHTML = '<thead><tr><th scope="col">Code</th><th scope="col">Object</th></tr></thead><tbody><tr><td><pre><code class="language-javascript"></code></pre></td><td></td></tr></tbody>';
    table.querySelector('code').textContent = source;
    const frame = document.createElement('iframe');
    frame.title = title;
    frame.loading = 'eager';
    frame.srcdoc = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>html,body{margin:0;height:100%;background:#f7f7f2}body{display:grid;place-items:center}canvas{display:block;max-width:100%;height:auto!important}</style><script defer src="${new URL('vendor/p5-2.3.4.min.js', base)}"></script><script defer src="${new URL('p5.merz.js?v=direct-1', base)}"></script></head><body><script>${source}</script></body></html>`;
    table.querySelector('tbody td:last-child').append(frame);
    const link = document.createElement('a');
    link.href = `guide.html#${['satz', 'bauteile', 'bauteil'].includes(name) ? 'geometry' : ['ausschnitt', 'rundschnitt', 'schnitt', 'riss'].includes(name) ? 'fragments' : name === 'andruck' ? 'surface' : name}`;
    link.textContent = `Merz.${name}() reference`;
    const note = document.createElement('p');
    note.className = 'hint';
    note.append(link);
    section.append(heading, table, note);
    list.append(section);
  }
})();

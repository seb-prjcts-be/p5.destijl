const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const path = require('node:path');
const folder = path.resolve('assets/fundsachen/texts');
const sources = JSON.parse(fs.readFileSync(path.join(folder, 'sources.json'), 'utf8'));
const items = JSON.parse(fs.readFileSync(path.join(folder, 'catalogue.json'), 'utf8'));
const coverage = JSON.parse(fs.readFileSync(path.join(folder, 'coverage.json'), 'utf8'));
assert.equal(sources.length, 121);
assert.equal(coverage.length, sources.length);
assert.deepEqual([...new Set(sources.map(s => s.issue))].sort(), ['1','2','20','21','4','6','7','8/9']);
assert.equal(new Set(items.map(item => item.id)).size, items.length);
assert.equal(new Set(items.map(item => item.text)).size, items.length);
for (const source of sources) {
  assert.ok(source.source.startsWith('https://sdrc.lib.uiowa.edu/dada/merz/'));
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(folder, source.file))).digest('hex'), source.sha256);
  assert.ok(fs.existsSync(path.join(folder, source.image)));
}
const sourceMap = new Map(sources.map(s => [s.id, s]));
for (const item of items) {
  assert.match(item.id, /^T\d{3,}$/);
  assert.ok(item.text.trim() && !item.text.includes('\ufffd'));
  assert.ok(['word','phrase','sentence','sound'].includes(item.kind));
  assert.ok(item.sources.length);
  for (const source of item.sources) {
    const original = sourceMap.get(source.id);
    assert.ok(original, source.id);
    assert.equal(source.url, original.source);
    assert.equal(source.page, original.page);
    assert.equal(source.issue, original.issue);
  }
}
const readable = fs.readFileSync(path.join(folder, 'fundtexte.txt'), 'utf8');
assert.ok(items.every(item => readable.includes(item.id) && readable.includes(item.text)));
console.log(`Fundtexte: ${items.length} unique texts, preserved PDF hashes, valid source references and readable export checked.`);

const fs = require('node:fs');
const file = 'p5.merz.js';
const source = fs.readFileSync(file, 'utf8');
const items = JSON.parse(fs.readFileSync('assets/fundsachen/catalogue.json', 'utf8'));
for (const key of ['id', 'name', 'file']) {
  if (new Set(items.map(item => item[key])).size !== items.length) throw new Error('Duplicate Fundsachen ' + key);
}
const marker = /  \/\/ BEGIN FUNDSACHEN CATALOGUE[\s\S]*?  \/\/ END FUNDSACHEN CATALOGUE/;
if (!marker.test(source)) throw new Error('Missing Fundsachen catalogue markers');
const replacement = '  // BEGIN FUNDSACHEN CATALOGUE\n  const foundItems = ' + JSON.stringify(items, null, 2) + '.map(item=>Object.freeze({...item,crop:Object.freeze(item.crop)}));\n  // END FUNDSACHEN CATALOGUE';
fs.writeFileSync(file, source.replace(marker, replacement));
console.log('Updated the embedded Fundsachen catalogue.');

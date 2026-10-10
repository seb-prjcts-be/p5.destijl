const assert=require('node:assert/strict'),fs=require('node:fs');
const expected=fs.readdirSync('tests').filter(name=>name.endsWith('-browser.html')&&name!=='run-browser.html').sort();
const cases=JSON.parse(fs.readFileSync('tests/browser-cases.json','utf8'));
assert.deepEqual(cases.filter(name=>!name.includes('?')).sort(),expected);
assert.ok(cases.includes('audit-browser.html?min=1'));
assert.equal(new Set(cases).size,cases.length);
console.log('Browser runner manifest includes every browser test and both audit builds.');

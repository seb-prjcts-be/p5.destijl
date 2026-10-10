const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const script = fs.readFileSync('tools/build-min.cjs', 'utf8');
const source = fs.readFileSync('p5.merz.js', 'utf8');
const catalogue = fs.readFileSync('assets/fundsachen/catalogue.json', 'utf8');
async function run(registry) {
  const writes = [], errors = [];
  const process = { exitCode: 0 };
  const context = {
    process,
    console: { log() {}, error(error) { errors.push(error.message); } },
    require(name) {
      if (name === 'terser') return { minify: async () => ({ code: 'minified' }) };
      assert.equal(name, 'node:fs/promises');
      return {
        readFile: async name => name === 'p5.merz.js' ? source : registry,
        writeFile: async (...args) => writes.push(args)
      };
    }
  };
  await vm.runInNewContext(script, context);
  return { writes, errors, code: process.exitCode };
}
(async () => {
  const valid = await run(catalogue);
  assert.equal(valid.code, 0);
  assert.deepEqual(valid.writes, [['p5.merz.min.js', 'minified\n']]);
  const stale = JSON.parse(catalogue); stale[0].label += ' changed';
  const invalid = await run(JSON.stringify(stale));
  assert.equal(invalid.code, 1);
  assert.equal(invalid.writes.length, 0);
  assert.match(invalid.errors[0], /sync:fundsachen/);
  console.log('Build: only min output is written; stale catalogue stops before writing.');
})().catch(error => { console.error(error); process.exitCode = 1; });

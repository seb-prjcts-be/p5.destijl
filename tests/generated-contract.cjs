const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context=vm.createContext({createCanvas(){},noLoop(){}});
vm.runInContext(fs.readFileSync('p5.merz.js','utf8'),context);
vm.runInContext(fs.readFileSync('tests/generated-sketch.js','utf8'),context);
vm.runInContext('setup()',context);
assert.equal(vm.runInContext('work.items().length',context),5);
assert.equal(vm.runInContext('work.items().at(-1).text',context),'D V Q');
assert.ok(vm.runInContext('work.exportSVG()',context).includes('element-5'));
console.log('Code captured from the interactive page builds the expected composition.');

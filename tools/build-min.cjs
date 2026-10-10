const fs = require('node:fs/promises');
const { minify } = require('terser');
(async () => {
  let source = await fs.readFile('p5.merz.js', 'utf8');
  const items = JSON.parse(await fs.readFile('assets/fundsachen/catalogue.json', 'utf8'));
  for (const key of ['id','name','file']) if(new Set(items.map(item=>item[key])).size!==items.length) throw new Error('Duplicate Fundsachen '+key);
  const marker=/  \/\/ BEGIN FUNDSACHEN CATALOGUE[\s\S]*?  \/\/ END FUNDSACHEN CATALOGUE/;
  if(!marker.test(source))throw new Error('Missing Fundsachen catalogue markers');
  source=source.replace(marker,'  // BEGIN FUNDSACHEN CATALOGUE\n  const foundItems = '+JSON.stringify(items)+'.map(item=>Object.freeze({...item,crop:Object.freeze(item.crop)}));\n  // END FUNDSACHEN CATALOGUE');
  await fs.writeFile('p5.merz.js',source);
  const result = await minify(source, { format: { comments: /p5\.merz/ } });
  await fs.writeFile('p5.merz.min.js', result.code + '\n');
  console.log('Built p5.merz.min.js');
})().catch(error => { console.error(error); process.exitCode = 1; });

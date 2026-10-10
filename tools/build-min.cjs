const fs = require('node:fs/promises');
const { minify } = require('terser');
(async () => {
  let source = await fs.readFile('p5.merz.js', 'utf8');
  const items = JSON.parse(await fs.readFile('assets/fundsachen/catalogue.json', 'utf8'));
  for (const key of ['id','name','file']) if(new Set(items.map(item=>item[key])).size!==items.length) throw new Error('Duplicate Fundsachen '+key);
  const marker=/  \/\/ BEGIN FUNDSACHEN CATALOGUE[\s\S]*?  \/\/ END FUNDSACHEN CATALOGUE/;
  if(!marker.test(source))throw new Error('Missing Fundsachen catalogue markers');
  const embedded=source.match(/const foundItems = ([\s\S]*?)\.map\(item=>Object\.freeze/);
  if(!embedded||JSON.stringify(JSON.parse(embedded[1]))!==JSON.stringify(items))throw new Error('Fundsachen catalogue changed. Run npm run sync:fundsachen before building.');
  const result = await minify(source, { format: { comments: /p5\.merz/ } });
  await fs.writeFile('p5.merz.min.js', result.code + '\n');
  console.log('Built p5.merz.min.js');
})().catch(error => { console.error(error); process.exitCode = 1; });

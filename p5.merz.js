/* p5.merz 0.2.0 - Sebastien Vanblaere. MIT license.
 * Contemporary geometric lettering inspired by Theo van Doesburg.
 * Own redraws; not a historical font reconstruction.
 */
(function (root) {
  'use strict';
  const libraryURL = root.document?.currentScript?.src || root.location?.href;
  // BEGIN FUNDSACHEN CATALOGUE
  const foundItems = [{"id":"001","name":"merz-2-cover-m","label":"M","file":"merz-2-cover-m.png","width":70,"height":140,"crop":[10,55,70,140],"category":"letter","issue":"2","page":"Merz 2, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"../../experiments/merz-fragments/assets/merz-2-cover.jpg","inkFile":"merz-2-cover-m-ink.png","svgFile":"merz-2-cover-m.svg"},{"id":"002","name":"merz-2-cover-r","label":"R","file":"merz-2-cover-r.png","width":58,"height":140,"crop":[171,55,58,140],"category":"letter","issue":"2","page":"Merz 2, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"../../experiments/merz-fragments/assets/merz-2-cover.jpg","inkFile":"merz-2-cover-r-ink.png","svgFile":"merz-2-cover-r.svg"},{"id":"003","name":"merz-2-cover-rule","label":"Rule","file":"merz-2-cover-rule.png","width":282,"height":7,"crop":[12,30,282,7],"category":"rule","issue":"2","page":"Merz 2, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"../../experiments/merz-fragments/assets/merz-2-cover.jpg","inkFile":"merz-2-cover-rule-ink.png","svgFile":"merz-2-cover-rule.svg"},{"id":"004","name":"merz-2-cover-e","label":"E","file":"merz-2-cover-e.png","width":117,"height":377,"crop":[282,145,117,377],"category":"letter","issue":"2","page":"Merz 2, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-2-cover.png","inkFile":"merz-2-cover-e-ink.png","svgFile":"merz-2-cover-e.svg"},{"id":"005","name":"merz-2-cover-z","label":"Z","file":"merz-2-cover-z.png","width":133,"height":380,"crop":[670,146,133,380],"category":"letter","issue":"2","page":"Merz 2, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-2-cover.png","inkFile":"merz-2-cover-z-ink.png","svgFile":"merz-2-cover-z.svg"},{"id":"006","name":"merz-2-cover-two","label":"2","file":"merz-2-cover-two.png","width":122,"height":167,"crop":[25,535,122,167],"category":"number","issue":"2","page":"Merz 2, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-2-cover.png","inkFile":"merz-2-cover-two-ink.png","svgFile":"merz-2-cover-two.svg"},{"id":"007","name":"merz-2-cover-nummer","label":"NUMMER","file":"merz-2-cover-nummer.png","width":523,"height":80,"crop":[27,748,523,80],"category":"word","issue":"2","page":"Merz 2, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-2-cover.png","inkFile":"merz-2-cover-nummer-ink.png"},{"id":"008","name":"merz-2-cover-i","label":"i","file":"merz-2-cover-i.png","width":260,"height":266,"crop":[552,572,260,266],"category":"letter","issue":"2","page":"Merz 2, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-2-cover.png","inkFile":"merz-2-cover-i-ink.png","svgFile":"merz-2-cover-i.svg"},{"id":"009","name":"merz-2-cover-boat","label":"Boat","file":"merz-2-cover-boat.png","width":232,"height":190,"crop":[18,841,232,190],"category":"image","issue":"2","page":"Merz 2, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-2-cover.png","inkFile":"merz-2-cover-boat-ink.png"},{"id":"010","name":"merz-2-cover-hand","label":"Pointing hand","file":"merz-2-cover-hand.png","width":94,"height":217,"crop":[19,1039,94,217],"category":"image","issue":"2","page":"Merz 2, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-2-cover.png","inkFile":"merz-2-cover-hand-ink.png"},{"id":"011","name":"merz-2-cover-april-1923","label":"APRIL 1923","file":"merz-2-cover-april-1923.png","width":228,"height":45,"crop":[125,1126,228,45],"category":"text","issue":"2","page":"Merz 2, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-2-cover.png","inkFile":"merz-2-cover-april-1923-ink.png"},{"id":"012","name":"merz-2-17-i","label":"i","file":"merz-2-17-i.png","width":315,"height":249,"crop":[115,22,315,249],"category":"letter","issue":"2","page":"Merz 2, page 17","source":"https://sdrc.lib.uiowa.edu/dada/merz/2/pages/17.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-2-17.png","inkFile":"merz-2-17-i-ink.png","svgFile":"merz-2-17-i.svg"},{"id":"013","name":"merz-2-17-seventeen","label":"17","file":"merz-2-17-seventeen.png","width":100,"height":94,"crop":[691,72,100,94],"category":"number","issue":"2","page":"Merz 2, page 17","source":"https://sdrc.lib.uiowa.edu/dada/merz/2/pages/17.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-2-17.png","inkFile":"merz-2-17-seventeen-ink.png","svgFile":"merz-2-17-seventeen.svg"},{"id":"014","name":"merz-2-17-kuenstler","label":"Künstler","file":"merz-2-17-kuenstler.png","width":135,"height":42,"crop":[380,1104,135,42],"category":"word","issue":"2","page":"Merz 2, page 17","source":"https://sdrc.lib.uiowa.edu/dada/merz/2/pages/17.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-2-17.png","inkFile":"merz-2-17-kuenstler-ink.png"},{"id":"015","name":"merz-2-17-gestempelt","label":"gestempelt","file":"merz-2-17-gestempelt.png","width":112,"height":35,"crop":[257,977,112,35],"category":"word","issue":"2","page":"Merz 2, page 17","source":"https://sdrc.lib.uiowa.edu/dada/merz/2/pages/17.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-2-17.png","inkFile":"merz-2-17-gestempelt-ink.png"},{"id":"016","name":"merz-8-cover-m","label":"M","file":"merz-8-cover-m.png","width":159,"height":319,"crop":[244,91,159,319],"category":"letter","issue":"8/9","page":"Merz 8/9, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-8-cover.png","inkFile":"merz-8-cover-m-ink.png","svgFile":"merz-8-cover-m.svg"},{"id":"017","name":"merz-8-cover-e","label":"E","file":"merz-8-cover-e.png","width":105,"height":320,"crop":[452,91,105,320],"category":"letter","issue":"8/9","page":"Merz 8/9, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-8-cover.png","inkFile":"merz-8-cover-e-ink.png","svgFile":"merz-8-cover-e.svg"},{"id":"018","name":"merz-8-cover-r","label":"R","file":"merz-8-cover-r.png","width":136,"height":321,"crop":[601,90,136,321],"category":"letter","issue":"8/9","page":"Merz 8/9, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-8-cover.png","inkFile":"merz-8-cover-r-ink.png","svgFile":"merz-8-cover-r.svg"},{"id":"019","name":"merz-8-cover-z","label":"Z","file":"merz-8-cover-z.png","width":115,"height":319,"crop":[773,92,115,319],"category":"letter","issue":"8/9","page":"Merz 8/9, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-8-cover.png","inkFile":"merz-8-cover-z-ink.png","svgFile":"merz-8-cover-z.svg"},{"id":"020","name":"merz-8-cover-eight","label":"8","file":"merz-8-cover-eight.png","width":140,"height":208,"crop":[78,202,140,208],"category":"number","issue":"8/9","page":"Merz 8/9, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-8-cover.png","inkFile":"merz-8-cover-eight-ink.png","svgFile":"merz-8-cover-eight.svg"},{"id":"021","name":"merz-8-cover-nine","label":"9","file":"merz-8-cover-nine.png","width":135,"height":208,"crop":[906,203,135,208],"category":"number","issue":"8/9","page":"Merz 8/9, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-8-cover.png","inkFile":"merz-8-cover-nine-ink.png","svgFile":"merz-8-cover-nine.svg"},{"id":"022","name":"merz-8-cover-nasci","label":"NASCI","file":"merz-8-cover-nasci.png","width":344,"height":109,"crop":[693,566,344,109],"category":"word","issue":"8/9","page":"Merz 8/9, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-8-cover.png","inkFile":"merz-8-cover-nasci-ink.png"},{"id":"023","name":"merz-8-cover-natur","label":"NATUR","file":"merz-8-cover-natur.png","width":225,"height":59,"crop":[291,616,225,59],"category":"word","issue":"8/9","page":"Merz 8/9, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-8-cover.png","inkFile":"merz-8-cover-natur-ink.png"},{"id":"024","name":"merz-8-cover-kraft","label":"KRAFT","file":"merz-8-cover-kraft.png","width":251,"height":60,"crop":[291,1051,251,60],"category":"word","issue":"8/9","page":"Merz 8/9, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-8-cover.png","inkFile":"merz-8-cover-kraft-ink.png"},{"id":"025","name":"merz-8-cover-rule","label":"Blue rule","file":"merz-8-cover-rule.png","width":830,"height":22,"crop":[260,678,830,22],"category":"rule","issue":"8/9","page":"Merz 8/9, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-8-cover.png","inkFile":"merz-8-cover-rule-ink.png","svgFile":"merz-8-cover-rule.svg"},{"id":"026","name":"merz-8-cover-hand","label":"Pointing hand","file":"merz-8-cover-hand.png","width":54,"height":103,"crop":[79,1052,54,103],"category":"image","issue":"8/9","page":"Merz 8/9, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-8-cover.png","inkFile":"merz-8-cover-hand-ink.png"},{"id":"027","name":"merz-8-cover-1924","label":"1924","file":"merz-8-cover-1924.png","width":145,"height":48,"crop":[74,1339,145,48],"category":"number","issue":"8/9","page":"Merz 8/9, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-8-cover.png","inkFile":"merz-8-cover-1924-ink.png","svgFile":"merz-8-cover-1924.svg"},{"id":"028","name":"merz-8-cover-gestaltet","label":"GESTALTET UND BEWEGT","file":"merz-8-cover-gestaltet.png","width":745,"height":61,"crop":[293,1138,745,61],"category":"text","issue":"8/9","page":"Merz 8/9, cover","source":"https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm","credit":"International Dada Archive, University of Iowa Libraries","scan":"source-scans/merz-8-cover.png","inkFile":"merz-8-cover-gestaltet-ink.png"}].map(item=>Object.freeze({...item,crop:Object.freeze(item.crop)}));
  // END FUNDSACHEN CATALOGUE
  const foundImages = new WeakMap();
  async function fundsachen(id, options={}, p=root) {
    const key=typeof id==='number'&&Number.isInteger(id)?String(id).padStart(3,'0'):id;
    const item=foundItems.find(item=>item.id===key||item.name===key);
    if(!item)throw new RangeError('Unknown Fundsachen item: '+id);
    if(!p||typeof p.loadImage!=='function')throw new TypeError('fundsachen needs a p5 instance or globalThis');
    for(const key of Object.keys(options))if(!['baseURL','url','variant'].includes(key))throw new RangeError('Unknown Fundsachen option: '+key);
    const variant=options.variant??'ink';
    if(!['ink','scan','svg'].includes(variant))throw new RangeError('variant must be ink, scan or svg');
    const file={ink:item.inkFile,scan:item.file,svg:item.svgFile}[variant];
    if(!file)throw new RangeError('No '+variant+' variant for '+item.id);
    if(options.url!==undefined&&options.baseURL!==undefined)throw new TypeError('Choose url or baseURL');
    const base=options.baseURL??(libraryURL?new URL('assets/fundsachen/',libraryURL).href:null);
    if(!base&&options.url===undefined)throw new TypeError('Provide baseURL for the Fundsachen image folder');
    if(options.url!==undefined&&(typeof options.url!=='string'||!options.url.trim()))throw new TypeError('url must name an image file');
    const url=options.url===undefined?new URL(file,base).href:new URL(options.url,root.document?.baseURI||root.location?.href).href;
    let cache=foundImages.get(p);if(!cache){cache=new Map();foundImages.set(p,cache);}
    if(!cache.has(url)){
      const pending=Promise.resolve().then(()=>p.loadImage(url));cache.set(url,pending);
      pending.catch(()=>{if(cache.get(url)===pending)cache.delete(url);});
    }
    const image=await cache.get(url);
    return fragment(image,[[0,0],[image.width,0],[image.width,image.height],[0,image.height]]);
  }
  fundsachen.list=()=>foundItems.map(item=>({...item,crop:[...item.crop]}));
  Object.freeze(fundsachen);
  const L=.5,R=4.5,M=2.5,path=(...points)=>points;
  const glyphs = {
    A:[path([L,R],[L,L],[R,L],[R,R]),path([L,M],[R,M])],
    B:[path([L,R],[L,L],[R,L],[R,R],[L,R]),path([L,M],[R,M])],
    C:[path([R,L],[L,L],[L,R],[R,R])],
    D:[path([L,L],[3.5,L],[3.5,1.5],[R,1.5],[R,3.5],[3.5,3.5],[3.5,R],[L,R],[L,L])],
    E:[path([R,L],[L,L],[L,R],[R,R]),path([L,M],[R,M])],
    F:[path([L,R],[L,L],[R,L]),path([L,M],[R,M])],
    G:[path([R,L],[L,L],[L,R],[R,R],[R,M],[3,M])],
    H:[path([L,L],[L,R]),path([R,L],[R,R]),path([L,M],[R,M])],
    I:[path([M,L],[M,R])],J:[path([R,L],[R,R],[L,R])],
    K:[path([L,L],[L,R]),path([L,M],[R,M],[R,L]),path([3,M],[3,R])],
    L:[path([L,L],[L,R],[R,R])],
    M:[path([L,R],[L,L],[R,L],[R,R]),path([M,L],[M,3])],
    N:[path([L,R],[L,L],[R,L],[R,R])],
    O:[path([L,L],[R,L],[R,R],[L,R],[L,L])],
    P:[path([L,R],[L,L],[R,L],[R,M],[L,M])],
    Q:[path([L,L],[R,L],[R,R],[L,R],[L,L]),path([M,3.5],[M,R])],
    R:[path([L,R],[L,L],[R,L],[R,M],[L,M]),path([3,M],[3,R])],
    S:[path([R,L],[L,L],[L,M],[R,M],[R,R],[L,R])],
    T:[path([L,L],[R,L]),path([M,L],[M,R])],
    U:[path([L,L],[L,R],[R,R],[R,L])],
    V:[path([L,L],[L,3.5],[1.5,3.5],[1.5,R],[3.5,R],[3.5,3.5],[R,3.5],[R,L])],
    W:[path([L,L],[L,R],[R,R],[R,L]),path([M,2],[M,R])],
    X:[path([L,L],[1.5,L],[1.5,M],[3.5,M],[3.5,R],[R,R]),path([R,L],[3.5,L],[3.5,M],[1.5,M],[1.5,R],[L,R])],
    Y:[path([L,L],[L,M],[R,M],[R,L]),path([M,M],[M,R])],
    Z:[path([L,L],[R,L],[R,M],[L,M],[L,R],[R,R])]
  };
  // Contemporary extensions: numerals, punctuation and useful poster symbols.
  const dot=(x,y)=>path([x,y],[x+.06,y]);
  Object.assign(glyphs,{
    '0':[path([L,L],[R,L],[R,R],[L,R],[L,L]),path([M,1.9],[M,3.1])],
    '1':[path([1.5,1.5],[M,1.5],[M,L],[M,R]),path([1.5,R],[3.5,R])],
    '2':[path([L,1.5],[L,L],[R,L],[R,M],[L,M],[L,R],[R,R])],
    '3':[path([L,L],[R,L],[R,R],[L,R]),path([1.5,M],[R,M])],
    '4':[path([L,L],[L,M],[R,M]),path([R,L],[R,R])],
    '5':[path([R,L],[L,L],[L,2.1],[R,2.1],[R,R],[L,R])],
    '6':[path([R,L],[L,L],[L,R],[R,R],[R,M],[L,M])],
    '7':[path([L,L],[R,L],[R,1.5],[3.5,1.5],[3.5,M],[M,M],[M,R])],
    '8':[path([L,L],[R,L],[R,R],[L,R],[L,L]),path([L,M],[R,M])],
    '9':[path([R,R],[R,L],[L,L],[L,M],[R,M])],
    '.':[dot(.5,R)],',':[path([.9,3.7],[.9,R],[.5,R])],
    ':':[dot(.5,1.5),dot(.5,3.5)],';':[dot(.9,1.5),path([.9,3.5],[.9,R],[.5,R])],
    '!':[path([.5,L],[.5,2.8]),dot(.5,R)],
    '?':[path([L,1.5],[L,L],[3.5,L],[3.5,2],[2,2],[2,2.8]),dot(2,R)],
    "'":[path([.9,L],[.9,1.3],[.5,1.3])],
    '"':[path([.5,L],[.5,1.4]),path([1.8,L],[1.8,1.4])],
    '(':[path([1.5,L],[1.5,1.5],[.5,1.5],[.5,3.5],[1.5,3.5],[1.5,R])],
    ')':[path([.5,L],[.5,1.5],[1.5,1.5],[1.5,3.5],[.5,3.5],[.5,R])],
    '[':[path([1.5,L],[.5,L],[.5,R],[1.5,R])],
    ']':[path([.5,L],[1.5,L],[1.5,R],[.5,R])],
    '{':[path([2,L],[1,L],[1,M],[.5,M]),path([1,M],[1,R],[2,R])],
    '}':[path([.5,L],[1.5,L],[1.5,M],[2,M]),path([1.5,M],[1.5,R],[.5,R])],
    '-':[path([L,M],[2.5,M])],
    '–':[path([L,M],[3.5,M])],
    '—':[path([L,M],[R,M])],
    '_':[path([L,R],[R,R])],
    '+':[path([L,M],[R,M]),path([M,L],[M,R])],
    '=':[path([L,1.7],[R,1.7]),path([L,3.3],[R,3.3])],
    '/':[path([L,R],[L,3.5],[1.5,3.5],[1.5,M],[M,M],[M,1.5],[3.5,1.5],[3.5,L],[R,L])],
    '\\':[path([L,L],[1.5,L],[1.5,1.5],[M,1.5],[M,M],[3.5,M],[3.5,3.5],[R,3.5],[R,R])],
    '%':[path([L,L],[1.5,L],[1.5,1.5],[L,1.5],[L,L]),path([3.5,3.5],[R,3.5],[R,R],[3.5,R],[3.5,3.5]),path([L,R],[L,3],[M,3],[M,2],[R,2],[R,L])],
    '&':[path([R,R],[L,R],[L,M],[3.5,M],[3.5,L],[1.5,L],[1.5,3.5],[R,3.5])],
    '@':[path([R,R],[L,R],[L,L],[R,L],[R,3.2],[2,3.2],[2,1.8],[3.3,1.8],[3.3,3.2])],
    '#':[path([1.5,L],[1.5,R]),path([3.5,L],[3.5,R]),path([L,1.5],[R,1.5]),path([L,3.5],[R,3.5])],
    '*':[path([L,M],[R,M]),path([M,L],[M,R]),path([1.2,1.2],[1.2,M],[3.8,M],[3.8,3.8])],
    '<':[path([3.5,L],[3.5,1.5],[1.5,1.5],[1.5,3.5],[3.5,3.5],[3.5,R])],
    '>':[path([1.5,L],[1.5,1.5],[3.5,1.5],[3.5,3.5],[1.5,3.5],[1.5,R])],
    '|':[path([.5,L],[.5,R])],
    '€':[path([R,L],[1.5,L],[1.5,R],[R,R]),path([L,1.8],[3.5,1.8]),path([L,3.2],[3.5,3.2])],
    '$':[path([R,1],[L,1],[L,M],[R,M],[R,4],[L,4]),path([M,L],[M,R])],
    '£':[path([R,L],[1.5,L],[1.5,R],[R,R]),path([L,M],[3.5,M])],
    '°':[path([L,L],[2,L],[2,2],[L,2],[L,L])],
    '…':[dot(.5,R),dot(1.8,R),dot(3.1,R)],
    '•':[dot(.5,M)],
    '×':[path([L,L],[1.5,L],[1.5,M],[3.5,M],[3.5,R],[R,R]),path([R,L],[3.5,L],[3.5,M],[1.5,M],[1.5,R],[L,R])],
    '÷':[path([L,M],[R,M]),dot(M,L),dot(M,R)],
    '±':[path([L,2],[R,2]),path([M,L],[M,3.5]),path([L,R],[R,R])]
  });
  // Nominal frame widths, in grid units. Letters/digits retain their 5-unit frame.
  const advances={'.':1.2,',':1.5,':':1.2,';':1.5,'!':1.2,"'":1.5,'"':2.5,'(':2,')':2,'[':2,']':2,'{':2.5,'}':2.5,'-':3,'–':4,'—':5,'|':1.2,'°':2.5,'…':3.8,'•':1.2};
  const palette=Object.freeze({paper:'#f7f7f2',ink:'#20201e',red:'#b92d26',blue:'#234b92',yellow:'#e8bb32'});
  const copy=value=>JSON.parse(JSON.stringify(value));
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  function number(value,name,min=-Infinity){if(!Number.isFinite(value)||value<min)throw new RangeError(name+' must be a finite number >= '+min);return value;}
  function colour(value){if(typeof value!=='string'||!/^#[0-9a-f]{6}$/i.test(value))throw new TypeError('Use a six-digit hex colour, such as #234b92');return value;}
  function text(value){if(typeof value!=='string')throw new TypeError('Text must be a string');const result=value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/\r\n?/g,'\n').replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/[\u00a0\u202f]/g,' ');for(const c of result)if(c!==' '&&c!=='\n'&&!glyphs[c])throw new RangeError('Unsupported character: '+c);return result;}
  function geometry(value,options={}){
    const content=text(value), size=number(options.size??100,'size',1),weight=number(options.weight??.8,'weight',.05),proportion=number(options.proportion??1,'proportion',.55),spacing=number(options.spacing??12,'spacing',0),leading=number(options.leading??size*1.4,'leading',1);
    if(weight>1||proportion>1.35)throw new RangeError('weight <= 1 and proportion <= 1.35');
    const unit=size/5,paths=[];let x=0,y=0,maxWidth=0;
    for(const char of content){if(char==='\n'){maxWidth=Math.max(maxWidth,Math.max(0,x-spacing));x=0;y+=leading;continue;}if(char===' '){x+=size*.5+spacing;continue;}
      glyphs[char].forEach(points=>paths.push({points:points.map(([px,py])=>[x+px*unit*proportion,y+py*unit]),width:unit*weight}));x+=(advances[char]??5)*unit*proportion+spacing;
    }
    return {text:content,paths,width:Math.max(maxWidth,Math.max(0,x-spacing)),height:content?y+size:0};
  }
  function validate(item){
    for(const k of ['x','y','angle'])number(item[k],k);number(item.scale,'scale',.001);colour(item.color);
    if(item.type==='text')geometry(item.text,item);
    if(item.type==='line'){number(item.x2,'x2');number(item.y2,'y2');number(item.strokeWeight,'strokeWeight',.01);}
    if(item.type==='plane'){number(item.width,'width',.01);number(item.height,'height',.01);}
    return item;
  }
  const keys={text:['text','x','y','size','weight','proportion','spacing','leading','color','angle','scale'],line:['x','y','x2','y2','strokeWeight','color','angle','scale'],plane:['x','y','width','height','color','angle','scale']};
  class MerzComposition {
    constructor({width=600,height=600,background=palette.paper}={}){this.width=number(width,'width',1);this.height=number(height,'height',1);this.background=background===null?null:colour(background);this._items=[];this._next=1;}
    _add(type,properties){for(const key of Object.keys(properties))if(!keys[type].includes(key))throw new RangeError('Unknown option: '+key);const item=validate({type,x:0,y:0,angle:0,scale:1,color:palette.ink,...properties});item.id='element-'+this._next++;this._items.push(item);return item.id;}
    text(value,x,y,options={}){const content=text(value);return this._add('text',{text:content,x,y,size:100,weight:.8,proportion:1,spacing:12,...options});}
    letter(value,x,y,options={}){const content=text(value);if(content.length!==1||content===' '||content==='\n')throw new RangeError('letter() needs one supported character');return this.text(content,x,y,options);}
    line(x1,y1,x2,y2,options={}){return this._add('line',{x:x1,y:y1,x2:x2-x1,y2:y2-y1,strokeWeight:4,...options});}
    plane(x,y,width,height,options={}){return this._add('plane',{x,y,width,height,...options});}
    get(id){const item=this._items.find(i=>i.id===id);if(!item)throw new RangeError('Unknown id: '+id);return copy(item);}
    items(){return this._items.map(copy);}
    update(id,changes){const current=this.get(id);for(const key of Object.keys(changes))if(!keys[current.type].includes(key))throw new RangeError('Unknown option: '+key);const candidate=validate({...current,...changes});this._items[this._items.findIndex(i=>i.id===id)]=candidate;return this;}
    move(id,x,y){return this.update(id,{x,y});}
    remove(id){this.get(id);this._items=this._items.filter(i=>i.id!==id);return this;}
    bringToFront(id){const item=this.get(id);this.remove(id);this._items.push(item);return this;}
    sendToBack(id){const item=this.get(id);this.remove(id);this._items.unshift(item);return this;}
    clear(){this._items=[];return this;}
    draw(renderer=root){
      const p=renderer;if(typeof p.push!=='function')throw new TypeError('Pass a p5 renderer to draw()');
      p.push();try{
        // Drawing uses p5 coordinates and respects the user's outer transform.
        if(this.background!==null)p.background(this.background);
        // p5.Graphics in p5 2.x does not expose the instance constants.
        p.rectMode(p.CORNER ?? 'corner');p.strokeCap(p.PROJECT ?? 'square');p.strokeJoin(p.MITER ?? 'miter');
        for(const item of this._items){p.push();try{
          const a=item.angle*Math.PI/180;p.applyMatrix(Math.cos(a)*item.scale,Math.sin(a)*item.scale,-Math.sin(a)*item.scale,Math.cos(a)*item.scale,item.x,item.y);
          if(item.type==='plane'){p.noStroke();p.fill(item.color);p.rect(0,0,item.width,item.height);}
          else {p.noFill();p.stroke(item.color);if(item.type==='line'){p.strokeWeight(item.strokeWeight);p.line(0,0,item.x2,item.y2);}else for(const line of geometry(item.text,item).paths){p.strokeWeight(line.width);p.beginShape();line.points.forEach(v=>p.vertex(...v));p.endShape();}}
        }finally{p.pop();}}
      }finally{p.pop();}return this;
    }
    exportSVG({title='p5.merz composition'}={}){
      const shape=item=>{
        if(item.type==='plane')return `<rect width="${item.width}" height="${item.height}" fill="${item.color}"/>`;
        if(item.type==='line')return `<path d="M0 0 L${item.x2} ${item.y2}" fill="none" stroke="${item.color}" stroke-width="${item.strokeWeight}" stroke-linecap="square"/>`;
        return geometry(item.text,item).paths.map(line=>`<path d="${line.points.map((v,i)=>(i?'L':'M')+v.join(' ')).join(' ')}" fill="none" stroke="${item.color}" stroke-width="${line.width}" stroke-linecap="square" stroke-linejoin="miter"/>`).join('');
      };
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}" viewBox="0 0 ${this.width} ${this.height}"><title>${escape(title)}</title><defs><clipPath id="destijl-page"><rect width="${this.width}" height="${this.height}"/></clipPath></defs><g clip-path="url(#destijl-page)">`+(this.background===null?'':`<rect width="${this.width}" height="${this.height}" fill="${this.background}"/>`)+this._items.map(item=>`<g id="${item.id}" transform="translate(${item.x} ${item.y}) rotate(${item.angle}) scale(${item.scale})">${shape(item)}</g>`).join('')+'</g></svg>';
    }
    downloadSVG(filename='p5.merz.svg'){if(!root.document)throw new Error('downloadSVG() needs a browser');const url=URL.createObjectURL(new Blob([this.exportSVG()],{type:'image/svg+xml;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  }
  // Each entry names a source path, or an inclusive range of its points.
  // Stepped constructions stay together where a single bar would lose their shape.
  const descriptions = {
    A: [
      ["left-stem", 0, 0, 1],
      ["top-bar", 0, 1, 2],
      ["right-stem", 0, 2, 3],
      ["crossbar", 1]
    ],
    B: [
      ["outline", 0],
      ["crossbar", 1]
    ],
    C: [
      ["top-bar", 0, 0, 1],
      ["left-stem", 0, 1, 2],
      ["bottom-bar", 0, 2, 3]
    ],
    D: [
      ["stepped-bowl", 0, 0, 7],
      ["left-stem", 0, 7, 8]
    ],
    E: [
      ["top-bar", 0, 0, 1],
      ["left-stem", 0, 1, 2],
      ["bottom-bar", 0, 2, 3],
      ["crossbar", 1]
    ],
    F: [
      ["left-stem", 0, 0, 1],
      ["top-bar", 0, 1, 2],
      ["crossbar", 1]
    ],
    G: [
      ["outer-frame", 0, 0, 4],
      ["inward-bar", 0, 4, 5]
    ],
    H: [
      ["left-stem", 0],
      ["right-stem", 1],
      ["crossbar", 2]
    ],
    I: [["stem", 0]],
    J: [
      ["right-stem", 0, 0, 1],
      ["bottom-bar", 0, 1, 2]
    ],
    K: [
      ["left-stem", 0],
      ["upper-branch", 1],
      ["lower-stem", 2]
    ],
    L: [
      ["left-stem", 0, 0, 1],
      ["bottom-bar", 0, 1, 2]
    ],
    M: [
      ["left-stem", 0, 0, 1],
      ["top-bar", 0, 1, 2],
      ["right-stem", 0, 2, 3],
      ["middle-stem", 1]
    ],
    N: [
      ["left-stem", 0, 0, 1],
      ["top-bar", 0, 1, 2],
      ["right-stem", 0, 2, 3]
    ],
    O: [["frame", 0]],
    P: [
      ["left-stem", 0, 0, 1],
      ["bowl", 0, 1, 4]
    ],
    Q: [
      ["frame", 0],
      ["tail", 1]
    ],
    R: [
      ["left-stem", 0, 0, 1],
      ["bowl", 0, 1, 4],
      ["lower-stem", 1]
    ],
    S: [
      ["upper-turn", 0, 0, 2],
      ["middle-bar", 0, 2, 3],
      ["lower-turn", 0, 3, 5]
    ],
    T: [
      ["top-bar", 0],
      ["stem", 1]
    ],
    U: [
      ["left-stem", 0, 0, 1],
      ["bottom-bar", 0, 1, 2],
      ["right-stem", 0, 2, 3]
    ],
    V: [["stepped-frame", 0]],
    W: [
      ["outer-frame", 0],
      ["middle-stem", 1]
    ],
    X: [
      ["descending-step", 0],
      ["ascending-step", 1]
    ],
    Y: [
      ["fork", 0],
      ["stem", 1]
    ],
    Z: [
      ["upper-turn", 0, 0, 2],
      ["middle-bar", 0, 2, 3],
      ["lower-turn", 0, 3, 5]
    ]
  };

  function parts(value, options = {}) {
    if (typeof value !== "string" || !Object.hasOwn(descriptions, value)) {
      throw new RangeError("Choose one uppercase letter from A to Z.");
    }
    const whole = geometry(value, options);
    return descriptions[value].map(([id, pathIndex, start, end]) => {
      const source = whole.paths[pathIndex];
      return { id, paths: [{
        points: copy(start === undefined ? source.points : source.points.slice(start, end + 1)),
        width: source.width
      }] };
    });
  }
  // Repeat supplied material at explicit positions, within the caller's p5 transform.
  function stempel(source, placements, p=root) {
    const paths=Array.isArray(source)?source.flatMap(part=>part?.paths||[]):source?.paths;
    const isFragment=fragmentData.has(source);
    if(!isFragment&&(!Array.isArray(paths)||!paths.length||paths.some(path=>!path||!Number.isFinite(path.width)||path.width<=0||!Array.isArray(path.points)||path.points.length<2||path.points.some(point=>!Array.isArray(point)||point.length!==2||!point.every(Number.isFinite)))))throw new TypeError('stempel needs geometry, parts or a fragment');
    if(!Array.isArray(placements))throw new TypeError('placements must be an array');
    const copies=placements.map(item=>{
      if(!item||typeof item!=='object')throw new TypeError('Each placement needs x and y');
      for(const key of Object.keys(item))if(!['x','y','angle','scale','color'].includes(key))throw new RangeError('Unknown placement option: '+key);
      return {x:number(item.x,'x'),y:number(item.y,'y'),angle:number(item.angle??0,'angle'),scale:number(item.scale??1,'scale',.001),color:colour(item.color??palette.ink)};
    });
    if(!p||typeof p.push!=='function'||typeof p.applyMatrix!=='function')throw new TypeError('stempel needs a p5 drawing context');
    const images=new Map();
    for(const item of copies){
      if(isFragment&&!images.has(item.color))images.set(item.color,source.toImage(p,{color:item.color}));
      p.push();try{
        const a=item.angle*Math.PI/180,c=Math.cos(a)*item.scale,s=Math.sin(a)*item.scale;
        p.applyMatrix(c,s,-s,c,item.x,item.y);
        if(isFragment){p.imageMode(p.CORNER??'corner');p.noTint();p.image(images.get(item.color),0,0);}
        else {
          p.noFill();p.stroke(item.color);p.strokeCap(p.PROJECT??'square');p.strokeJoin(p.MITER??'miter');
          for(const path of paths){p.strokeWeight(path.width);p.beginShape();for(const point of path.points)p.vertex(...point);p.endShape();}
        }
      }finally{p.pop();}
    }
    return copies.length;
  }
  // Fragments keep source coordinates; rendering places the crop at image origin.
  function fragment(source, outline) {
    if (!Array.isArray(outline) || outline.length < 3) throw new TypeError('outline needs at least three points');
    const boundary = outline.map(point => {
      if (!Array.isArray(point) || point.length !== 2 || !point.every(Number.isFinite)) throw new TypeError('outline points must be finite [x, y] pairs');
      return [...point];
    });
    let direction = 0;
    for (let i = 0; i < boundary.length; i++) {
      const a = boundary[i], b = boundary[(i+1)%boundary.length], c = boundary[(i+2)%boundary.length];
      const turn = (b[0]-a[0])*(c[1]-b[1])-(b[1]-a[1])*(c[0]-b[0]);
      if (Math.abs(turn) < 1e-8) throw new RangeError('outline must be strictly convex, without repeated points');
      if (direction && Math.sign(turn) !== direction) throw new RangeError('outline must be convex and ordered around its edge');
      direction = Math.sign(turn);
    }
    // Every other vertex must lie inside every directed edge (also rejects stars).
    for (let i=0;i<boundary.length;i++) {
      const a=boundary[i],b=boundary[(i+1)%boundary.length];
      for (const c of boundary) if (direction*((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])) < -1e-8) throw new RangeError('outline must be convex');
    }
    const paths = Array.isArray(source) ? source.flatMap(part => part.paths || []) : source && source.paths;
    let material;
    if (paths) {
      if (!paths.length || paths.some(path => !Number.isFinite(path.width) || path.width <= 0 || !Array.isArray(path.points) || path.points.length < 2 || path.points.some(point => !Array.isArray(point) || point.length !== 2 || !point.every(Number.isFinite)))) throw new TypeError('source needs valid paths');
      material = { paths: copy(paths) };
    } else if (source && typeof source.get === 'function' && source.width > 0 && source.height > 0) {
      material = { image: source.get() };
    } else throw new TypeError('source must be geometry, a part, parts, or a p5 image/graphics');
    return makeFragment(material, boundary, boundary);
  }
  const fragmentData = new WeakMap();
  function makeFragment(material, clean, edge) {
    const xs=clean.map(p=>p[0]),ys=clean.map(p=>p[1]);
    const x=Math.min(...xs),y=Math.min(...ys);
    const width=Math.ceil(Math.max(...xs)-x),height=Math.ceil(Math.max(...ys)-y);
    if (width < 1 || height < 1 || width*height > 16000000) throw new RangeError('fragment must fit within 16 million pixels');
    const result = Object.freeze({ x,y,width,height,
      outline: () => copy(edge),
      toImage(p, options = {}) {
        if (!p || typeof p.createImage !== 'function') throw new TypeError('toImage needs a p5 instance or globalThis');
        const canvas=root.document.createElement('canvas');
        canvas.width=width;canvas.height=height;
        const ctx=canvas.getContext('2d',{willReadFrequently:true});
        {

          ctx.save();
          ctx.translate(-x,-y);
          ctx.beginPath();
          edge.forEach((point,i)=>i?ctx.lineTo(...point):ctx.moveTo(...point));
          ctx.closePath();ctx.clip();
          if (material.image) ctx.drawImage(material.image.canvas,0,0,material.image.width,material.image.height);
          else {
            ctx.strokeStyle=options.color || '#20201e';ctx.lineCap='square';ctx.lineJoin='miter';
            for (const path of material.paths) {
              ctx.lineWidth=path.width;ctx.beginPath();
              path.points.forEach((point,i)=>i?ctx.lineTo(...point):ctx.moveTo(...point));ctx.stroke();
            }
          }
          ctx.restore();
          const image=p.createImage(width,height);
          image.loadPixels();
          image.pixels.set(ctx.getImageData(0,0,width,height).data);
          image.updatePixels();
          return image;
        }
      }
    });
    fragmentData.set(result,{material,clean});return result;
  }
  function tear(piece, options = {}) {
    const data=fragmentData.get(piece);
    if (!data) throw new TypeError('tear needs a library fragment');
    const amount=number(options.amount ?? 0.3,'amount',0);
    if (amount>1) throw new RangeError('amount must be between 0 and 1');
    const seed=options.seed ?? 1;
    if (!Number.isSafeInteger(seed)) throw new TypeError('seed must be a safe integer');
    if (amount===0) return makeFragment(data.material,data.clean,data.clean);
    let state=seed>>>0;
    const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
    const center=data.clean.reduce((sum,p)=>[sum[0]+p[0]/data.clean.length,sum[1]+p[1]/data.clean.length],[0,0]);
    const edge=[];
    data.clean.forEach((a,i)=>{
      const b=data.clean[(i+1)%data.clean.length];const length=Math.hypot(b[0]-a[0],b[1]-a[1]);
      const steps=Math.max(2,Math.ceil(length/6));
      for(let j=0;j<steps;j++) {
        const t=j/steps,px=a[0]+(b[0]-a[0])*t,py=a[1]+(b[1]-a[1])*t;
        const distance=Math.hypot(center[0]-px,center[1]-py);
        const inset=j===0?0:amount*random()*Math.min(12,distance*0.25);
        edge.push([px+(center[0]-px)*inset/distance,py+(center[1]-py)*inset/distance]);
      }
    });
    return makeFragment(data.material,data.clean,edge);
  }
  // Static surface treatment. The byte mask is shared by CPU and shader routes.
  const surfaceWorkers = new WeakMap();
  function surfaceSettings(options) {
    const ink=number(options.ink ?? 0.12,'ink',0),paper=number(options.paper ?? 0,'paper',0);
    if(ink>1||paper>1) throw new RangeError('ink and paper must be between 0 and 1');
    const seed=options.seed ?? 17;
    if(!Number.isSafeInteger(seed))throw new TypeError('seed must be a safe integer');
    return {ink,paper,seed};
  }
  function surfaceHash(x,y,seed) {
    let n=Math.imul(x,374761393)^Math.imul(y,668265263)^Math.imul(seed,1442695041);
    n=Math.imul(n^(n>>>13),1274126177);return ((n^(n>>>16))>>>0)/4294967295;
  }
  function surfaceMask(width,height,settings) {
    const pixels=new Uint8ClampedArray(width*height*4);
    const spots=Array.from({length:3},(_,i)=>({x:surfaceHash(i,1,settings.seed)*width,y:surfaceHash(i,2,settings.seed)*height,r:(.12+.14*surfaceHash(i,3,settings.seed))*Math.min(width,height)}));
    for(let y=0;y<height;y++)for(let x=0;x<width;x++) {
      const grain=surfaceHash(x,y,settings.seed),i=4*(y*width+x);
      let stain=0;
      for(const spot of spots) {const d=Math.hypot(x-spot.x,y-spot.y)/spot.r;stain=Math.max(stain,Math.max(0,1-d)**2);}
      // Sparse marks stay faint; solid ink remains solid enough to read.
      pixels[i]=Math.round(255*settings.ink*(.035*grain+.12*stain+(grain<.003?.25:0)));
      pixels[i+1]=Math.round(255*settings.paper*(.015*grain+.06*stain+(grain>.998?.12:0)));
      pixels[i+2]=0;pixels[i+3]=255;
    }
    return pixels;
  }
  function surfaceWorker() {
    const canvas=root.document.createElement('canvas');
    const gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:false,depth:false,stencil:false,antialias:false,preserveDrawingBuffer:true});
    if(!gl)throw new Error('WebGL unavailable');
    const shaders=[];
    const compile=(type,source)=>{
      const shader=gl.createShader(type);shaders.push(shader);gl.shaderSource(shader,source);gl.compileShader(shader);
      if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw new Error('Surface shader compilation failed');return shader;
    };
    let program,buffer;
    const textures=[];
    try {
      program=gl.createProgram();
      gl.attachShader(program,compile(gl.VERTEX_SHADER,'attribute vec2 position; varying vec2 uv; void main(){uv=(position+1.0)*0.5;gl_Position=vec4(position,0.0,1.0);}'));
      gl.attachShader(program,compile(gl.FRAGMENT_SHADER,`precision highp float;
        varying vec2 uv; uniform sampler2D source; uniform sampler2D mask;
        void main(){vec4 c=texture2D(source,uv);vec2 m=texture2D(mask,uv).rg;
          gl_FragColor=vec4(c.rgb*(vec3(1.0)-m.g*vec3(0.65,0.82,1.0)),c.a*(1.0-m.r));}`));
      gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error('Surface shader linking failed');
      gl.useProgram(program);
      buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
      const location=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,2,gl.FLOAT,false,0,0);
      for(let i=0;i<2;i++){
        textures.push(gl.createTexture());gl.activeTexture(gl.TEXTURE0+i);gl.bindTexture(gl.TEXTURE_2D,textures[i]);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      }
      gl.uniform1i(gl.getUniformLocation(program,'source'),0);gl.uniform1i(gl.getUniformLocation(program,'mask'),1);
      gl.disable(gl.BLEND);gl.disable(gl.DITHER);
      for(const shader of shaders)gl.deleteShader(shader);
      const worker={disabled:false,render(width,height,clean,mask){
        if(gl.isContextLost())throw new Error('Surface context lost');
        const limit=gl.getParameter(gl.MAX_TEXTURE_SIZE);
        if(width>limit||height>limit)throw new Error('Surface exceeds texture limit');
        if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}
        gl.viewport(0,0,width,height);
        for(let i=0;i<2;i++){
          gl.activeTexture(gl.TEXTURE0+i);gl.bindTexture(gl.TEXTURE_2D,textures[i]);
          gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,width,height,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array((i?mask:clean).buffer));
        }
        gl.drawArrays(gl.TRIANGLES,0,6);
        const pixels=new Uint8Array(width*height*4);gl.readPixels(0,0,width,height,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
        if(gl.getError()!==gl.NO_ERROR)throw new Error('Surface rendering failed');
        // Byte textures and readPixels share the same row order; no DOM texture flip.
        return pixels;
      },remove(){
        textures.forEach(texture=>gl.deleteTexture(texture));gl.deleteBuffer(buffer);gl.deleteProgram(program);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      }};
      canvas.addEventListener('webglcontextlost',()=>{worker.disabled=true;});
      return worker;
    } catch(error) {
      textures.forEach(texture=>gl.deleteTexture(texture));if(buffer)gl.deleteBuffer(buffer);if(program)gl.deleteProgram(program);
      shaders.forEach(shader=>gl.deleteShader(shader));gl.getExtension('WEBGL_lose_context')?.loseContext();throw error;
    }
  }
  function surface(source,options={},p=root) {
    const settings=surfaceSettings(options);
    if(!source||!source.canvas||typeof source.get!=='function'||!p||typeof p.createImage!=='function') throw new TypeError('surface needs a p5 image or graphics and a p5 drawing context');
    const width=source.width,height=source.height;
    if(!Number.isInteger(width)||!Number.isInteger(height)||width<1||height<1||width*height>16000000)throw new RangeError('surface must fit within 16 million pixels');
    // Snapshot at logical density 1; never apply back onto the supplied material.
    const canvas=root.document.createElement('canvas');canvas.width=width;canvas.height=height;
    const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(source.canvas,0,0,width,height);
    const clean=ctx.getImageData(0,0,width,height).data;
    const result=p.createImage(width,height);result.loadPixels();result.pixels.set(clean);
    if(settings.ink===0&&settings.paper===0){result.updatePixels();return result;}
    const mask=surfaceMask(width,height,settings);
    // CPU reference also supplies a deterministic fallback when WebGL is unavailable.
    for(let i=0;i<clean.length;i+=4){
      const shade=mask[i+1]/255;
      result.pixels[i]=Math.round(clean[i]*(1-shade*.65));
      result.pixels[i+1]=Math.round(clean[i+1]*(1-shade*.82));
      result.pixels[i+2]=Math.round(clean[i+2]*(1-shade));
      result.pixels[i+3]=Math.round(clean[i+3]*(1-mask[i]/255));
    }
    result.updatePixels();
    const owner=p===root ? root.p5?.instance : p;
    if(!owner||typeof p.createGraphics!=='function')return result;
    let worker=surfaceWorkers.get(owner);
    try {
      if(!worker){worker=surfaceWorker();surfaceWorkers.set(owner,worker);}
      if(worker.disabled)return result;
      const pixels=worker.render(width,height,clean,mask);
      let acceptable=true;
      for(let i=0;i<clean.length;i++)if(Math.abs(pixels[i]-result.pixels[i])>1){acceptable=false;break;}
      if(acceptable){result.pixels.set(pixels);result.updatePixels();return result;}
      worker.disabled=true;worker.remove();
    } catch(error) {
      if(worker){worker.disabled=true;worker.remove();}
      else surfaceWorkers.set(owner,{disabled:true,remove(){}});
      // Source read/security errors occur before this block and remain visible.
    }
    return result;
  }
  if(root.p5&&typeof root.p5.registerAddon==='function')root.p5.registerAddon((P5,prototype,hooks)=>{
    hooks.remove=function(){const worker=surfaceWorkers.get(this);if(worker){worker.remove();surfaceWorkers.delete(this);}};
  });
  root.Merz=Object.freeze({version:'0.2.0',palette,geometry,parts,fragment,tear,surface,stempel,fundsachen,characters:Object.keys(glyphs).join(''),create:options=>new MerzComposition(options)});
  root.MerzComposition=MerzComposition;
  // Compatibility with sketches written before the technical rename.
  root.DeStijl=root.Merz;
  root.DeStijlComposition=MerzComposition;
})(globalThis);

/* p5.merz 0.3.0 - Sebastien Vanblaere. MIT license.
 * A sheet, a printer's case, cut pieces and found letters after the magazine Merz.
 */
(function (root) {
  'use strict';
  const libraryURL = root.document?.currentScript?.src || null;
  let fontReady;
  // The printer's case: a grotesk in six widths and an antiqua, both variable fonts.
  const stretchSteps = [62, 75, 87, 100, 112, 125];
  const nearestStretch = value => stretchSteps.reduce((best, step) => Math.abs(step - value) < Math.abs(best - value) ? step : best);
  const faces = {
    grotesk: { file: 'archivo/Archivo-Variable.ttf', family: 'Merz Grotesk', weight: '100 900' },
    antiqua: { file: 'bodoni-moda/BodoniModa-Variable.ttf', family: 'Merz Antiqua', weight: '400 900' }
  };
  function familyFor(font, stretch) {
    if (font === 'grotesk') return 'Merz Grotesk ' + nearestStretch(stretch);
    if (font === 'antiqua') return 'Merz Antiqua';
    return font;
  }
  function ready(options = {}) {
    if (fontReady) return fontReady;
    if (!options || typeof options !== 'object') return Promise.reject(new TypeError('ready options must be an object'));
    const base = options.fontsURL || (libraryURL ? new URL('assets/fonts/', libraryURL).href : null);
    if (!base) return Promise.reject(new Error('Merz.ready needs fontsURL, the folder with archivo/ and bodoni-moda/, when the library has no script URL'));
    if (!root.FontFace || !root.document?.fonts) return Promise.reject(new Error('Merz.ready needs browser font loading'));
    const list = [...stretchSteps.map(step => [faces.grotesk.family + ' ' + step, faces.grotesk.file, { weight: faces.grotesk.weight, stretch: step + '%' }]),
      [faces.antiqua.family, faces.antiqua.file, { weight: faces.antiqua.weight }]];
    fontReady = Promise.all(list.map(([family, file, descriptors]) =>
      new root.FontFace(family, 'url(' + JSON.stringify(new URL(file, base).href) + ')', descriptors).load()
    )).then(loaded => {
      for (const face of loaded) root.document.fonts.add(face);
    }).catch(error => { fontReady = null; throw error; });
    return fontReady;
  }
  if (root.p5?.registerAddon && libraryURL) {
    root.p5.registerAddon((_p5, _prototype, hooks) => {
      hooks.presetup = () => ready();
    });
  }
  // BEGIN FUNDSACHEN CATALOGUE
  const foundItems = [
  {
    "id": "001",
    "name": "merz-2-cover-m",
    "label": "M",
    "file": "merz-2-cover-m.png",
    "width": 70,
    "height": 140,
    "crop": [
      10,
      55,
      70,
      140
    ],
    "category": "letter",
    "issue": "2",
    "page": "Merz 2, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-2-cover-small.jpg",
    "inkFile": "merz-2-cover-m-ink.png",
    "svgFile": "merz-2-cover-m.svg"
  },
  {
    "id": "002",
    "name": "merz-2-cover-r",
    "label": "R",
    "file": "merz-2-cover-r.png",
    "width": 58,
    "height": 140,
    "crop": [
      171,
      55,
      58,
      140
    ],
    "category": "letter",
    "issue": "2",
    "page": "Merz 2, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-2-cover-small.jpg",
    "inkFile": "merz-2-cover-r-ink.png",
    "svgFile": "merz-2-cover-r.svg"
  },
  {
    "id": "003",
    "name": "merz-2-cover-rule",
    "label": "Rule",
    "file": "merz-2-cover-rule.png",
    "width": 282,
    "height": 7,
    "crop": [
      12,
      30,
      282,
      7
    ],
    "category": "rule",
    "issue": "2",
    "page": "Merz 2, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-2-cover-small.jpg",
    "inkFile": "merz-2-cover-rule-ink.png",
    "svgFile": "merz-2-cover-rule.svg"
  },
  {
    "id": "004",
    "name": "merz-2-cover-e",
    "label": "E",
    "file": "merz-2-cover-e.png",
    "width": 117,
    "height": 377,
    "crop": [
      282,
      145,
      117,
      377
    ],
    "category": "letter",
    "issue": "2",
    "page": "Merz 2, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-2-cover.png",
    "inkFile": "merz-2-cover-e-ink.png",
    "svgFile": "merz-2-cover-e.svg"
  },
  {
    "id": "005",
    "name": "merz-2-cover-z",
    "label": "Z",
    "file": "merz-2-cover-z.png",
    "width": 133,
    "height": 380,
    "crop": [
      670,
      146,
      133,
      380
    ],
    "category": "letter",
    "issue": "2",
    "page": "Merz 2, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-2-cover.png",
    "inkFile": "merz-2-cover-z-ink.png",
    "svgFile": "merz-2-cover-z.svg"
  },
  {
    "id": "006",
    "name": "merz-2-cover-two",
    "label": "2",
    "file": "merz-2-cover-two.png",
    "width": 122,
    "height": 167,
    "crop": [
      25,
      535,
      122,
      167
    ],
    "category": "number",
    "issue": "2",
    "page": "Merz 2, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-2-cover.png",
    "inkFile": "merz-2-cover-two-ink.png",
    "svgFile": "merz-2-cover-two.svg"
  },
  {
    "id": "007",
    "name": "merz-2-cover-nummer",
    "label": "NUMMER",
    "file": "merz-2-cover-nummer.png",
    "width": 523,
    "height": 80,
    "crop": [
      27,
      748,
      523,
      80
    ],
    "category": "word",
    "issue": "2",
    "page": "Merz 2, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-2-cover.png",
    "inkFile": "merz-2-cover-nummer-ink.png"
  },
  {
    "id": "008",
    "name": "merz-2-cover-i",
    "label": "i",
    "file": "merz-2-cover-i.png",
    "width": 260,
    "height": 266,
    "crop": [
      552,
      572,
      260,
      266
    ],
    "category": "letter",
    "issue": "2",
    "page": "Merz 2, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-2-cover.png",
    "inkFile": "merz-2-cover-i-ink.png",
    "svgFile": "merz-2-cover-i.svg"
  },
  {
    "id": "009",
    "name": "merz-2-cover-boat",
    "label": "Boat",
    "file": "merz-2-cover-boat.png",
    "width": 232,
    "height": 190,
    "crop": [
      18,
      841,
      232,
      190
    ],
    "category": "image",
    "issue": "2",
    "page": "Merz 2, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-2-cover.png",
    "inkFile": "merz-2-cover-boat-ink.png"
  },
  {
    "id": "010",
    "name": "merz-2-cover-hand",
    "label": "Pointing hand",
    "file": "merz-2-cover-hand.png",
    "width": 94,
    "height": 217,
    "crop": [
      19,
      1039,
      94,
      217
    ],
    "category": "image",
    "issue": "2",
    "page": "Merz 2, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-2-cover.png",
    "inkFile": "merz-2-cover-hand-ink.png"
  },
  {
    "id": "011",
    "name": "merz-2-cover-april-1923",
    "label": "APRIL 1923",
    "file": "merz-2-cover-april-1923.png",
    "width": 228,
    "height": 45,
    "crop": [
      125,
      1126,
      228,
      45
    ],
    "category": "text",
    "issue": "2",
    "page": "Merz 2, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/2/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-2-cover.png",
    "inkFile": "merz-2-cover-april-1923-ink.png"
  },
  {
    "id": "012",
    "name": "merz-2-17-i",
    "label": "i",
    "file": "merz-2-17-i.png",
    "width": 315,
    "height": 249,
    "crop": [
      115,
      22,
      315,
      249
    ],
    "category": "letter",
    "issue": "2",
    "page": "Merz 2, page 17",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/2/pages/17.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-2-17.png",
    "inkFile": "merz-2-17-i-ink.png",
    "svgFile": "merz-2-17-i.svg"
  },
  {
    "id": "013",
    "name": "merz-2-17-seventeen",
    "label": "17",
    "file": "merz-2-17-seventeen.png",
    "width": 100,
    "height": 94,
    "crop": [
      691,
      72,
      100,
      94
    ],
    "category": "number",
    "issue": "2",
    "page": "Merz 2, page 17",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/2/pages/17.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-2-17.png",
    "inkFile": "merz-2-17-seventeen-ink.png",
    "svgFile": "merz-2-17-seventeen.svg"
  },
  {
    "id": "014",
    "name": "merz-2-17-kuenstler",
    "label": "Künstler",
    "file": "merz-2-17-kuenstler.png",
    "width": 135,
    "height": 42,
    "crop": [
      380,
      1104,
      135,
      42
    ],
    "category": "word",
    "issue": "2",
    "page": "Merz 2, page 17",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/2/pages/17.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-2-17.png",
    "inkFile": "merz-2-17-kuenstler-ink.png"
  },
  {
    "id": "015",
    "name": "merz-2-17-gestempelt",
    "label": "gestempelt",
    "file": "merz-2-17-gestempelt.png",
    "width": 112,
    "height": 35,
    "crop": [
      257,
      977,
      112,
      35
    ],
    "category": "word",
    "issue": "2",
    "page": "Merz 2, page 17",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/2/pages/17.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-2-17.png",
    "inkFile": "merz-2-17-gestempelt-ink.png"
  },
  {
    "id": "016",
    "name": "merz-8-cover-m",
    "label": "M",
    "file": "merz-8-cover-m.png",
    "width": 159,
    "height": 319,
    "crop": [
      244,
      91,
      159,
      319
    ],
    "category": "letter",
    "issue": "8/9",
    "page": "Merz 8/9, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-8-cover.png",
    "inkFile": "merz-8-cover-m-ink.png",
    "svgFile": "merz-8-cover-m.svg"
  },
  {
    "id": "017",
    "name": "merz-8-cover-e",
    "label": "E",
    "file": "merz-8-cover-e.png",
    "width": 105,
    "height": 320,
    "crop": [
      452,
      91,
      105,
      320
    ],
    "category": "letter",
    "issue": "8/9",
    "page": "Merz 8/9, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-8-cover.png",
    "inkFile": "merz-8-cover-e-ink.png",
    "svgFile": "merz-8-cover-e.svg"
  },
  {
    "id": "018",
    "name": "merz-8-cover-r",
    "label": "R",
    "file": "merz-8-cover-r.png",
    "width": 136,
    "height": 321,
    "crop": [
      601,
      90,
      136,
      321
    ],
    "category": "letter",
    "issue": "8/9",
    "page": "Merz 8/9, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-8-cover.png",
    "inkFile": "merz-8-cover-r-ink.png",
    "svgFile": "merz-8-cover-r.svg"
  },
  {
    "id": "019",
    "name": "merz-8-cover-z",
    "label": "Z",
    "file": "merz-8-cover-z.png",
    "width": 115,
    "height": 319,
    "crop": [
      773,
      92,
      115,
      319
    ],
    "category": "letter",
    "issue": "8/9",
    "page": "Merz 8/9, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-8-cover.png",
    "inkFile": "merz-8-cover-z-ink.png",
    "svgFile": "merz-8-cover-z.svg"
  },
  {
    "id": "020",
    "name": "merz-8-cover-eight",
    "label": "8",
    "file": "merz-8-cover-eight.png",
    "width": 140,
    "height": 208,
    "crop": [
      78,
      202,
      140,
      208
    ],
    "category": "number",
    "issue": "8/9",
    "page": "Merz 8/9, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-8-cover.png",
    "inkFile": "merz-8-cover-eight-ink.png",
    "svgFile": "merz-8-cover-eight.svg"
  },
  {
    "id": "021",
    "name": "merz-8-cover-nine",
    "label": "9",
    "file": "merz-8-cover-nine.png",
    "width": 135,
    "height": 208,
    "crop": [
      906,
      203,
      135,
      208
    ],
    "category": "number",
    "issue": "8/9",
    "page": "Merz 8/9, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-8-cover.png",
    "inkFile": "merz-8-cover-nine-ink.png",
    "svgFile": "merz-8-cover-nine.svg"
  },
  {
    "id": "022",
    "name": "merz-8-cover-nasci",
    "label": "NASCI",
    "file": "merz-8-cover-nasci.png",
    "width": 344,
    "height": 109,
    "crop": [
      693,
      566,
      344,
      109
    ],
    "category": "word",
    "issue": "8/9",
    "page": "Merz 8/9, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-8-cover.png",
    "inkFile": "merz-8-cover-nasci-ink.png"
  },
  {
    "id": "023",
    "name": "merz-8-cover-natur",
    "label": "NATUR",
    "file": "merz-8-cover-natur.png",
    "width": 225,
    "height": 59,
    "crop": [
      291,
      616,
      225,
      59
    ],
    "category": "word",
    "issue": "8/9",
    "page": "Merz 8/9, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-8-cover.png",
    "inkFile": "merz-8-cover-natur-ink.png"
  },
  {
    "id": "024",
    "name": "merz-8-cover-kraft",
    "label": "KRAFT",
    "file": "merz-8-cover-kraft.png",
    "width": 251,
    "height": 60,
    "crop": [
      291,
      1051,
      251,
      60
    ],
    "category": "word",
    "issue": "8/9",
    "page": "Merz 8/9, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-8-cover.png",
    "inkFile": "merz-8-cover-kraft-ink.png"
  },
  {
    "id": "025",
    "name": "merz-8-cover-rule",
    "label": "Blue rule",
    "file": "merz-8-cover-rule.png",
    "width": 830,
    "height": 22,
    "crop": [
      260,
      678,
      830,
      22
    ],
    "category": "rule",
    "issue": "8/9",
    "page": "Merz 8/9, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-8-cover.png",
    "inkFile": "merz-8-cover-rule-ink.png",
    "svgFile": "merz-8-cover-rule.svg"
  },
  {
    "id": "026",
    "name": "merz-8-cover-hand",
    "label": "Pointing hand",
    "file": "merz-8-cover-hand.png",
    "width": 54,
    "height": 103,
    "crop": [
      79,
      1052,
      54,
      103
    ],
    "category": "image",
    "issue": "8/9",
    "page": "Merz 8/9, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-8-cover.png",
    "inkFile": "merz-8-cover-hand-ink.png"
  },
  {
    "id": "027",
    "name": "merz-8-cover-1924",
    "label": "1924",
    "file": "merz-8-cover-1924.png",
    "width": 145,
    "height": 48,
    "crop": [
      74,
      1339,
      145,
      48
    ],
    "category": "number",
    "issue": "8/9",
    "page": "Merz 8/9, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-8-cover.png",
    "inkFile": "merz-8-cover-1924-ink.png",
    "svgFile": "merz-8-cover-1924.svg"
  },
  {
    "id": "028",
    "name": "merz-8-cover-gestaltet",
    "label": "GESTALTET UND BEWEGT",
    "file": "merz-8-cover-gestaltet.png",
    "width": 745,
    "height": 61,
    "crop": [
      293,
      1138,
      745,
      61
    ],
    "category": "text",
    "issue": "8/9",
    "page": "Merz 8/9, cover",
    "source": "https://sdrc.lib.uiowa.edu/dada/merz/8/pages/00cover.htm",
    "credit": "International Dada Archive, University of Iowa Libraries",
    "scan": "source-scans/merz-8-cover.png",
    "inkFile": "merz-8-cover-gestaltet-ink.png"
  }
].map(item=>Object.freeze({...item,crop:Object.freeze(item.crop)}));
  // END FUNDSACHEN CATALOGUE
  const foundImages = new WeakMap();
  async function merzbilder(id, options={}, p=root, width, context=root) {
    let placement;
    if (isContext(options) && p === root) { p = options; options = {}; }
    if (typeof options === 'number') {
      placement = { x: number(options, 'x'), y: number(p, 'y'), width: number(width, 'width', 1) };
      options = {}; p = context;
      if (!p || typeof p.image !== 'function' || typeof p.push !== 'function') throw new TypeError('merzbilder needs a p5 drawing context');
    }
    if (!options || typeof options !== 'object' || Array.isArray(options)) throw new TypeError('merzbilder options must be an object');
    const key=typeof id==='number'&&Number.isInteger(id)?String(id).padStart(3,'0'):id;
    const item=foundItems.find(item=>item.id===key||item.name===key);
    if(!item)throw new RangeError('Unknown Fundsachen item: '+id);
    if(!p||typeof p.loadImage!=='function')throw new TypeError('merzbilder needs a p5 instance or globalThis');
    for(const key of Object.keys(options))if(!['baseURL','url','variant'].includes(key))throw new RangeError('Unknown Fundsachen option: '+key);
    const variant=options.variant??'ink';
    if(!['ink','scan','svg'].includes(variant))throw new RangeError('variant must be ink, scan or svg');
    const file={ink:item.inkFile,scan:item.file,svg:item.svgFile}[variant];
    if(!file)throw new RangeError('No '+variant+' variant for '+item.id);
    if(options.url!==undefined&&options.baseURL!==undefined)throw new TypeError('Choose url or baseURL');
    const base=options.baseURL??(libraryURL?new URL('assets/fundsachen/',libraryURL).href:null);
    if(!base&&options.url===undefined)throw new TypeError('Cannot locate the p5.merz script. Provide baseURL for the Fundsachen image folder, or url for one image');
    if(options.url!==undefined&&(typeof options.url!=='string'||!options.url.trim()))throw new TypeError('url must name an image file');
    const url=options.url===undefined?new URL(file,base).href:new URL(options.url,root.document?.baseURI||root.location?.href).href;
    let cache=foundImages.get(p);if(!cache){cache=new Map();foundImages.set(p,cache);}
    if(!cache.has(url)){
      const pending=Promise.resolve().then(()=>p.loadImage(url));cache.set(url,pending);
      pending.catch(()=>{if(cache.get(url)===pending)cache.delete(url);});
    }
    const image=await cache.get(url);
    if (placement) {
      p.push();
      try {
        p.imageMode(p.CORNER ?? 'corner'); p.noTint();
        p.image(image, placement.x, placement.y, placement.width, placement.width * image.height / image.width);
      } finally { p.pop(); }
      return;
    }
    return ausschnitt(image, 0, 0, image.width, image.height);
  }
  merzbilder.list=()=>foundItems.map(item=>({...item,crop:[...item.crop]}));
  Object.freeze(merzbilder);
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
  function settings(options = {}) {
    const defaults = { grau: palette.paper, rot: palette.red, schwarz: palette.ink, blau: palette.blue, gelb: palette.yellow };
    if (!options || typeof options !== 'object' || Array.isArray(options)) throw new TypeError('settings needs an object');
    for (const key of Object.keys(options)) {
      if (!Object.hasOwn(defaults, key)) throw new RangeError('Unknown setting: ' + key);
      defaults[key] = colour(options[key]);
    }
    return Object.freeze(Object.assign(Object.values(defaults), defaults));
  }
  const copy=value=>JSON.parse(JSON.stringify(value));
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  const isContext=value=>!!value&&typeof value==='object'&&typeof value.push==='function'&&typeof value.applyMatrix==='function';
  function number(value,name,min=-Infinity){if(!Number.isFinite(value)||value<min)throw new RangeError(name+' must be a finite number >= '+min);return value;}
  function colour(value){if(typeof value!=='string'||!/^#[0-9a-f]{6}$/i.test(value))throw new TypeError('Use a six-digit hex colour, such as #234b92');return value;}
  function text(value){if(typeof value!=='string')throw new TypeError('Text must be a string');const result=value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/\r\n?/g,'\n').replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/[\u00a0\u202f]/g,' ');for(const c of result)if(c!==' '&&c!=='\n'&&!glyphs[c])throw new RangeError('Unsupported character: '+c);return result;}
  function satz(value,options={}){
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
    if(item.type==='text')item.text=satz(item.text,item).text;
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
          else {p.noFill();p.stroke(item.color);if(item.type==='line'){p.strokeWeight(item.strokeWeight);p.line(0,0,item.x2,item.y2);}else for(const line of satz(item.text,item).paths){p.strokeWeight(line.width);p.beginShape();line.points.forEach(v=>p.vertex(...v));p.endShape();}}
        }finally{p.pop();}}
      }finally{p.pop();}return this;
    }
    exportSVG({title='p5.merz composition'}={}){
      // Shared across library copies loaded in the same JavaScript realm.
      const counter=Symbol.for('p5.merz.svg-export');
      root[counter]=(root[counter]||0)+1;
      const prefix='merz-svg-'+root[counter]+'-';
      const shape=item=>{
        if(item.type==='plane')return `<rect width="${item.width}" height="${item.height}" fill="${item.color}"/>`;
        if(item.type==='line')return `<path d="M0 0 L${item.x2} ${item.y2}" fill="none" stroke="${item.color}" stroke-width="${item.strokeWeight}" stroke-linecap="square"/>`;
        return satz(item.text,item).paths.map(line=>`<path d="${line.points.map((v,i)=>(i?'L':'M')+v.join(' ')).join(' ')}" fill="none" stroke="${item.color}" stroke-width="${line.width}" stroke-linecap="square" stroke-linejoin="miter"/>`).join('');
      };
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}" viewBox="0 0 ${this.width} ${this.height}"><title>${escape(title)}</title><defs><clipPath id="${prefix}page"><rect width="${this.width}" height="${this.height}"/></clipPath></defs><g clip-path="url(#${prefix}page)">`+(this.background===null?'':`<rect width="${this.width}" height="${this.height}" fill="${this.background}"/>`)+this._items.map(item=>`<g id="${prefix}${item.id}" transform="translate(${item.x} ${item.y}) rotate(${item.angle}) scale(${item.scale})">${shape(item)}</g>`).join('')+'</g></svg>';
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

  function bauteile(value, options = {}) {
    if (typeof value !== "string" || !Object.hasOwn(descriptions, value)) {
      throw new RangeError("Choose one uppercase letter from A to Z.");
    }
    const whole = satz(value, options);
    return descriptions[value].map(([id, pathIndex, start, end]) => {
      const source = whole.paths[pathIndex];
      return { id, paths: [{
        points: copy(start === undefined ? source.points : source.points.slice(start, end + 1)),
        width: source.width
      }] };
    });
  }
  function bauteil(letter, name, options = {}) {
    if (typeof letter !== 'string' || !Object.hasOwn(descriptions, letter)) {
      throw new RangeError('Choose one uppercase letter from A to Z.');
    }
    const whole = satz(letter, options);
    const available = descriptions[letter];
    const selected = available.find(([id]) => id === name);
    if (!selected) throw new RangeError(letter + ' has these parts: ' + available.map(([id]) => id).join(', '));
    const [id, pathIndex, start, end] = selected;
    const source = whole.paths[pathIndex];
    return { id, paths: [{
      points: copy(start === undefined ? source.points : source.points.slice(start, end + 1)),
      width: source.width
    }] };
  }
  // Repeat supplied material at explicit positions, within the caller's p5 transform.
  function stempel(source, placements, p=root, options={}, context=root) {
    if(typeof placements==='number'){
      if(isContext(options)&&context===root){context=options;options={};}
      if(!options||typeof options!=='object'||Array.isArray(options))throw new TypeError('stempel options must be an object');
      if('x' in options||'y' in options)throw new RangeError('Pass x and y before the options');
      placements=[{...options,x:placements,y:p}];
      p=context;
    }
    const paths=Array.isArray(source)?source.flatMap(bauteil=>bauteil?.paths||[]):source?.paths;
    const isSegment=value=>!!value&&typeof value==='object'&&!Array.isArray(value)&&typeof value.text==='string';
    const isText=typeof source==='string'||(Array.isArray(source)&&source.length>0&&source.every(line=>typeof line==='string'||isSegment(line)));
    // Strings are lines, split at line breaks. An array of segments is one line of pieces on a shared baseline.
    let lines=null;
    if(isText){
      const items=Array.isArray(source)?source:[source];
      const segments=items.filter(isSegment);
      if(segments.length&&segments.length!==items.length)throw new TypeError('Use strings for lines or segments for one line, not both');
      for(const segment of segments){
        for(const key of Object.keys(segment))if(!['text','size','font','weight','stretch','color','spacing','width','height'].includes(key))throw new RangeError('Unknown segment option: '+key);
        if(segment.size!==undefined)number(segment.size,'segment size',.001);
        if(segment.weight!==undefined&&(number(segment.weight,'segment weight',100)>900))throw new RangeError('segment weight must be between 100 and 900');
        if(segment.stretch!==undefined&&(number(segment.stretch,'segment stretch',62)>125))throw new RangeError('segment stretch must be between 62 and 125');
        if(segment.font!==undefined&&(typeof segment.font!=='string'||!segment.font.trim()))throw new TypeError('segment font must be a font family name');
        if(segment.color!==undefined)colour(segment.color);
        if(segment.spacing!==undefined)number(segment.spacing,'segment spacing');
        if(segment.width!==undefined)number(segment.width,'segment width',1);
        if(segment.height!==undefined){if(segment.width===undefined)throw new RangeError('segment height needs width');number(segment.height,'segment height',1);}
        if(segment.width!==undefined&&segment.spacing!==undefined)throw new RangeError('Use width or spacing in a segment, not both');
      }
      lines=segments.length?[items]:items.flatMap(line=>line.split('\n').map(text=>[{text}]));
    }
    const fragmentSeries=Array.isArray(source)&&source.length>0&&source.every(piece=>fragmentData.has(piece));
    const isFragment=fragmentSeries||fragmentData.has(source);
    const isSheet=sheetData.has(source);
    if(!isText&&!isFragment&&!isSheet&&(!Array.isArray(paths)||!paths.length||paths.some(path=>!path||!Number.isFinite(path.width)||path.width<=0||!Array.isArray(path.points)||path.points.length<2||path.points.some(point=>!Array.isArray(point)||point.length!==2||!point.every(Number.isFinite)))))throw new TypeError('stempel needs text, geometry, letter parts or a cut piece');
    if(placements && typeof placements==='object' && !Array.isArray(placements))placements=[placements];
    if(!Array.isArray(placements))throw new TypeError('placements must be an array');
    const expanded=[];
    for(const item of placements){
      if(!item||typeof item!=='object')throw new TypeError('Each placement needs x and y');
      const {repeat=1,stepX=0,stepY=0,offsetX=0,...base}=item;
      if(!Number.isSafeInteger(repeat)||repeat<1||expanded.length+repeat>1024)throw new RangeError('stempel allows up to 1024 impressions');
      number(stepX,'stepX');number(stepY,'stepY');number(offsetX,'offsetX');
      number(base.x,'x');number(base.y,'y');
      for(const key of ['angle','scale','color']){
        if(Array.isArray(base[key])){
          if(!base[key].length)throw new RangeError(key+' pattern must not be empty');
          for(const value of base[key]){
            if(key==='color')colour(value);else number(value,key,key==='scale'?.001:-Infinity);
          }
        }
      }
      for(let i=0;i<repeat;i++){
        const copy={...base,x:base.x+i*stepX+(i%2)*offsetX,y:base.y+i*stepY};
        for(const key of ['angle','scale','color'])if(Array.isArray(base[key]))copy[key]=base[key][i%base[key].length];
        expanded.push(copy);
      }
    }
    const copies=expanded.map(item=>{
      if(!item||typeof item!=='object')throw new TypeError('Each placement needs x and y');
      for(const key of Object.keys(item))if(!(isText?['x','y','angle','scale','color','size','font','weight','stretch','rows','leading','spacing','width','height','rule','align','gap']:['x','y','angle','scale','color']).includes(key))throw new RangeError('Unknown placement option: '+key);
      const textOptions={};
      if(isText){
        textOptions.size=number(item.size??32,'size',.001);
        textOptions.font=item.font??'grotesk';
        if(typeof textOptions.font!=='string'||!textOptions.font.trim())throw new TypeError('font must be grotesk, antiqua or a loaded font family name');
        textOptions.weight=number(item.weight??800,'weight',100);
        if(textOptions.weight>900)throw new RangeError('weight must be between 100 and 900');
        textOptions.stretch=number(item.stretch??100,'stretch',62);
        if(textOptions.stretch>125)throw new RangeError('stretch must be between 62 and 125');
        textOptions.rows=item.rows??1;
        if(!Number.isSafeInteger(textOptions.rows)||textOptions.rows<1||textOptions.rows>1024)throw new RangeError('rows must be a whole number from 1 to 1024');
        textOptions.leading=number(item.leading??textOptions.size*1.2,'leading',.001);
        textOptions.spacing=number(item.spacing??0,'spacing');
        if(item.width!==undefined)textOptions.width=number(item.width,'width',1);
        if(item.height!==undefined){
          if(item.width===undefined)throw new RangeError('height needs width: together they describe the box each line fills');
          textOptions.height=number(item.height,'height',1);
        }
        if(item.width!==undefined&&item.spacing!==undefined)throw new RangeError('Use width or spacing, not both');
        textOptions.align=item.align??'left';
        if(!['left','center','right'].includes(textOptions.align))throw new RangeError('align must be left, center or right');
        textOptions.gap=item.gap===undefined?null:number(item.gap,'gap');
        if(item.rule!==undefined&&item.rule!==false){
          const rule=item.rule===true?{}:item.rule;
          if(!rule||typeof rule!=='object'||Array.isArray(rule))throw new TypeError('rule must be true or an object with weight, color, before and after');
          for(const key of Object.keys(rule))if(!['weight','color','before','after'].includes(key))throw new RangeError('Unknown rule option: '+key);
          for(const key of ['before','after'])if(rule[key]!==undefined&&typeof rule[key]!=='boolean')throw new TypeError('rule '+key+' must be true or false');
          textOptions.rule={weight:number(rule.weight??4,'rule weight',.01),color:rule.color===undefined?null:colour(rule.color),before:rule.before===true,after:rule.after===true};
        }
      }
      return {...textOptions,x:number(item.x,'x'),y:number(item.y,'y'),angle:number(item.angle??0,'angle'),scale:number(item.scale??1,'scale',.001),color:colour(item.color??palette.ink)};
    });
    if(!p||typeof p.push!=='function'||typeof p.applyMatrix!=='function')throw new TypeError('stempel needs a p5 drawing context');
    const images=new Map();
    for(const [index,item] of copies.entries()){
      const material=fragmentSeries?source[index%source.length]:source;
      if(isFragment){
        if(!images.has(material))images.set(material,new Map());
        if(!images.get(material).has(item.color))images.get(material).set(item.color,material.bau(p,{color:item.color}));
      }
      p.push();try{
        const a=item.angle*Math.PI/180,c=Math.cos(a)*item.scale,s=Math.sin(a)*item.scale;
        p.applyMatrix(c,s,-s,c,item.x,item.y);
        if(isText){
          p.noStroke();p.fill(item.color);p.textStyle(p.NORMAL??'normal');p.textAlign(p.LEFT??'left',p.BASELINE??'alphabetic');p.textLeading(item.leading);
          const stretches=item.height!==undefined||lines.some(line=>line.some(segment=>segment.height!==undefined));
          if((stretches||item.rule)&&typeof p.textBounds!=='function')throw new TypeError('height and rule need text measurement from p5.js 2.x');
          const all=[];for(let row=0;row<item.rows;row++)all.push(...lines);
          const setFont=segment=>{p.textFont(familyFor(segment.font,segment.stretch));p.textSize(segment.size);if(typeof p.textWeight==='function')p.textWeight(segment.weight);};
          // Measure every segment first, then draw rules under the text.
          const layout=all.map((line,i)=>{
            const segments=line.map(raw=>{
              const segment={text:raw.text,size:raw.size??item.size,font:raw.font??item.font,weight:raw.weight??item.weight,stretch:raw.stretch??item.stretch,color:raw.color??item.color,spacing:raw.spacing??(raw.width!==undefined?0:item.spacing),width:raw.width,height:raw.height};
              if(line.length===1&&segment.width===undefined&&item.width!==undefined){segment.width=item.width;segment.height=item.height;}
              setFont(segment);
              if(segment.height!==undefined){
                const b=p.textBounds(segment.text,0,0);
                if(!(b.w>0&&b.h>0))return {...segment,width:0,empty:true};
                return {...segment,bounds:b,sx:segment.width/b.w,sy:segment.height/b.h};
              }
              if(segment.width===undefined&&segment.spacing===0)return {...segment,width:p.textWidth(segment.text)};
              const chars=[...segment.text],advances=chars.map(ch=>p.textWidth(ch));
              const natural=advances.reduce((sum,w)=>sum+w,0);
              const gap=segment.width===undefined?segment.spacing:chars.length>1?(segment.width-natural)/(chars.length-1):0;
              return {...segment,chars,advances,gap,width:segment.width??Math.max(0,natural+gap*(chars.length-1))};
            });
            const natural=segments.reduce((sum,segment)=>sum+segment.width,0);
            let gap=item.gap??item.size*.3;
            if(segments.length>1&&item.width!==undefined)gap=(item.width-natural)/(segments.length-1);
            const width=segments.length>1?natural+gap*(segments.length-1):segments[0].width;
            const start=item.align==='right'?-width:item.align==='center'?-width/2:0;
            return {y:i*item.leading,segments,gap,width,start};
          });
          if(item.rule){
            setFont(item);
            const cap=item.height??p.textBounds('H',0,0).h,span=item.width??Math.max(...layout.map(row=>row.width));
            const left=item.align==='right'?-span:item.align==='center'?-span/2:0;
            const slots=[];
            if(item.rule.before)slots.push(-1);
            for(let i=0;i<layout.length-1;i++)slots.push(i);
            if(item.rule.after)slots.push(layout.length-1);
            p.rectMode(p.CORNER??'corner');p.fill(item.rule.color??item.color);
            for(const i of slots){const cy=i*item.leading+(item.leading-cap)/2;p.rect(left,cy-item.rule.weight/2,span,item.rule.weight);}
            p.fill(item.color);
          }
          for(const row of layout){
            let x=row.start;
            for(const segment of row.segments){
              if(!segment.empty){
                setFont(segment);p.fill(segment.color);
                if(segment.bounds){const b=segment.bounds;p.push();p.translate(x-b.x*segment.sx,row.y-(b.y+b.h)*segment.sy);p.scale(segment.sx,segment.sy);p.text(segment.text,0,0);p.pop();}
                else if(segment.chars){let cx=x;for(const [k,ch] of segment.chars.entries()){p.text(ch,cx,row.y);cx+=segment.advances[k]+segment.gap;}}
                else p.text(segment.text,x,row.y);
              }
              x+=segment.width+row.gap;
            }
          }
        }
        else if(isFragment){p.imageMode(p.CORNER??'corner');p.noTint();p.image(images.get(material).get(item.color),0,0);}
        else if(isSheet){const data=sheetImages(source);p.imageMode(p.CORNER??'corner');p.noTint();p.image(data.paper,0,0);p.image(data.print,0,0);}
        else {
          p.noFill();p.stroke(item.color);p.strokeCap(p.PROJECT??'square');p.strokeJoin(p.MITER??'miter');
          for(const path of paths){p.strokeWeight(path.width);p.beginShape();for(const point of path.points)p.vertex(...point);p.endShape();}
        }
      }finally{p.pop();}
    }
    return copies.length;
  }
  // All cutting routes use source coordinates and return the same piece type.
  function noText(name, source) {
    if (typeof source === 'string') throw new TypeError(name + ' cuts geometry, an image or a fragment, not text. Make the letters first with Merz.satz(' + JSON.stringify(source.length > 24 ? source.slice(0, 24) + '…' : source) + ')');
  }
  function cutBounds(x, y, width, height) {
    number(x, 'x'); number(y, 'y');
    number(width, 'width', 1); number(height, 'height', 1);
    if (!Number.isFinite(x + width) || !Number.isFinite(y + height) ||
        Math.ceil(width) * Math.ceil(height) > 16000000) {
      throw new RangeError('cut must fit within 16 million pixels');
    }
  }
  function ausschnitt(source, x, y, width, height) {
    noText('ausschnitt', source);
    cutBounds(x, y, width, height);
    return schnitt(source, [[x,y], [x+width,y], [x+width,y+height], [x,y+height]]);
  }
  function rundschnitt(source, x, y, width, height = width) {
    noText('rundschnitt', source);
    cutBounds(x, y, width, height);
    const outline = Array.from({ length: 64 }, (_, i) => {
      const angle = i * Math.PI / 32;
      const cx = i === 16 || i === 48 ? 0 : Math.cos(angle);
      const cy = i === 0 || i === 32 ? 0 : Math.sin(angle);
      return [x + width * (1 + cx) / 2, y + height * (1 + cy) / 2];
    });
    return schnitt(source, outline);
  }
  function splitter(source, options = {}) {
    noText('splitter', source);
    if (!options || typeof options !== 'object' || Array.isArray(options)) throw new TypeError('splitter options must be an object');
    for (const key of Object.keys(options)) if (!['rows', 'columns'].includes(key)) throw new RangeError('Unknown splitter option: ' + key);
    const rows = options.rows ?? 1, columns = options.columns ?? 1;
    if (![rows, columns].every(n => Number.isSafeInteger(n) && n >= 1) || rows * columns > 1024) throw new RangeError('splitter needs positive whole counts, at most 1024 pieces');
    let x = 0, y = 0, width = source?.width, height = source?.height;
    if (fragmentData.has(source)) { x = source.x; y = source.y; }
    else if (Array.isArray(source?.paths) || Array.isArray(source) || width === undefined || height === undefined) {
      const paths = Array.isArray(source) ? source.flatMap(bauteil => bauteil?.paths || []) : source?.paths;
      if (!Array.isArray(paths) || !paths.length) throw new TypeError('splitter needs an image, geometry or letter parts');
      let right = -Infinity, bottom = -Infinity;
      x = Infinity; y = Infinity;
      for (const path of paths) {
        number(path.width, 'path width', Number.MIN_VALUE);
        if (!Array.isArray(path.points) || path.points.length < 2) throw new TypeError('source needs valid paths');
        for (const point of path.points) {
          if (!Array.isArray(point) || point.length !== 2 || !point.every(Number.isFinite)) throw new TypeError('source needs finite points');
          const half = path.width / 2;
          x = Math.min(x, point[0] - half); y = Math.min(y, point[1] - half);
          right = Math.max(right, point[0] + half); bottom = Math.max(bottom, point[1] + half);
        }
      }
      width = right - x; height = bottom - y;
    }
    cutBounds(x, y, width, height);
    if (width / columns < 1 || height / rows < 1) throw new RangeError('Each splitter piece must be at least one source unit wide and high');
    // Snapshot once; pieces share private, immutable material, not mutable source data.
    const whole = ausschnitt(source, x, y, width, height);
    const material = fragmentData.get(whole).material;
    const pieces = [];
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const left = x + column * width / columns, top = y + row * height / rows;
        const right = x + (column + 1) * width / columns, bottom = y + (row + 1) * height / rows;
        const outline = [[left, top], [right, top], [right, bottom], [left, bottom]];
        pieces.push(makeFragment(material, outline, outline));
      }
    }
    return pieces;
  }
  // Fragments keep source coordinates; rendering places the crop at image origin.
  function schnitt(source, outline) {
    noText('schnitt', source);
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
    const paths = Array.isArray(source) ? source.flatMap(bauteil => bauteil.paths || []) : source && source.paths;
    let material;
    // A fragment can be cut again; the new cut starts from its source material.
    if (fragmentData.has(source)) material = fragmentData.get(source).material;
    else if (paths) {
      if (!paths.length || paths.some(path => !Number.isFinite(path.width) || path.width <= 0 || !Array.isArray(path.points) || path.points.length < 2 || path.points.some(point => !Array.isArray(point) || point.length !== 2 || !point.every(Number.isFinite)))) throw new TypeError('source needs valid paths');
      material = { paths: copy(paths) };
    } else if (source && typeof source.get === 'function' && source.width > 0 && source.height > 0) {
      material = { image: source.get() };
    } else throw new TypeError('source must be geometry, a letter part, letter parts, or a p5 image/graphics');
    return makeFragment(material, boundary, boundary);
  }
  function rasterDensity(source) {
    const density = typeof source?.pixelDensity === 'function' ? source.pixelDensity() : 1;
    if (!Number.isInteger(density) || density < 1) throw new RangeError('pixel density must be a positive integer');
    return density;
  }
  function rasterImage(p, width, height, density) {
    const image = p.createImage(width * density, height * density);
    if (density !== 1) image.pixelDensity(density);
    return image;
  }
  const fragmentData = new WeakMap();
  function makeFragment(material, clean, edge) {
    const xs=clean.map(p=>p[0]),ys=clean.map(p=>p[1]);
    const x=Math.min(...xs),y=Math.min(...ys);
    const width=Math.ceil(Math.max(...xs)-x),height=Math.ceil(Math.max(...ys)-y);
    if (width < 1 || height < 1 || width*height > 16000000) throw new RangeError('schnitt must fit within 16 million pixels');
    const result = { x,y,width,height,
      outline: () => copy(edge),
      bau(p = root, options = {}) {
        if (p && typeof p === 'object' && !Array.isArray(p) && typeof p.createImage !== 'function' && typeof p.push !== 'function') { options = p; p = root; }
        if (!p || typeof p.createImage !== 'function') throw new TypeError('bau needs a p5 instance or globalThis');
        if (!options || typeof options !== 'object' || Array.isArray(options)) throw new TypeError('bau options must be an object');
        for (const key of Object.keys(options)) if (key !== 'color') throw new RangeError('Unknown bau option: ' + key);
        if (options.color !== undefined) colour(options.color);
        const canvas=root.document.createElement('canvas');
        const density=rasterDensity(material.image || p);
        const pixelWidth=width*density,pixelHeight=height*density;
        if(pixelWidth*pixelHeight>16000000)throw new RangeError('schnitt must fit within 16 million physical pixels');
        canvas.width=pixelWidth;canvas.height=pixelHeight;
        const ctx=canvas.getContext('2d',{willReadFrequently:true});
        {

          ctx.save();
          ctx.scale(density,density);
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
          const image=rasterImage(p,width,height,density);
          image.loadPixels();
          image.pixels.set(ctx.getImageData(0,0,pixelWidth,pixelHeight).data);
          image.updatePixels();
          return image;
        }
      }
    };
    Object.freeze(result);
    fragmentData.set(result,{material,clean});return result;
  }
  function riss(piece, options = {}) {
    const data=fragmentData.get(piece);
    if (!data) throw new TypeError('riss needs a library cut piece');
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
  // Static andruck masks; source pixels are always read anew.
  const surfaceMasks = new Map();
  const surfaceMaskLimit = 64 * 1024 * 1024;
  let surfaceMaskBytes = 0;
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
  function surfaceField(x,y,seed) {
    const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy,a=fx*fx*(3-2*fx),b=fy*fy*(3-2*fy);
    return (1-b)*((1-a)*surfaceHash(ix,iy,seed)+a*surfaceHash(ix+1,iy,seed))+b*((1-a)*surfaceHash(ix,iy+1,seed)+a*surfaceHash(ix+1,iy+1,seed));
  }
  function surfaceMask(width,height,settings) {
    const key=[width,height,settings.ink,settings.paper,settings.seed].join(':');
    if(surfaceMasks.has(key)){
      const cached=surfaceMasks.get(key);surfaceMasks.delete(key);surfaceMasks.set(key,cached);
      return cached;
    }
    const pixels=new Uint8ClampedArray(width*height*4);
    const spots=Array.from({length:3},(_,i)=>({x:surfaceHash(i,1,settings.seed)*width,y:surfaceHash(i,2,settings.seed)*height,r:(.12+.14*surfaceHash(i,3,settings.seed))*Math.min(width,height)}));
    const seed=settings.seed;
    for(let y=0;y<height;y++)for(let x=0;x<width;x++) {
      const grain=surfaceHash(x,y,seed),i=4*(y*width+x);
      let stain=0;
      for(const spot of spots) {const d=Math.hypot(x-spot.x,y-spot.y)/spot.r;stain=Math.max(stain,Math.max(0,1-d)**2);}
      // Sparse marks stay faint; solid ink remains solid enough to read.
      pixels[i]=Math.round(255*settings.ink*(.035*grain+.12*stain+(grain<.003?.25:0)));
      // Paper: tonal clouds, a finer field, fibre-like streaks and grain, measured against the Merz 2 and 8/9 covers at amount 1.
      // Stored around 128; darker tones also warm the colour when applied.
      let tone=0;
      if(settings.paper>0){
        const broad=surfaceField(x/60,y/60,seed+101)-.5,medium=surfaceField(x/14,y/14,seed+103)-.5;
        const fibre=surfaceField((x+.35*y)/2.2,y/9,seed+107)-.5,fine=grain-.5;
        const speck=surfaceHash(x,y,seed+109)>.9995?1:0;
        tone=settings.paper*.17*(.5*broad+.7*medium+.6*fibre+fine-.5*stain-1.5*speck);
      }
      pixels[i+1]=Math.round(Math.min(255,Math.max(0,128+tone*800)));
      pixels[i+2]=0;pixels[i+3]=255;
    }
    while(surfaceMasks.size && (surfaceMasks.size>=4 || surfaceMaskBytes+pixels.byteLength>surfaceMaskLimit)){
      const oldest=surfaceMasks.keys().next().value;
      surfaceMaskBytes-=surfaceMasks.get(oldest).byteLength;surfaceMasks.delete(oldest);
    }
    surfaceMasks.set(key,pixels);surfaceMaskBytes+=pixels.byteLength;
    return pixels;
  }
  function andruck(source,options={},p=root) {
    const plain=value=>value===undefined||(!!value&&typeof value==='object'&&!Array.isArray(value)&&!value.canvas&&typeof value.get!=='function'&&!isContext(value));
    if(plain(source))return makeSheet(source??{},arguments.length>=2?options:p);
    const settings=surfaceSettings(options);
    if(!source||!source.canvas||typeof source.get!=='function'||!p||typeof p.createImage!=='function') throw new TypeError('andruck needs a p5 image or graphics and a p5 drawing context');
    const width=source.width,height=source.height;
    if(!Number.isInteger(width)||!Number.isInteger(height)||width<1||height<1||width*height>16000000)throw new RangeError('andruck must fit within 16 million pixels');
    const density=rasterDensity(source),pixelWidth=width*density,pixelHeight=height*density;
    if(pixelWidth*pixelHeight>16000000)throw new RangeError('andruck must fit within 16 million physical pixels');
    // Keep the source pixels and its logical size.
    const canvas=root.document.createElement('canvas');canvas.width=pixelWidth;canvas.height=pixelHeight;
    const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(source.canvas,0,0,pixelWidth,pixelHeight);
    const clean=ctx.getImageData(0,0,pixelWidth,pixelHeight).data;
    const result=rasterImage(p,width,height,density);result.loadPixels();result.pixels.set(clean);
    if(settings.ink===0&&settings.paper===0){result.updatePixels();return result;}
    const mask=surfaceMask(width,height,settings);
    // Keep the original CPU arithmetic and rounding.
    for(let i=0;i<clean.length;i+=4){
      const pixel=i/4;
      const m=4*(Math.floor(pixel/pixelWidth/density)*width+Math.floor((pixel%pixelWidth)/density));
      const tone=(mask[m+1]-128)/800;
      // Darker paper tones warm the colour; lighter tones stay neutral.
      const r=tone<0?1+tone*.65:1+tone,g=tone<0?1+tone*.82:1+tone,b=1+tone;
      result.pixels[i]=Math.round(clean[i]*r);
      result.pixels[i+1]=Math.round(clean[i+1]*g);
      result.pixels[i+2]=Math.round(clean[i+2]*b);
      result.pixels[i+3]=Math.round(clean[i+3]*(1-mask[m]/255));
    }
    result.updatePixels();
    return result;
  }
  // Coordinates select the short drawing route; data calls keep their own signatures.
  const sheetData=new WeakMap();
  const sheetCalls=['stempel','satz','bauteile','bauteil','rundschnitt','riss','andruck','merzbilder'];
  function makeSheet(options={},p=root) {
    if(!options||typeof options!=='object'||Array.isArray(options))throw new TypeError('andruck options must be an object');
    for(const key of Object.keys(options))if(!['width','height','paper','ink','seed','color'].includes(key))throw new RangeError('Unknown andruck option: '+key);
    const settings=surfaceSettings({ink:options.ink??0.12,paper:options.paper??0.2,seed:options.seed??17});
    const color=colour(options.color??palette.paper);
    if(!p||typeof p.createGraphics!=='function'||typeof p.image!=='function')throw new TypeError('andruck needs a p5 drawing context to make a sheet');
    const size={};
    for(const key of ['width','height']){
      if(options[key]===undefined&&!(Number.isFinite(p[key])&&p[key]>=1))throw new TypeError('andruck needs a canvas size for the sheet: call createCanvas() first, or pass width and height');
      size[key]=number(options[key]??p[key],key,1);
      if(!Number.isInteger(size[key]))throw new RangeError(key+' must be a whole number');
    }
    if(size.width*size.height>16000000)throw new RangeError('a sheet must fit within 16 million pixels');
    const sheet=p.createGraphics(size.width,size.height);
    sheet.clear();
    // The paper ground is treated once; the ink is treated when the sheet is stamped.
    const ground=p.createGraphics(size.width,size.height);
    ground.pixelDensity(sheet.pixelDensity());
    ground.background(color);
    const data={paper:andruck(ground,{ink:0,paper:settings.paper,seed:settings.seed+1},p),print:null,settings,owner:p};
    ground.remove();
    for(const name of ['clear','background']){
      const original=sheet[name];
      sheet[name]=function(...args){data.print=null;return original.apply(this,args);};
    }
    // The sheet carries the drawing calls, so no context argument is needed.
    for(const name of sheetCalls)sheet[name]=(...args)=>root.Merz[name](...args,sheet);
    sheetData.set(sheet,data);
    return sheet;
  }
  function sheetImages(sheet){
    const data=sheetData.get(sheet);
    if(!data.print)data.print=andruck(sheet,{ink:data.settings.ink,paper:0,seed:data.settings.seed},data.owner);
    return data;
  }
  function drawingCall(name, original) {
    return function(source, ...args) {
      const offset = name === 'bauteil' ? 1 : 0;
      let [x, y, options = {}, p = root] = args.slice(offset);
      const direct = typeof x === 'number' && typeof y === 'number' &&
        (args[offset + 2] === undefined || typeof args[offset + 2] === 'object');
      if (!direct) return original(source, ...args);
      if (isContext(options) && args.length === offset + 3) { p = options; options = {}; }
      number(x, 'x'); number(y, 'y');
      if (!options || Array.isArray(options)) throw new TypeError(name + ' options must be an object');
      const allowed = ['color', 'angle', 'scale', 'size', 'weight', 'proportion', 'spacing', 'leading'];
      if (name === 'riss') allowed.push('amount', 'seed');
      if (name === 'andruck') allowed.push('ink', 'paper', 'seed');
      for (const key of Object.keys(options)) if (!allowed.includes(key)) throw new RangeError('Unknown ' + name + ' option: ' + key);
      const placement = { x, y, color: options.color ?? palette.ink, angle: options.angle ?? 0, scale: options.scale ?? 1 };
      colour(placement.color); number(placement.angle, 'angle'); number(placement.scale, 'scale', .001);
      if (!p || typeof p.push !== 'function' || typeof p.applyMatrix !== 'function') throw new TypeError(name + ' needs a p5 drawing context');
      let material;
      if (name === 'bauteil') material = bauteil(source, args[0], options);
      else if (name === 'bauteile') material = bauteile(source, options);
      else material = typeof source === 'string' ? satz(source, options) : source;
      if (name === 'satz' || name === 'bauteil' || name === 'bauteile') return stempel(material, placement, p);
      if (name === 'rundschnitt' && fragmentData.has(material)) material = material.bau(p, { color: placement.color });
      // One full-size cut supplies the natural bounds, including path strokes.
      const full = fragmentData.has(material) ? material : splitter(material)[0];
      const left = full.x, top = full.y, width = full.width, height = full.height;
      let piece;
      if (name === 'rundschnitt') piece = rundschnitt(material, left, top, width, height);
      if (name === 'riss') piece = riss(full, options);
      if (name === 'andruck') {
        const printed = andruck(full.bau(p, { color: placement.color }), options, p);
        piece = ausschnitt(printed, 0, 0, printed.width, printed.height);
      }
      return stempel(piece, placement, p);
    };
  }
  root.Merz=Object.freeze({version:'0.3.0',palette,farbe:settings(),ready,settings,
    satz:drawingCall('satz',satz),bauteile:drawingCall('bauteile',bauteile),bauteil:drawingCall('bauteil',bauteil),
    ausschnitt,rundschnitt:drawingCall('rundschnitt',rundschnitt),splitter,schnitt,riss:drawingCall('riss',riss),
    andruck:drawingCall('andruck',andruck),stempel,merzbilder,characters:Object.keys(glyphs).join(''),create:options=>new MerzComposition(options)});
  root.MerzComposition=MerzComposition;
})(globalThis);

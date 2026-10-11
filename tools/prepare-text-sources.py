"""Preserve the eight Merz issues indexed by the International Dada Archive.

Run with the bundled Python (Pillow and pypdf). Source images and contact
sheets are for transcription review; this does not invent text records.
"""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import urlopen
from urllib.parse import urljoin
import hashlib
import html
import json
import re
from PIL import Image, ImageDraw
from pypdf import PdfReader

root = Path(__file__).resolve().parents[1]
folder = root / 'assets/fundsachen/texts'
scans = folder / 'source-scans'
review = root / 'reports/text-review'
scans.mkdir(parents=True, exist_ok=True)
review.mkdir(parents=True, exist_ok=True)
pages = []
for issue in ['1', '2', '4', '6', '7', '8', '20', '21']:
    index = f'https://sdrc.lib.uiowa.edu/dada/merz/{issue}/index.htm'
    document = urlopen(index, timeout=60).read().decode('utf-8', errors='replace')
    for cell in re.findall(r'<td\b[^>]*>(.*?)</td>', document, re.I | re.S):
        match = re.search(r'href\s*=\s*"([^"]+\.pdf)"', cell, re.I)
        if not match:
            continue
        url = urljoin(index, match[1])
        stem = Path(match[1]).stem
        label = html.unescape(re.sub(r'<[^>]+>', ' ', cell)).split('View')[0].strip()
        pages.append(dict(id=f'merz-{issue}-{stem}', issue='8/9' if issue == '8' else issue,
                          page=label, source=url, index=index,
                          file=f'source-scans/merz-{issue}-{stem}.pdf',
                          image=f'source-scans/merz-{issue}-{stem}.png'))

def preserve(entry):
    pdf = folder / entry['file']
    if not pdf.exists():
        pdf.write_bytes(urlopen(entry['source'], timeout=90).read())
    entry['sha256'] = hashlib.sha256(pdf.read_bytes()).hexdigest()
    image_path = folder / entry['image']
    if not image_path.exists():
        page = PdfReader(pdf).pages[0]
        if len(page.images) != 1:
            raise ValueError(f"Expected one scan: {entry['id']}")
        page.images[0].image.save(image_path)
    with Image.open(image_path) as image:
        entry['pixels'] = list(image.size)
    return entry

with ThreadPoolExecutor(max_workers=4) as pool:
    pages = list(pool.map(preserve, pages))
(folder / 'sources.json').write_text(json.dumps(pages, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
for issue in ['1', '2', '4', '6', '7', '8/9', '20', '21']:
    selected = [p for p in pages if p['issue'] == issue]
    for start in range(0, len(selected), 6):
        sheet = Image.new('RGB', (1800, 2600), 'white')
        draw = ImageDraw.Draw(sheet)
        for i, entry in enumerate(selected[start:start+6]):
            x, y = (i % 3) * 600, (i // 3) * 1300
            draw.text((x+12, y+10), entry['id'] + ' / ' + entry['page'], fill='black')
            with Image.open(folder / entry['image']) as scan:
                scan = scan.convert('RGB')
                scan.thumbnail((580, 1240))
                sheet.paste(scan, (x+10, y+40))
        sheet.save(review / f"merz-{issue.replace('/', '-')}-{start//6+1}.jpg", quality=94)
print(f'{len(pages)} pages preserved across eight issues; contact sheets in reports/text-review.')

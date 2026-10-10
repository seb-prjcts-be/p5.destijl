"""Re-extract catalogue rectangles from the preserved source scans."""
import json
from pathlib import Path
from PIL import Image, PngImagePlugin

root = Path(__file__).resolve().parents[1]
folder = root / 'assets/fundsachen'
items = json.loads((folder / 'catalogue.json').read_text(encoding='utf-8'))
for item in items:
    # Keep the original three exported study crops byte-identical.
    if int(item['id']) <= 3:
        continue
    source = (folder / item['scan']).resolve()
    with Image.open(source) as image:
        x, y, width, height = item['crop']
        assert width == item['width'] and height == item['height']
        assert 0 <= x < x + width <= image.width
        assert 0 <= y < y + height <= image.height
        info = PngImagePlugin.PngInfo()
        for key, value in [('Source', item['source']), ('Credit', item['credit']),
                           ('Crop', json.dumps(item['crop'])), ('Fundsachen', item['id'] + ' / ' + item['name'])]:
            info.add_text(key, value)
        image.crop((x, y, x + width, y + height)).save(folder / item['file'], pnginfo=info)
print(f'{len(items)} catalogue entries checked; new crops rebuilt.')

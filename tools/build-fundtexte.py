"""Build the text catalogue from the hand-selected, scan-reviewed passages.

selections.json rows: source id, page language hint, words, phrases,
sentence excerpts, sound fragments. Existing public IDs are retained.
"""
from collections import Counter
from pathlib import Path
import json
import unicodedata

root = Path(__file__).resolve().parents[1]
folder = root / 'assets/fundsachen/texts'
sources = {s['id']: s for s in json.loads((folder / 'sources.json').read_text(encoding='utf-8'))}
selections = json.loads((folder / 'selections.json').read_text(encoding='utf-8'))
output = folder / 'catalogue.json'
previous = json.loads(output.read_text(encoding='utf-8')) if output.exists() else []
def key(text):
    return unicodedata.normalize('NFC', text).strip()
ids = {key(r['text']): r['id'] for r in previous}
next_id = max([int(i[1:]) for i in ids.values()] + [0]) + 1
records = {}
reviewed = set()
for source_id, language, *groups in selections:
    assert source_id in sources, source_id
    assert source_id not in reviewed, source_id
    reviewed.add(source_id)
    source = sources[source_id]
    for kind, texts in zip(['word', 'phrase', 'sentence', 'sound'], groups):
        for text in texts:
            text = key(text)
            assert text and '\ufffd' not in text, source_id
            actual_kind = 'phrase' if kind == 'word' and len(text.split()) > 1 else kind
            if kind == 'sentence' and not text.endswith(('.', '?', '!')):
                actual_kind = 'phrase'
            if text not in records:
                if text not in ids:
                    ids[text] = f'T{next_id:03d}'
                    next_id += 1
                records[text] = dict(id=ids[text], text=text, kind=actual_kind,
                                     pageLanguages=[], review='scan-checked', sources=[])
            record = records[text]
            if language not in record['pageLanguages']:
                record['pageLanguages'].append(language)
            if not any(s['id'] == source_id for s in record['sources']):
                record['sources'].append(dict(id=source_id, issue=source['issue'], page=source['page'],
                                             url=source['source'], pdf=source['file'], image=source['image']))
items = sorted(records.values(), key=lambda r: int(r['id'][1:]))
output.write_text(json.dumps(items, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
lines = ['Fundsachen - words and phrases', '', 'International Dada Archive, University of Iowa Libraries.',
         'Selected short passages; not a complete transcription. Original spelling and case.', '']
for item in items:
    lines += [item['id'] + ' / ' + item['kind'], item['text']]
    for source in item['sources']:
        lines.append('Merz ' + source['issue'] + ', ' + source['page'] + ' - ' + source['url'])
    lines.append('')
(folder / 'fundtexte.txt').write_text('\n'.join(lines), encoding='utf-8', newline='\n')
coverage = [dict(id=s['id'], issue=s['issue'], page=s['page'],
                 review='selected' if s['id'] in reviewed else 'no verbal passage selected') for s in sources.values()]
(folder / 'coverage.json').write_text(json.dumps(coverage, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'{len(items)} distinct texts, {sum(len(i["sources"]) for i in items)} source references, {len(reviewed)}/{len(sources)} pages selected.')
print(dict(Counter(i['kind'] for i in items)))

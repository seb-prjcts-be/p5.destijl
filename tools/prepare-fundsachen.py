"""Separate scan ink from paper; trace selected silhouettes as SVG paths."""
import json
from collections import defaultdict
from pathlib import Path
from xml.sax.saxutils import escape
import numpy as np
from PIL import Image, PngImagePlugin

root = Path(__file__).resolve().parents[1]
folder = root / 'assets/fundsachen'
items = json.loads((folder / 'catalogue.json').read_text(encoding='utf-8'))

def separate(image):
    rgb = np.asarray(image.convert('RGB'), dtype=float)
    flat = rgb.reshape(-1, 3)
    light = flat @ np.array([.2126, .7152, .0722])
    ink = np.median(flat[light <= np.percentile(light, 15)], axis=0)
    paper = np.median(flat[light >= np.percentile(light, 85)], axis=0)
    for _ in range(12):
        near_ink = ((flat - ink)**2).sum(axis=1) < ((flat - paper)**2).sum(axis=1)
        ink = np.median(flat[near_ink], axis=0)
        paper = np.median(flat[~near_ink], axis=0)
    direction = paper - ink
    coverage = np.clip(((rgb - paper) * -direction).sum(axis=2) / (direction @ direction), 0, 1)
    # Remove the low-contrast paper field while retaining partial ink edges.
    alpha = np.clip((coverage - .16) / .78, 0, 1)
    alpha = alpha * alpha * (3 - 2 * alpha)
    recovered = np.clip((rgb - (1 - coverage[..., None]) * paper) / np.maximum(coverage[..., None], .1), 0, 255)
    recovered[alpha == 0] = 0
    rgba = np.dstack((np.rint(recovered), np.rint(alpha * 255))).astype('uint8')
    return Image.fromarray(rgba), alpha, ink

def simplify(points, epsilon=.45):
    if len(points) < 3:
        return points
    a, b = np.array(points[0]), np.array(points[-1])
    p = np.array(points[1:-1]); v = b-a
    if np.dot(v,v) == 0:
        distances = np.linalg.norm(p-a,axis=1)
    else:
        t = np.clip(((p-a) @ v) / np.dot(v,v), 0, 1)
        distances = np.linalg.norm(p-(a+t[:,None]*v),axis=1)
    i = int(np.argmax(distances)) + 1
    if distances[i-1] <= epsilon:
        return [points[0],points[-1]]
    return simplify(points[:i+1],epsilon)[:-1]+simplify(points[i:],epsilon)

def contours(mask):
    height,width=mask.shape
    edges=defaultdict(list)
    for y,x in zip(*np.nonzero(mask)):
        x,y=int(x),int(y)
        if y==0 or not mask[y-1,x]: edges[(x,y)].append((x+1,y))
        if x==width-1 or not mask[y,x+1]: edges[(x+1,y)].append((x+1,y+1))
        if y==height-1 or not mask[y+1,x]: edges[(x+1,y+1)].append((x,y+1))
        if x==0 or not mask[y,x-1]: edges[(x,y+1)].append((x,y))
    paths=[]
    while edges:
        start=next(iter(edges));point=start;loop=[start]
        while True:
            destinations=edges[point];target=destinations.pop()
            if not destinations: del edges[point]
            point=target;loop.append(point)
            if point==start: break
        if len(loop)<5: continue
        # Split the closed loop before simplification so closure is preserved.
        half=len(loop)//2
        reduced=simplify(loop[:half+1])[:-1]+simplify(loop[half:])
        paths.append('M'+' L'.join(f'{x},{y}' for x,y in reduced)+' Z')
    return ' '.join(paths)

for item in items:
    with Image.open(folder/item['file']) as original:
        image,alpha,ink=separate(original)
    item['inkFile']=item['name']+'-ink.png'
    info=PngImagePlugin.PngInfo()
    for key,value in [('Source',item['source']),('Credit',item['credit']),('Processing','Paper separated by two-colour coverage estimation; original scan retained.')]: info.add_text(key,value)
    image.save(folder/item['inkFile'],pnginfo=info)
    if item['category'] in ['letter','number','rule']:
        item['svgFile']=item['name']+'.svg'
        colour='#'+''.join(f'{int(c):02x}' for c in np.rint(ink).astype(int))
        svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{item["width"]}" height="{item["height"]}" viewBox="0 0 {item["width"]} {item["height"]}"><title>{escape(item["label"])}</title><desc>{escape(item["credit"]+"; "+item["source"]+"; traced silhouette")}</desc><path fill="{colour}" fill-rule="evenodd" d="{contours(alpha>=.5)}"/></svg>\n'
        (folder/item['svgFile']).write_text(svg,encoding='utf-8')
    assert np.any(np.asarray(image)[:,:,3]==0),item['name']
    assert np.any(np.asarray(image)[:,:,3]>0),item['name']
(folder/'catalogue.json').write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'{len(items)} transparent PNGs; {sum("svgFile" in item for item in items)} SVG silhouettes.')

# Fundsachen sources

28 samples, with permanent numbers and names. Each catalogue PNG can be downloaded separately. Original scan colour and paper remain in each original crop. Transparent PNGs and SVG silhouettes are separate derived files.

The Merz 2 reuse record remains to be verified. Its existing references record the basis used for the study; they are not a completed rights review.

## Source scans

- 001-003 use the 314 x 480 Merz 2 cover JPEG, copied unchanged to source-scans/merz-2-cover-small.jpg. [Original source and reuse record](../../experiments/merz-fragments/sources.md).
- 004-011 use the 855 x 1307 embedded image from the [Merz 2 cover PDF](https://sdrc.lib.uiowa.edu/dada/merz/2/images/00cover.pdf).
- 012-015 use the 851 x 1308 embedded image from [Merz 2, page 17](https://sdrc.lib.uiowa.edu/dada/merz/2/images/17.pdf).
- 016-028 use the 1125 x 1460 embedded image from the [Merz 8/9 cover PDF](https://sdrc.lib.uiowa.edu/dada/merz/8/images/00cover.pdf).

Credit: International Dada Archive, University of Iowa Libraries. The Merz 8/9 cover names El Lissitzky and Kurt Schwitters as editors and credits its typography to El Lissitzky. A pointing hand is catalogued as a found printed element, without a separate designer attribution. These scan assets are separate from the code's MIT licence.

The PDFs and extracted page images are preserved in assets/fundsachen/source-scans. sources.json records PDF hashes and scan dimensions. Crops below use those original pixel coordinates, without resizing. New PNGs carry Source, Credit, Crop and Fundsachen text metadata. tools/build-fundsachen.py rebuilds the new crops; the first three remain unchanged. assets/fundsachen/catalogue.json is the registry used by the library build and catalogue.

The catalogue field `scan` points to the complete source image under source-scans/. The `file` field names the cropped image with paper, used by `variant: 'scan'`.

## Elements

| ID | Name | Crop: x, y, width, height |
|---|---|---|
| 001 | [merz-2-cover-m](merz-2-cover-m.png) | 10, 55, 70, 140 |
| 002 | [merz-2-cover-r](merz-2-cover-r.png) | 171, 55, 58, 140 |
| 003 | [merz-2-cover-rule](merz-2-cover-rule.png) | 12, 30, 282, 7 |
| 004 | [merz-2-cover-e](merz-2-cover-e.png) | 282, 145, 117, 377 |
| 005 | [merz-2-cover-z](merz-2-cover-z.png) | 670, 146, 133, 380 |
| 006 | [merz-2-cover-two](merz-2-cover-two.png) | 25, 535, 122, 167 |
| 007 | [merz-2-cover-nummer](merz-2-cover-nummer.png) | 27, 748, 523, 80 |
| 008 | [merz-2-cover-i](merz-2-cover-i.png) | 552, 572, 260, 266 |
| 009 | [merz-2-cover-boat](merz-2-cover-boat.png) | 18, 841, 232, 190 |
| 010 | [merz-2-cover-hand](merz-2-cover-hand.png) | 19, 1039, 94, 217 |
| 011 | [merz-2-cover-april-1923](merz-2-cover-april-1923.png) | 125, 1126, 228, 45 |
| 012 | [merz-2-17-i](merz-2-17-i.png) | 115, 22, 315, 249 |
| 013 | [merz-2-17-seventeen](merz-2-17-seventeen.png) | 691, 72, 100, 94 |
| 014 | [merz-2-17-kuenstler](merz-2-17-kuenstler.png) | 380, 1104, 135, 42 |
| 015 | [merz-2-17-gestempelt](merz-2-17-gestempelt.png) | 257, 977, 112, 35 |
| 016 | [merz-8-cover-m](merz-8-cover-m.png) | 244, 91, 159, 319 |
| 017 | [merz-8-cover-e](merz-8-cover-e.png) | 452, 91, 105, 320 |
| 018 | [merz-8-cover-r](merz-8-cover-r.png) | 601, 90, 136, 321 |
| 019 | [merz-8-cover-z](merz-8-cover-z.png) | 773, 92, 115, 319 |
| 020 | [merz-8-cover-eight](merz-8-cover-eight.png) | 78, 202, 140, 208 |
| 021 | [merz-8-cover-nine](merz-8-cover-nine.png) | 906, 203, 135, 208 |
| 022 | [merz-8-cover-nasci](merz-8-cover-nasci.png) | 693, 566, 344, 109 |
| 023 | [merz-8-cover-natur](merz-8-cover-natur.png) | 291, 616, 225, 59 |
| 024 | [merz-8-cover-kraft](merz-8-cover-kraft.png) | 291, 1051, 251, 60 |
| 025 | [merz-8-cover-rule](merz-8-cover-rule.png) | 260, 678, 830, 22 |
| 026 | [merz-8-cover-hand](merz-8-cover-hand.png) | 79, 1052, 54, 103 |
| 027 | [merz-8-cover-1924](merz-8-cover-1924.png) | 74, 1339, 145, 48 |
| 028 | [merz-8-cover-gestaltet](merz-8-cover-gestaltet.png) | 293, 1138, 745, 61 |

## Transparent ink and SVG

`prepare-fundsachen.py` derives an ink/paper pair from each crop using median two-cluster colour estimation, projects pixels onto that colour axis, and removes low-contrast paper coverage. Partial coverage retains antialiased edges. The edge RGB is unmixed against estimated paper to reduce coloured fringes. This can remove faint ink or retain dark paper marks, including part of the annotation beside item 012. Originals remain available for comparison. Item 024 excludes the adjacent blue rule by trimming three bottom rows.

Transparent PNGs use the `-ink.png` suffix. SVG silhouettes are supplied for 17 letters, numerals and rules: threshold at half alpha, closed pixel-edge contours, simplified at 0.45 source pixels with even-odd filling to preserve counters. They use one estimated ink colour, so they do not retain the PNG's ink variation. SVG files contain paths, not embedded raster images. Source links and credits are recorded in both variants.

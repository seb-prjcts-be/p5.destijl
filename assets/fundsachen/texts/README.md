# Fundsachen - words and phrases

Short found texts from the eight Merz issues made available by the [International Dada Archive, University of Iowa Libraries](https://sdrc.lib.uiowa.edu/dada/merz/): 1, 2, 4, 6, 7, 8/9, 20 and 21. All 121 listed scan pages were reviewed. This is a selection of words, phrases, sentence excerpts and sound fragments, not a complete transcription of the magazines.

- `catalogue.json`: distinct texts with stable T-prefixed IDs and source references.
- `fundtexte.txt`: the same collection as a readable UTF-8 text list.
- `selections.json`: the hand-selected passages grouped by source page.
- `sources.json`: every source PDF, its SHA-256 hash and embedded scan dimensions.
- `coverage.json`: which reviewed pages supplied text. Blank pages and a page containing only a drawing and a question mark supplied no verbal passage.
- `source-scans/`: the preserved PDFs and extracted embedded images. Some Merz 6 embedded images are inverted; use the original PDF for page presentation.

Dutch-language words and passages are omitted from this selection. Non-verbal sound fragments and German words on Dutch-language pages remain.

Each text was checked visually against the scan. Original spelling, case and punctuation are retained; ordinary layout line wraps and hyphenated word wraps are joined. Sound fragments preserve the selected reading order and line breaks, not a facsimile of the spatial typography. A sentence excerpt may begin or end inside a longer sentence. `pageLanguages` is a reading aid for the source page, not a language classification of every isolated word; `mul` marks mixed language material. Different case or punctuation can give distinct records. Exact repeats share an ID with multiple source references.

Source references identify where the text was found. They do not assign every line to the issue editor: pages include quotations, advertisements, contributors' writing and found material. The handwritten question in Merz 2 is recorded as handwriting, rather than magazine body type. The archive identifies it as Schwitters's note. The Merz 20 scan includes a 1975 reprint imprint; the issue text is catalogued as Merz 20 (1927), without describing the scanned copy as an original 1927 printing.

These texts, source scans and facsimile derivatives are separate from the code's MIT licence. Reuse status has not been reviewed entry by entry. The existing Merz 2 reuse record remains unresolved. See [Fundsachen sources](../SOURCES.md).

Run `tools/build-fundtexte.py` with Python to rebuild the catalogue and readable list. IDs already in the catalogue are retained. `prepare-text-sources.py` preserves the archive sources; `read-text-scans.ps1` creates an internal OCR draft for search and review. OCR output is not imported into the catalogue automatically.

Copy a text into ordinary p5 code, for example `Merz.stempel('Kunstwerk ist Gleichgewicht.', 40, 100)`. Geometric `satz()` supports a smaller character set; ordinary text stamps keep the spelling and case as supplied.

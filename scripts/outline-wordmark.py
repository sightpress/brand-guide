#!/usr/bin/env python3
"""Outline the SightPress wordmark from Atkinson Hyperlegible Next.

The logo must never depend on an installed font, so the wordmark ships as
SVG paths. Re-run this only when the wordmark changes:

    python3 -m venv .venv && .venv/bin/pip install fonttools
    .venv/bin/python scripts/outline-wordmark.py fonts/src/AtkinsonHyperlegibleNext[wght].ttf

It prints JSON: {"Sight": {...}, "Press": {...}, "width": ..., "ascent": ...}
with path data in font units scaled to a 100-unit cap height, baseline at y=0.
"""
import json
import sys

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

WEIGHT = 760
TRACKING = -0.01  # em, slight tightening at display size


def outline(font_path: str) -> dict:
    font = instantiateVariableFont(TTFont(font_path), {"wght": WEIGHT})
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    upm = font["head"].unitsPerEm
    cap = font["OS/2"].sCapHeight
    scale = 100 / cap
    hmtx = font["hmtx"]

    x = 0.0
    parts = {}
    prev = None
    for word in ("Sight", "Press"):
        pen = SVGPathPen(glyphs, ntos=lambda v: f"{v:.1f}".rstrip("0").rstrip("."))
        for ch in word:
            name = cmap[ord(ch)]
            # flip y: font units are y-up, SVG is y-down
            tpen = TransformPen(pen, (scale, 0, 0, -scale, x, 0))
            glyphs[name].draw(tpen)
            x += (hmtx[name][0] + TRACKING * upm) * scale
            prev = name
        parts[word] = pen.getCommands()
    return {**parts, "width": round(x, 1), "capHeight": 100, "weight": WEIGHT}


if __name__ == "__main__":
    print(json.dumps(outline(sys.argv[1]), indent=1))

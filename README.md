# Cheat Sheet Maker

Create printable, interactive cheat sheets with draggable, resizable tiles for text and images.  
Try it live: [Cheat Sheet Maker Demo](https://binkersss.github.io/cheat-sheet-maker/cheatSheet.html)

---

## Features

- **Drag & Drop Tiles:** Add, move, and resize tiles anywhere on the page.
- **Text & Images:** Each tile supports text (with a textarea) and pasted images (Ctrl+V).
- **Snap to Grid:** Tiles snap to a 20px grid for easy alignment.
- **Multiple Page Sizes:** Choose between an 8.5x11" sheet or a 4x5" notecard.
- **Print to PDF:** Print your layout directly to PDF for easy sharing or physical use.
- **Save & Import:** Download your cheat sheet as an HTML snapshot and re-import it later.
- **No Autosave:** Manual save ensures you control when your work is stored.

---

## Usage

1. **Add Tiles:** Click "Add Tile" to create a new draggable/resizable tile.
2. **Edit Content:** Type in the textarea or paste images into a selected tile.
3. **Select & Delete:** Click a tile to select (highlighted in red), then "Delete Selected" to remove.
4. **Resize/Move:** Drag tiles or resize from edges; snapping keeps things tidy.
5. **Change Page Size:** Use the dropdown to switch between notecard and paper sizes.
6. **Print:** Click "Print to PDF" for a print-friendly version.
7. **Save/Import:** Use "Save" to download your layout, and "Import File" to restore it.

---

## File Structure

- [`cheatSheet.html`](cheatSheet.html): Main HTML file and UI.
- [`styles.css`](styles.css): Styling for the page and tiles.
- [`page.js`](page.js): Core logic for tile creation, selection, drag, and resize.
- [`print.js`](print.js): Print-to-PDF functionality.
- [`save.js`](save.js): Save/import logic for cheat sheet state.

---

## Technical Details

- **No frameworks required.**  
- Uses [Interact.js](https://interactjs.io/) for drag and resize, [html2canvas](https://html2canvas.hertzen.com/) and [jsPDF](https://github.com/parallax/jsPDF) for advanced print/PDF (optional).
- All state is managed in the DOM; saving exports the current layout as HTML.

---

## Development

Clone and open `cheatSheet.html` in your browser.  
No build step required.

```sh
git clone https://github.com/binkersss/cheat-sheet-maker.git
cd cheat-sheet-maker
# Open [cheatSheet.html](http://_vscodecontentref_/0) in your browser
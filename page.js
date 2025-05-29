let tileCount = 0;
let selectedTile = null;
const gridSize = 20;

function resize() {
    const page = document.getElementById('page');
    const selectedSize = document.getElementById('pageSizeSelect').value;

    if (selectedSize === "1") { // 4 x 5 notecard
        page.style.width = '480px';
        page.style.height = '384px';
    } else if (selectedSize == "2") { // 8.5 x 11 paper
        page.style.width = '816px';
        page.style.height = '1056px';
    }
    page.style.width = ''
}

function addTile() {
    const page = document.getElementById('page');
    const tile = document.createElement('div');
    tile.className = 'cell';
    tile.style.top = '20px';
    tile.style.left = '20px';
    tile.style.width = '120px';
    tile.style.height = '120px';
    tile.setAttribute('data-x', 0);
    tile.setAttribute('data-y', 0);

    const textarea = document.createElement('textarea');
    textarea.placeholder = `Tile ${++tileCount}`;
    tile.appendChild(textarea);

    tile.addEventListener('click', (e) => {
    e.stopPropagation();
    if (selectedTile) selectedTile.classList.remove('selected');
    selectedTile = tile;
    tile.classList.add('selected');
    });

    page.appendChild(tile);
    makeInteractive(tile);
}

function deleteSelected() {
    if (selectedTile) {
    selectedTile.remove();
    selectedTile = null;
    }
}

document.getElementById('page').addEventListener('click', () => {
    if (selectedTile) selectedTile.classList.remove('selected');
    selectedTile = null;
});

document.addEventListener('paste', (event) => {
    if (!selectedTile) return;
    const items = event.clipboardData.items;
    for (const item of items) {
    if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);
        selectedTile.appendChild(img);
    }
    }
});

function makeInteractive(target) {
    interact(target)
    .draggable({
        modifiers: [
        interact.modifiers.snap({
            targets: [interact.snappers.grid({ x: gridSize, y: gridSize })],
            range: gridSize,
            relativePoints: [{ x: 0, y: 0 }]
        }),
        interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
        })
        ],
        listeners: {
        move (event) {
            const target = event.target;
            let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            x = Math.round(x / gridSize) * gridSize;
            y = Math.round(y / gridSize) * gridSize;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
        }
    })
    .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        modifiers: [
        interact.modifiers.snapSize({
            targets: [interact.snappers.grid({ x: gridSize, y: gridSize })]
        }),
        interact.modifiers.restrictEdges({
            outer: 'parent'
        }),
        interact.modifiers.restrictSize({
            min: { width: 60, height: 60 }
        })
        ],
        listeners: {
        move (event) {
            let x = parseFloat(event.target.getAttribute('data-x')) || 0;
            let y = parseFloat(event.target.getAttribute('data-y')) || 0;

            Object.assign(event.target.style, {
            width: `${event.rect.width}px`,
            height: `${event.rect.height}px`,
            transform: `translate(${x + event.deltaRect.left}px, ${y + event.deltaRect.top}px)`
            });

            event.target.setAttribute('data-x', x + event.deltaRect.left);
            event.target.setAttribute('data-y', y + event.deltaRect.top);
        }
        }
    });
}
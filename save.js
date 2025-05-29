// function saveDomState(id) {
//   const container = document.getElementById(id);
//   if (!container) return;

//   const clone = container.cloneNode(true);

//   // Copy textarea values into the clone
//   const originalTextareas = container.querySelectorAll('textarea');
//   const clonedTextareas = clone.querySelectorAll('textarea');
//   originalTextareas.forEach((textarea, i) => {
//     clonedTextareas[i].value = textarea.value;
//     clonedTextareas[i].textContent = textarea.value; // Ensures value is saved in innerHTML
//   });

//   // Remove selection state
//   clone.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));

//   const html = clone.innerHTML;
//   const blob = new Blob([html], { type: 'text/html' });
//   const url = URL.createObjectURL(blob);

//   const a = document.createElement('a');
//   a.href = url;
//   let fName = window.prompt("Please enter the filename (with no spaces, special characters, or file type):", "");
//   if (fName != null) {
//     a.download = fName + ".html";
//   } else {
//     a.download = 'page-content.html';
//   }
//   a.click();

//   URL.revokeObjectURL(url);
// }

async function saveDomState(id) {
  const container = document.getElementById(id);
  if (!container) return;

  const clone = container.cloneNode(true);

  // Copy textarea values into the clone
  const originalTextareas = container.querySelectorAll('textarea');
  const clonedTextareas = clone.querySelectorAll('textarea');
  originalTextareas.forEach((textarea, i) => {
    clonedTextareas[i].value = textarea.value;
    clonedTextareas[i].textContent = textarea.value;
  });

  // Convert blob URLs to base64
  const images = clone.querySelectorAll('img');
  await Promise.all(Array.from(images).map(async (img) => {
    if (img.src.startsWith('blob:')) {
      const blob = await fetch(img.src).then(r => r.blob());
      const reader = new FileReader();
      const base64 = await new Promise(resolve => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
      img.src = base64;
    }
  }));

  // Remove selection state
  clone.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));

  const html = clone.innerHTML;
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  let fName = window.prompt("Please enter the filename (with no spaces, special characters, or file type):", "");
  a.download = fName ? fName + ".html" : 'page-content.html';
  a.click();

  URL.revokeObjectURL(url);
}


function loadDomStateFromFile(event, id) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const container = document.getElementById(id);
    if (!container) {
      console.error(`Element with id "${id}" not found.`);
      return;
    }

    container.innerHTML = e.target.result;

    // Reapply interactivity and event listeners
    container.querySelectorAll('.cell').forEach(tile => {
      tile.addEventListener('click', (e) => {
        e.stopPropagation();
        if (selectedTile) selectedTile.classList.remove('selected');
        selectedTile = tile;
        tile.classList.add('selected');
      });
      makeInteractive(tile);
    });
  };

  reader.onerror = function(err) {
    console.error('Error reading file:', err);
  };

  reader.readAsText(file);
}

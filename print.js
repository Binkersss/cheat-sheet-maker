function printDiv(divId) {
    const originalElement = document.getElementById(divId);
    const clonedElement = originalElement.cloneNode(true);

    // Replace each textarea with a div containing its current value
    const textareas = originalElement.querySelectorAll('textarea');
    const clonedTextareas = clonedElement.querySelectorAll('textarea');

    textareas.forEach((textarea, index) => {
        const value = textarea.value;
        const displayDiv = document.createElement('div');
        displayDiv.textContent = value;

        // Style to mimic a textarea
        displayDiv.style.whiteSpace = 'pre-wrap';
        displayDiv.style.border = '1px solid #ccc';
        displayDiv.style.padding = '4px';
        displayDiv.style.minHeight = '1em';
        displayDiv.style.fontFamily = 'monospace'; // Ensures monospace font
        displayDiv.style.fontSize = '13px'; // Optional: match textarea font size

        clonedTextareas[index].parentNode.replaceChild(displayDiv, clonedTextareas[index]);
    });

    const printWindow = window.open('', '', 'width=600,height=600');
    const styles = './styles.css';

    printWindow.document.write(`
        <html>
            <head>
            <title>Print</title>
            <link rel="stylesheet" type="text/css" href="${styles}">
            <style>
                @page {
                    margin: 0;
                }
                @media print {
                body {
                    margin: 0;
                    padding: 0;
                }
                }
                body {
                margin: 0;
                padding: 0;
                }
            </style>
            </head>
            <body>
            ${clonedElement.outerHTML}
            </body>
        </html>
        `);

    printWindow.document.close();

    printWindow.onload = function () {
        printWindow.print();
        printWindow.close();
    };
}


// function captureAndDownloadPDF(divId) {
//     const element = document.getElementById(divId);
//     element.scrollIntoView({ behavior: 'auto', block: 'start' });
//     // Wait for rendering to settle
//     document.fonts.ready.then(() => { 
//         setTimeout(() => {
//             html2canvas(element, {
//                 scale: window.devicePixelRatio,
//                 useCORS: true
//             }).then(canvas => {
//                 const imgData = canvas.toDataURL('image/png');
//                 const { jsPDF } = window.jspdf;
//                 const pdf = new jsPDF({
//                     orientation: 'portrait',
//                     unit: 'px',
//                     format: [canvas.width, canvas.height]
//                 });

//                 pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
//                 pdf.save('screenshot.pdf');
//             });
//         }, 2000); // Adjust delay as needed
//     });
// }

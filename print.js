function printDiv(divId) {
    const printContents = document.getElementById(divId).innerHTML;
    const printWindow = window.open('', '', 'width=600,height=600');

    // The path to your styles.css (adjust it as needed)
    const styles = './styles.css';

    // Start writing the document for the print window
    printWindow.document.write('<html><head><title>Print</title>');
    // Add the link to your external CSS
    printWindow.document.write(`<link rel="stylesheet" type="text/css" href="${styles}">`);
    // Optionally, you can include other inline styles or meta tags here

    printWindow.document.write('</head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');

    // Close the document to ensure all content is fully loaded
    printWindow.document.close(); 

    // Wait a bit for the document and styles to load before printing
    printWindow.onload = function () {
        printWindow.print();
        printWindow.close();
    };
}

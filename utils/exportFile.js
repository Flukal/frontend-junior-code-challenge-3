import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPng = async () => {
  const element = document.querySelector('.grid');
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = imgData;
  link.download = 'artwork.png';
  link.click();
};

export const exportToPdf = async (getUsedColors, ) => {
  const element = document.querySelector('.grid');
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  const usedColors = getUsedColors();

  // New PDF with A4 size
  const pdf = new jsPDF('p', 'mm', 'a4');

  // Title to the PDF
  pdf.setFontSize(30);
  const title = 'Pixel Art';
  const pageWidth = pdf.internal.pageSize.getWidth();
  const txtWidth = (pdf.getStringUnitWidth(title) * pdf.internal.getFontSize()) / pdf.internal.scaleFactor;
  const calcWidth = (pageWidth - txtWidth) / 2;
  pdf.text(title, calcWidth, 30); // Adjust the y-coordinate as needed

  // Calculate the width and height of the image in the PDF
  const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * 40; // Subtract padding
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Keep aspect ratio

  // Calculate the position of the image in the PDF
  const x = 40; // Padding
  const y = 60; // Position the image at the bottom with padding

  // Add color boxes
  const boxSize = 10; // Size of color box
  const boxMargin = 3; // Margin between color boxes
  let boxX = x; // Initial X position of color box
  let boxY = 45; // Initial Y position of color box

  usedColors.forEach((color, index) => {
    pdf.setFillColor(color);
    pdf.rect(boxX, boxY, boxSize, boxSize, 'F');

    // Update position for next box
    boxX += boxSize + boxMargin;
    if (boxX + boxSize > pageWidth - x) {
      // If next box would go off page, wrap to next line
      boxX = x;
      boxY += boxSize + boxMargin;
    }
  });

  // Add the image data to the PDF
  pdf.addImage(imgData, 'PNG', x, y, pdfWidth, pdfHeight);

  // Save the PDF
  pdf.save('artwork.pdf');
};
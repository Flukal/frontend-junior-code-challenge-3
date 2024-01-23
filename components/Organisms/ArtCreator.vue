<template>
  <div class="p-4">
    <button @click="exportToPdf" class="absolute top-6 right-8 px-6 py-2 rounded-md bg-blue-800 hover:bg-blue-900 text-white transition">Export to PDF</button>
    <MoleculesArtOption @emitGrid="getGrid" @emitColor="selectColor" />
    <div class="grid w-3/4 m-auto mt-8" :class="gridClass">
      <MoleculesGridChild v-for="(color, n) in colors" :key="n" :index="n" :color="color" :selectedColor="color" @update:modelValue="handleUpdate($event, n)" />
    </div>
  </div>
</template>
<script setup>
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const gridSelection = ref('8');
const colors = ref(Array(gridSelection.value * gridSelection.value).fill('transparent'));
let selectedColor = ref('transparent');
let usedColors = ref([]);

const getGrid = (value) => {
  gridSelection.value = value;
  colors.value = Array(gridSelection.value * gridSelection.value).fill('transparent');
};

const selectColor = (color) => {
  selectedColor.value = color;
};

const handleUpdate = (newColor, index) => {
  if (colors.value[index] === selectedColor.value) {
    colors.value[index] = 'transparent'; // Deselect the box
  } else {
    colors.value[index] = selectedColor.value; // Select the box
  }
  usedColors.value = colors.value;
};

const getUsedColors = () => {
  return [...new Set(colors.value.filter((color) => color !== 'transparent'))];
};

const exportToPdf = async () => {
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

const gridClass = computed(() => {
  switch (gridSelection.value) {
    case '8':
      return 'grid-cols-8';
    case '12':
      return 'grid-cols-12';
    case '16':
      return 'grid-cols-16';
    case '32':
      return 'grid-cols-32';
    default:
      return '';
  }
});
</script>

<template>
  <div class="p-4 max-w-5xl mx-auto">
    <div class="flex flex-col-reverse sm:flex-row justify-between gap-4 sm:gap-10">
      <MoleculesArtOption @emitGrid="getGrid" @emitColor="selectColor" class="sm:w-3/4" />
      <div class="mb-8 sm:w-1/4">
        <AtomsHeadline headline="Select file format" class="text-nowrap mb-4 text-blue-950" />
        <select v-model="fileFormat" class="px-6 py-2 rounded-md text-blue-950 transition mr-4 mb-4 border border-blue-950 w-full">
          <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
        <button @click="exportArt" class="px-6 py-2 rounded-md bg-blue-800 hover:bg-blue-900 text-white transition w-full">Export to {{ fileFormat.toUpperCase() }}</button>
      </div>
    </div>
    <div class="grid w-full sm:w-3/4 m-auto mt-8" :class="gridClass">
      <MoleculesGridChild v-for="(color, n) in colors" :key="n" :index="n" :color="color" :selectedColor="color" @update:modelValue="handleUpdate($event, n)" />
    </div>
  </div>
</template>
<script setup>
import { exportToPdf, exportToPng } from '@/utils/exportFile';

const gridSelection = ref('8');
const colors = ref(Array(gridSelection.value * gridSelection.value).fill('transparent'));
let selectedColor = ref('transparent');
let usedColors = ref([]);
const fileFormat = ref('pdf');
const options = [
  { value: 'pdf', label: 'PDF' },
  { value: 'png', label: 'PNG' },
  { value: 'gif', label: 'GIF' },
];

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

const exportArt = async () => {
  if (fileFormat.value === 'pdf') {
    await exportToPdf(getUsedColors);
  } else {
    await exportToPng();
  }
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

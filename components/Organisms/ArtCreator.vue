<template>
  <div class="p-4">
    <div class="flex justify-between">
      <MoleculesArtOption @emitGrid="getGrid" @emitColor="selectColor" />
    </div>
    <div class="grid w-3/4 m-auto mt-8" :class="gridClass">
      <MoleculesGridChild v-for="(color, n) in colors" :key="n" :index="n" :color="color" :selectedColor="color" @update:modelValue="handleUpdate($event, n)" />
    </div>
  </div>
</template>
<script setup>
const gridSelection = ref('8');
const colors = ref(Array(gridSelection.value * gridSelection.value).fill('transparent'));
let selectedColor = ref('transparent');

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

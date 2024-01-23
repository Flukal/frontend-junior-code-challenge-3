<template>
  <div class="flex justify-between w-full gap-10">
    <div>
      <AtomsHeadline headline="Choose color palette" class="mb-4 text-blue-950" />
      <div class="flex items-center flex-wrap gap-2">
        <div class="flex items-center justify-center w-16 h-16 bg-blue-200 text-blue-900 rounded-md hover:bg-blue-800/40 cursor-pointer transition" @click="addColor">
          <div class="text-2xl rotate-45">&#x2715;</div>
        </div>
        <AtomsColorPicker v-for="(color, index) in colors" :key="index" v-model="colors[index]" @update:modelValue="(val) => updateColor(val, index)" @click="selectColor(index)" @delete="deleteColor(index)" class="w-16 h-16 inline-block rounded-md" :class="{ 'outline outline-offset-2 outline-sky-900/50 outline-2': index === selectedColorIndex }" />
      </div>
    </div>
    <div class="hallo min-w-32">
      <AtomsHeadline headline="Select Grid" class="text-nowrap mb-4 text-blue-950" />
      <AtomsInputSelect @emitGrid="getGrid" />
    </div>
  </div>
</template>
<script setup>
const colors = ref([]);
let currentColor = ref('#000000');
let selectedColorIndex = ref(null);
const emit = defineEmits(['emitGrid', 'emitColor']);

watch(colors, (newColors) => {
  selectColor(newColors.length - 1);
});

const getGrid = (value) => {
  emit('emitGrid', value);
};

const updateColor = (event, index) => {
  colors.value[index] = event;
  selectColor(index); // Select the updated color
};

const addColor = () => {
  colors.value.push(currentColor.value); // Pushes the current color to the array
  selectColor(colors.value.length - 1); // Selects the newly added color
};

const selectColor = (index) => {
  selectedColorIndex.value = index;
  currentColor.value = colors.value[index]; // Set currentColor to the color of the clicked component
  emit('emitColor', currentColor.value); // Emit the selected color
};

const deleteColor = (index) => {
  colors.value.splice(index, 1);
  if (selectedColorIndex.value >= colors.value.length) {
    selectedColorIndex.value = colors.value.length - 1; // Select the last color if the selected color was deleted
  }
};
</script>

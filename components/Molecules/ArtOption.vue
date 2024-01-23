<template>
  <div class="flex justify-between w-full">
    <div>
      <AtomsHeadline headline="Choose color palette" />
      <div class="flex items-center flex-wrap gap-2">
        <div class="flex items-center justify-center mr-4 w-16 h-16 bg-sky-900/50 text-white rounded-md hover:bg-sky-800/40 cursor-pointer" @click="addColor">
          <div class="text-4xl">+</div>
        </div>
        <AtomsColorPicker v-for="(color, index) in colors" :key="index" v-model="colors[index]" @update:modelValue="(val) => updateColor(val, index)" @click="selectColor(index)" class="w-16 h-16 inline-block rounded-md" :class="{ 'outline outline-offset-2 outline-sky-900/50 outline-2': index === selectedColorIndex }" />
      </div>
    </div>
    <div>
      <AtomsHeadline headline="Select Grid" class="text-nowrap" />
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
</script>

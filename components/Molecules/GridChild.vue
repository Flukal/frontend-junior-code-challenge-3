<template>
  <div class="aspect-square border" :style="{ backgroundColor: color }" @click="updateColor"></div>
</template>

<script setup>
const props = defineProps({
  color: String,
  selectedColor: String,
});

const emit = defineEmits(['update:modelValue']);

const updateColor = () => {
  emit('update:modelValue', props.selectedColor);
};
</script>

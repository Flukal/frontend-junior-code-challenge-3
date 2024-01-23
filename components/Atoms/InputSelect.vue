<template>
  <select v-model="selectedOption" class="w-32">
    <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
  </select>
</template>

<script setup>
const selectedOption = ref('8');
const options = [
  { value: '8', label: '8' },
  { value: '12', label: '12' },
  { value: '16', label: '16' },
  { value: '32', label: '32' },
];
const emit = defineEmits(['emitGrid']);

watch(selectedOption, (selectedVal) => {
  emit('emitGrid', selectedVal);
});
</script>

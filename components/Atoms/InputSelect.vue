<template>
  <select v-model="selectedOption" class="w-full">
    <option value="8">8</option>
    <option value="12">12</option>
    <option value="16">16</option>
    <option value="32">32</option>
  </select>
</template>

<script setup>
const selectedOption = ref('8');
const emit = defineEmits(['emitGrid']);

watch(selectedOption, (selectedVal) => {
  emit('emitGrid', selectedVal);
});
</script>

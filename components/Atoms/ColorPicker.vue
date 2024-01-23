<template>
  <div class="relative h-16 w-16 rounded-md">
    <div @click="deleteColor" class="absolute top-2 right-2 h-4 w-4 text-xs text-red-500 cursor-pointer rounded-full bg-sky-900/50 flex items-center justify-center">&#x2715;</div>
    <div class="w-full h-full rounded-md z-0" :style="{ backgroundColor: color }" @click="showPicker = !showPicker" />
    <input v-if="showPicker" type="color" :value="color" @input="updateColor" @blur="showPicker = false" />
  </div>
</template>

<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'delete']);

let color = ref(props.modelValue);
let showPicker = ref(false);

watchEffect(() => {
  color.value = props.modelValue;
});

const updateColor = (event) => {
  color.value = event.target.value;
  emit('update:modelValue', color.value);
};

const deleteColor = () => {
  emit('delete', color.value);
};
</script>

<style scoped>
input[type='color'] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>

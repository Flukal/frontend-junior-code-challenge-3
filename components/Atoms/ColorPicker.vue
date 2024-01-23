<template>
  <div class="relative h-16 w-16 rounded-md">
    <div class="w-full h-full rounded-md" :style="{ backgroundColor: color }" @click="showPicker = !showPicker"></div>
    <input v-if="showPicker" type="color" :value="color" @input="updateColor" @blur="showPicker = false" />
  </div>
</template>

<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

let color = ref(props.modelValue);
let showPicker = ref(false);

watchEffect(() => {
  color.value = props.modelValue;
});

const updateColor = (event) => {
  color.value = event.target.value;
  emit('update:modelValue', color.value);
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

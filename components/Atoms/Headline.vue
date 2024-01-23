<template>
  <div>
    <h4 class="text-lg uppercase font-semibold">{{ title }}</h4>
  </div>
</template>

<script setup>
const props = defineProps(['headline']);
const title = ref(props.headline);
</script>

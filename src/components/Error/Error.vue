<script setup lang="ts">
const props = defineProps({
  error: String,
});
</script>

<template>
  <p class="text-red bold">{{ error }}</p>
</template>

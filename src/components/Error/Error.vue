<script setup lang="ts">
//Props
const props = defineProps<{ error: string }>();
</script>

<template>
  <p class="text-error py-2 error__message">{{ error }}</p>
</template>

<style scoped>
.error__message {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>

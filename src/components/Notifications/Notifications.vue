<script setup lang="ts">
//Props
const props = defineProps<{
  classNames?: string;
  text: string;
}>();

const emit = defineEmits<{
  (e: "closeEvent"): void;
}>();
</script>

<template>
  <v-chip closable @click:close="emit('closeEvent')" :class="classNames">
    {{ text }}
  </v-chip>
</template>

<style scoped>
.error__message {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>

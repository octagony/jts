<script setup lang="ts">
const props = defineProps({
  disabled: Boolean,
  text: String,
});

const emit = defineEmits<{
  (e: "buttonEvent"): void;
}>();
</script>

<template>
  <v-btn variant="tonal" @click="$emit('buttonEvent')" :disabled="disabled">
    {{ text }}
  </v-btn>
</template>

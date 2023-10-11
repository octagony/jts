<script setup lang="ts">
const props = defineProps<{
  disabled: boolean;
  text: string;
  icon: string;
}>();

const emit = defineEmits<{
  (e: "buttonEvent"): void;
}>();
</script>

<template>
  <v-btn
    variant="tonal"
    :prepend-icon="icon"
    @click="$emit('buttonEvent')"
    :disabled="disabled"
    size="large"
    class="mt-8"
  >
    {{ text }}
  </v-btn>
</template>

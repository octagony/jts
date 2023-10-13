<script setup lang="ts">
//Props
const props = defineProps<{
  disabled?: boolean;
  icon: string;
  classNames?: string;
}>();

//Emits
const emit = defineEmits<{
  (e: "buttonEvent"): void;
}>();
</script>

<template>
  <v-btn
    :class="classNames"
    variant="tonal"
    :prepend-icon="icon"
    @click="$emit('buttonEvent')"
    :disabled="disabled"
    size="large"
  >
    <slot />
  </v-btn>
</template>

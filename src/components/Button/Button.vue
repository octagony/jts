<script setup lang="ts">
const props = defineProps(["disabled", "text"]);
console.log(props);
</script>

<template>
  <v-btn variant="tonal" @click="$emit('buttonEvent')" :disabled="disabled">
    {{ text }}
  </v-btn>
  <!-- <v-btn
        v-if="!renderOutput"
        variant="tonal"
        @click="generateTS"
        :disabled="blockGenerateButton"
      >
        Generate Types
      </v-btn> -->
</template>

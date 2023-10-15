<script setup lang="ts">
//Props
const props = defineProps<{
  classNames?: string;
  text:string
}>();
</script>

<template>
  <v-snackbar multi-line>
    {{text}}
    <template v-slot:actions>
      <v-btn color="red" variant="text"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped>
.error__message {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>

<script setup lang="ts">
import { json2ts } from "json-ts";
import { ref } from "vue";
const input = ref("");
const output = ref("");
const generateTS = () => {
  const generate = json2ts(input.value);
  output.value = generate;
};
</script>
<template>
  <v-app>
    <v-container fluid>
      <v-row align="end" justify="end">
        <v-textarea
          clearable
          label="Label"
          prepend-icon="$vuetify"
          variant="outlined"
          v-model="input"
          no-resize
        />
        <v-textarea
          clearable
          label="Label"
          prepend-icon="$vuetify"
          variant="outlined"
          no-resize
          v-model="output"
        />
      </v-row>
      <v-sheet>
        <v-btn prepend-icon="$vuetify" variant="tonal" @click="generateTS">
          Button
        </v-btn>
      </v-sheet>
    </v-container>
  </v-app>
</template>

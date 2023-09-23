<script setup lang="ts">
import { json2ts } from "json-ts";
import { ref } from "vue";
import CodeMirror from "codemirror-editor-vue3";
const inputJSON = ref("");
const outputTS = ref("");
const generateTS = () => {
  const generate = json2ts(inputJSON.value);
  outputTS.value = generate;
};
</script>
<template>
  <v-app>
    <v-container fluid>
      <CodeMirror v-model:value="inputJSON" border :height="200" />
      <CodeMirror v-model:value="outputTS" border :height="200" />
      <v-btn prepend-icon="$vuetify" variant="tonal" @click="generateTS">
        Button
      </v-btn>
    </v-container>
  </v-app>
</template>

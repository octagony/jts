<script setup lang="ts">
import { json2ts } from "json-ts";
import { ref } from "vue";
import JsonEditorVue from "json-editor-vue";

const inputJSON = ref("");
const outputTS = ref("");

const generateTS = () => {
  const generate = json2ts(inputJSON.value);
  outputTS.value = generate;
  console.log(outputTS.value);
};
</script>

<template>
  <v-app>
    <v-container fluid>
      <JsonEditorVue
        v-model="inputJSON"
        mode="text"
        :navigationBar="false"
        :statusBar="false"
        :main-menu-bar="false"
      />
      <v-btn prepend-icon="$vuetify" variant="tonal" @click="generateTS">
        Generate Types
      </v-btn>
    </v-container>
  </v-app>
</template>

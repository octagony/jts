<script setup lang="ts">
import JsonEditorVue from "json-editor-vue";
import Navbar from "./components/Navbar/Navbar.vue";
import Header from "./components/Header/Header.vue";
import { json2ts } from "json-ts";
import { ref } from "vue";

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
    <Navbar />
    <v-container fluid class="mt-16">
      <Header />
      <v-col>
        <JsonEditorVue
          v-model="inputJSON"
          mode="text"
          :navigationBar="false"
          :statusBar="false"
          :main-menu-bar="false"
        />
      </v-col>
      <v-btn prepend-icon="$vuetify" variant="tonal" @click="generateTS">
        Generate Types
      </v-btn>
    </v-container>
  </v-app>
</template>

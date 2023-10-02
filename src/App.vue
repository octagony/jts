<script setup lang="ts">
import JsonEditorVue from "json-editor-vue";
import Navbar from "./components/Navbar/Navbar.vue";
import Header from "./components/Header/Header.vue";
import { json2ts } from "json-ts";
import { ref } from "vue";

const inputJSON = ref<string>("");
const outputTS = ref<string>("");
const renderOutput = ref<boolean>(false);

const generateTS = () => {
  const generate = json2ts(inputJSON.value);
  outputTS.value = generate;
  renderOutput.value = !renderOutput.value;
  console.log(outputTS.value);
};

const initialRender = () => {
  inputJSON.value = "";
  outputTS.value = "";
  renderOutput.value = false;
};
</script>

<template>
  <v-app>
    <Navbar />
    <v-container fluid class="mt-16 text-center">
      <Header />
      <v-col class="text-left">
        <template v-if="!renderOutput">
          <JsonEditorVue
            v-model="inputJSON"
            mode="text"
            :navigationBar="false"
            :statusBar="false"
            :main-menu-bar="false"
          />
        </template>
      </v-col>
      <v-col class="text-left">
        <template v-if="renderOutput">
          <JsonEditorVue
            v-model="outputTS"
            mode="tree"
            :navigationBar="false"
            :statusBar="false"
            :main-menu-bar="false"
            class="outputTS"
          />
        </template>
      </v-col>
      <v-btn
        v-if="!renderOutput"
        prepend-icon="$vuetify"
        variant="tonal"
        @click="generateTS"
      >
        Generate Types
      </v-btn>
      <v-btn
        v-if="renderOutput"
        prepend-icon="$vuetify"
        variant="tonal"
        @click="initialRender"
      >
        Try Again
      </v-btn>
    </v-container>
  </v-app>
</template>

<style>
.cm-content,
.jse-value {
  font-size: 1.2rem;
  line-height: 1.5rem;
}

.jse-string {
  color: #000 !important;
}
</style>

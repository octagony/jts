<script setup lang="ts">
import console from "console";
import JsonEditorVue from "json-editor-vue";
import { json2ts } from "json-ts";
import { reactive, ref, watch } from "vue";
import Header from "./components/Header/Header.vue";
import Navbar from "./components/Navbar/Navbar.vue";

interface IJson {
  input: string;
  error: string;
}

const inputJSON: IJson = reactive({
  input: "",
  error: "",
});

const outputTS = ref<string>("");
const renderOutput = ref<boolean>(false);
const blockGenerateButton = ref<boolean>(false);

const inputRef = ref();

const generateTS = () => {
  try {
    const generate = json2ts(inputJSON.input);
    if (inputJSON.input.length < 1) {
      throw new Error("No context");
    }
    outputTS.value = generate;
    renderOutput.value = !renderOutput.value;
    console.log(outputTS.value);
  } catch (e) {
    if (e instanceof TypeError) {
      inputJSON.error = `Sorry, but i can't convert this`;
    }
  }
};

const initialRender = () => {
  inputJSON.input = "";
  outputTS.value = "";
  renderOutput.value = false;
};

const checkError = () => {};

//watchEffect(() => {
//  const elem = document.querySelector(".jse-error");
//  console.log(elem);
//});

// watchEffect(() => {
//   console.log(inputRef.value.jsonEditor.$$.root.classList);
// });

watch(
  () => inputJSON.input,
  () => {
    const element = document.querySelector(".jse-error");
    if (element) {
      blockGenerateButton.value = true;
    } else {
      blockGenerateButton.value = false;
    }
  }
);
</script>

<template>
  <v-app>
    <Navbar />
    <v-container fluid class="mt-16 text-center">
      <Header />
      <template v-if="inputJSON.error">
        <p>{{ inputJSON.error }}</p>
      </template>
      <v-col class="text-left">
        <Transition>
          <template v-if="!renderOutput">
            <JsonEditorVue
              v-model="inputJSON.input"
              ref="inputRef"
              mode="text"
              :navigationBar="false"
              :statusBar="false"
              :main-menu-bar="false"
            />
          </template>
        </Transition>
      </v-col>
      <v-col class="text-left">
        <Transition>
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
        </Transition>
      </v-col>
      <v-btn
        v-if="!renderOutput"
        variant="tonal"
        @click="generateTS"
        :disabled="blockGenerateButton"
      >
        Generate Types
      </v-btn>
      <v-btn v-if="renderOutput" variant="tonal" @click="initialRender">
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

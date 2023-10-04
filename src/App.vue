<script setup lang="ts">
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
    inputJSON.error = "";
    renderOutput.value = !renderOutput.value;
  } catch (e) {
    if (e instanceof TypeError) {
      inputJSON.error = `Sorry, but i can't convert this`;
    }
  }
};

const initialRender = () => {
  inputJSON.input = "";
  inputJSON.error = "";
  outputTS.value = "";
  renderOutput.value = false;
};
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
        <p class="text-red bold">{{ inputJSON.error }}</p>
      </template>
      <v-col class="text-left">
        <Transition name="slide-fade">
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
        <Transition name="slide-fade">
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

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

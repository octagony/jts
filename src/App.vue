<script setup lang="ts">
// Libraries
import { reactive, ref, watch, onMounted } from "vue";
import { json2ts } from "json-ts";

// Components
import JsonEditorVue from "json-editor-vue";
import Header from "@/components/Header/Header.vue";
import Navbar from "@/components/Navbar/Navbar.vue";
import Error from "@/components/Error/Error.vue";
import Button from "@/components/Button/Button.vue";

// Types
import { IJsonInput } from "@/types/Ijson";

// Theme
import { useTheme } from "vuetify";

//Utils
import { getLocalStorage } from "./utils/themeStorage";

const inputJSON: IJsonInput = reactive({
  input: "",
  error: "",
});

const outputTS = ref<string>("");
const renderOutput = ref<boolean>(false);
const blockGenerateButton = ref<boolean>(false);

const theme = useTheme();

const generateTS = () => {
  try {
    const generate = json2ts(inputJSON.input);
    if (inputJSON.input.length < 1) {
      throw new TypeError();
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

onMounted(() => {
  theme.global.name.value = getLocalStorage();
});

watch(
  () => inputJSON.input,
  () => {
    const element = document.querySelector(".jse-error");
    if (element) {
      blockGenerateButton.value = true;
    } else {
      blockGenerateButton.value = false;
    }
  },
);
</script>

<template>
  <v-app>
    <v-theme-provider :theme="theme.global.name.value">
      <Navbar />
      <v-container fluid class="mt-16 text-center flex-column">
        <Header />
        <!-- ERROR -->
        <Error v-if="inputJSON.error" :error="inputJSON.error" />
        <!-- JSONEDITORS -->
        <v-col class="text-left">
          <Transition name="slide-fade">
            <template v-if="!renderOutput">
              <JsonEditorVue
                v-model="inputJSON.input"
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
              />
            </template>
          </Transition>
        </v-col>
        <!-- ACTION BUTTONS -->
        <Button
          v-if="!renderOutput"
          :disabled="blockGenerateButton"
          text="Generate Types"
          @button-event="generateTS"
          icon="mdi-language-typescript"
        />
        <Button
          v-else
          :disabled="blockGenerateButton"
          text="Try Again"
          @button-event="initialRender"
          icon="mdi-code-json"
        />
      </v-container>
    </v-theme-provider>
  </v-app>
</template>

<style>
body {
  transition: color 2s;
}

.cm-scroller {
  min-height: 300px;
}

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
  transform: translateX(50px);
  opacity: 0;
}
</style>

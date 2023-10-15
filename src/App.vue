<script setup lang="ts">
// Libraries
import { reactive, ref, watch, onMounted } from "vue";
import { json2ts } from "json-ts";

// Components
import JsonEditorVue from "json-editor-vue";
import Header from "@/components/Header/Header.vue";
import Navbar from "@/components/Navbar/Navbar.vue";
import Notifications from "@/components/Notifications/Notifications.vue";
import Button from "@/components/Button/Button.vue";

// Types
import { IJsonInput } from "@/types/IJson";

// Theme
import { useTheme } from "vuetify";

//Utils
import { getLocalStorage } from "./utils/themeStorage";

//Store initial data
const inputJSON: IJsonInput = reactive({
  input: "",
  error: "",
});

const outputTS = ref<string>("");
const renderOutput = ref<boolean>(false);
const blockGenerateButton = ref<boolean>(false);
const notifiactionShow = ref<boolean>(false);

//Store theme
const theme = useTheme();

//Try convert JSON to TS
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
      notifiactionShow.value = true;
    }
  }
};

//Back to initial editor
const initialRender = () => {
  inputJSON.input = "";
  inputJSON.error = "";
  outputTS.value = "";
  renderOutput.value = false;
};

//Save output text to file
const saveToFile = () => {
  const link = document.createElement("a");
  link.setAttribute(
    "href",
    "data:text/plain; charset=utf-8," + encodeURIComponent(outputTS.value),
  );
  link.setAttribute("download", "jts.ts");
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(outputTS.value);
  } catch (e) {
    console.error(e);
  }
};

//Set theme on initial render
onMounted(() => {
  theme.global.name.value = getLocalStorage();
});

//Block generate button if input JSON is invalid
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
        <Notifications v-if="notifiactionShow" :text="inputJSON.error" />
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
          @button-event="generateTS"
          icon="mdi-language-typescript"
          class-names="mt-8"
          >Generate Types</Button
        >
        <div v-else class="flex-sm-column justify-center">
          <Button @button-event="copyToClipboard" icon="mdi-content-copy"
            >Copy to clipboard</Button
          >
          <Button
            class-names="ma-8"
            @button-event="initialRender"
            icon="mdi-language-typescript"
            >Try Again</Button
          >
          <Button
            class-names=""
            @button-event="saveToFile"
            icon="mdi-file-download-outline"
            >Save To File</Button
          >
        </div>
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

/* #TODO Implement switching theme in json-editor */
/* .v-theme--darkTheme .cm-editor { */
/*   color: #000 !important; */
/* } */
</style>

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

//Types
import type { INotifiaction } from "@/types/INotification";

// Theme
import { useTheme } from "vuetify";

//Utils
import { getLocalStorage } from "./utils/themeStorage";
import { computed } from "vue";

//Store initial data
const inputJSON = ref("");

//Store output data
const outputTS = ref<string>("");

//Check if we can render output
const renderOutput = ref<boolean>(false);

//For watcher to blocking main button
const blockGenerateButton = ref<boolean>(false);

//Store notification info
const notifiactionShow: INotifiaction = reactive({
  text: "",
  status: "",
  isShow: false,
});

//Store theme
const theme = useTheme();

//Try convert JSON to TS
const generateTS = () => {
  try {
    const generate = json2ts(inputJSON.value);
    if (inputJSON.value.length < 1) {
      throw new TypeError();
    }
    outputTS.value = generate;
    renderOutput.value = !renderOutput.value;
    notifiactionShow.text = "";
    notifiactionShow.isShow = false;
  } catch (e) {
    if (e instanceof TypeError) {
      notifiactionShow.text = `Sorry, but i can't convert this`;
      notifiactionShow.isShow = true;
      notifiactionShow.status = "error";
    }
  }
};

//Set notification to initial state
const closeNotification = () => {
  notifiactionShow.isShow = false;
  notifiactionShow.text = "";
};

//Back to initial editor
const initialRender = () => {
  inputJSON.value = "";
  outputTS.value = "";
  notifiactionShow.isShow = false;
  notifiactionShow.text = "";
  notifiactionShow.status = "";
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

//Copy types to clipboard
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(outputTS.value);
    notifiactionShow.isShow = true;
    notifiactionShow.text = "Successfully copied to clipboard";
    notifiactionShow.status = "success";
  } catch (e) {
    notifiactionShow.isShow = true;
    notifiactionShow.text = "Something went wrong";
    notifiactionShow.status = "error";
    console.error(e);
  }
};

//Computed classes for notification
const classesForNotification = computed(() => {
  switch (notifiactionShow.status) {
    case "error":
      return "pa-6 text-error text-h6 ma-4";
    case "success":
      return "pa-6 text-success text-h6 ma-4";
    default:
      return "pa-6 text-h6 ma-4";
  }
});

//Set theme on initial render
onMounted(() => {
  theme.global.name.value = getLocalStorage();
});

//Block generate button if input JSON is invalid
watch(
  () => inputJSON.value,
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
      <!-- NAVBAR -->
      <Navbar />
      <v-container fluid class="mt-16 text-center flex-column">
        <!-- HEADER -->
        <Header />
        <!-- NOTIFICATIONS -->
        <Transition name="slide-fade">
          <Notifications
            v-if="notifiactionShow.isShow"
            :text="notifiactionShow.text"
            @close-event="closeNotification"
            :class-names="classesForNotification"
          />
        </Transition>
        <!-- JSONEDITORS -->
        <v-col class="text-left">
          <Transition name="slide-fade">
            <template v-if="!renderOutput">
              <JsonEditorVue
                v-model="inputJSON"
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
          class-names="mt-2"
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
          <Button @button-event="saveToFile" icon="mdi-file-download-outline"
            >Save To File</Button
          >
        </div>
      </v-container>
    </v-theme-provider>
  </v-app>
</template>

<!-- STYLES -->
<style>
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
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
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

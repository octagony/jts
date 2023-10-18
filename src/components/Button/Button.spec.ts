import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import Button from "../Button/Button.vue";
import { describe } from "node:test";

const vuetify = createVuetify({
  components,
  directives,
});

global.ResizeObserver = require("resize-observer-polyfill");

describe("Header testing", () => {
  test("Title and subtitle renders correctly", () => {
    const wrapper = mount(
      {
        template:
          "<v-layout><Button icon='mdi-language-typescript'/>Generate Types</v-layout>",
      },
      {
        slots: { default: "Generate Types" },
        props: {
          icon: "mdi-language-typescript",
        },
        global: {
          components: {
            Button,
          },
          plugins: [vuetify],
        },
      },
    );
    expect(wrapper.text()).toContain("Generate Types");
  });
});

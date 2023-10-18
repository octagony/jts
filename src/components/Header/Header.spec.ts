import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import Header from "../Header/Header.vue";
import { describe } from "node:test";

const vuetify = createVuetify({
  components,
  directives,
});

global.ResizeObserver = require("resize-observer-polyfill");

describe("Header testing", () => {
  test("Subtitle renders correctly", () => {
    const wrapper = mount(
      {
        template: "<v-layout><Header/></v-layout>",
      },
      {
        props: {},
        global: {
          components: {
            Header,
          },
          plugins: [vuetify],
        },
      },
    );
    expect(wrapper.text()).toContain("It's quickly, just try");
  });
  test("Testing icons", () => {
    const wrapper = mount(
      {
        template: "<v-layout><Header/></v-layout>",
      },
      {
        props: {},
        global: {
          components: {
            Header,
          },
          plugins: [vuetify],
        },
      },
    );
    const icons = wrapper.findAll("i");
    expect(icons.map((i) => i.classes().includes("mdi")));
  });
});

import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import Navbar from "../Navbar/Navbar.vue";
import { describe } from "node:test";

const vuetify = createVuetify({
  components,
  directives,
});

global.ResizeObserver = require("resize-observer-polyfill");

describe("Navbar testing", () => {
  test("Title and icons renders correctly", () => {
    const wrapper = mount(
      {
        template: "<v-layout><Navbar/></v-layout>",
      },
      {
        props: {},
        global: {
          components: {
            Navbar,
          },
          plugins: [vuetify],
        },
      },
    );
    expect(wrapper.text()).toContain("JTS");
    wrapper.findAll("i").map((icon) => {
      expect(icon.classes().includes("mdi-weather" || "mdi-github"));
    });
  });
});

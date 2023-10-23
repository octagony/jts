import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import Notifications from "../Notifications/Notifications.vue";
import { describe } from "node:test";

const vuetify = createVuetify({
  components,
  directives,
});

global.ResizeObserver = require("resize-observer-polyfill");

describe("Notifications testing", () => {
  test("Text and classnames renders correctly", () => {
    const text = "Something went wrong";
    const classNames = "pa-6 text-error text-h6 ma-4";

    const wrapper = mount(Notifications, {
      props: {
        text,
        classNames,
      },
      global: {
        components: {
          Notifications,
        },
        plugins: [vuetify],
      },
    });
    expect(wrapper.html()).toContain(text);
    wrapper.classes().includes(classNames);
  });
});

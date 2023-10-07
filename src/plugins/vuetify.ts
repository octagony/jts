// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { ThemeDefinition, createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    defaultTheme: "lightTheme",
    themes: {
      darkTheme: {
        dark: true,
        colors: {
          background: "#191823",
          surface: "#2e2d38",
          primary: "#fff",
          "primary-darken-1": "#75747c",
          secondary: "#5d5b64",
          "secondary-darken-1": "#45444d",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
        },
      },
      lightTheme: {
        dark: false,
        colors: {
          background: "#a2a7b3",
          surface: "#acb0bb",
          primary: "#000",
          "primary-darken-1": "#cacdd4",
          secondary: "#000",
          "secondary-darken-1": "#b6bac3",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
        },
      },
    },
  },
});

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
          primary: "#f1e8e6",
          "primary-darken-1": "#75747c",
          secondary: "#edd2cb",
          "secondary-darken-1": "#45444d",
          error: "#f55951",
          info: "#2196F3",
          success: "#00ff00",
          warning: "#FFEA00",
        },
      },
      lightTheme: {
        dark: false,
        colors: {
          background: "#eff7f6",
          surface: "#eff1f7",
          primary: "#131919",
          "primary-darken-1": "#cacdd4",
          secondary: "#131919",
          "secondary-darken-1": "#b6bac3",
          error: "#ff4d4d",
          info: "#2196F3",
          success: "#00ff00",
          warning: "#FFC000",
        },
      },
    },
  },
});

import { ThemeInstance } from "vuetify";

export const getLocalStorage = (): string => {
  const getTheme = JSON.parse(localStorage.getItem("JTStheme") || "");
  if (!getTheme) {
    localStorage.setItem("JTStheme", JSON.stringify("lightTheme"));
    return "lightTheme";
  }
  return getTheme;
};

export const setLocalStorage = (theme: string) => {
  localStorage.setItem("JTStheme", JSON.stringify(theme));
};

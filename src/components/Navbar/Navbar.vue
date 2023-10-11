<script setup lang="ts">
import { computed } from "vue";
import { useTheme } from "vuetify/lib/framework.mjs";
const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark
    ? "lightTheme"
    : "darkTheme";
};

const currentTheme = computed(() => {
  return theme.global.name.value === "lightTheme"
    ? "mdi-weather-sunny"
    : "mdi-weather-night";
});
</script>
<template>
  <v-app-bar :elevation="2" class="px-4">
    <h1 class="text-primary">
      <span class="px-1 text-info">&#123;</span>
      <span>JTS</span>
      <span class="px-1 text-info">&#125;</span>
    </h1>
    <template v-slot:append>
      <v-btn icon="mdi-github"></v-btn>
      <v-btn :icon="currentTheme" @click="toggleTheme"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify/lib/framework.mjs";
const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark
    ? "lightTheme"
    : "darkTheme";
};
</script>
<template>
  <v-app-bar :elevation="2" class="px-4">
    <h1 class="text-primary">JTS</h1>
    <template v-slot:append>
      <v-btn icon="mdi-github"></v-btn>
      <v-btn icon="mdi-weather-sunny" @click="toggleTheme"></v-btn>
    </template>
  </v-app-bar>
</template>

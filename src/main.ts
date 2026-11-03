// src/main.ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { router } from "./router";
import "virtual:uno.css"; // UnoCSS 的入口

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");

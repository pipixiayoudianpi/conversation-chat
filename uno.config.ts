// uno.config.ts
import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  presets: [
    presetUno(), // 提供 flex、gap、text、bg 等基础原子类
  ],
});

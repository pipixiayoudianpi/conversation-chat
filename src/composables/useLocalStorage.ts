// src/composables/useLocalStorage.ts
import { ref, watch, type Ref } from "vue";

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  // 1. 启动时从 localStorage 读，读不到或者数据坏了就用默认值
  function read(): T {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return defaultValue;
    }
  }

  const data = ref(read()) as Ref<T>;

  // 2. 数据一变化就写回 localStorage
  watch(
    data,
    (value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    { deep: true },
  );

  return data;
}

// src/composables/useAutoScroll.ts
import {
  watch,
  nextTick,
  onMounted,
  useTemplateRef,
  type WatchSource,
} from "vue";

/**
 * 让一个可滚动的容器在数据变化时自动滚到底部
 * @param containerKey 模板里 ref="xxx" 的名字
 * @param sources 什么变化时需要滚动
 */
export function useAutoScroll(containerKey: string, sources: WatchSource[]) {
  const container = useTemplateRef<HTMLElement>(containerKey);

  function scrollToBottom(smooth = true) {
    const el = container.value;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  }

  // 首次显示时直接跳到底部
  onMounted(() => scrollToBottom(false));

  // 数据变化后，等 DOM 更新完再滚动
  watch(sources, async () => {
    await nextTick();
    scrollToBottom();
  });

  return { scrollToBottom };
}

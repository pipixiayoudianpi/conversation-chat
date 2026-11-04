<script setup lang="ts">
import { ref, computed } from "vue";

const emit = defineEmits<{
  send: [content: string];
}>();

const text = ref("");
const canSend = computed(() => text.value.trim().length > 0);

function handleSend() {
  if (!canSend.value) return;
  emit("send", text.value.trim());
  text.value = "";
}

function handleKeydown(e: KeyboardEvent) {
  // Enter 发送，Shift+Enter 换行
  // isComposing 为 true 表示正在用输入法选字，这时按 Enter 是确认候选词，不能发送
  if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
    e.preventDefault();
    handleSend();
  }
}
</script>

<template>
  <div class="p-4 border-t flex gap-2 items-end">
    <textarea
      v-model="text"
      rows="2"
      placeholder="输入消息，Enter 发送，Shift+Enter 换行"
      class="flex-1 resize-none rounded border px-3 py-2 outline-none focus:border-blue-400"
      @keydown="handleKeydown"
    />
    <button
      class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
      :disabled="!canSend"
      @click="handleSend"
    >
      发送
    </button>
  </div>
</template>
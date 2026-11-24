<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useConversationStore } from "@/stores/conversation";
import ConversationList from "@/components/ConversationList.vue";
import MessageList from "@/components/MessageList.vue";
import MessageInput from "@/components/MessageInput.vue";
import { watchEffect } from "vue";

const store = useConversationStore();

// 数据：用 storeToRefs 解构，保持响应式
const {
  conversations,
  filteredConversations,
  activeConversation,
  activeId,
  searchQuery,
} = storeToRefs(store);
// 浏览器标签页标题跟着当前会话变
watchEffect(() => {
  const title = activeConversation.value?.title;
  document.title = title ? `${title} · ConversationChat` : "ConversationChat";
});
// 函数：直接解构
const { createConversation, addMessage, selectConversation, deleteConversation } =
  store;

function handleCreate() {
  searchQuery.value = "";
  createConversation(`新会话 ${conversations.value.length + 1}`);
}

function handleSend(content: string) {
  const conv = activeConversation.value;
  if (!conv) return;

  addMessage(conv.id, "user", content);

  // 模拟 AI 回复：0.6 秒后回一句。Week 7 会换成真正的大模型 API
  const convId = conv.id;
  setTimeout(() => {
    // 等待的这 0.6 秒里，用户可能已经把这个会话删了
    const stillExists = conversations.value.some((c) => c.id === convId);
    if (!stillExists) return;
    addMessage(convId, "assistant", `（模拟回复）你刚才说的是：${content}`);
  }, 600);
}
</script>

<template>
  <div class="h-screen flex">
    <aside class="w-64 flex-shrink-0 border-r bg-gray-50">
      <ConversationList v-model:search="searchQuery" :conversations="filteredConversations" :active-id="activeId"
        @select="selectConversation" @create="handleCreate" @delete="deleteConversation" />
    </aside>

    <main class="flex-1 min-w-0 flex flex-col">
      <template v-if="activeConversation">
        <header class="px-6 py-4 border-b">
          <h2 class="text-lg font-semibold">{{ activeConversation.title }}</h2>
        </header>
        <MessageList :messages="activeConversation.messages" />
        <MessageInput @send="handleSend" />
      </template>

      <div v-else class="flex-1 flex items-center justify-center text-gray-400">
        选择或新建一个会话
      </div>
    </main>
  </div>
</template>
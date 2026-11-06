<script setup lang="ts">
import { useConversationStore } from "@/stores/conversation";
import ConversationList from "@/components/ConversationList.vue";
import MessageList from "@/components/MessageList.vue";
import MessageInput from "@/components/MessageInput.vue";

const store = useConversationStore();

// 临时示例数据，Day 12 做完持久化后删掉
if (store.conversations.length === 0) {
  const c1 = store.createConversation("问 AI 怎么学 TS");
  store.addMessage(c1.id, "user", "我该怎么学 TypeScript？");
  store.addMessage(c1.id, "assistant", "先掌握 6 大核心点，然后实战写类。");
  const c2 = store.createConversation("问 AI 怎么学 Git");
  store.addMessage(c2.id, "user", "Git 三区是什么？");
  store.addMessage(
    c2.id,
    "assistant",
    "工作区、暂存区、仓库。\ngit add 把改动放进暂存区，git commit 把暂存区存成一次提交。",
  );
}

function handleCreate() {
  store.searchQuery = "";
  store.createConversation(`新会话 ${store.conversations.length + 1}`);
}
function handleSend(content: string) {
  const conv = store.activeConversation;
  if (!conv) return;

  store.addMessage(conv.id, "user", content);

  // 模拟 AI 回复：0.6 秒后回一句。Week 7 会换成真正的大模型 API
  const convId = conv.id;
  setTimeout(() => {
    // 等待的这 0.6 秒里，用户可能已经把这个会话删了
    const stillExists = store.conversations.some((c) => c.id === convId);
    if (!stillExists) return;
    store.addMessage(convId, "assistant", `（模拟回复）你刚才说的是：${content}`);
  }, 600);
}
</script>

<template>
  <div class="h-screen flex">
    <aside class="w-64 flex-shrink-0 border-r bg-gray-50">
      <ConversationList 
      v-model:search="store.searchQuery" 
      :conversations="store.filteredConversations"
      :active-id="store.activeId" 
      @select="store.selectConversation" 
      @create="handleCreate"
      @delete="store.deleteConversation"
       />
    </aside>

    <main class="flex-1 min-w-0 flex flex-col">
      <template v-if="store.activeConversation">
        <header class="px-6 py-4 border-b">
          <h2 class="text-lg font-semibold">
            {{ store.activeConversation.title }}
          </h2>
        </header>
        <MessageList :messages="store.activeConversation.messages" />
        <MessageInput @send="handleSend" />
      </template>

      <div v-else class="flex-1 flex items-center justify-center text-gray-400">
        选择或新建一个会话
      </div>
    </main>
  </div>
</template>
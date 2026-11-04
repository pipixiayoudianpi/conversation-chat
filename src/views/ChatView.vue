<script setup lang="ts">
import { useConversationStore } from "@/stores/conversation";

const store = useConversationStore();

// 临时：没有数据时塞几条示例数据，方便看效果
if (store.conversations.length === 0) {
  const c1 = store.createConversation("问 AI 怎么学 TS");
  store.addMessage(c1.id, "user", "我该怎么学 TypeScript？");
  store.addMessage(c1.id, "assistant", "先掌握 6 大核心点，然后实战写类。");
  store.createConversation("随便聊聊");
}

function handleCreate() {
  store.createConversation(`新会话 ${store.conversations.length + 1}`);
}
</script>

<template>
  <div class="p-6 max-w-xl mx-auto">
    <button
      class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
      @click="handleCreate"
    >
      + 新建会话
    </button>

    <ul class="mt-4 space-y-2">
      <li
        v-for="c in store.sortedConversations"
        :key="c.id"
        class="p-3 rounded border cursor-pointer flex justify-between"
        :class="c.id === store.activeId ? 'bg-blue-50 border-blue-400' : ''"
        @click="store.selectConversation(c.id)"
      >
        <span>{{ c.title }}（{{ c.messages.length }} 条消息）</span>
        <button
          class="text-gray-400 hover:text-red-500"
          @click.stop="store.deleteConversation(c.id)"
        >
          删除
        </button>
      </li>
    </ul>

    <p class="mt-4 text-gray-500">
      当前选中：{{ store.activeConversation?.title ?? "无" }}
    </p>
  </div>
</template>
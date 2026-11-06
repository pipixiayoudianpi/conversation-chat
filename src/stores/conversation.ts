// src/stores/conversation.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Conversation, Message } from "@/types";

export const useConversationStore = defineStore("conversation", () => {
  // ===== state：数据 =====
  const conversations = ref<Conversation[]>([]);
  const activeId = ref<string | null>(null);
  const searchQuery = ref("");
  // ===== getters：从数据算出来的值 =====
  // 按最近更新时间排序（先复制再排序，不改动原数组）
  const sortedConversations = computed(() =>
    [...conversations.value].sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
    ),
  );
  // 按关键词过滤：标题或任意一条消息内容包含关键词，不区分大小写
  const filteredConversations = computed(() => {
    const q = searchQuery.value.trim().toLowerCase();
    if (!q) return sortedConversations.value;
    return sortedConversations.value.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.messages.some((m) => m.content.toLowerCase().includes(q)),
    );
  });

  // 当前选中的会话，没选中时为 null
  const activeConversation = computed(
    () => conversations.value.find((c) => c.id === activeId.value) ?? null,
  );

  // ===== actions：修改数据的操作 =====
  function createConversation(title: string): Conversation {
    const now = new Date();
    const conv: Conversation = {
      id: crypto.randomUUID(),
      title,
      messages: [],
      createdAt: now,
      updatedAt: now,
    };
    conversations.value.push(conv);
    activeId.value = conv.id; // 新建后自动选中
    return conv;
  }

  function addMessage(
    convId: string,
    role: Message["role"],
    content: string,
  ): Message {
    const conv = conversations.value.find((c) => c.id === convId);
    if (!conv) throw new Error(`Conversation ${convId} not found`);

    const msg: Message = {
      id: crypto.randomUUID(),
      role,
      content,
      createdAt: new Date(),
    };
    conv.messages.push(msg);
    conv.updatedAt = new Date();
    return msg;
  }

  function deleteConversation(convId: string): boolean {
    const index = conversations.value.findIndex((c) => c.id === convId);
    if (index === -1) return false;

    conversations.value.splice(index, 1);
    // 如果删的正好是当前选中的，改为选中剩下最新的一个
    if (activeId.value === convId) {
      activeId.value = sortedConversations.value[0]?.id ?? null;
    }
    return true;
  }

  function selectConversation(convId: string): void {
    activeId.value = convId;
  }

  // 只有 return 出去的，组件才能用
  return {
    conversations,
    activeId,
    searchQuery,
    sortedConversations,
    activeConversation,
    createConversation,
    addMessage,
    deleteConversation,
    selectConversation,
    filteredConversations,
  };
});

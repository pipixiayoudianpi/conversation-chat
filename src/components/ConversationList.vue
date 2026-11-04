<script setup lang="ts">
import type { Conversation } from "@/types";

defineProps<{
  conversations: Conversation[];
  activeId: string | null;
}>();

const emit = defineEmits<{
  select: [id: string];
  create: [];
  delete: [id: string];
}>();
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="p-3 border-b">
      <button
        class="w-full px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        @click="emit('create')"
      >
        + 新建会话
      </button>
    </div>

    <ul class="flex-1 overflow-y-auto p-2 space-y-1">
      <li
        v-for="c in conversations"
        :key="c.id"
        class="group px-3 py-2 rounded cursor-pointer flex items-center justify-between"
        :class="c.id === activeId ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'"
        @click="emit('select', c.id)"
      >
        <div class="min-w-0">
          <p class="truncate">{{ c.title }}</p>
          <p class="text-xs text-gray-400">{{ c.messages.length }} 条消息</p>
        </div>
        <button
          class="ml-2 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500"
          @click.stop="emit('delete', c.id)"
        >
          ✕
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import type { Message } from "@/types";

defineProps<{
  messages: Message[];
}>();
</script>

<template>
  <div class="flex-1 overflow-y-auto p-6 space-y-4">
    <p v-if="messages.length === 0" class="text-center text-gray-400 mt-20">
      还没有消息
    </p>

    <div
      v-for="msg in messages"
      :key="msg.id"
      class="flex"
      :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
    >
      <div
        class="max-w-[70%] px-4 py-2 rounded-lg"
        :class="
          msg.role === 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-800'
        "
      >
        <p class="whitespace-pre-wrap">{{ msg.content }}</p>
        <p class="text-xs mt-1 opacity-60">
          {{ msg.createdAt.toLocaleTimeString() }}
        </p>
      </div>
    </div>
  </div>
</template>
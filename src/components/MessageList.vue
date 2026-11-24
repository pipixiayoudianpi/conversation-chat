<script setup lang="ts">
// import { useTemplateRef } from "vue";
import type { Message } from "@/types";
import { useAutoScroll } from "@/components/useAutoScroll";

const { messages } = defineProps<{
    messages: Message[];
}>();

// 拿到模板里 ref="container" 的那个 DOM 元素
// const container = useTemplateRef<HTMLDivElement>("container");

// function scrollToBottom(smooth = true) {
//     const el = container.value;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
// }

// 首次显示时直接跳到底部
// onMounted(() => useAutoScroll(container, true));

// 切换会话、或者消息条数变化时，滚到底部

useAutoScroll('container', [() => messages, () => messages.length]);
</script>

<template>
    <div ref="container" class="flex-1 overflow-y-auto p-6 space-y-4">
        <p v-if="messages.length === 0" class="text-center text-gray-400 mt-20">
            还没有消息
        </p>

        <div v-for="msg in messages" :key="msg.id" class="flex"
            :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
            <div class="max-w-[70%] px-4 py-2 rounded-lg" :class="msg.role === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800'
                ">
                <p class="whitespace-pre-wrap">{{ msg.content }}</p>
                <p class="text-xs mt-1 opacity-60">
                    {{ new Date(msg.createdAt).toLocaleTimeString() }}
                </p>
            </div>
        </div>
    </div>
</template>
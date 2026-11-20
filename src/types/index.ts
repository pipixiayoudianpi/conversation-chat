// src/types/index.ts

export interface Message {
  readonly id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: number;
}

export interface Conversation {
  readonly id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

// src/types/index.ts

export interface Message {
  readonly id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: Date;
}

export interface Conversation {
  readonly id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

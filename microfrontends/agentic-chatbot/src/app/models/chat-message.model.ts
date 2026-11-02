export type ChatRole = 'user' | 'bot';

export interface ChatCitation {
  ideaId: string;
  title: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  timestamp: string;
  citations?: ChatCitation[];
}

export interface ChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  history: ChatHistoryItem[];
}

export interface ChatResponse {
  answer: string;
  citations: ChatCitation[];
}

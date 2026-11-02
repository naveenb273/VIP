import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ChatHistoryItem, ChatMessage, ChatRequest, ChatResponse } from '../models/chat-message.model';

@Injectable({ providedIn: 'root' })
export class ChatAgentService {
  private readonly http = inject(HttpClient);

  ask(prompt: string, history: ChatHistoryItem[]): Observable<ChatMessage> {
    const request: ChatRequest = { message: prompt, history };

    return this.http.post<ChatResponse>('/api/chat', request).pipe(
      map(response => ({
        id: crypto.randomUUID(),
        role: 'bot' as const,
        text: response.answer,
        timestamp: new Date().toISOString(),
        citations: response.citations
      }))
    );
  }
}

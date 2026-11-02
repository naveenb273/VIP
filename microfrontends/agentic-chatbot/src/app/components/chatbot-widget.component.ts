import { Component, Input, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatAgentService } from '../services/chat-agent.service';
import { renderMarkdown } from '../services/markdown.util';
import { ChatHistoryItem, ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'vip-agentic-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './chatbot-widget.component.html',
  styleUrls: ['./chatbot-widget.component.scss']
})
export class ChatbotWidgetComponent {
  private agent = inject(ChatAgentService);
  readonly renderMarkdown = renderMarkdown;

  @Input() set botName(value: string) {
    this.name.set(value || 'VIP Assistant');
  }

  name = signal('VIP Assistant');
  open = signal(false);
  thinking = signal(false);
  draft = '';
  messages = signal<ChatMessage[]>([]);

  initials = computed(() =>
    this.name()
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase()
  );

  toggle(): void {
    this.open.update(value => !value);
    if (this.open() && this.messages().length === 0) {
      this.push({
        id: crypto.randomUUID(),
        role: 'bot',
        text: `Hi, I am ${this.name()}. Ask me anything about ideas on VIP.`,
        timestamp: new Date().toISOString()
      });
    }
  }

  send(): void {
    const prompt = this.draft.trim();
    if (!prompt || this.thinking()) {
      return;
    }

    const history = this.toHistory(this.messages());
    this.push({ id: crypto.randomUUID(), role: 'user', text: prompt, timestamp: new Date().toISOString() });
    this.draft = '';
    this.thinking.set(true);

    this.agent.ask(prompt, history).subscribe({
      next: reply => {
        this.push(reply);
        this.thinking.set(false);
      },
      error: () => {
        this.push({
          id: crypto.randomUUID(),
          role: 'bot',
          text: 'Something went wrong reaching the agent. Please try again.',
          timestamp: new Date().toISOString()
        });
        this.thinking.set(false);
      }
    });
  }

  private toHistory(messages: ChatMessage[]): ChatHistoryItem[] {
    return messages
      .filter(message => message.role === 'user' || message.citations !== undefined)
      .slice(-8)
      .map(message => ({
        role: message.role === 'user' ? 'user' : 'assistant',
        content: message.text
      }));
  }

  private push(message: ChatMessage): void {
    this.messages.update(list => [...list, message]);
  }
}

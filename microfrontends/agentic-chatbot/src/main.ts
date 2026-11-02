import { provideHttpClient } from '@angular/common/http';
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { ChatbotWidgetComponent } from './app/components/chatbot-widget.component';

export const CHATBOT_ELEMENT_TAG = 'vip-agentic-chatbot';

createApplication({ providers: [provideHttpClient()] })
  .then(appRef => {
    if (customElements.get(CHATBOT_ELEMENT_TAG)) {
      return;
    }
    const element = createCustomElement(ChatbotWidgetComponent, { injector: appRef.injector });
    customElements.define(CHATBOT_ELEMENT_TAG, element);
  })
  .catch(error => console.error('[agentic-chatbot] bootstrap failed', error));

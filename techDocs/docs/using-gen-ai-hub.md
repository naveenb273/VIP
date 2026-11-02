# AI Integration in VIP

## Overview

The VIP platform integrates with **Volvo Gen AI Hub** for intelligent features including AI-powered chat, idea suggestions, and content analysis. This integration enables secure, governed access to Large Language Models (LLMs) through a centralized gateway.

---

## Architecture

### Backend AI Client (`backend/services/gen-ai-client.js`)

The backend exposes AI capabilities through the Gen AI Hub client service:

- **Gen AI Hub Integration** — Connects to Volvo's centralized LLM gateway
- **Secure API Keys** — Uses `GEN_AI_API_KEY` environment variable (managed via Key Vault in production)
- **Request/Response Handling** — Abstracts AI service communication

### Frontend AI Components

**Agentic Chatbot MFE** (`microfrontends/agentic-chatbot/`):
- Standalone Angular micro-frontend for chat interface
- Real-time conversation with AI
- Embedded in main application via module federation
- Mounted alongside primary VIP application

**Chat Route** (`backend/routes/chat.js`):
- API endpoint for chat message processing
- Integrates with Gen AI Hub through `gen-ai-client.js`
- Stores chat history in application database

---

## Using the Chatbot Feature

### Starting a Chat

1. Navigate to **Chatbot** section in the application
2. Type your question or prompt
3. Send message — backend processes through Gen AI Hub
4. View AI response in real-time

### Conversation Capabilities

- **Idea Analysis** — Get AI suggestions for improving ideas
- **Content Enhancement** — Request rewrites or expansions
- **Brainstorming** — Collaborate with AI on new ideas
- **Documentation Help** — Generate or refine technical content

---

## Backend Implementation

### Environment Configuration

```bash
# .env (development)
GEN_AI_API_KEY=your_api_key_here

# Production: Stored in Azure Key Vault
```

### Chat API Endpoint

**POST** `/api/chat`

```json
{
  "message": "Your prompt here",
  "conversationId": "optional-conversation-id",
  "context": {
    "ideaId": "idea-uuid",
    "userId": "user-uuid"
  }
}
```

**Response:**

```json
{
  "id": "message-uuid",
  "conversationId": "conversation-uuid",
  "role": "assistant",
  "content": "AI response here",
  "timestamp": "2026-09-11T10:30:00Z"
}
```

---

## Idea Retriever Service

**File:** `backend/services/idea-retriever.js`

Provides AI-powered idea search and retrieval:

- **Semantic Search** — Find ideas by meaning, not just keywords
- **Content Filtering** — Filter ideas by tags, status, and author
- **Relevance Ranking** — Rank ideas by relevance to user query

### Usage Example (Backend)

```javascript
const ideaRetriever = require('../services/idea-retriever.js');

// Search ideas with AI
const results = await ideaRetriever.search({
  query: 'electric vehicle optimization',
  filters: { status: 'active' },
  limit: 10
});
```

---

## Official Gen AI Hub Documentation

For comprehensive information about Gen AI Hub:

- **Overview** — [Volvo GenAI Hub](https://confluence.it.volvo.net/spaces/IBT/pages/386632103/Volvo+GenAI+Hub)
- **Authentication & Access** — [How to get access to Gen AI HUB](https://confluence.it.volvo.net/spaces/IBT/pages/419138330/How+to+get+access+to+Gen+AI+HUB)
- **Capabilities & Models** — [Capabilities](https://confluence.it.volvo.net/spaces/IBT/pages/396198071/Capabilities)      
- **Compliance & Security** — [Compliance](https://confluence.it.volvo.net/spaces/IBT/pages/392497357/Compliance)  
- **API Catalog** — [Volvo Gen AI Hub APIs](https://www.volvogenaihubqa.volvogroup.net/apis)

---

## Environment Setup

### Local Development

1. **Get API Key** — Request access to Gen AI Hub (see documentation link above)
2. **Set Environment Variable:**
   ```bash
   # Windows (PowerShell)
   $env:GEN_AI_API_KEY="your-api-key"
   
   # Unix/Mac
   export GEN_AI_API_KEY="your-api-key"
   ```
3. **Restart Backend Server** — Changes take effect on next `npm run start:api`

### Production Deployment

- **Key Storage** — API key stored in Azure Key Vault
- **RBAC** — Accessed via managed identity authentication
- **Rotation** — Regular key rotation handled by security team

---

## Troubleshooting

### Chat Not Working

1. **Verify Backend is Running** — `npm run start:api` should be active
2. **Check API Key** — Ensure `GEN_AI_API_KEY` is set correctly
3. **Test Gen AI Hub Access** — Verify credentials with Gen AI Hub team
4. **Check Network** — Ensure connection to Volvo Gen AI Hub endpoint
5. **Review Logs** — Check backend console for error messages

### Rate Limiting

- Gen AI Hub may rate-limit requests
- Implement exponential backoff in client code
- Contact Gen AI HUB team for quota adjustments

---

## Support & Contacts

| Item | Contact |
|------|----------|
| **Gen AI Hub Owner** | Function Gen AI HUB |
| **Support Email** | [Function.GenAIHUB@volvo.com](mailto:Function.GenAIHUB@volvo.com) |
| **VIP Project Owner** | Naveen Basavarajappa |
| **Access Requests** | Function Gen AI HUB |

---
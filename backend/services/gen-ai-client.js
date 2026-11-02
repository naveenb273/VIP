const DEFAULT_TIMEOUT_MS = 30_000;

export class ChatProviderError extends Error {
  constructor(message, { status, configurationError = false } = {}) {
    super(message);
    this.name = 'ChatProviderError';
    this.status = status;
    this.configurationError = configurationError;
  }
}

const requiredEnvironment = (name) => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new ChatProviderError(`Missing required chatbot configuration: ${name}`, {
      configurationError: true
    });
  }
  return value;
};

const buildHeaders = (apiKey) => {
  const headerName = process.env.GEN_AI_API_KEY_HEADER?.trim() || 'Authorization';
  const prefix = process.env.GEN_AI_API_KEY_PREFIX ?? 'Bearer ';

  return {
    'Content-Type': 'application/json',
    [headerName]: `${prefix}${apiKey}`
  };
};

export async function generateChatCompletion(messages) {
  const endpoint = requiredEnvironment('GEN_AI_ENDPOINT');
  const apiKey = requiredEnvironment('GEN_AI_API_KEY');
  const model = requiredEnvironment('GEN_AI_MODEL');
  const timeoutMs = Number(process.env.GEN_AI_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const instructions = messages
    .filter(({ role }) => role === 'system')
    .map(({ content }) => content)
    .join('\n\n');
  const input = messages
    .filter(({ role }) => role !== 'system')
    .map(({ role, content }) => ({ role, content }));

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: buildHeaders(apiKey),
      body: JSON.stringify({
        model,
        instructions,
        input,
        max_output_tokens: 700
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      const responseText = await response.text();
      let providerMessage = '';
      try {
        const errorPayload = JSON.parse(responseText);
        providerMessage = errorPayload?.error?.message || errorPayload?.message || '';
      } catch {
        providerMessage = responseText;
      }

      const safeMessage = String(providerMessage).replace(/\s+/g, ' ').trim().slice(0, 500);
      throw new ChatProviderError(
        `Chat model request failed with status ${response.status}${safeMessage ? `: ${safeMessage}` : ''}`,
        {
          status: response.status,
          configurationError: response.status === 401 || response.status === 403
        }
      );
    }

    const payload = await response.json();
    const content = typeof payload?.output_text === 'string'
      ? payload.output_text
      : payload?.output
        ?.flatMap((item) => Array.isArray(item?.content) ? item.content : [])
        .filter((item) => item?.type === 'output_text' && typeof item.text === 'string')
        .map((item) => item.text)
        .join('\n');
    if (typeof content !== 'string' || !content.trim()) {
      throw new Error('Chat model returned an invalid response');
    }

    return content.trim();
  } catch (error) {
    const causeCode = error instanceof Error && typeof error.cause === 'object' && error.cause !== null && 'code' in error.cause
      ? String(error.cause.code)
      : '';
    if (causeCode === 'SELF_SIGNED_CERT_IN_CHAIN') {
      throw new Error('Azure OpenAI TLS validation failed. Configure NODE_EXTRA_CA_CERTS with the corporate root CA certificate.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

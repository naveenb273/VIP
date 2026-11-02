/**
 * Minimal, dependency-free Markdown renderer for chatbot replies.
 *
 * Security: all raw text is HTML-escaped FIRST, so model output can never
 * inject markup. Only a small, known set of formatting constructs is then
 * re-introduced: tables, bold, inline code, unordered/ordered lists, and
 * paragraphs. This keeps the surface area small while supporting the common
 * formats the assistant produces (notably Markdown tables).
 */

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const renderInline = (text: string): string =>
  text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');

const isTableSeparator = (line: string): boolean =>
  /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(line);

const splitRow = (line: string): string[] =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map(cell => cell.trim());

const renderTable = (headerLine: string, bodyLines: string[]): string => {
  const headers = splitRow(headerLine);
  const head = `<thead><tr>${headers.map(cell => `<th>${renderInline(cell)}</th>`).join('')}</tr></thead>`;
  const rows = bodyLines
    .map(line => splitRow(line))
    .map(cells => `<tr>${cells.map(cell => `<td>${renderInline(cell)}</td>`).join('')}</tr>`)
    .join('');
  return `<table class="md-table">${head}<tbody>${rows}</tbody></table>`;
};

/**
 * Convert already-escaped Markdown text into safe HTML.
 */
export function renderMarkdown(raw: string): string {
  const source = escapeHtml(raw ?? '').replace(/\r\n/g, '\n');
  const lines = source.split('\n');
  const blocks: string[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let listOrdered = false;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(`<p>${paragraph.map(renderInline).join('<br>')}</p>`);
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      const tag = listOrdered ? 'ol' : 'ul';
      blocks.push(`<${tag}>${listItems.map(item => `<li>${renderInline(item)}</li>`).join('')}</${tag}>`);
      listItems = [];
    }
  };

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];

    if (
      line.includes('|') &&
      index + 1 < lines.length &&
      isTableSeparator(lines[index + 1])
    ) {
      flushParagraph();
      flushList();
      const body: string[] = [];
      let cursor = index + 2;
      while (cursor < lines.length && lines[cursor].includes('|')) {
        body.push(lines[cursor]);
        cursor++;
      }
      blocks.push(renderTable(line, body));
      index = cursor - 1;
      continue;
    }

    const orderedMatch = /^\s*\d+\.\s+(.*)$/.exec(line);
    const unorderedMatch = /^\s*[-*]\s+(.*)$/.exec(line);
    if (orderedMatch || unorderedMatch) {
      flushParagraph();
      const ordered = Boolean(orderedMatch);
      if (listItems.length && ordered !== listOrdered) flushList();
      listOrdered = ordered;
      listItems.push((orderedMatch ?? unorderedMatch)![1]);
      continue;
    }

    if (line.trim() === '') {
      flushParagraph();
      flushList();
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return blocks.join('');
}

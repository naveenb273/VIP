import { readDb } from '../data/db.helper.js';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'how', 'i',
  'in', 'is', 'it', 'me', 'of', 'on', 'or', 'that', 'the', 'this', 'to', 'was',
  'what', 'when', 'where', 'which', 'who', 'with', 'you'
]);

const normalize = (value = '') => String(value)
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[^a-z0-9\s-]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const tokenize = (value) => normalize(value)
  .split(' ')
  .filter((token) => (token.length > 1 || /^\d$/.test(token)) && !STOP_WORDS.has(token));

const countMatches = (queryTokens, textTokens) => {
  const terms = new Set(textTokens);
  return queryTokens.reduce((score, token) => score + (terms.has(token) ? 1 : 0), 0);
};

const toSearchDocument = (idea) => {
  const information = idea.ideaInformation ?? {};
  const engagement = idea.engagement ?? {};
  const audit = idea.audit ?? {};
  const content = idea.content ?? {};

  return {
    ideaId: String(idea.id ?? ''),
    title: String(information.title ?? ''),
    description: String(information.description ?? ''),
    tags: Array.isArray(information.tags) ? information.tags.map(String) : [],
    authorName: String(idea.authorInformation?.name ?? ''),
    likes: Number(engagement.likes) || 0,
    shares: Number(engagement.shares) || 0,
    commentCount: Array.isArray(content.comments) ? content.comments.length : 0,
    collaboratorCount: Array.isArray(idea.collaboratorInformation?.members)
      ? idea.collaboratorInformation.members.length
      : 0,
    createdDate: String(audit.createdDate ?? '')
  };
};

const publishedDocuments = () => {
  const db = readDb();
  return (Array.isArray(db.ideas) ? db.ideas : [])
    .filter((idea) => idea.ideaInformation?.status === 'published')
    .map(toSearchDocument);
};

const RANKABLE_METRICS = {
  likes: { keywords: ['like', 'liked', 'likes', 'popular'], label: 'likes' },
  shares: { keywords: ['share', 'shared', 'shares'], label: 'shares' },
  commentCount: { keywords: ['comment', 'comments', 'commented', 'discussed'], label: 'comments' },
  collaboratorCount: { keywords: ['collaborated', 'collaboration', 'collaborators', 'collaborator'], label: 'collaborators' },
  createdDate: { keywords: ['recent', 'newest', 'latest', 'new'], label: 'created date' }
};

const SUPERLATIVE_TOKENS = ['top', 'most', 'best', 'highest', 'leading', 'popular', 'trending'];
const SINGULAR_TOKENS = ['which', 'what is the', 'single', 'the most', 'one'];

const parseRequestedCount = (queryTokens) => {
  const words = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
  for (const token of queryTokens) {
    if (/^\d+$/.test(token)) return Math.min(Number(token), 20);
    if (token in words) return words[token];
  }
  return null;
};

const detectMetric = (queryTokens, rawLower) => {
  const tokenSet = new Set(queryTokens);
  for (const [key, meta] of Object.entries(RANKABLE_METRICS)) {
    const keywords = key === 'shares' && /\bshare\s+(me|us|the)\b/.test(rawLower)
      ? meta.keywords.filter((keyword) => keyword !== 'share')
      : meta.keywords;
    if (keywords.some((keyword) => tokenSet.has(keyword))) return key;
  }
  return null;
};

/**
 * Interpret ranking/aggregation intent (e.g. "top 5 most liked ideas",
 * "which is the most liked", "newest ideas"). Ranking is computed
 * deterministically across ALL published ideas so the model never has to
 * rank records it was not shown.
 */
export function planQuery(query) {
  const rawLower = String(query ?? '').toLowerCase();
  const queryTokens = tokenize(query);
  const tokenSet = new Set(queryTokens);

  const hasSuperlative = SUPERLATIVE_TOKENS.some((token) => tokenSet.has(token));
  const metric = detectMetric(queryTokens, rawLower);
  const requestedCount = parseRequestedCount(queryTokens);
  const isRanking = Boolean(metric) || hasSuperlative || requestedCount !== null;

  if (!isRanking) {
    return { type: 'search', documents: retrieveIdeas(query) };
  }

  // Words that express delivery/format intent, not searchable idea content.
  const FILLER_TOKENS = new Set([
    'share', 'shares', 'show', 'give', 'list', 'display', 'provide', 'get', 'fetch',
    'idea', 'ideas', 'table', 'format', 'please', 'us', 'me', 'the', 'top'
  ]);
  const NUMBER_WORDS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

  const hasContentTerms = queryTokens.some(
    (token) => !SUPERLATIVE_TOKENS.includes(token)
      && !FILLER_TOKENS.has(token)
      && !/^\d+$/.test(token)
      && !NUMBER_WORDS.includes(token)
      && !Object.values(RANKABLE_METRICS).some((meta) => meta.keywords.includes(token))
  );

  if (!metric && !hasContentTerms) {
    return { type: 'clarify', metricOptions: ['likes', 'shares', 'comments', 'collaborators', 'recent'] };
  }

  const activeMetric = metric ?? 'likes';
  const singular = SINGULAR_TOKENS.some((phrase) => rawLower.includes(phrase)) && requestedCount === null;
  const limit = singular ? 1 : (requestedCount ?? 5);

  const ranked = publishedDocuments()
    .slice()
    .sort((left, right) => {
      if (activeMetric === 'createdDate') {
        return String(right.createdDate).localeCompare(String(left.createdDate));
      }
      return (right[activeMetric] ?? 0) - (left[activeMetric] ?? 0);
    });

  const topValue = activeMetric === 'createdDate' ? null : ranked[0]?.[activeMetric] ?? 0;
  const tiedDocuments = activeMetric === 'createdDate'
    ? []
    : ranked.filter((doc) => doc[activeMetric] === topValue);
  const tied = tiedDocuments.length > 1;

  // For a singular request with a tie, surface all tied leaders (capped) so the
  // model can list them instead of arbitrarily returning one.
  const documents = singular && tied
    ? []
    : ranked.slice(0, limit);

  return {
    type: 'rank',
    metric: activeMetric,
    metricLabel: RANKABLE_METRICS[activeMetric].label,
    singular,
    limit,
    tied: singular && tied,
    tieCount: singular && tied ? tiedDocuments.length : 0,
    topValue,
    documents
  };
}

export function retrieveIdeas(query, limit = 5) {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  return publishedDocuments()
    .map((document) => {
      const titleScore = countMatches(queryTokens, tokenize(document.title)) * 5;
      const tagScore = countMatches(queryTokens, tokenize(document.tags.join(' '))) * 4;
      const descriptionScore = countMatches(queryTokens, tokenize(document.description)) * 2;
      const authorScore = countMatches(queryTokens, tokenize(document.authorName));
      return { document, score: titleScore + tagScore + descriptionScore + authorScore };
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map(({ document }) => document);
}

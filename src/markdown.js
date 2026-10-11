const frontMatterPattern = /^---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;

function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function optionalUrl(value) {
  const candidate = text(value);
  if (!candidate) return '';
  try {
    const parsed = new URL(candidate);
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : '';
  } catch {
    return '';
  }
}

function coverPath(value) {
  const candidate = text(value);
  if (!candidate || candidate.startsWith('//')) return '';
  if (candidate.startsWith('/')) return candidate;
  try {
    const parsed = new URL(candidate);
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : '';
  } catch {
    return '';
  }
}

function stringList(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map(text).filter(Boolean))];
}

export function parseProject(source, filename) {
  const match = source.match(frontMatterPattern);
  if (!match) throw new Error('Front matter is missing or not closed with ---');
  if (!window.jsyaml || typeof window.jsyaml.load !== 'function') throw new Error('The YAML parser did not load');

  let metadata;
  try {
    metadata = window.jsyaml.load(match[1]);
  } catch (error) {
    throw new Error(`Invalid YAML front matter: ${error.message}`);
  }
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    throw new Error('Front matter must contain a YAML mapping');
  }

  const title = text(metadata.title);
  const summary = text(metadata.summary);
  if (!title || !summary) throw new Error('Required metadata missing: title and summary must be provided');

  const place = Number(metadata.place);
  const year = Number(metadata.year);
  const body = source.slice(match[0].length).trim();
  return {
    slug: filename.replace(/\.md$/i, ''),
    title,
    summary,
    winner: text(metadata.winner),
    award: text(metadata.award),
    place: Number.isInteger(place) && place > 0 ? place : null,
    event: text(metadata.event),
    year: Number.isInteger(year) && year > 0 ? year : null,
    cover: coverPath(metadata.cover),
    demo: optionalUrl(metadata.demo),
    github: optionalUrl(metadata.github),
    tags: stringList(metadata.tags),
    body,
  };
}

export function renderMarkdown(body) {
  if (!window.marked || typeof window.marked.parse !== 'function') throw new Error('The Markdown renderer did not load');
  if (!window.DOMPurify || typeof window.DOMPurify.sanitize !== 'function') throw new Error('The HTML sanitizer did not load');
  const html = window.marked.parse(body || '', { gfm: true, breaks: false });
  const clean = window.DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  const fragment = document.createElement('template');
  fragment.innerHTML = clean;
  fragment.content.querySelectorAll('[href], [src]').forEach((element) => {
    const attribute = element.hasAttribute('href') ? 'href' : 'src';
    const value = element.getAttribute(attribute);
    try {
      const url = new URL(value, window.location.href);
      if (!['http:', 'https:'].includes(url.protocol)) element.removeAttribute(attribute);
    } catch {
      element.removeAttribute(attribute);
    }
    if (element.tagName === 'A' && element.getAttribute('target') === '_blank') {
      element.setAttribute('rel', 'noopener noreferrer');
    }
  });
  return fragment.innerHTML;
}

import { parseProject, renderMarkdown } from './markdown.js';

const app = document.querySelector('#main');
const projectsUrl = '/projects/';
let projects = [];

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

function ordinal(value) {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${value}th`;
  return `${value}${({ 1: 'st', 2: 'nd', 3: 'rd' })[value % 10] || 'th'}`;
}

function awardLabel(project) {
  return project.award || 'Winner';
}

function coverMarkup(project, detail = false) {
  const cover = project.cover
    ? `<img src="${escapeHtml(project.cover)}" alt="${escapeHtml(project.title)} project cover" ${detail ? 'fetchpriority="high"' : 'loading="lazy"'} data-cover>`
    : '';
  return `<div class="project-cover${detail ? ' project-cover--detail' : ''}" aria-label="${project.cover ? `${escapeHtml(project.title)} cover image` : 'Project cover image not provided'}"><div class="cover-placeholder" aria-hidden="true"><span>FC<span class="cover-dot">.</span></span></div>${cover}</div>`;
}

function projectCard(project) {
  const facts = [project.event, project.year].filter(Boolean).map(escapeHtml).join(' <span aria-hidden="true">·</span> ');
  const tags = project.tags.slice(0, 3).map((tag) => `<span class="card-tag">${escapeHtml(tag)}</span>`).join('');
  return `<a class="project-card" href="#/project/${encodeURIComponent(project.slug)}" data-route aria-label="View ${escapeHtml(project.title)}, ${escapeHtml(awardLabel(project))}">
    ${coverMarkup(project)}
    <div class="card-content"><div class="card-award"><span class="award-star" aria-hidden="true">✳</span>${escapeHtml(awardLabel(project))}${project.place ? `<span class="placement">${escapeHtml(ordinal(project.place))}</span>` : ''}</div>
      <h3>${escapeHtml(project.title)}</h3><p class="card-summary">${escapeHtml(project.summary)}</p>
      <div class="card-byline">${project.winner ? `<span>By ${escapeHtml(project.winner)}</span>` : '<span>FirstCommit Pro</span>'}${facts ? `<span class="card-event">${facts}</span>` : ''}</div>
      ${tags ? `<div class="card-tags" aria-label="Project tags">${tags}</div>` : ''}
    </div><span class="card-arrow" aria-hidden="true">↗</span>
  </a>`;
}

function uniqueValues(key) {
  const values = projects.flatMap((project) => key === 'tags' ? project.tags : [project[key]])
    .filter((value) => value !== '' && value !== null && value !== undefined);
  return [...new Set(values)].sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }));
}

function currentFilters() {
  const params = new URLSearchParams(location.search);
  return {
    q: params.get('q') || '',
    award: params.get('award') || '',
    event: params.get('event') || '',
    year: params.get('year') || '',
    tag: params.get('tag') || '',
    sort: ['ranking', 'year', 'title'].includes(params.get('sort')) ? params.get('sort') : 'ranking',
  };
}

function selectedOption(value, selected) {
  return `<option value="${escapeHtml(value)}"${String(value) === String(selected) ? ' selected' : ''}>${escapeHtml(value)}</option>`;
}

function selectMarkup(id, label, values, selected, allLabel) {
  return `<label class="filter-control" for="${id}"><span>${label}</span><select id="${id}" data-filter="${id}"><option value="">${allLabel}</option>${values.map((value) => selectedOption(value, selected)).join('')}</select></label>`;
}

function controlsMarkup(filters) {
  const awards = [...new Set(projects.map(awardLabel))].sort((a, b) => a.localeCompare(b));
  return `<div class="gallery-controls" aria-label="Search and filter winning projects">
    <label class="search-control" for="project-search"><span class="sr-only">Search projects, winners, events, and tags</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.7"></circle><path d="m16 16 4.2 4.2"></path></svg><input id="project-search" type="search" value="${escapeHtml(filters.q)}" placeholder="Search the winners" autocomplete="off"></label>
    ${selectMarkup('award-filter', 'Award', awards, filters.award, 'All awards')}
    ${selectMarkup('event-filter', 'Event', uniqueValues('event'), filters.event, 'All events')}
    ${selectMarkup('year-filter', 'Year', uniqueValues('year').sort((a, b) => b - a), filters.year, 'All years')}
    ${selectMarkup('tag-filter', 'Tag', uniqueValues('tags'), filters.tag, 'All tags')}
    <label class="filter-control filter-sort" for="sort-filter"><span>Sort</span><select id="sort-filter" data-filter="sort"><option value="ranking"${filters.sort === 'ranking' ? ' selected' : ''}>Award ranking</option><option value="year"${filters.sort === 'year' ? ' selected' : ''}>Newest year</option><option value="title"${filters.sort === 'title' ? ' selected' : ''}>Title A–Z</option></select></label>
    <button class="clear-button${hasFilters(filters) ? '' : ' is-hidden'}" type="button" id="clear-filters">Clear all</button>
  </div>`;
}

function hasFilters(filters) {
  return Boolean(filters.q || filters.award || filters.event || filters.year || filters.tag || filters.sort !== 'ranking');
}

function filteredProjects(filters) {
  const query = filters.q.trim().toLocaleLowerCase();
  return projects.filter((project) => {
    const searchable = [project.title, project.summary, project.winner, project.event, ...project.tags].join(' ').toLocaleLowerCase();
    return (!query || searchable.includes(query))
      && (!filters.award || awardLabel(project) === filters.award)
      && (!filters.event || project.event === filters.event)
      && (!filters.year || String(project.year) === filters.year)
      && (!filters.tag || project.tags.includes(filters.tag));
  }).sort((a, b) => {
    if (filters.sort === 'title') return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
    if (filters.sort === 'year') return (b.year ?? -Infinity) - (a.year ?? -Infinity) || (a.place ?? Infinity) - (b.place ?? Infinity) || a.title.localeCompare(b.title);
    return (a.place ?? Infinity) - (b.place ?? Infinity) || (b.year ?? -Infinity) - (a.year ?? -Infinity) || a.title.localeCompare(b.title);
  });
}

function renderResults() {
  const filters = currentFilters();
  const visible = filteredProjects(filters);
  const result = document.querySelector('#project-results');
  if (!result) return;
  result.innerHTML = visible.length
    ? visible.map(projectCard).join('')
    : `<div class="empty-state"><span class="empty-mark" aria-hidden="true">∅</span><h3>No projects found</h3><p>Try another search or clear your filters to see the full collection.</p><button class="text-button" id="empty-clear" type="button">Clear search and filters <span aria-hidden="true">↗</span></button></div>`;
  result.querySelector('#empty-clear')?.addEventListener('click', clearFilters);
  const count = document.querySelector('#result-count');
  if (count) count.textContent = `${visible.length} ${visible.length === 1 ? 'project' : 'projects'}`;
  document.querySelector('#clear-filters')?.classList.toggle('is-hidden', !hasFilters(filters));
  bindCoverFallbacks();
}

function galleryMarkup() {
  const filters = currentFilters();
  const content = projects.length
    ? `<div class="gallery-heading"><div><span class="eyebrow">A FEW IDEAS, TAKEN FURTHER</span><h2 id="projects">The winners<span class="heading-period">.</span></h2></div><span class="result-count" id="result-count"></span></div>${controlsMarkup(filters)}<div class="project-grid" id="project-results"></div>`
    : `<div class="empty-gallery"><span class="eyebrow">THE NEXT CHAPTER STARTS HERE</span><h2 id="projects">A place for the<br>next big idea<span class="heading-period">.</span></h2><p>Winning projects will find their place in this gallery soon. Check back as the FirstCommit Pro collection grows.</p></div>`;
  app.innerHTML = `<section class="hero"><div class="hero-inner"><div class="hero-copy"><span class="eyebrow"><span class="hero-mark" aria-hidden="true">✳</span> THE FIRSTCOMMIT PRO WINNERS GALLERY</span><h1>Good ideas<br>deserve a <em>spotlight.</em></h1><p class="hero-intro">A considered collection of projects made by people who turned a first commit into something worth sharing.</p><a class="hero-link" href="#projects">Explore the winners <span aria-hidden="true">↓</span></a></div><div class="hero-note" aria-label="A showcase of awarded work"><div class="note-rule"></div><span class="note-index">AN OPEN COLLECTION</span><p>Curiosity, craft,<br>and the courage<br>to begin.</p><span class="note-stamp" aria-hidden="true">FC<br>PRO</span></div></div></section>
    <section class="gallery-section" aria-label="Winning projects"><div class="section-inner">${content}</div></section>
    <section class="about-section" id="about"><div class="about-inner"><span class="eyebrow">WHY WE KEEP THIS</span><p>Every project here began with a question, a sketch, or a first commit. This gallery celebrates the teams who brought their ideas to life—and gives the next builder something to imagine.</p><span class="about-signoff">FIRSTCOMMIT PRO <i aria-hidden="true">✳</i></span></div></section>`;
  renderResults();
  bindGalleryControls();
}

function projectPage(project) {
  const links = [
    project.demo ? `<a class="action-link action-primary" href="${escapeHtml(project.demo)}" target="_blank" rel="noopener noreferrer">Visit live project <span aria-hidden="true">↗</span></a>` : '',
    project.github ? `<a class="action-link" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer">Source on GitHub <span aria-hidden="true">↗</span></a>` : '',
  ].filter(Boolean).join('');
  const meta = [project.event, project.year].filter(Boolean).map(escapeHtml).join(' <span aria-hidden="true">·</span> ');
  let body;
  try {
    body = renderMarkdown(project.body);
  } catch (error) {
    console.error(`Could not render Markdown for ${project.slug}. Check that marked and DOMPurify are available.`, error);
    body = '<p>The project write-up could not be displayed. Please try again later.</p>';
  }

  app.innerHTML = `<article class="detail-page"><div class="detail-inner"><a class="back-link" href="#/" data-route><span aria-hidden="true">←</span> All winners</a>
    <header class="detail-header"><div class="card-award"><span class="award-star" aria-hidden="true">✳</span>${escapeHtml(awardLabel(project))}${project.place ? `<span class="placement">${escapeHtml(ordinal(project.place))}</span>` : ''}</div><h1>${escapeHtml(project.title)}</h1><p class="detail-summary">${escapeHtml(project.summary)}</p>
    <div class="detail-byline">${project.winner ? `<span>By ${escapeHtml(project.winner)}</span>` : ''}${meta ? `<span>${meta}</span>` : ''}</div>${project.tags.length ? `<div class="detail-tags">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>` : ''}${links ? `<div class="detail-actions">${links}</div>` : ''}</header>
    ${project.cover ? `<figure class="detail-art">${coverMarkup(project, true)}</figure>` : ''}
    <div class="markdown-body">${body}</div><a class="back-link back-link--bottom" href="#/" data-route><span aria-hidden="true">←</span> Back to all winners</a>
  </div></article>`;
  bindCoverFallbacks();
}

function currentRoute() {
  const route = location.hash.startsWith('#/') ? location.hash.slice(1) : '/';
  return route.split('?')[0];
}

function renderRoute() {
  const route = currentRoute();
  if (route === '/' || route === '') {
    galleryMarkup();
    return;
  }
  const match = route.match(/^\/project\/([^/]+)$/);
  let slug = '';
  try {
    slug = match ? decodeURIComponent(match[1]) : '';
  } catch {
    slug = '';
  }
  const project = projects.find((entry) => entry.slug === slug);
  if (project) {
    projectPage(project);
    window.scrollTo({ top: 0, behavior: 'auto' });
    return;
  }
  app.innerHTML = `<section class="not-found"><span class="eyebrow">404 / NOT IN THIS COLLECTION</span><h1>We couldn't find<br>that project<span class="heading-period">.</span></h1><a class="action-link action-primary" href="#/" data-route>Return to the winners <span aria-hidden="true">↗</span></a></section>`;
}

function navigate(href) {
  history.pushState({}, '', href);
  renderRoute();
  app.focus({ preventScroll: true });
}

function bindGalleryControls() {
  const search = document.querySelector('#project-search');
  let searchTimer;
  search?.addEventListener('input', () => {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => updateFilters({ q: search.value }, true), 100);
  });
  document.querySelectorAll('[data-filter]').forEach((control) => control.addEventListener('change', () => {
    updateFilters({ [control.dataset.filter.replace('-filter', '')]: control.value }, false);
  }));
  document.querySelector('#clear-filters')?.addEventListener('click', clearFilters);
}

function updateFilters(changes, replace) {
  const params = new URLSearchParams(location.search);
  Object.entries(changes).forEach(([key, value]) => value ? params.set(key, value) : params.delete(key));
  const next = params.toString();
  const url = `${location.pathname}${next ? `?${next}` : ''}${location.hash || '#/'}`;
  history[replace ? 'replaceState' : 'pushState']({}, '', url);
  const active = document.querySelector('#project-search');
  const selection = document.activeElement?.id;
  renderResults();
  if (active && selection === 'project-search') active.focus();
}

function clearFilters() {
  const url = `${location.pathname}${location.hash || '#/'}`;
  history.pushState({}, '', url);
  galleryMarkup();
  document.querySelector('#project-search')?.focus();
}

function bindCoverFallbacks() {
  document.querySelectorAll('[data-cover]').forEach((image) => image.addEventListener('error', () => {
    image.hidden = true;
    image.closest('.project-cover')?.classList.add('cover-is-missing');
  }, { once: true }));
}

app.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-route]');
  if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  navigate(link.getAttribute('href'));
});
window.addEventListener('popstate', renderRoute);
window.addEventListener('hashchange', () => {
  if (location.hash.startsWith('#/')) renderRoute();
});
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]:not([data-route])');
  if (!link || link.hash.startsWith('#/')) return;
  const targetId = link.hash.slice(1);
  if (document.getElementById(targetId)) return;
  if (!currentRoute().startsWith('/project/')) return;
  event.preventDefault();
  history.pushState({}, '', `${location.pathname}${location.search}#/`);
  renderRoute();
  requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' }));
});

async function loadProjects() {
  try {
    const response = await fetch(`${projectsUrl}index.json`);
    if (!response.ok) throw new Error(`Project index request failed (${response.status})`);
    const index = await response.json();
    if (!index || !Array.isArray(index.projects) || !index.projects.every((file) => typeof file === 'string')) {
      throw new Error('The projects index must contain a projects array of Markdown filenames');
    }
    if (index.projects.length && (!window.jsyaml || typeof window.jsyaml.load !== 'function')) {
      throw new Error('The YAML parser did not load. Check the browser network connection and refresh.');
    }

    const loaded = await Promise.all(index.projects.map(async (filename) => {
      if (!/^[_a-zA-Z0-9][\w.-]*\.md$/.test(filename) || filename.includes('..')) {
        console.error(`Skipped invalid project filename "${filename}". Use a Markdown filename inside projects/.`);
        return null;
      }
      try {
        const file = await fetch(`${projectsUrl}${encodeURIComponent(filename)}`);
        if (!file.ok) throw new Error(`Markdown request failed (${file.status})`);
        return parseProject(await file.text(), filename);
      } catch (error) {
        console.error(`Skipped project "${filename}". ${error.message}`);
        return null;
      }
    }));
    projects = loaded.filter(Boolean);
    renderRoute();
  } catch (error) {
    console.error(`Could not load the FirstCommit Pro project index. ${error.message}`);
    app.innerHTML = `<section class="load-error"><span class="eyebrow">THE GALLERY IS TAKING A MOMENT</span><h1>We couldn't load<br>the collection<span class="heading-period">.</span></h1><p>Please refresh in a little while. If you maintain this gallery, check <code>projects/index.json</code> and its Markdown filenames.</p><button class="text-button" type="button" id="retry-load">Try again <span aria-hidden="true">↗</span></button></section>`;
    document.querySelector('#retry-load').addEventListener('click', loadProjects);
  }
}

loadProjects();

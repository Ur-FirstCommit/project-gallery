(function () {
  'use strict';

  const { projects, events, creators } = window.FirstCommitData;
  const main = document.querySelector('#main-content');
  const header = document.querySelector('#site-header');
  const footer = document.querySelector('#site-footer');
  const categories = ['Web', 'Mobile', 'Desktop', 'Games', 'Hardware', 'AI', 'Other'];

  const byId = (items, id) => items.find((item) => item.id === id);
  const esc = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const eventFor = (project) => byId(events, project.eventId);
  const crewFor = (project) => project.creators.map((id) => byId(creators, id)).filter(Boolean);
  const dateLabel = (date) => new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(`${date}T12:00:00`));
  const countBuilders = () => new Set(projects.flatMap((project) => project.creators)).size;
  const routeFromLocation = () => new URLSearchParams(window.location.search).get('route') || window.location.pathname;

  function projectUrl(project) { return `/projects/${project.slug}`; }
  function eventUrl(event) { return `/events/${event.slug}`; }
  function navigate(url) {
    window.history.pushState({}, '', url);
    render();
    main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function artwork(project, large) {
    return `<div class="project-art art-${esc(project.imageTheme)}${large ? ' project-art--large' : ''}" role="img" aria-label="Abstract artwork for ${esc(project.title)}"><span class="project-art__grid"></span><span class="project-art__orb"></span><span class="project-art__line"></span><span class="project-art__label">${esc(project.category)} / 0${project.id.length}</span></div>`;
  }
  function thumbnail(project, large) {
    if (project.thumbnail) return `<div class="thumbnail-wrap${large ? ' thumbnail-wrap--large' : ''}">${artwork(project, large)}<img class="project-thumb" src="${esc(project.thumbnail)}" alt="${esc(project.title)} project preview" loading="lazy" /></div>`;
    return artwork(project, large);
  }

  function headerMarkup() {
    return `<div class="page-width nav-wrap">
      <a class="brand" href="/projects" data-link aria-label="FirstCommit Projects home"><span class="brand-mark" aria-hidden="true">F</span><span>FIRSTCOMMIT</span></a>
      <button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false"><span></span><span></span></button>
      <nav class="site-nav" aria-label="Primary navigation"><a href="/projects" data-link>Projects</a><a href="/events" data-link>Events</a><a class="nav-cta" href="#explore">Explore missions <span aria-hidden="true">↗</span></a></nav>
    </div>`;
  }

  function footerMarkup() {
    return `<div class="page-width footer-wrap"><a class="brand" href="/projects" data-link><span class="brand-mark" aria-hidden="true">F</span><span>FIRSTCOMMIT</span></a><p>Every project starts somewhere.</p><span class="footer-note">© ${new Date().getFullYear()} FIRSTCOMMIT</span></div>`;
  }

  function projectCard(project) {
    const event = eventFor(project);
    const crew = crewFor(project);
    return `<article class="project-card"><a class="project-card__image" href="${projectUrl(project)}" data-link>${thumbnail(project)}</a><div class="project-card__body">
      <div class="card-kicker"><span>${esc(project.status)}</span><span>${esc(event.year)}</span></div>
      <h3><a href="${projectUrl(project)}" data-link>${esc(project.title)}</a></h3><p>${esc(project.description)}</p>
      <div class="tags">${project.technologies.slice(0, 3).map((technology) => `<span>${esc(technology)}</span>`).join('')}</div>
      <div class="project-card__meta"><div class="mini-crew">${crew.map((person) => `<span title="${esc(person.name)}">${esc(person.initials)}</span>`).join('')}</div><a href="${eventUrl(event)}" data-link>${esc(event.name)}</a></div>
    </div></article>`;
  }

  function hero() {
    return `<section class="hero page-width"><div class="eyebrow"><span></span> PROJECT ARCHIVE / LIVE</div><div class="hero-grid"><div><h1>Explore what the next generation is <em>building.</em></h1><p>Discover projects created by FirstCommit participants — from first commits to finished products.</p>
      <form class="hero-search" id="hero-search" role="search"><label class="sr-only" for="project-search">Search projects, technologies, creators</label><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"></circle><path d="m16 16 4 4"></path></svg><input id="project-search" name="q" autocomplete="off" placeholder="Search projects, technologies, creators..." /><kbd>/</kbd></form></div>
      <div class="hero-signal" aria-hidden="true"><div class="signal-ring ring-one"></div><div class="signal-ring ring-two"></div><div class="signal-core"></div><span class="signal-label">DISCOVERY<br>SEQUENCE</span></div></div>
    <div class="telemetry-strip"><div><b>${projects.length.toString().padStart(2, '0')}</b><span>Projects logged</span></div><div><b>${countBuilders().toString().padStart(2, '0')}</b><span>Builders onboard</span></div><div><b>${events.length.toString().padStart(2, '0')}</b><span>Events archived</span></div><span class="telemetry-status"><i></i> Dataset online</span></div></section>`;
  }

  function filtersMarkup(state) {
    const options = (items, selected, empty) => `<option value="">${empty}</option>${items.map((item) => `<option value="${esc(item.value || item)}" ${selected === (item.value || item) ? 'selected' : ''}>${esc(item.label || item)}</option>`).join('')}`;
    return `<div class="explore-controls"><div class="filter-select"><label for="event-filter">Event</label><select id="event-filter">${options(events.map((event) => ({ value: event.slug, label: event.name })), state.event, 'All events')}</select></div><div class="filter-select"><label for="category-filter">Category</label><select id="category-filter">${options(categories, state.category, 'All categories')}</select></div><div class="filter-select"><label for="technology-filter">Technology</label><select id="technology-filter">${options([...new Set(projects.flatMap((project) => project.technologies))].sort(), state.technology, 'All technology')}</select></div><div class="filter-select filter-select--sort"><label for="sort-filter">Sort</label><select id="sort-filter">${options([{ value: 'newest', label: 'Newest' }, { value: 'updated', label: 'Recently updated' }, { value: 'featured', label: 'Featured first' }], state.sort, '')}</select></div><button type="button" class="clear-filters ${state.hasFilters ? '' : 'is-hidden'}" id="clear-filters">Clear</button></div>`;
  }

  function getState(defaultEvent) {
    const params = new URLSearchParams(window.location.search);
    const state = { q: params.get('q') || '', event: params.get('event') || defaultEvent || '', category: params.get('category') || '', technology: params.get('technology') || '', sort: params.get('sort') || 'newest' };
    state.hasFilters = Boolean(state.q || state.event || state.category || state.technology || state.sort !== 'newest');
    return state;
  }
  function filteredProjects(state) {
    const needle = state.q.trim().toLowerCase();
    const match = (project) => !needle || [project.title, project.description, ...project.technologies, ...crewFor(project).flatMap((person) => [person.name, person.username])].join(' ').toLowerCase().includes(needle);
    const subset = projects.filter((project) => match(project) && (!state.event || eventFor(project).slug === state.event) && (!state.category || project.category === state.category) && (!state.technology || project.technologies.includes(state.technology)));
    return subset.sort((a, b) => state.sort === 'featured' ? Number(b.featured) - Number(a.featured) || new Date(b.createdAt) - new Date(a.createdAt) : new Date(b[state.sort === 'updated' ? 'updatedAt' : 'createdAt']) - new Date(a[state.sort === 'updated' ? 'updatedAt' : 'createdAt']));
  }
  function explorer(defaultEvent) {
    const state = getState(defaultEvent);
    const visible = filteredProjects(state);
    const featured = projects.filter((project) => project.featured);
    return `${hero()}<section class="featured page-width" aria-labelledby="featured-heading"><div class="section-heading"><div><span class="section-index">01 / SIGNALS WORTH FOLLOWING</span><h2 id="featured-heading">Featured missions</h2></div><p>Projects with a story worth stepping into.</p></div><div class="featured-grid">${featured.slice(0, 3).map(projectCard).join('')}</div></section><section class="explore page-width" id="explore" aria-labelledby="explore-heading"><div class="section-heading"><div><span class="section-index">02 / ALL SYSTEMS</span><h2 id="explore-heading">Explore projects</h2></div><span class="result-count" id="result-count">${visible.length} mission${visible.length === 1 ? '' : 's'} found</span></div>${filtersMarkup(state)}<div class="project-grid" id="project-results">${visible.length ? visible.map(projectCard).join('') : emptyState()}</div></section>`;
  }
  function emptyState() { return `<div class="empty-state"><span class="empty-state__icon">⌁</span><h3>No missions found</h3><p>We couldn't find a project matching those parameters.</p><button class="button button--quiet" type="button" id="empty-clear">Clear search and filters</button></div>`; }

  function projectsPage() { return explorer(); }
  function eventsPage() {
    return `<section class="page-intro page-width"><div class="eyebrow"><span></span> EVENT ARCHIVE</div><h1>Moments that turn<br><em>ideas into motion.</em></h1><p>Each FirstCommit event is a focused space to start, learn, and share something real.</p></section><section class="events-list page-width">${events.map((event, index) => { const entries = projects.filter((project) => project.eventId === event.id); return `<article class="event-row"><div class="event-row__number">0${index + 1}</div><div><span class="section-index">${event.year} / ${esc(event.status)}</span><h2><a href="${eventUrl(event)}" data-link>${esc(event.name)}</a></h2><p>${esc(event.description)}</p></div><div class="event-row__stats"><b>${entries.length.toString().padStart(2, '0')}</b><span>Projects</span></div><a class="round-link" href="${eventUrl(event)}" data-link aria-label="Explore ${esc(event.name)}">↗</a></article>`; }).join('')}</section>`;
  }
  function projectDetail(project) {
    const event = eventFor(project); const crew = crewFor(project);
    return `<section class="detail-hero page-width"><a class="back-link" href="/projects" data-link>← Back to projects</a><div class="detail-hero__grid"><div><div class="card-kicker"><span>${esc(project.category)}</span><span>${esc(project.status)}</span></div><h1>${esc(project.title)}</h1><p>${esc(project.longDescription)}</p><div class="tags tags--large">${project.technologies.map((item) => `<span>${esc(item)}</span>`).join('')}</div><div class="detail-actions">${project.demoUrl ? `<a class="button" href="${esc(project.demoUrl)}" target="_blank" rel="noreferrer">Live demo <span>↗</span></a>` : ''}${project.githubUrl ? `<a class="button button--quiet" href="${esc(project.githubUrl)}" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>` : ''}</div></div>${thumbnail(project, true)}</div><div class="detail-meta"><div><span>EVENT</span><a href="${eventUrl(event)}" data-link>${esc(event.name)}</a></div><div><span>CREATED</span><b>${dateLabel(project.createdAt)}</b></div><div><span>MISSION CREW</span><b>${crew.map((person) => esc(person.name)).join(', ')}</b></div></div></section>${detailBody(project, crew)}`;
  }
  function detailBody(project, crew) {
    const milestoneIcon = { idea: '✦', commit: '⌘', feature: '+', breakthrough: '↗', bug: '!', deployment: '↑', final: '✓' };
    return `<section class="detail-content page-width"><div class="content-main"><section class="detail-section"><span class="section-index">01 / THE BUILD STORY</span><h2>Every project has a <em>story.</em></h2><div class="timeline">${project.buildStory.map((item, index) => `<article class="timeline-item"><div class="timeline-mark"><span>${milestoneIcon[item.type] || '•'}</span></div><div><span class="timeline-number">${String(index + 1).padStart(2, '0')} — ${esc(item.date)}</span><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p></div></article>`).join('')}</div></section><section class="detail-section"><span class="section-index">02 / LEARNING LOG</span><h2>What I <em>learned.</em></h2><blockquote>${esc(project.whatILearned)}</blockquote></section>${project.challenges && project.challenges.length ? `<section class="detail-section"><span class="section-index">03 / MISSION CHALLENGES</span><h2>What pushed the <em>build forward.</em></h2><div class="challenges">${project.challenges.map((item) => `<article><h3>Challenge</h3><p>${esc(item.challenge)}</p><h3>How it was solved</h3><p>${esc(item.solution)}</p></article>`).join('')}</div></section>` : ''}${project.aiUsage ? `<section class="detail-section ai-section"><span class="section-index">04 / AI USAGE</span><h2>Tools used with <em>intention.</em></h2><p>${esc(project.aiUsage.summary)}</p><div class="tags">${project.aiUsage.categories.map((category) => `<span>${esc(category)}</span>`).join('')}</div></section>` : ''}</div><aside class="detail-aside"><section><span>DEVELOPMENT TELEMETRY</span>${project.telemetry.map((item) => `<div class="metric"><b>${esc(item.value)}</b><small>${esc(item.label)}</small></div>`).join('')}</section><section><span>MISSION CREW</span>${crew.map((person) => `<a class="crew-card" href="/@${esc(person.username)}" aria-label="Future profile for ${esc(person.name)}"><i>${esc(person.initials)}</i><div><b>${esc(person.name)}</b><small>${esc(person.role)} · @${esc(person.username)}</small></div><em>↗</em></a>`).join('')}</section></aside></section>`;
  }
  function eventDetail(event) {
    const entries = projects.filter((project) => project.eventId === event.id); const builders = new Set(entries.flatMap((project) => project.creators)).size;
    return `<section class="event-hero page-width"><a class="back-link" href="/events" data-link>← All events</a><span class="section-index">${event.year} / ${esc(event.status)}</span><h1>${esc(event.name)}</h1><p>${esc(event.description)}</p><div class="event-hero__stats"><div><b>${entries.length.toString().padStart(2, '0')}</b><span>Projects</span></div><div><b>${builders.toString().padStart(2, '0')}</b><span>Builders</span></div><div><b>${new Set(entries.flatMap((project) => project.technologies)).size.toString().padStart(2, '0')}</b><span>Technologies</span></div></div></section><section class="explore page-width" id="explore"><div class="section-heading"><div><span class="section-index">EVENT COLLECTION</span><h2>Explore projects</h2></div><span class="result-count">${entries.length} mission${entries.length === 1 ? '' : 's'} found</span></div>${filtersMarkup(getState(event.slug))}<div class="project-grid" id="project-results">${filteredProjects(getState(event.slug)).map(projectCard).join('') || emptyState()}</div></section>`;
  }
  function notFound() { return `<section class="not-found page-width"><span class="not-found__signal">// 404</span><h1>Mission not <em>found.</em></h1><p>The coordinates you entered don't match a project or event in this archive.</p><a class="button" href="/projects" data-link>Return to projects <span>→</span></a></section>`; }

  function bindCommon() {
    document.querySelectorAll('[data-link]').forEach((link) => link.addEventListener('click', (event) => { const href = link.getAttribute('href'); if (href && href.startsWith('/')) { event.preventDefault(); navigate(href); } }));
    const toggle = document.querySelector('.nav-toggle'); const nav = document.querySelector('.site-nav');
    if (toggle && nav) toggle.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', String(open)); });
    document.querySelectorAll('.project-thumb').forEach((image) => image.addEventListener('error', () => { image.hidden = true; }));
  }
  function bindExplorer() {
    const search = document.querySelector('#hero-search'); const searchInput = document.querySelector('#project-search');
    if (search) search.addEventListener('submit', (event) => { event.preventDefault(); updateFilters({ q: searchInput.value }); });
    if (searchInput) { searchInput.value = getState().q; searchInput.addEventListener('input', () => { window.clearTimeout(window.searchTimer); window.searchTimer = window.setTimeout(() => updateFilters({ q: searchInput.value }, true), 160); }); }
    [['event-filter', 'event'], ['category-filter', 'category'], ['technology-filter', 'technology'], ['sort-filter', 'sort']].forEach(([id, key]) => { const control = document.querySelector(`#${id}`); if (control) control.addEventListener('change', () => updateFilters({ [key]: control.value })); });
    ['clear-filters', 'empty-clear'].forEach((id) => { const button = document.querySelector(`#${id}`); if (button) button.addEventListener('click', () => updateFilters({ q: '', event: '', category: '', technology: '', sort: 'newest' })); });
  }
  function updateFilters(next, replace) {
    const searchWasFocused = document.activeElement && document.activeElement.id === 'project-search';
    const url = new URL(window.location.href); Object.entries(next).forEach(([key, value]) => value ? url.searchParams.set(key, value) : url.searchParams.delete(key));
    if (replace) window.history.replaceState({}, '', `${url.pathname}${url.search}`); else window.history.pushState({}, '', `${url.pathname}${url.search}`);
    render(false);
    if (searchWasFocused) document.querySelector('#project-search')?.focus();
  }
  function render(scroll) {
    const path = routeFromLocation().replace(/\/$/, '') || '/projects';
    header.innerHTML = headerMarkup(); footer.innerHTML = footerMarkup();
    if (path === '/' || path === '/projects') main.innerHTML = projectsPage();
    else if (path === '/events') main.innerHTML = eventsPage();
    else if (path.startsWith('/projects/')) { const project = projects.find((item) => item.slug === path.split('/').pop()); main.innerHTML = project ? projectDetail(project) : notFound(); }
    else if (path.startsWith('/events/')) { const event = events.find((item) => item.slug === path.split('/').pop()); main.innerHTML = event ? eventDetail(event) : notFound(); }
    else main.innerHTML = notFound();
    bindCommon(); bindExplorer();
    if (scroll !== false) window.scrollTo({ top: 0, behavior: 'auto' });
  }
  window.addEventListener('popstate', render);
  window.addEventListener('keydown', (event) => { if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) { event.preventDefault(); document.querySelector('#project-search')?.focus(); } });
  render();
}());

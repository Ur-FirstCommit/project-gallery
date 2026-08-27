/*
 * FirstCommit's content source. Add a project here and it is automatically
 * available to discovery, filtering, event collections, and its /projects/:slug route.
 */
window.FirstCommitData = {
  creators: [
    { id: 'maya-chen', name: 'Maya Chen', username: 'mayacodes', role: 'Builder', initials: 'MC', bio: 'Curious builder learning through tiny experiments.' },
    { id: 'noah-patel', name: 'Noah Patel', username: 'noahbuilds', role: 'Builder', initials: 'NP', bio: 'Frontend learner making tools for real people.' },
    { id: 'amina-joseph', name: 'Amina Joseph', username: 'aminaj', role: 'Builder', initials: 'AJ', bio: 'Designer and developer interested in accessible experiences.' },
    { id: 'leo-martin', name: 'Leo Martin', username: 'leomakes', role: 'Builder', initials: 'LM', bio: 'A student developer who loves systems and simulations.' },
    { id: 'sana-khan', name: 'Sana Khan', username: 'sanakhan', role: 'Builder', initials: 'SK', bio: 'Learning data and AI one project at a time.' },
    { id: 'oliver-reed', name: 'Oliver Reed', username: 'oliverreed', role: 'Builder', initials: 'OR', bio: 'Hardware tinkerer and community maker.' }
  ],
  events: [
    { id: 'beginners-paradise-2026', slug: 'beginners-paradise-2026', name: "Beginner's Paradise 2026", description: "FirstCommit's welcoming build event for people turning their first ideas into working projects.", year: 2026, startDate: '2026-07-18', endDate: '2026-07-20', status: 'complete' },
    { id: 'build-weekend-2026', slug: 'build-weekend-2026', name: 'Build Weekend 2026', description: 'A focused weekend of shipping useful, delightful experiments with new friends.', year: 2026, startDate: '2026-05-09', endDate: '2026-05-11', status: 'complete' },
    { id: 'launchpad-2025', slug: 'launchpad-2025', name: 'Launchpad 2025', description: 'A first step into product thinking, creative technology, and sharing work in public.', year: 2025, startDate: '2025-11-14', endDate: '2025-11-16', status: 'complete' }
  ],
  projects: [
    {
      id: 'orbit-classroom', slug: 'orbit-classroom', title: 'Orbit Classroom', category: 'Web', eventId: 'beginners-paradise-2026', featured: true, status: 'Shipped', createdAt: '2026-07-20', updatedAt: '2026-07-22', thumbnail: null, images: [], imageTheme: 'orbit', technologies: ['React', 'NASA API', 'CSS'], creators: ['maya-chen', 'noah-patel'],
      description: 'A playful solar-system lesson planner that turns space data into classroom-ready activities.',
      longDescription: 'Orbit Classroom helps teachers turn the wonder of space into small, usable lessons. Students can explore planetary data, compare distances, and save a mission card for their next class.',
      buildStory: [
        { id: 'idea', type: 'idea', title: 'A lesson with a sense of scale', description: 'We wanted the solar system to feel less like a chart and more like a place students could explore.', date: 'Jul 18' },
        { id: 'commit', type: 'commit', title: 'First commit', description: 'A simple orbital map and a tiny API experiment became the first working prototype.', date: 'Jul 18' },
        { id: 'feature', type: 'feature', title: 'Mission cards take shape', description: 'We added printable prompts that connect a planet fact to a short classroom activity.', date: 'Jul 19' },
        { id: 'final', type: 'final', title: 'Ready for launch', description: 'After testing with a teacher, we simplified the language and shipped our first version.', date: 'Jul 20' }
      ],
      telemetry: [{ label: 'Active days', value: '3' }, { label: 'Contributors', value: '2' }, { label: 'Primary stack', value: 'React' }],
      whatILearned: 'I learned how to make an API request useful instead of just displaying the response. We also learned to make decisions quickly by testing an early version with someone outside our team.',
      challenges: [{ challenge: 'Making big space distances understandable.', solution: 'We used comparisons and a deliberately simple visual scale rather than trying to be scientifically literal everywhere.' }],
      aiUsage: { categories: ['Learning', 'Brainstorming'], summary: 'We used AI to explain unfamiliar API terms and to generate alternative lesson-prompt ideas. All final content and code decisions were reviewed by the team.' }
    },
    {
      id: 'sign-sense', slug: 'sign-sense', title: 'Sign Sense', category: 'AI', eventId: 'beginners-paradise-2026', featured: true, status: 'In progress', createdAt: '2026-07-20', updatedAt: '2026-08-02', thumbnail: null, images: [], imageTheme: 'signal', technologies: ['Python', 'MediaPipe', 'Webcam'], creators: ['sana-khan', 'amina-joseph'],
      description: 'A gentle practice companion that gives visual feedback while learners rehearse basic sign language.',
      longDescription: 'Sign Sense is a browser-based practice space designed with patience in mind. It recognises broad hand positions and offers encouraging, understandable feedback rather than a score.',
      buildStory: [
        { id: 'idea', type: 'idea', title: 'Start with confidence', description: 'We focused on how intimidating a first practice session can feel for a beginner.', date: 'Jul 18' },
        { id: 'breakthrough', type: 'breakthrough', title: 'A hand tracking breakthrough', description: 'After several experiments, we could reliably detect a small set of broad hand positions.', date: 'Jul 19' },
        { id: 'final', type: 'final', title: 'A kinder feedback loop', description: 'We replaced a numerical score with plain-language tips and a clear retry action.', date: 'Jul 20' }
      ],
      telemetry: [{ label: 'Active days', value: '3' }, { label: 'Contributors', value: '2' }, { label: 'Primary stack', value: 'Python' }],
      whatILearned: 'I learned that an AI feature still needs careful product thinking. The hard part was not getting a prediction; it was explaining its limits honestly and kindly.',
      challenges: [{ challenge: 'Keeping feedback helpful when recognition is uncertain.', solution: 'We designed for suggestions, not judgement, and added a visible note about what the prototype can and cannot recognise.' }],
      aiUsage: { categories: ['Research', 'Debugging'], summary: 'AI tools helped us understand computer-vision documentation and debug a browser permission issue. The recognition flow was designed and tested by our team.' }
    },
    {
      id: 'shelter-link', slug: 'shelter-link', title: 'ShelterLink', category: 'Mobile', eventId: 'build-weekend-2026', featured: true, status: 'Shipped', createdAt: '2026-05-11', updatedAt: '2026-05-16', thumbnail: null, images: [], imageTheme: 'shelter', technologies: ['Flutter', 'Firebase', 'Maps'], creators: ['amina-joseph'],
      description: 'A clear, low-friction way to find nearby temporary shelters and the services they offer.',
      longDescription: 'ShelterLink puts essential details first: opening times, accessibility notes, availability and directions. It is a prototype for an experience that remains legible under pressure.',
      buildStory: [
        { id: 'idea', type: 'idea', title: 'Design for urgency', description: 'We listed the information a person would need in under ten seconds.', date: 'May 9' },
        { id: 'feature', type: 'feature', title: 'The map becomes a list', description: 'We made the list view the default after learning that maps hide important accessibility details.', date: 'May 10' },
        { id: 'final', type: 'final', title: 'A focused prototype', description: 'We presented a compact flow centred on clarity, accessibility and fast decisions.', date: 'May 11' }
      ],
      telemetry: [{ label: 'Active days', value: '3' }, { label: 'Contributors', value: '1' }, { label: 'Primary stack', value: 'Flutter' }],
      whatILearned: 'I learned that accessibility is not a final checklist. It shaped what we chose to show, the words we used, and how the screens were ordered.',
      challenges: [{ challenge: 'Choosing what to leave out.', solution: 'I made every detail earn its place by asking whether it would help someone decide where to go.' }]
    },
    {
      id: 'bloom-console', slug: 'bloom-console', title: 'Bloom Console', category: 'Hardware', eventId: 'build-weekend-2026', featured: false, status: 'Prototype', createdAt: '2026-05-11', updatedAt: '2026-05-12', thumbnail: null, images: [], imageTheme: 'bloom', technologies: ['Arduino', 'C++', 'Sensors'], creators: ['oliver-reed'],
      description: 'A small desk companion that helps new plant owners notice when their plants need attention.',
      longDescription: 'Bloom Console combines simple moisture readings with a friendly physical display. Rather than promising perfect plant care, it makes patterns easier to notice.',
      buildStory: [
        { id: 'idea', type: 'idea', title: 'A calmer plant reminder', description: 'The goal was to make plant care feel less like another notification.', date: 'May 9' },
        { id: 'bug', type: 'bug', title: 'The noisy sensor problem', description: 'Early readings jumped wildly, so I learned to smooth the values before displaying them.', date: 'May 10' },
        { id: 'final', type: 'final', title: 'A living desk object', description: 'The final enclosure gave the prototype a warm, understandable presence.', date: 'May 11' }
      ],
      telemetry: [{ label: 'Active days', value: '3' }, { label: 'Contributors', value: '1' }, { label: 'Primary stack', value: 'Arduino' }],
      whatILearned: 'I learned how physical components behave differently from code. A sensor value is messy, and that is normal.',
      challenges: [{ challenge: 'Turning inconsistent data into a meaningful cue.', solution: 'I averaged several readings and only changed the display after a sustained trend.' }],
      aiUsage: { categories: ['Learning'], summary: 'I used AI as a study partner to understand the sensor calibration examples I was reading.' }
    },
    {
      id: 'circuit-quest', slug: 'circuit-quest', title: 'Circuit Quest', category: 'Games', eventId: 'launchpad-2025', featured: false, status: 'Shipped', createdAt: '2025-11-16', updatedAt: '2025-12-01', thumbnail: null, images: [], imageTheme: 'circuit', technologies: ['JavaScript', 'Canvas', 'Web Audio'], creators: ['leo-martin', 'noah-patel'],
      description: 'A tiny puzzle game that teaches circuit logic by letting players experiment without fear of failure.',
      longDescription: 'Circuit Quest transforms basic electrical ideas into playful rooms. Players connect components, see what happens, and learn through small, satisfying discoveries.',
      buildStory: [
        { id: 'idea', type: 'idea', title: 'Learn by trying', description: 'We wanted circuit concepts to be something you play with, not just memorise.', date: 'Nov 14' },
        { id: 'commit', type: 'commit', title: 'First light', description: 'Our first level only had a battery, wire and bulb — but it proved the interaction felt good.', date: 'Nov 14' },
        { id: 'feature', type: 'feature', title: 'Puzzle rules emerge', description: 'We built small challenges that introduce one new idea at a time.', date: 'Nov 15' },
        { id: 'final', type: 'final', title: 'Five rooms to explore', description: 'The submission included five handcrafted puzzle rooms and a simple soundscape.', date: 'Nov 16' }
      ],
      telemetry: [{ label: 'Active days', value: '3' }, { label: 'Contributors', value: '2' }, { label: 'Primary stack', value: 'JavaScript' }],
      whatILearned: 'I learned to build the smallest playable version first. Once one light bulb worked, every new mechanic had a place to grow from.',
      challenges: [{ challenge: 'Explaining a failed puzzle attempt without spoiling it.', solution: 'We used short observations like “that path has no power” and let players make the next connection.' }]
    },
    {
      id: 'study-current', slug: 'study-current', title: 'Study Current', category: 'Desktop', eventId: 'launchpad-2025', featured: false, status: 'Shipped', createdAt: '2025-11-16', updatedAt: '2026-01-04', thumbnail: null, images: [], imageTheme: 'current', technologies: ['Electron', 'TypeScript', 'SQLite'], creators: ['leo-martin'],
      description: 'A distraction-light desktop study timer that leaves a small trail of what helped you focus.',
      longDescription: 'Study Current is a private desktop rhythm for focused work: choose an intention, work in a short cycle, then leave a single reflection for your future self.',
      buildStory: [
        { id: 'idea', type: 'idea', title: 'A quieter timer', description: 'I wanted something that asks less of you than a productivity dashboard.', date: 'Nov 14' },
        { id: 'feature', type: 'feature', title: 'Reflections, not scores', description: 'I added a one-line end-of-session note instead of a productivity score.', date: 'Nov 15' },
        { id: 'deployment', type: 'deployment', title: 'First desktop build', description: 'Packaging the project made it feel real—and revealed several platform-specific issues.', date: 'Nov 16' },
        { id: 'final', type: 'final', title: 'A tool I still use', description: 'The final version became part of my own study routine.', date: 'Nov 16' }
      ],
      telemetry: [{ label: 'Active days', value: '3' }, { label: 'Contributors', value: '1' }, { label: 'Primary stack', value: 'TypeScript' }],
      whatILearned: 'I learned how much polish lives outside the main feature: empty states, app icons, keyboard shortcuts and the first-run experience.',
      challenges: [{ challenge: 'Packaging a desktop app for the first time.', solution: 'I worked through the build messages one at a time and kept a note of every platform detail I did not understand yet.' }],
      aiUsage: { categories: ['Debugging'], summary: 'I used AI to help interpret packaging error messages, then verified each fix against the official documentation.' }
    }
  ]
};

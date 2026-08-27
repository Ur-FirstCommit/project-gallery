# FirstCommit Projects Explorer

The official public event gallery for FirstCommit projects.

## Content archive

All content is Markdown-backed and indexed from the root [index.json](index.json).
The site only loads files listed there, so adding an entry is a content operation:

1. Create a Markdown file in `projects/`, `events/`, or `creators/` using an existing file as the template.
2. Add its relative path to the matching array in `index.json`.
3. Give every project a unique `slug` and point its `eventId` and `creators` values to existing IDs.

Project Markdown uses front matter for searchable metadata and Markdown sections for the build story, telemetry, learning, challenges, and optional AI-use disclosure. Empty `thumbnail` and `images` fields use the gallery's built-in visual fallback.

Static hosting must serve these files alongside `index.html`; no build step is required.
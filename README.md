# FirstCommit Pro Winners Gallery

A lightweight, static awards showcase. The gallery reads its entries from `projects/index.json` and each project's details and full write-up from Markdown. There is no database or application build step. Markdown rendering libraries are loaded from pinned public CDN versions, so a network connection is needed when viewing the site.

## Project structure

- `index.html` — page shell and library references.
- `src/main.js` — gallery, search, filters, sorting, and hash-based project pages.
- `src/markdown.js` — YAML front matter parsing and sanitized Markdown rendering.
- `src/styles.css` — responsive editorial design.
- `projects/index.json` — the complete list of projects shown in the winners gallery.
- `projects/_template.md` — copy-ready Markdown template.
- `projects/assets/` — project cover images.

## Preview and publish

From the repository root, serve the files over HTTP (browsers do not allow the Markdown loader to work from a `file://` URL):

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Stop the preview server with `Ctrl+C`. The repository has no dependency installation or build step. For a static deployment, publish the repository root with GitHub Pages, Vercel, Netlify, or another static host. After merging or pushing your content changes to the deployment branch, the host will publish the updated files.

## Add a winning project

1. Copy `projects/_template.md`.
2. Rename the copy to a short filename such as `my-project.md` and keep it in `projects/`.
3. Fill in the YAML metadata at the top and replace the sample Markdown write-up with the project's story.
4. Add an optional cover image to `projects/assets/`.
5. Reference the image from front matter with a site path such as `/projects/assets/my-project-cover.webp`.
6. Add `"my-project.md"` to the `projects` array in `projects/index.json` (include a comma after the previous entry when needed).
7. Run the preview server above and refresh the page to check the project.
8. Commit and push the Markdown, index, and image changes to publish the updated gallery.

The `title` and `summary` fields are required. `winner`, `award`, `place`, `event`, `year`, `cover`, `demo`, `github`, and `tags` are optional. Leave out unused fields; missing details are not shown. Demo and source links must use `https://` or `http://`. If no cover is provided—or its image cannot be loaded—the gallery displays a designed fallback.

To update a project, edit its Markdown file and refresh the page. To remove it from the gallery, delete its filename from the `projects` array in `projects/index.json`; the Markdown file may remain in the repository as an archive. `_template.md` is not displayed unless you deliberately list it in the index.

The project write-up supports standard Markdown, including headings, paragraphs, emphasis, nested lists, links, images, blockquotes, tables, inline code, and fenced code blocks. Rendered Markdown HTML is sanitized before display.

## Current content

The winners index starts empty because the existing project archive does not identify award results. Add confirmed winners through the steps above; no winner names, awards, or project links are pre-populated.

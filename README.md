# Figma Checklist Converter

Transform any block of text into an interactive, trackable checklist — right inside Figma or FigJam. Paste your notes, meeting minutes, or requirements and instantly get a structured checklist with parent tasks and sub-tasks.

The **Figma widget** in `widget-src/` is the primary product. Task types and the text parser live in **`shared/`** so a small **browser checklist** (`web/`) stays in sync when you change parsing rules.

---

## Web checklist (GitHub Pages)

A minimal static page: paste lists with the same rules as the widget, check items off, **Clear completed** or **Clear all**. Data is stored only in **localStorage** (no backend).

- **Build:** `npm run build:web` — writes `docs/index.html`, `docs/app.js`, and `docs/.nojekyll`.
- **GitHub Pages (Actions):** enable **Settings → Pages → Build and deployment → GitHub Actions**. Pushes to `main` run `.github/workflows/pages.yml` and publish the `docs` output.
- **GitHub Pages (branch folder):** run `npm run build:web`, commit the `docs/` folder, set Pages source to `/docs` on `main`.

---

## Getting Started

1. Add the widget to your Figma or FigJam canvas.
2. Click **Add Items** to open the import panel.
3. Paste or type your list and click **Add**.

Your checklist is ready to use.

---

## Formatting Your Input

The widget automatically detects structure from your text. It supports **numbered**, **lettered**, **bulleted**, and plain lines:

- The **first non-empty line** decides what counts as a **parent task type**:
  - `1. Design`, `2) Design` → numbered parent
  - `a. Design`, `B) Design` → lettered parent
  - `- Design`, `* Design`, `• Design` → bulleted parent
  - `Design` (no prefix) → plain parent
- Any **non-indented** line of that same type becomes a **parent task** (header).
- Any **indented line** (tab or 2+ spaces) is always a **sub-task**, no matter its prefix.
- Any other non-indented line becomes a **sub-task** under the most recent parent.

**Example input (numbered parents + plain children):**
```
1. Design
Wireframes
Visual mockups
2. Development
Frontend
Backend
```

**Result:** Two parent tasks, each with their own sub-tasks.

---

## Using the Checklist

- **Check/Uncheck** — Click any checkbox to mark a task done.
  - Checking a parent automatically checks all its sub-tasks.
  - Checking all sub-tasks automatically checks the parent.
  - Unchecking any sub-task unchecks the parent.

---

## Edit Mode

Click **Edit** in the action bar to enter edit mode:

- **Edit text** — Click into any task to rename it.
- **Toggle indent** — Click the icon next to the checkbox to promote or demote a task between parent and sub-task.
- **Merge up** — Click the merge icon (appears between tasks) to combine a task with the one above it.

---

## Delete Mode

Click **Delete** in the action bar to enter delete mode:

- Click the **red X** next to any task to remove it individually.
- Click **Clear All** to remove every task at once.

---

## Tips

- Your checklist state (checked items, text edits) is **saved automatically** with the widget — no manual saving needed.
- You can have multiple separate widget instances on the same canvas, each with its own independent list.
- To add more tasks to an existing list, click **Add Items** again — new tasks are appended to the bottom. 
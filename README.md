# Figma Checklist Converter

Transform any block of text into an interactive, trackable checklist — right inside Figma or FigJam. Paste your notes, meeting minutes, or requirements and instantly get a structured checklist with parent tasks and sub-tasks.

---

## Getting Started

1. Add the widget to your Figma or FigJam canvas.
2. Click **Add Items** to open the import panel.
3. Paste or type your list and click **Add**.

Your checklist is ready to use.

---

## Formatting Your Input

The widget automatically detects structure from your text:

- **Numbered lines** (e.g. `1. Task`, `2) Task`) become **parent tasks** (headers).
- **All other lines** beneath them become **sub-tasks** (indented children).

**Example input:**
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
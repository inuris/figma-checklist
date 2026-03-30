# Changelog

All notable changes to **Text to Checklist** are documented here.

---

## 2026-03-30

### Fixed
- URL chips: truncated links (ending with `...` or `…`) are replaced by the full URL.

---

## Initialization

### Added
- Convert any pasted or typed text into interactive checklist tasks in one step.
- Support for numbered (`1.`, `2)`), lettered (`a.`, `b)`), and bulleted (`•`, `*`, `-`) list prefixes.
- Sub-tasks via indentation (tab or two leading spaces).
- Parent/child checkbox logic — checking a parent checks all its children; checking all children checks the parent.
- Edit mode — rename individual task text inline.
- Remove mode — delete individual tasks.
- Clear All / Delete Completed actions.
- Export tasks as plain text.
- URL detection — recognised URLs in task text are rendered as tappable chips.
- Light/dark theme support.
- Paste text via the **Add Items** modal; double newline splits into separate tasks.
- Web preview at https://inuris.github.io/figma-checklist (no install required).

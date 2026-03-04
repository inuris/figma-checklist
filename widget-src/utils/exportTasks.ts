import { TaskItem } from '../types';

/**
 * Converts tasks to plain text:
 * - Parent tasks are written as-is
 * - Child tasks are indented with a tab
 * - Newlines within a task (from merges) are serialised as " \ "
 */
export function exportTasksAsText(tasks: TaskItem[]): string {
  return tasks
    .map(task => {
      const serialised = task.text.replace(/\n/g, ' \\ ');
      return task.isChild ? '\t' + serialised : serialised;
    })
    .join('\n');
}

/**
 * Builds a self-contained HTML string for the export modal.
 * The textarea is pre-filled with the exported text so users can copy it.
 */
export function buildExportHtml(text: string): string {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Inter, sans-serif; background: #F8FAFC; padding: 20px; display: flex; flex-direction: column; gap: 12px; height: 100vh; }
  label { font-size: 12px; color: #64748B; font-weight: 500; letter-spacing: 0.02em; }
  textarea {
    width: 100%; flex: 1; resize: none; border: 1px solid #E2E8F0; border-radius: 8px;
    padding: 12px; font-family: 'Courier New', monospace; font-size: 13px; color: #111827;
    background: #FFFFFF; outline: none; line-height: 1.6;
  }
  textarea:focus { border-color: #3B82F6; box-shadow: 0 0 0 3px #3B82F620; }
  button {
    padding: 10px 20px; background: #3B82F6; color: white; border: none;
    border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;
    font-family: Inter, sans-serif; transition: background 0.15s;
  }
  button:hover { background: #2563EB; }
  button.copied { background: #22C55E; }
</style>
</head>
<body>
  <label>Your tasks — select all and copy, or click the button below</label>
  <textarea id="out" readonly>${escaped}</textarea>
  <button id="btn" onclick="copy()">Copy to Clipboard</button>
  <script>
    document.getElementById('out').select();
    function copy() {
      const ta = document.getElementById('out');
      ta.select();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(ta.value).catch(function () {
          document.execCommand('copy');
        });
      } else {
        document.execCommand('copy');
      }
      const btn = document.getElementById('btn');
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy to Clipboard'; btn.classList.remove('copied'); }, 2000);
    }
  </script>
</body>
</html>`;
}

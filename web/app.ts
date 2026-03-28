import type { TaskItem } from '../shared/types';
import { parseTasks } from '../shared/parseTasks';

const STORAGE_KEY = 'checklist-web-tasks';

function loadTasks(): TaskItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isTaskItem);
  } catch {
    return [];
  }
}

function isTaskItem(x: unknown): x is TaskItem {
  if (x === null || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.text === 'string' &&
    typeof o.checked === 'boolean'
  );
}

function saveTasks(tasks: TaskItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function uniqueIds(tasks: TaskItem[]): TaskItem[] {
  const t = Date.now();
  return tasks.map((task, i) => ({
    ...task,
    id: `${t}-${i}-${Math.random().toString(36).slice(2, 9)}`,
  }));
}

const tasksEl = document.getElementById('tasks') as HTMLUListElement;
const emptyEl = document.getElementById('empty') as HTMLParagraphElement;
const pasteEl = document.getElementById('paste') as HTMLTextAreaElement;

function render(tasks: TaskItem[]): void {
  tasksEl.innerHTML = '';
  emptyEl.hidden = tasks.length > 0;

  for (const task of tasks) {
    const li = document.createElement('li');
    li.className = 'task' + (task.isChild ? ' child' : '');
    if (task.checked) li.classList.add('checked');

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = task.checked;
    cb.id = 't-' + task.id;
    cb.setAttribute('aria-label', 'Done: ' + task.text.slice(0, 80));

    const label = document.createElement('label');
    label.htmlFor = cb.id;
    label.textContent = task.text;

    cb.addEventListener('change', () => {
      task.checked = cb.checked;
      saveTasks(state);
      li.classList.toggle('checked', task.checked);
    });

    li.appendChild(cb);
    li.appendChild(label);
    tasksEl.appendChild(li);
  }
}

let state: TaskItem[] = loadTasks();
render(state);

function mergeFromPaste(replace: boolean): void {
  const text = pasteEl.value.trim();
  if (!text) return;
  const parsed = uniqueIds(parseTasks(text));
  state = replace ? parsed : state.concat(parsed);
  saveTasks(state);
  render(state);
  pasteEl.value = '';
}

document.getElementById('btn-add')!.addEventListener('click', () => mergeFromPaste(false));
document.getElementById('btn-replace')!.addEventListener('click', () => mergeFromPaste(true));

document.getElementById('btn-clear-done')!.addEventListener('click', () => {
  state = state.filter((t) => !t.checked);
  saveTasks(state);
  render(state);
});

document.getElementById('btn-clear-all')!.addEventListener('click', () => {
  if (state.length === 0) return;
  if (confirm('Remove all tasks?')) {
    state = [];
    saveTasks(state);
    render(state);
  }
});

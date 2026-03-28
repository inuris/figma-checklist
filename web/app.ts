import type { TaskItem } from '../shared/types';
import { LAYOUT, setLayoutCssVars } from '../shared/layout';
import { parseTasks } from '../shared/parseTasks';
import { applyThemeCssVars } from '../shared/themeCssVars';
import { UI, modeTooltipForState, progressSubtitle } from '../shared/uiCopy';
import {
  ICON_ARROW_DOWN_WHITE,
  ICON_ARROW_UP_WHITE,
  ICON_CHECK,
  ICON_EXPORT,
  ICON_INDENT,
  ICON_LINK,
  ICON_MERGE,
  ICON_MOON,
  ICON_MOVE_ARROW_DARK,
  ICON_MOVE_ARROW_LIGHT,
  ICON_OUTDENT,
  ICON_PLUS,
  ICON_REMOVE,
  ICON_SUN,
  ICON_UNDO,
} from '../widget-src/constants/icons';
import { exportTasksAsText } from '../widget-src/utils/exportTasks';
import { extractUrls, formatUrlLabel } from '../widget-src/utils/parseUrls';
import { getTheme } from '../widget-src/utils/theme';

const STORAGE_KEY = 'checklist-web-state-v2';
const MAX_UNDO = 50;

interface AppState {
  tasks: TaskItem[];
  taskHistory: TaskItem[][];
  isDark: boolean;
  isEditing: boolean;
  isRemoving: boolean;
  moveSelectedIds: string[];
}

function cloneTasks(tasks: TaskItem[]): TaskItem[] {
  return JSON.parse(JSON.stringify(tasks)) as TaskItem[];
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

function isTaskItemArray(a: unknown): a is TaskItem[] {
  return Array.isArray(a) && a.every(isTaskItem);
}

function loadState(): AppState {
  const empty: AppState = {
    tasks: [],
    taskHistory: [],
    isDark: false,
    isEditing: false,
    isRemoving: false,
    moveSelectedIds: [],
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const p = JSON.parse(raw) as unknown;
    if (Array.isArray(p)) {
      return { ...empty, tasks: p.filter(isTaskItem) };
    }
    if (p && typeof p === 'object') {
      const o = p as Record<string, unknown>;
      const tasks = Array.isArray(o.tasks) ? o.tasks.filter(isTaskItem) : [];
      let taskHistory: TaskItem[][] = [];
      if (Array.isArray(o.taskHistory)) {
        taskHistory = o.taskHistory.filter((snap): snap is TaskItem[] => isTaskItemArray(snap));
      }
      return {
        tasks,
        taskHistory,
        isDark: !!o.isDark,
        isEditing: false,
        isRemoving: false,
        moveSelectedIds: [],
      };
    }
  } catch {
    /* ignore */
  }
  return empty;
}

function saveState(s: AppState): void {
  const payload = {
    tasks: s.tasks,
    taskHistory: s.taskHistory,
    isDark: s.isDark,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function uniqueIds(tasks: TaskItem[]): TaskItem[] {
  const t = Date.now();
  return tasks.map((task, i) => ({
    ...task,
    id: `${t}-${i}-${Math.random().toString(36).slice(2, 9)}`,
  }));
}

function toggleTaskChecked(tasks: TaskItem[], index: number): TaskItem[] {
  const copy = tasks.map((x) => ({ ...x }));
  const isNowChecked = !copy[index].checked;
  copy[index].checked = isNowChecked;

  if (!copy[index].isChild) {
    for (let i = index + 1; i < copy.length; i++) {
      if (copy[i].isChild) copy[i].checked = isNowChecked;
      else break;
    }
  } else {
    let parentIndex = -1;
    for (let i = index - 1; i >= 0; i--) {
      if (!copy[i].isChild) {
        parentIndex = i;
        break;
      }
    }
    if (parentIndex !== -1) {
      let allChildrenChecked = true;
      for (let i = parentIndex + 1; i < copy.length; i++) {
        if (copy[i].isChild) {
          if (!copy[i].checked) {
            allChildrenChecked = false;
            break;
          }
        } else break;
      }
      copy[parentIndex].checked = allChildrenChecked;
    }
  }
  return copy;
}

const state = loadState();
const root = document.getElementById('root')!;
setLayoutCssVars(document.documentElement);

function setTasksWithHistory(newTasks: TaskItem[]): void {
  state.taskHistory = [...state.taskHistory.slice(-(MAX_UNDO - 1)), cloneTasks(state.tasks)];
  state.tasks = newTasks;
  saveState(state);
  render();
}

function undo(): void {
  if (state.taskHistory.length === 0) return;
  const prev = state.taskHistory[state.taskHistory.length - 1]!;
  state.taskHistory = state.taskHistory.slice(0, -1);
  state.tasks = cloneTasks(prev);
  saveState(state);
  render();
}

function selectedIndices(): number[] {
  return state.tasks
    .map((t, i) => (state.moveSelectedIds.includes(t.id) ? i : -1))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b);
}

function moveSelectedUp(): void {
  const sel = selectedIndices();
  if (sel.length === 0) return;
  const copy = state.tasks.map((t) => ({ ...t }));
  for (const i of sel) {
    if (i > 0) [copy[i - 1], copy[i]] = [copy[i]!, copy[i - 1]!];
  }
  setTasksWithHistory(copy);
}

function moveSelectedDown(): void {
  const sel = selectedIndices();
  if (sel.length === 0) return;
  const copy = state.tasks.map((t) => ({ ...t }));
  const last = copy.length - 1;
  for (const i of [...sel].reverse()) {
    if (i < last) [copy[i], copy[i + 1]] = [copy[i + 1]!, copy[i]!];
  }
  setTasksWithHistory(copy);
}

function toggleMoveSelected(id: string): void {
  state.moveSelectedIds = state.moveSelectedIds.includes(id)
    ? state.moveSelectedIds.filter((x) => x !== id)
    : [...state.moveSelectedIds, id];
  render();
}

function openAddModal(): void {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.setAttribute('aria-labelledby', 'add-modal-title');

  const dark = state.isDark;
  const panel = document.createElement('div');
  panel.className = 'modal-panel' + (dark ? ' dark' : '');

  const head = document.createElement('div');
  head.className = 'modal-head';
  head.id = 'add-modal-title';
  head.textContent = UI.addModalTitle;

  const body = document.createElement('div');
  body.className = 'modal-body';

  const label = document.createElement('div');
  label.className = 'field-label';
  label.textContent = UI.addModalLabel;

  const ta = document.createElement('textarea');
  ta.placeholder = UI.addModalPlaceholder;

  ta.addEventListener('paste', (e) => {
    if (!e.clipboardData) return;
    const html = e.clipboardData.getData('text/html');
    if (!html) return;
    e.preventDefault();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    doc.querySelectorAll('a').forEach((a) => {
      const text = a.textContent ?? '';
      const href = a.href;
      if (href) a.textContent = `${text} (${href})`;
    });
    doc.querySelectorAll('p, div, li, h1, h2, h3, h4, h5, h6, tr').forEach((el) => {
      el.appendChild(doc.createTextNode('\n'));
    });
    doc.querySelectorAll('br').forEach((br) => {
      br.replaceWith(doc.createTextNode('\n'));
    });
    const cleanText = doc.body.textContent ?? '';
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const text = ta.value;
    ta.value = text.substring(0, start) + cleanText + text.substring(end);
    ta.selectionStart = ta.selectionEnd = start + cleanText.length;
  });

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-primary-modal';
  btn.textContent = UI.addModalButton;

  const close = () => backdrop.remove();

  btn.addEventListener('click', () => {
    const val = ta.value.trim();
    if (val) {
      const newTasks = uniqueIds(parseTasks(val));
      setTasksWithHistory([...state.tasks, ...newTasks]);
    }
    close();
  });

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });

  body.append(label, ta, btn);
  panel.append(head, body);
  backdrop.append(panel);
  document.body.append(backdrop);
  ta.focus();
}

function openExportModal(): void {
  const text = exportTasksAsText(state.tasks);
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');

  const panel = document.createElement('div');
  panel.className = 'modal-panel export-modal';

  const body = document.createElement('div');
  body.className = 'modal-body';

  const lbl = document.createElement('label');
  lbl.className = 'field-label';
  lbl.textContent = UI.exportModalLabel;

  const ta = document.createElement('textarea');
  ta.readOnly = true;
  ta.value = text;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-copy';
  btn.textContent = UI.exportCopy;

  btn.addEventListener('click', () => {
    ta.select();
    void (async () => {
      try {
        await navigator.clipboard.writeText(ta.value);
      } catch {
        document.execCommand('copy');
      }
      btn.textContent = UI.exportCopied;
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = UI.exportCopy;
        btn.classList.remove('copied');
      }, 2000);
    })();
  });

  const close = () => backdrop.remove();
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });

  body.append(lbl, ta, btn);
  panel.append(body);
  backdrop.append(panel);
  document.body.append(backdrop);
  ta.focus();
  ta.select();
}

function elFromHtml(html: string): HTMLElement {
  const w = document.createElement('div');
  w.innerHTML = html.trim();
  return w.firstElementChild as HTMLElement;
}

function fitTaskTextarea(ta: HTMLTextAreaElement): void {
  const lh = parseFloat(window.getComputedStyle(ta).lineHeight) || 22.5;
  const minH = Math.max(LAYOUT.task.textareaMinHeight, lh * 2);
  ta.style.height = 'auto';
  ta.style.height = `${Math.max(minH, ta.scrollHeight)}px`;
}

function render(): void {
  const t = getTheme(state.isDark);
  applyThemeCssVars(document.documentElement, t, state.isDark);

  const taskCount = state.tasks.length;
  const completedCount = state.tasks.filter((x) => x.checked).length;
  const allDone = taskCount > 0 && completedCount === taskCount;
  const canUndo = state.taskHistory.length > 0;
  const hasTasks = taskCount > 0;
  const canMove = state.moveSelectedIds.length > 0;

  const subtitle = progressSubtitle(taskCount, completedCount);
  const modeTooltip = modeTooltipForState(state.isEditing, state.isRemoving);

  root.innerHTML = '';

  const page = document.createElement('div');
  page.className = 'page-wrap';

  const grad = document.createElement('div');
  grad.className = 'gradient-card';

  const inner = document.createElement('div');
  inner.className = 'inner-card';

  // Header
  const header = document.createElement('header');
  header.className = 'card-header';
  const titleBlock = document.createElement('div');
  titleBlock.className = 'title-block';
  const h1 = document.createElement('h1');
  h1.textContent = UI.title;
  const sub = document.createElement('p');
  sub.className = 'subtitle' + (allDone ? ' all-done' : '');
  sub.textContent = subtitle;
  titleBlock.append(h1, sub);

  const hdrRight = document.createElement('div');
  hdrRight.className = 'header-right';

  const undoBtn = document.createElement('button');
  undoBtn.type = 'button';
  undoBtn.className = 'icon-btn';
  undoBtn.setAttribute('aria-label', UI.ariaUndo);
  undoBtn.disabled = !canUndo;
  undoBtn.append(elFromHtml(ICON_UNDO));
  undoBtn.addEventListener('click', () => {
    if (canUndo) undo();
  });

  const themeBtn = document.createElement('button');
  themeBtn.type = 'button';
  themeBtn.className = 'icon-btn';
  themeBtn.setAttribute('aria-label', state.isDark ? UI.ariaLightMode : UI.ariaDarkMode);
  themeBtn.append(elFromHtml(state.isDark ? ICON_SUN : ICON_MOON));
  themeBtn.addEventListener('click', () => {
    state.isDark = !state.isDark;
    saveState(state);
    render();
  });

  hdrRight.append(undoBtn, themeBtn);
  header.append(titleBlock, hdrRight);

  // Action bar
  const ab = document.createElement('div');
  ab.className = 'action-bar';

  const row1 = document.createElement('div');
  row1.className = 'action-bar-row action-bar-row--main';

  const left = document.createElement('div');
  left.className = 'action-bar-left';

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.className = 'btn-add-items';
  addBtn.append(elFromHtml(ICON_PLUS), document.createTextNode(' ' + UI.addItems));
  addBtn.addEventListener('click', () => openAddModal());

  left.append(addBtn);

  if (hasTasks) {
    const toggles = document.createElement('div');
    toggles.className = 'action-bar-toggles';

    const editWrap = document.createElement('div');
    editWrap.className = 'toggle-group';
    editWrap.setAttribute('role', 'button');
    editWrap.tabIndex = 0;
    editWrap.addEventListener('click', () => {
      const next = !state.isEditing;
      if (next) state.isRemoving = false;
      else state.moveSelectedIds = [];
      state.isEditing = !state.isEditing;
      render();
    });
    editWrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        editWrap.click();
      }
    });

    const editCap = document.createElement('div');
    editCap.className = 'capsule' + (state.isEditing ? ' on-move' : ' off');
    if (state.isEditing) {
      editCap.innerHTML = `<div class="capsule-knob move"></div><span class="label">${UI.edit}</span>`;
    } else {
      editCap.innerHTML = `<span class="label">${UI.edit}</span><div class="capsule-knob muted"></div>`;
    }
    editWrap.append(editCap);

    const delWrap = document.createElement('div');
    delWrap.className = 'toggle-group';
    delWrap.setAttribute('role', 'button');
    delWrap.tabIndex = 0;
    delWrap.addEventListener('click', () => {
      const next = !state.isRemoving;
      if (next) state.isEditing = false;
      state.isRemoving = !state.isRemoving;
      render();
    });
    delWrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        delWrap.click();
      }
    });

    const delCap = document.createElement('div');
    delCap.className = 'capsule' + (state.isRemoving ? ' on-danger' : ' off');
    if (state.isRemoving) {
      delCap.innerHTML = `<div class="capsule-knob danger"></div><span class="label">${UI.delete}</span>`;
    } else {
      delCap.innerHTML = `<span class="label">${UI.delete}</span><div class="capsule-knob muted"></div>`;
    }
    delWrap.append(delCap);

    toggles.append(editWrap, delWrap);
    left.append(toggles);
  }

  const spacer = document.createElement('div');
  spacer.className = 'action-bar-spacer';
  spacer.setAttribute('aria-hidden', 'true');

  const end = document.createElement('div');
  end.className = 'action-bar-end';

  if (hasTasks && state.isRemoving) {
    const links = document.createElement('div');
    links.className = 'action-bar-links';
    if (state.tasks.some((x) => x.checked)) {
      const delDone = document.createElement('button');
      delDone.type = 'button';
      delDone.className = 'link-muted';
      delDone.textContent = UI.deleteCompleted;
      delDone.addEventListener('click', () => {
        setTasksWithHistory(state.tasks.filter((task) => !task.checked));
      });
      links.append(delDone);
    }
    const clearAll = document.createElement('button');
    clearAll.type = 'button';
    clearAll.className = 'link-danger';
    clearAll.textContent = UI.clearAll;
    clearAll.addEventListener('click', () => {
      state.isEditing = false;
      state.isRemoving = false;
      state.moveSelectedIds = [];
      setTasksWithHistory([]);
    });
    links.append(clearAll);
    end.classList.add('links');
    end.append(links);
  } else if (hasTasks && state.isEditing) {
    const mw = document.createElement('div');
    mw.className = 'move-btns';
    const up = document.createElement('button');
    up.type = 'button';
    up.className = 'move-btn';
    up.disabled = !canMove;
    up.setAttribute('aria-label', UI.ariaMoveUp);
    up.append(elFromHtml(ICON_ARROW_UP_WHITE));
    up.addEventListener('click', () => canMove && moveSelectedUp());

    const down = document.createElement('button');
    down.type = 'button';
    down.className = 'move-btn';
    down.disabled = !canMove;
    down.setAttribute('aria-label', UI.ariaMoveDown);
    down.append(elFromHtml(ICON_ARROW_DOWN_WHITE));
    down.addEventListener('click', () => canMove && moveSelectedDown());

    mw.append(up, down);
    end.append(mw);
  } else if (hasTasks && !state.isEditing && !state.isRemoving) {
    const ew = document.createElement('div');
    ew.className = 'export-wrap';
    const ex = document.createElement('button');
    ex.type = 'button';
    ex.className = 'export-btn';
    ex.setAttribute('aria-label', UI.ariaExport);
    ex.append(elFromHtml(ICON_EXPORT));
    ex.addEventListener('click', () => openExportModal());
    ew.append(ex);
    end.append(ew);
  }

  row1.append(left, spacer, end);
  ab.append(row1);

  if (modeTooltip) {
    const tip = document.createElement('div');
    tip.className = 'mode-tooltip';
    const left = document.createElement('span');
    left.className = 'mode-tooltip-left';
    left.textContent = modeTooltip.left;
    tip.append(left);
    if (modeTooltip.right !== '') {
      const right = document.createElement('span');
      right.className = 'mode-tooltip-right';
      right.textContent = modeTooltip.right;
      tip.append(right);
    }
    ab.append(tip);
  }

  inner.append(header, ab);

  // Tasks or empty
  if (!hasTasks) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    const p1 = document.createElement('p');
    p1.textContent = UI.emptyLine1;
    const p2 = document.createElement('p');
    p2.className = 'accent-line';
    p2.textContent = UI.emptyLine2;
    empty.append(p1, p2);
    inner.append(empty);
  } else {
    const tw = document.createElement('div');
    tw.className = 'tasks-wrap';

    state.tasks.forEach((task, index) => {
      if (index > 0) {
        const sep = document.createElement('hr');
        sep.className = 'task-sep';
        tw.append(sep);
      }

      const block = document.createElement('div');
      block.className = 'task-block';

      const row = document.createElement('div');
      row.className = 'task-row' + (task.isChild ? ' child' : '');

      if (state.isEditing && index > 0) {
        const mergeBtn = document.createElement('button');
        mergeBtn.type = 'button';
        mergeBtn.className = 'merge-float';
        mergeBtn.setAttribute('aria-label', UI.ariaMergeUp);
        mergeBtn.append(elFromHtml(ICON_MERGE));
        mergeBtn.addEventListener('click', () => {
          const copy = state.tasks.map((x) => ({ ...x }));
          copy[index - 1]!.text += '\n' + copy[index]!.text;
          copy.splice(index, 1);
          setTasksWithHistory(copy);
        });
        block.append(mergeBtn);
      }

      if (state.isRemoving) {
        const rm = document.createElement('button');
        rm.type = 'button';
        rm.className = 'sq-20 remove-tile';
        rm.setAttribute('aria-label', UI.ariaRemoveTask);
        rm.append(elFromHtml(ICON_REMOVE));
        rm.addEventListener('click', () => {
          const copy = state.tasks.map((x) => ({ ...x }));
          copy.splice(index, 1);
          setTasksWithHistory(copy);
        });
        row.append(rm);
      } else if (!state.isEditing) {
        const cb = document.createElement('button');
        cb.type = 'button';
        cb.className = 'sq-20 checkbox-tile' + (task.checked ? ' checked' : '');
        cb.setAttribute('aria-pressed', task.checked ? 'true' : 'false');
        cb.setAttribute('aria-label', task.checked ? UI.ariaMarkIncomplete : UI.ariaMarkComplete);
        if (task.checked) cb.append(elFromHtml(ICON_CHECK));
        cb.addEventListener('click', () => {
          setTasksWithHistory(toggleTaskChecked(state.tasks, index));
        });
        row.append(cb);
      } else {
        const ind = document.createElement('button');
        ind.type = 'button';
        ind.className = 'sq-20 indent-tile';
        ind.setAttribute('aria-label', task.isChild ? UI.ariaOutdent : UI.ariaIndent);
        ind.append(elFromHtml(task.isChild ? ICON_OUTDENT : ICON_INDENT));
        ind.addEventListener('click', () => {
          const copy = state.tasks.map((x) => ({ ...x }));
          copy[index]!.isChild = !copy[index]!.isChild;
          setTasksWithHistory(copy);
        });
        row.append(ind);
      }

      const main = document.createElement('div');
      main.className = 'task-main';

      if (state.isEditing) {
        const ta = document.createElement('textarea');
        ta.className =
          'task-edit' +
          (task.isChild ? ' child' : ' parent') +
          (task.checked ? ' checked' : '');
        ta.value = task.text;
        ta.rows = 1;
        ta.addEventListener('input', () => fitTaskTextarea(ta));

        const commitEdit = () => {
          const newText = ta.value;
          const copy = cloneTasks(state.tasks);

          if (newText.includes('\n\n')) {
            const parts = newText.split('\n\n');
            copy[index]!.text = parts[0]!.trim();

            let offset = 1;
            for (let i = 1; i < parts.length; i++) {
              const partText = parts[i]!.trim();
              if (partText.length > 0) {
                copy.splice(index + offset, 0, {
                  id: Date.now().toString() + '-' + index + '-' + i,
                  text: partText,
                  checked: false,
                  isChild: task.isChild,
                });
                offset++;
              }
            }
            if (copy[index]!.text.length === 0) copy.splice(index, 1);
          } else {
            if (newText.trim().length === 0) copy.splice(index, 1);
            else copy[index]!.text = newText;
          }
          setTasksWithHistory(copy);
        };

        ta.addEventListener('blur', commitEdit);
        main.append(ta);
      } else {
        const ro = document.createElement('div');
        ro.className =
          'task-readonly' +
          (task.isChild ? ' child' : ' parent') +
          (task.checked ? ' checked' : '');
        ro.textContent = task.text;
        main.append(ro);

        for (const url of extractUrls(task.text)) {
          const chip = document.createElement('a');
          chip.className = 'url-chip';
          chip.href = url;
          chip.target = '_blank';
          chip.rel = 'noopener noreferrer';
          const span = document.createElement('span');
          span.textContent = formatUrlLabel(url);
          chip.append(span, elFromHtml(ICON_LINK));
          main.append(chip);
        }
      }

      row.append(main);

      if (state.isEditing) {
        const isSel = state.moveSelectedIds.includes(task.id);
        const mv = document.createElement('button');
        mv.type = 'button';
        mv.className = 'sq-20 move-select-tile' + (isSel ? ' selected' : '');
        mv.setAttribute('aria-pressed', isSel ? 'true' : 'false');
        mv.setAttribute('aria-label', UI.ariaSelectForMove);
        if (isSel) {
          mv.append(elFromHtml(state.isDark ? ICON_MOVE_ARROW_DARK : ICON_MOVE_ARROW_LIGHT));
        }
        mv.addEventListener('click', () => toggleMoveSelected(task.id));
        row.append(mv);
      }

      block.append(row);
      tw.append(block);
    });

    inner.append(tw);
  }

  grad.append(inner);
  page.append(grad);
  root.append(page);

  if (state.isEditing) {
    requestAnimationFrame(() => {
      root.querySelectorAll<HTMLTextAreaElement>('.task-edit').forEach(fitTaskTextarea);
    });
  }
}

render();

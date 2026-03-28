(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // shared/parseTasks.ts
  var NUMBERED_REGEX = /^\d+[/.)]\s+/;
  var LETTERED_REGEX = /^[a-zA-Z][.)]\s+/;
  var BULLETED_REGEX = /^[•·*-]\s*/;
  var INDENTED_REGEX = /^(\t| {2,})/;
  function getLineType(trimmedLine) {
    if (NUMBERED_REGEX.test(trimmedLine)) return "numbered";
    if (LETTERED_REGEX.test(trimmedLine)) return "lettered";
    if (BULLETED_REGEX.test(trimmedLine)) return "bulleted";
    return "plain";
  }
  function parseTasks(inputText) {
    const lines = inputText.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length === 0) return [];
    const parentType = getLineType(lines[0].trim());
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      const isIndented = INDENTED_REGEX.test(line);
      const isParent = !isIndented && getLineType(trimmedLine) === parentType;
      const text = trimmedLine.replace(/ \\ /g, "\n");
      return {
        id: Date.now().toString() + "-" + index,
        text,
        checked: false,
        isChild: !isParent
      };
    });
  }

  // widget-src/constants/colors.ts
  var COLOR_PRIMARY = "#111827";
  var COLOR_ACCENT = "#3B82F6";
  var COLOR_ACCENT_HOVER = "#2563EB";
  var COLOR_ACCENT_SHADOW = "#3B82F64D";
  var COLOR_DANGER = "#EF4444";
  var COLOR_DANGER_HOVER = "#B91C1C";
  var COLOR_SUCCESS = "#22C59F";
  var COLOR_MOVE = "#14D7C0";
  var COLOR_MOVE_BG = "#D1FAF5";
  var COLOR_BG = "#FFFFFF";
  var COLOR_WHITE = "#FFFFFF";
  var COLOR_TRANSPARENT = "#FFFFFF00";
  var COLOR_BORDER = "#E2E8F0";
  var COLOR_MUTED = "#64748B";
  var COLOR_HOVER_BG = "#F8FAFC";
  var COLOR_SURFACE = "#F1F5F9";
  var COLOR_SHADOW = "#0F172A1A";
  var COLOR_EDIT_ACTIVE_BG = "#EFF6FF";
  var COLOR_REMOVE_ACTIVE_BG = "#FEF2F2";
  var COLOR_REMOVE_BTN_BG = "#FEE2E2";
  var COLOR_REMOVE_BTN_HOVER = "#FECACA";
  var COLOR_CHECKBOX_UNCHECKED = "#CBD5E1";
  var COLOR_CHECKBOX_HOVER = "#94A3B8";
  var COLOR_TASK_CHECKED = "#9CA3AF";
  var COLOR_TASK_CHILD = "#4B5563";
  var COLOR_LINK_BORDER = "#BFDBFE";
  var COLOR_LINK_HOVER = "#DBEAFE";
  var DARK_COLOR_BG = "#1E293B";
  var DARK_COLOR_HOVER_BG = "#0F172A";
  var DARK_COLOR_PRIMARY = "#F1F5F9";
  var DARK_COLOR_MUTED = "#94A3B8";
  var DARK_COLOR_BORDER = "#334155";
  var DARK_COLOR_SURFACE = "#475569";
  var DARK_COLOR_TASK_CHILD = "#CBD5E1";
  var DARK_COLOR_TASK_CHECKED = "#475569";
  var DARK_COLOR_CHECKBOX_UNCHECKED = "#475569";
  var DARK_COLOR_CHECKBOX_HOVER = "#64748B";
  var DARK_COLOR_EDIT_ACTIVE_BG = "#1E3A5F";
  var DARK_COLOR_REMOVE_ACTIVE_BG = "#450A0A";
  var DARK_COLOR_REMOVE_BTN_BG = "#7F1D1D";
  var DARK_COLOR_REMOVE_BTN_HOVER = "#991B1B";
  var DARK_COLOR_LINK_BORDER = "#1D4ED8";
  var DARK_COLOR_LINK_HOVER = "#1E3A5F";
  var DARK_COLOR_FLOAT_BTN = "#334155";
  var DARK_COLOR_SHADOW = "#00000066";
  var DARK_COLOR_MOVE = "#14D7C0";
  var DARK_COLOR_MOVE_BG = "#008273";

  // widget-src/constants/icons.ts
  var ICON_PLUS = `<svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1V11M1 6H11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  var ICON_CHECK = `<svg width="12" height="10" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  var ICON_MOVE_ARROW_LIGHT = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2v8M4.25 4.25 6 2.5 7.75 4.25M4.25 7.75 6 9.5 7.75 7.75" stroke="#34D399" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  var ICON_MOVE_ARROW_DARK = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2v8M4.25 4.25 6 2.5 7.75 4.25M4.25 7.75 6 9.5 7.75 7.75" stroke="#6EE7B7" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  var ICON_REMOVE = `<svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/></svg>`;
  var ICON_INDENT = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2V10M2 6H10" stroke="#64748B" stroke-width="1.5" stroke-linecap="round"/></svg>`;
  var ICON_OUTDENT = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6H10" stroke="#64748B" stroke-width="1.5" stroke-linecap="round"/></svg>`;
  var ICON_MERGE = `<svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 1.5 5 3.5 7 1.5M3 8.5 5 6.5 7 8.5" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  var ICON_LINK = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" stroke="#3B82F6" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 1h3v3" stroke="#3B82F6" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 1L6 6" stroke="#3B82F6" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  var ICON_MOON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 10.5A6 6 0 0 1 5.5 2.5a6 6 0 1 0 8 8z" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  var ICON_SUN = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="3" stroke="#64748B" stroke-width="1.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.22 3.22l1.42 1.42M11.36 11.36l1.42 1.42M3.22 12.78l1.42-1.42M11.36 4.64l1.42-1.42" stroke="#64748B" stroke-width="1.5" stroke-linecap="round"/></svg>`;
  var ICON_ARROW_UP_WHITE = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3v6M3 6l3-3 3 3" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  var ICON_ARROW_DOWN_WHITE = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9V3M3 6l3 3 3-3" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  var ICON_UNDO = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h6a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H8" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 4L4 6l2 2" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  var ICON_EXPORT = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2v8M5 7l3 3 3-3" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 11v1.5A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V11" stroke="#64748B" stroke-width="1.5" stroke-linecap="round"/></svg>`;

  // widget-src/utils/exportTasks.ts
  function exportTasksAsText(tasks) {
    return tasks.map((task) => {
      const serialised = task.text.replace(/\n/g, " \\ ");
      return task.isChild ? "	" + serialised : serialised;
    }).join("\n");
  }

  // widget-src/utils/parseUrls.ts
  var URL_REGEX = /https?:\/\/[^\s"'<>)\]]+/gi;
  function extractUrls(text) {
    const matches = text.match(URL_REGEX);
    if (!matches) return [];
    return [...new Set(matches)];
  }
  function formatUrlLabel(url, maxLength = 50) {
    const stripped = url.replace(/^https?:\/\//, "");
    return stripped.length > maxLength ? stripped.slice(0, maxLength) + "\u2026" : stripped;
  }

  // widget-src/utils/theme.ts
  function getTheme(isDark) {
    return {
      bg: isDark ? DARK_COLOR_BG : COLOR_BG,
      bgHover: isDark ? DARK_COLOR_HOVER_BG : COLOR_HOVER_BG,
      primary: isDark ? DARK_COLOR_PRIMARY : COLOR_PRIMARY,
      muted: isDark ? DARK_COLOR_MUTED : COLOR_MUTED,
      border: isDark ? DARK_COLOR_BORDER : COLOR_BORDER,
      surface: isDark ? DARK_COLOR_SURFACE : COLOR_SURFACE,
      taskChild: isDark ? DARK_COLOR_TASK_CHILD : COLOR_TASK_CHILD,
      taskChecked: isDark ? DARK_COLOR_TASK_CHECKED : COLOR_TASK_CHECKED,
      checkboxBg: isDark ? DARK_COLOR_BG : COLOR_WHITE,
      checkboxUnchecked: isDark ? DARK_COLOR_CHECKBOX_UNCHECKED : COLOR_CHECKBOX_UNCHECKED,
      checkboxHover: isDark ? DARK_COLOR_CHECKBOX_HOVER : COLOR_CHECKBOX_HOVER,
      editActiveBg: isDark ? DARK_COLOR_EDIT_ACTIVE_BG : COLOR_EDIT_ACTIVE_BG,
      removeActiveBg: isDark ? DARK_COLOR_REMOVE_ACTIVE_BG : COLOR_REMOVE_ACTIVE_BG,
      removeBtnBg: isDark ? DARK_COLOR_REMOVE_BTN_BG : COLOR_REMOVE_BTN_BG,
      removeBtnHover: isDark ? DARK_COLOR_REMOVE_BTN_HOVER : COLOR_REMOVE_BTN_HOVER,
      floatBtn: isDark ? DARK_COLOR_FLOAT_BTN : COLOR_WHITE,
      floatBtnHover: isDark ? DARK_COLOR_SURFACE : COLOR_HOVER_BG,
      linkBorder: isDark ? DARK_COLOR_LINK_BORDER : COLOR_LINK_BORDER,
      linkHover: isDark ? DARK_COLOR_LINK_HOVER : COLOR_LINK_HOVER,
      // Same in both themes
      accent: COLOR_ACCENT,
      accentHover: COLOR_ACCENT_HOVER,
      accentShadow: COLOR_ACCENT_SHADOW,
      danger: COLOR_DANGER,
      dangerHover: COLOR_DANGER_HOVER,
      success: COLOR_SUCCESS,
      move: isDark ? DARK_COLOR_MOVE : COLOR_MOVE,
      moveBg: isDark ? DARK_COLOR_MOVE_BG : COLOR_MOVE_BG,
      white: COLOR_WHITE,
      transparent: COLOR_TRANSPARENT,
      shadow: isDark ? DARK_COLOR_SHADOW : COLOR_SHADOW
    };
  }

  // web/app.ts
  var STORAGE_KEY = "checklist-web-state-v2";
  var MAX_UNDO = 50;
  function cloneTasks(tasks) {
    return JSON.parse(JSON.stringify(tasks));
  }
  function isTaskItem(x) {
    if (x === null || typeof x !== "object") return false;
    const o = x;
    return typeof o.id === "string" && typeof o.text === "string" && typeof o.checked === "boolean";
  }
  function isTaskItemArray(a) {
    return Array.isArray(a) && a.every(isTaskItem);
  }
  function loadState() {
    const empty = {
      tasks: [],
      taskHistory: [],
      isDark: false,
      isEditing: false,
      isRemoving: false,
      moveSelectedIds: []
    };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return empty;
      const p = JSON.parse(raw);
      if (Array.isArray(p)) {
        return __spreadProps(__spreadValues({}, empty), { tasks: p.filter(isTaskItem) });
      }
      if (p && typeof p === "object") {
        const o = p;
        const tasks = Array.isArray(o.tasks) ? o.tasks.filter(isTaskItem) : [];
        let taskHistory = [];
        if (Array.isArray(o.taskHistory)) {
          taskHistory = o.taskHistory.filter((snap) => isTaskItemArray(snap));
        }
        return {
          tasks,
          taskHistory,
          isDark: !!o.isDark,
          isEditing: false,
          isRemoving: false,
          moveSelectedIds: []
        };
      }
    } catch (e) {
    }
    return empty;
  }
  function saveState(s) {
    const payload = {
      tasks: s.tasks,
      taskHistory: s.taskHistory,
      isDark: s.isDark
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }
  function uniqueIds(tasks) {
    const t = Date.now();
    return tasks.map((task, i) => __spreadProps(__spreadValues({}, task), {
      id: `${t}-${i}-${Math.random().toString(36).slice(2, 9)}`
    }));
  }
  function applyThemeVars(t, isDark) {
    const r = document.documentElement;
    const set = (name, val) => r.style.setProperty(name, val);
    set("--page-bg", isDark ? "#0f172a" : "#f1f5f9");
    set("--t-bg", t.bg);
    set("--t-bg-hover", t.bgHover);
    set("--t-primary", t.primary);
    set("--t-muted", t.muted);
    set("--t-border", t.border);
    set("--t-surface", t.surface);
    set("--t-task-child", t.taskChild);
    set("--t-task-checked", t.taskChecked);
    set("--t-checkbox-bg", t.checkboxBg);
    set("--t-checkbox-unchecked", t.checkboxUnchecked);
    set("--t-checkbox-hover", t.checkboxHover);
    set("--t-edit-active-bg", t.editActiveBg);
    set("--t-remove-btn-bg", t.removeBtnBg);
    set("--t-remove-btn-hover", t.removeBtnHover);
    set("--t-float-btn", t.floatBtn);
    set("--t-float-btn-hover", t.floatBtnHover);
    set("--t-link-border", t.linkBorder);
    set("--t-link-hover", t.linkHover);
    set("--t-accent", t.accent);
    set("--t-accent-hover", t.accentHover);
    set("--t-accent-shadow", t.accentShadow);
    set("--t-danger", t.danger);
    set("--t-danger-hover", t.dangerHover);
    set("--t-success", COLOR_SUCCESS);
    set("--t-move", t.move);
    set("--t-move-bg", t.moveBg);
    set("--t-white", t.white);
    set("--t-shadow", t.shadow);
  }
  function toggleTaskChecked(tasks, index) {
    const copy = tasks.map((x) => __spreadValues({}, x));
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
  var state = loadState();
  var root = document.getElementById("root");
  function setTasksWithHistory(newTasks) {
    state.taskHistory = [...state.taskHistory.slice(-(MAX_UNDO - 1)), cloneTasks(state.tasks)];
    state.tasks = newTasks;
    saveState(state);
    render();
  }
  function undo() {
    if (state.taskHistory.length === 0) return;
    const prev = state.taskHistory[state.taskHistory.length - 1];
    state.taskHistory = state.taskHistory.slice(0, -1);
    state.tasks = cloneTasks(prev);
    saveState(state);
    render();
  }
  function selectedIndices() {
    return state.tasks.map((t, i) => state.moveSelectedIds.includes(t.id) ? i : -1).filter((i) => i >= 0).sort((a, b) => a - b);
  }
  function moveSelectedUp() {
    const sel = selectedIndices();
    if (sel.length === 0) return;
    const copy = state.tasks.map((t) => __spreadValues({}, t));
    for (const i of sel) {
      if (i > 0) [copy[i - 1], copy[i]] = [copy[i], copy[i - 1]];
    }
    setTasksWithHistory(copy);
  }
  function moveSelectedDown() {
    const sel = selectedIndices();
    if (sel.length === 0) return;
    const copy = state.tasks.map((t) => __spreadValues({}, t));
    const last = copy.length - 1;
    for (const i of [...sel].reverse()) {
      if (i < last) [copy[i], copy[i + 1]] = [copy[i + 1], copy[i]];
    }
    setTasksWithHistory(copy);
  }
  function toggleMoveSelected(id) {
    state.moveSelectedIds = state.moveSelectedIds.includes(id) ? state.moveSelectedIds.filter((x) => x !== id) : [...state.moveSelectedIds, id];
    render();
  }
  function openAddModal() {
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.setAttribute("aria-labelledby", "add-modal-title");
    const dark = state.isDark;
    const panel = document.createElement("div");
    panel.className = "modal-panel" + (dark ? " dark" : "");
    const head = document.createElement("div");
    head.className = "modal-head";
    head.id = "add-modal-title";
    head.textContent = "Start typing or paste your list\u2026";
    const body = document.createElement("div");
    body.className = "modal-body";
    const label = document.createElement("div");
    label.className = "field-label";
    label.textContent = "Paste tasks below (separate lines)";
    const ta = document.createElement("textarea");
    ta.placeholder = "# Example #\n1. Review design specs\n2. Update components\n   - Fix button states\n   - Check contrast ratios";
    ta.addEventListener("paste", (e) => {
      var _a;
      if (!e.clipboardData) return;
      const html = e.clipboardData.getData("text/html");
      if (!html) return;
      e.preventDefault();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      doc.querySelectorAll("a").forEach((a) => {
        var _a2;
        const text2 = (_a2 = a.textContent) != null ? _a2 : "";
        const href = a.href;
        if (href) a.textContent = `${text2} (${href})`;
      });
      doc.querySelectorAll("p, div, li, h1, h2, h3, h4, h5, h6, tr").forEach((el) => {
        el.appendChild(doc.createTextNode("\n"));
      });
      doc.querySelectorAll("br").forEach((br) => {
        br.replaceWith(doc.createTextNode("\n"));
      });
      const cleanText = (_a = doc.body.textContent) != null ? _a : "";
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const text = ta.value;
      ta.value = text.substring(0, start) + cleanText + text.substring(end);
      ta.selectionStart = ta.selectionEnd = start + cleanText.length;
    });
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn-primary-modal";
    btn.textContent = "Add to Checklist";
    const close = () => backdrop.remove();
    btn.addEventListener("click", () => {
      const val = ta.value.trim();
      if (val) {
        const newTasks = uniqueIds(parseTasks(val));
        setTasksWithHistory([...state.tasks, ...newTasks]);
      }
      close();
    });
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) close();
    });
    body.append(label, ta, btn);
    panel.append(head, body);
    backdrop.append(panel);
    document.body.append(backdrop);
    ta.focus();
  }
  function openExportModal() {
    const text = exportTasksAsText(state.tasks);
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    const panel = document.createElement("div");
    panel.className = "modal-panel export-modal";
    const body = document.createElement("div");
    body.className = "modal-body";
    const lbl = document.createElement("label");
    lbl.className = "field-label";
    lbl.textContent = "Your tasks \u2014 select all and copy, or click the button below";
    const ta = document.createElement("textarea");
    ta.readOnly = true;
    ta.value = text;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn-copy";
    btn.textContent = "Copy to Clipboard";
    btn.addEventListener("click", () => {
      ta.select();
      void (() => __async(null, null, function* () {
        try {
          yield navigator.clipboard.writeText(ta.value);
        } catch (e) {
          document.execCommand("copy");
        }
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "Copy to Clipboard";
          btn.classList.remove("copied");
        }, 2e3);
      }))();
    });
    const close = () => backdrop.remove();
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) close();
    });
    body.append(lbl, ta, btn);
    panel.append(body);
    backdrop.append(panel);
    document.body.append(backdrop);
    ta.focus();
    ta.select();
  }
  function elFromHtml(html) {
    const w = document.createElement("div");
    w.innerHTML = html.trim();
    return w.firstElementChild;
  }
  function render() {
    const t = getTheme(state.isDark);
    applyThemeVars(t, state.isDark);
    const taskCount = state.tasks.length;
    const completedCount = state.tasks.filter((x) => x.checked).length;
    const allDone = taskCount > 0 && completedCount === taskCount;
    const canUndo = state.taskHistory.length > 0;
    const hasTasks = taskCount > 0;
    const canMove = state.moveSelectedIds.length > 0;
    const subtitle = taskCount === 0 ? "No tasks yet" : allDone ? `All ${taskCount} tasks completed \u2713` : `${completedCount} / ${taskCount} tasks completed`;
    const modeTooltip = state.isEditing ? { left: "Update text, double Enter to split", right: "Check then use \u2191 / \u2193 to reorder tasks" } : state.isRemoving ? { left: "Click \xD7 to delete a task", right: "" } : null;
    root.innerHTML = "";
    const page = document.createElement("div");
    page.className = "page-wrap";
    const grad = document.createElement("div");
    grad.className = "gradient-card";
    const inner = document.createElement("div");
    inner.className = "inner-card";
    const header = document.createElement("header");
    header.className = "card-header";
    const titleBlock = document.createElement("div");
    titleBlock.className = "title-block";
    const h1 = document.createElement("h1");
    h1.textContent = "Checklist";
    const sub = document.createElement("p");
    sub.className = "subtitle" + (allDone ? " all-done" : "");
    sub.textContent = subtitle;
    titleBlock.append(h1, sub);
    const hdrRight = document.createElement("div");
    hdrRight.className = "header-right";
    const undoBtn = document.createElement("button");
    undoBtn.type = "button";
    undoBtn.className = "icon-btn";
    undoBtn.setAttribute("aria-label", "Undo");
    undoBtn.disabled = !canUndo;
    undoBtn.append(elFromHtml(ICON_UNDO));
    undoBtn.addEventListener("click", () => {
      if (canUndo) undo();
    });
    const themeBtn = document.createElement("button");
    themeBtn.type = "button";
    themeBtn.className = "icon-btn";
    themeBtn.setAttribute("aria-label", state.isDark ? "Light mode" : "Dark mode");
    themeBtn.append(elFromHtml(state.isDark ? ICON_SUN : ICON_MOON));
    themeBtn.addEventListener("click", () => {
      state.isDark = !state.isDark;
      saveState(state);
      render();
    });
    hdrRight.append(undoBtn, themeBtn);
    header.append(titleBlock, hdrRight);
    const ab = document.createElement("div");
    ab.className = "action-bar";
    const row1 = document.createElement("div");
    row1.className = "action-bar-row";
    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "btn-add-items";
    addBtn.append(elFromHtml(ICON_PLUS), document.createTextNode(" Add Items"));
    addBtn.addEventListener("click", () => openAddModal());
    row1.append(addBtn);
    if (hasTasks) {
      const toggles = document.createElement("div");
      toggles.style.display = "flex";
      toggles.style.flexWrap = "wrap";
      toggles.style.gap = "12px";
      toggles.style.alignItems = "center";
      const editWrap = document.createElement("div");
      editWrap.className = "toggle-group";
      editWrap.setAttribute("role", "button");
      editWrap.tabIndex = 0;
      editWrap.addEventListener("click", () => {
        const next = !state.isEditing;
        if (next) state.isRemoving = false;
        else state.moveSelectedIds = [];
        state.isEditing = !state.isEditing;
        render();
      });
      editWrap.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          editWrap.click();
        }
      });
      const editCap = document.createElement("div");
      editCap.className = "capsule" + (state.isEditing ? " on-move" : " off") + (state.isEditing ? "" : "");
      if (state.isEditing) {
        editCap.innerHTML = `<div class="capsule-knob move"></div><span class="label">Edit</span>`;
      } else {
        editCap.innerHTML = `<span class="label">Edit</span><div class="capsule-knob muted"></div>`;
      }
      editWrap.append(editCap);
      const delWrap = document.createElement("div");
      delWrap.className = "toggle-group";
      delWrap.setAttribute("role", "button");
      delWrap.tabIndex = 0;
      delWrap.addEventListener("click", () => {
        const next = !state.isRemoving;
        if (next) state.isEditing = false;
        state.isRemoving = !state.isRemoving;
        render();
      });
      delWrap.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          delWrap.click();
        }
      });
      const delCap = document.createElement("div");
      delCap.className = "capsule" + (state.isRemoving ? " on-danger" : " off");
      if (state.isRemoving) {
        delCap.innerHTML = `<div class="capsule-knob danger"></div><span class="label">Delete</span>`;
      } else {
        delCap.innerHTML = `<span class="label">Delete</span><div class="capsule-knob muted"></div>`;
      }
      delWrap.append(delCap);
      toggles.append(editWrap, delWrap);
      row1.append(toggles);
    }
    ab.append(row1);
    if (hasTasks && state.isRemoving) {
      const links = document.createElement("div");
      links.className = "action-bar-links";
      if (state.tasks.some((x) => x.checked)) {
        const delDone = document.createElement("button");
        delDone.type = "button";
        delDone.className = "link-muted";
        delDone.textContent = "Delete Completed";
        delDone.addEventListener("click", () => {
          setTasksWithHistory(state.tasks.filter((task) => !task.checked));
        });
        links.append(delDone);
      }
      const clearAll = document.createElement("button");
      clearAll.type = "button";
      clearAll.className = "link-danger";
      clearAll.textContent = "Clear All";
      clearAll.addEventListener("click", () => {
        state.isEditing = false;
        state.isRemoving = false;
        state.moveSelectedIds = [];
        setTasksWithHistory([]);
      });
      links.append(clearAll);
      ab.append(links);
    }
    if (hasTasks && state.isEditing) {
      const mw = document.createElement("div");
      mw.className = "move-btns";
      const up = document.createElement("button");
      up.type = "button";
      up.className = "move-btn";
      up.disabled = !canMove;
      up.setAttribute("aria-label", "Move up");
      up.append(elFromHtml(ICON_ARROW_UP_WHITE));
      up.addEventListener("click", () => canMove && moveSelectedUp());
      const down = document.createElement("button");
      down.type = "button";
      down.className = "move-btn";
      down.disabled = !canMove;
      down.setAttribute("aria-label", "Move down");
      down.append(elFromHtml(ICON_ARROW_DOWN_WHITE));
      down.addEventListener("click", () => canMove && moveSelectedDown());
      mw.append(up, down);
      ab.append(mw);
    }
    if (hasTasks && !state.isEditing && !state.isRemoving) {
      const ew = document.createElement("div");
      ew.className = "export-wrap";
      const ex = document.createElement("button");
      ex.type = "button";
      ex.className = "export-btn";
      ex.setAttribute("aria-label", "Export");
      ex.append(elFromHtml(ICON_EXPORT));
      ex.addEventListener("click", () => openExportModal());
      ew.append(ex);
      ab.append(ew);
    }
    if (modeTooltip) {
      const tip = document.createElement("div");
      tip.className = "mode-tooltip";
      const left = document.createElement("span");
      left.textContent = modeTooltip.left;
      tip.append(left);
      if (modeTooltip.right) {
        const right = document.createElement("span");
        right.textContent = modeTooltip.right;
        tip.append(right);
      }
      ab.append(tip);
    }
    inner.append(header, ab);
    if (!hasTasks) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      const p1 = document.createElement("p");
      p1.textContent = "Your checklist is empty";
      const p2 = document.createElement("p");
      p2.className = "accent-line";
      p2.textContent = "Start by adding some tasks";
      empty.append(p1, p2);
      inner.append(empty);
    } else {
      const tw = document.createElement("div");
      tw.className = "tasks-wrap";
      state.tasks.forEach((task, index) => {
        if (index > 0) {
          const sep = document.createElement("hr");
          sep.className = "task-sep";
          tw.append(sep);
        }
        const block = document.createElement("div");
        block.className = "task-block";
        const row = document.createElement("div");
        row.className = "task-row" + (task.isChild ? " child" : "");
        if (state.isEditing && index > 0) {
          const mergeBtn = document.createElement("button");
          mergeBtn.type = "button";
          mergeBtn.className = "merge-float";
          mergeBtn.setAttribute("aria-label", "Merge with task above");
          mergeBtn.append(elFromHtml(ICON_MERGE));
          mergeBtn.addEventListener("click", () => {
            const copy = state.tasks.map((x) => __spreadValues({}, x));
            copy[index - 1].text += "\n" + copy[index].text;
            copy.splice(index, 1);
            setTasksWithHistory(copy);
          });
          block.append(mergeBtn);
        }
        if (state.isRemoving) {
          const rm = document.createElement("button");
          rm.type = "button";
          rm.className = "sq-20 remove-tile";
          rm.setAttribute("aria-label", "Remove task");
          rm.append(elFromHtml(ICON_REMOVE));
          rm.addEventListener("click", () => {
            const copy = state.tasks.map((x) => __spreadValues({}, x));
            copy.splice(index, 1);
            setTasksWithHistory(copy);
          });
          row.append(rm);
        } else if (!state.isEditing) {
          const cb = document.createElement("button");
          cb.type = "button";
          cb.className = "sq-20 checkbox-tile" + (task.checked ? " checked" : "");
          cb.setAttribute("aria-pressed", task.checked ? "true" : "false");
          cb.setAttribute("aria-label", task.checked ? "Mark incomplete" : "Mark complete");
          if (task.checked) cb.append(elFromHtml(ICON_CHECK));
          cb.addEventListener("click", () => {
            setTasksWithHistory(toggleTaskChecked(state.tasks, index));
          });
          row.append(cb);
        } else {
          const ind = document.createElement("button");
          ind.type = "button";
          ind.className = "sq-20 indent-tile";
          ind.setAttribute("aria-label", task.isChild ? "Outdent" : "Indent");
          ind.append(elFromHtml(task.isChild ? ICON_OUTDENT : ICON_INDENT));
          ind.addEventListener("click", () => {
            const copy = state.tasks.map((x) => __spreadValues({}, x));
            copy[index].isChild = !copy[index].isChild;
            setTasksWithHistory(copy);
          });
          row.append(ind);
        }
        const main = document.createElement("div");
        main.className = "task-main";
        if (state.isEditing) {
          const ta = document.createElement("textarea");
          ta.className = "task-edit" + (task.isChild ? " child" : " parent") + (task.checked ? " checked" : "");
          ta.value = task.text;
          ta.rows = Math.min(8, Math.max(2, task.text.split("\n").length));
          const commitEdit = () => {
            const newText = ta.value;
            const copy = cloneTasks(state.tasks);
            if (newText.includes("\n\n")) {
              const parts = newText.split("\n\n");
              copy[index].text = parts[0].trim();
              let offset = 1;
              for (let i = 1; i < parts.length; i++) {
                const partText = parts[i].trim();
                if (partText.length > 0) {
                  copy.splice(index + offset, 0, {
                    id: Date.now().toString() + "-" + index + "-" + i,
                    text: partText,
                    checked: false,
                    isChild: task.isChild
                  });
                  offset++;
                }
              }
              if (copy[index].text.length === 0) copy.splice(index, 1);
            } else {
              if (newText.trim().length === 0) copy.splice(index, 1);
              else copy[index].text = newText;
            }
            setTasksWithHistory(copy);
          };
          ta.addEventListener("blur", commitEdit);
          main.append(ta);
        } else {
          const ro = document.createElement("div");
          ro.className = "task-readonly" + (task.isChild ? " child" : " parent") + (task.checked ? " checked" : "");
          ro.textContent = task.text;
          main.append(ro);
          for (const url of extractUrls(task.text)) {
            const chip = document.createElement("a");
            chip.className = "url-chip";
            chip.href = url;
            chip.target = "_blank";
            chip.rel = "noopener noreferrer";
            const span = document.createElement("span");
            span.textContent = formatUrlLabel(url);
            chip.append(span, elFromHtml(ICON_LINK));
            main.append(chip);
          }
        }
        row.append(main);
        if (state.isEditing) {
          const isSel = state.moveSelectedIds.includes(task.id);
          const mv = document.createElement("button");
          mv.type = "button";
          mv.className = "sq-20 move-select-tile" + (isSel ? " selected" : "");
          mv.setAttribute("aria-pressed", isSel ? "true" : "false");
          mv.setAttribute("aria-label", "Select for move");
          if (isSel) {
            mv.append(elFromHtml(state.isDark ? ICON_MOVE_ARROW_DARK : ICON_MOVE_ARROW_LIGHT));
          }
          mv.addEventListener("click", () => toggleMoveSelected(task.id));
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
  }
  render();
})();

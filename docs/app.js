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

  // web/app.ts
  var STORAGE_KEY = "checklist-web-tasks";
  function loadTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(isTaskItem);
    } catch (e) {
      return [];
    }
  }
  function isTaskItem(x) {
    if (x === null || typeof x !== "object") return false;
    const o = x;
    return typeof o.id === "string" && typeof o.text === "string" && typeof o.checked === "boolean";
  }
  function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
  function uniqueIds(tasks) {
    const t = Date.now();
    return tasks.map((task, i) => __spreadProps(__spreadValues({}, task), {
      id: `${t}-${i}-${Math.random().toString(36).slice(2, 9)}`
    }));
  }
  var tasksEl = document.getElementById("tasks");
  var emptyEl = document.getElementById("empty");
  var pasteEl = document.getElementById("paste");
  function render(tasks) {
    tasksEl.innerHTML = "";
    emptyEl.hidden = tasks.length > 0;
    for (const task of tasks) {
      const li = document.createElement("li");
      li.className = "task" + (task.isChild ? " child" : "");
      if (task.checked) li.classList.add("checked");
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = task.checked;
      cb.id = "t-" + task.id;
      cb.setAttribute("aria-label", "Done: " + task.text.slice(0, 80));
      const label = document.createElement("label");
      label.htmlFor = cb.id;
      label.textContent = task.text;
      cb.addEventListener("change", () => {
        task.checked = cb.checked;
        saveTasks(state);
        li.classList.toggle("checked", task.checked);
      });
      li.appendChild(cb);
      li.appendChild(label);
      tasksEl.appendChild(li);
    }
  }
  var state = loadTasks();
  render(state);
  function mergeFromPaste(replace) {
    const text = pasteEl.value.trim();
    if (!text) return;
    const parsed = uniqueIds(parseTasks(text));
    state = replace ? parsed : state.concat(parsed);
    saveTasks(state);
    render(state);
    pasteEl.value = "";
  }
  document.getElementById("btn-add").addEventListener("click", () => mergeFromPaste(false));
  document.getElementById("btn-replace").addEventListener("click", () => mergeFromPaste(true));
  document.getElementById("btn-clear-done").addEventListener("click", () => {
    state = state.filter((t) => !t.checked);
    saveTasks(state);
    render(state);
  });
  document.getElementById("btn-clear-all").addEventListener("click", () => {
    if (state.length === 0) return;
    if (confirm("Remove all tasks?")) {
      state = [];
      saveTasks(state);
      render(state);
    }
  });
})();

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

  // shared/layout.ts
  var LAYOUT = {
    page: { padY: 24, padX: 16, padBottom: 48 },
    pageBg: { light: "#f1f5f9", dark: "#0f172a" },
    card: {
      maxWidth: 640,
      outerPad: 6,
      outerRadius: 8
    },
    innerCard: {
      radius: 6,
      shadowOffsetY: 6,
      shadowBlur: 12
    },
    header: {
      gap: 12,
      padV: 20,
      padH: 24,
      titleSubtitleGap: 4,
      titleSize: 20,
      titleLetterSpacing: -0.5,
      subtitleSize: 12,
      rightGap: 8,
      iconBtnPad: 8,
      iconBtnRadius: 999
    },
    actionBar: {
      colGap: 8,
      padV: 16,
      padH: 24,
      rowGap: 12,
      spacerMin: 4,
      endGap: 8,
      endLinksGap: 16,
      tooltipPadTop: 4,
      tooltipFont: 12,
      linkFont: 12
    },
    addButton: {
      gap: 8,
      padV: 8,
      padH: 16,
      radius: 8,
      fontSize: 14,
      shadowOffsetY: 4,
      shadowBlur: 8
    },
    capsule: {
      gap: 10,
      knob: 20,
      borderWidth: 1.5,
      fontSize: 14,
      /** Knob left, label right */
      on: { top: 8, right: 16, bottom: 8, left: 8 },
      /** Label left, knob right */
      off: { top: 8, right: 8, bottom: 8, left: 16 }
    },
    moveButton: { size: 28, radius: 6, gap: 8 },
    exportButton: { pad: 8, radius: 8 },
    task: {
      listPadBottom: 12,
      rowGap: 16,
      rowPadV: 16,
      rowPadH: 24,
      childPadLeft: 56,
      mainGap: 6,
      fontSize: 15,
      lineHeight: 1.5,
      textareaMinHeight: 48,
      mergeTop: -13,
      mergePad: 6,
      mergeShadowY: 2,
      mergeShadowBlur: 4,
      controlSize: 20,
      controlRadius: 6,
      controlBorder: 1.5,
      urlChipGap: 5,
      urlChipPadV: 3,
      urlChipPadH: 8,
      urlChipRadius: 6,
      urlChipFont: 12
    },
    empty: { minHeight: 200, gap: 12, fontSize: 14 },
    modals: {
      addTasks: { width: 500, height: 400 },
      export: { width: 480, height: 360 }
    }
  };
  var CARD_GRADIENT_CSS = "radial-gradient(ellipse 140% 120% at 0% 100%, rgb(20, 244, 181) 0%, rgb(99, 102, 241) 52%, rgb(236, 72, 153) 100%)";
  var WIDGET_CARD_GRADIENT_STOPS = [
    { position: 0, color: { r: 20 / 255, g: 244 / 255, b: 181 / 255, a: 1 } },
    { position: 0.5, color: { r: 99 / 255, g: 102 / 255, b: 241 / 255, a: 1 } },
    { position: 1, color: { r: 236 / 255, g: 72 / 255, b: 153 / 255, a: 1 } }
  ];
  var px = (n) => `${n}px`;
  function setLayoutCssVars(root2) {
    const L = LAYOUT;
    const s = (name, value) => root2.style.setProperty(name, value);
    s("--layout-page-pad-y", px(L.page.padY));
    s("--layout-page-pad-x", px(L.page.padX));
    s("--layout-page-pad-bottom", px(L.page.padBottom));
    s("--layout-card-max", px(L.card.maxWidth));
    s("--layout-card-outer-pad", px(L.card.outerPad));
    s("--layout-card-outer-radius", px(L.card.outerRadius));
    s("--layout-card-gradient", CARD_GRADIENT_CSS);
    s("--layout-inner-radius", px(L.innerCard.radius));
    s("--layout-inner-shadow-y", px(L.innerCard.shadowOffsetY));
    s("--layout-inner-shadow-blur", px(L.innerCard.shadowBlur));
    s("--layout-header-gap", px(L.header.gap));
    s("--layout-header-pad-v", px(L.header.padV));
    s("--layout-header-pad-h", px(L.header.padH));
    s("--layout-header-title-sub-gap", px(L.header.titleSubtitleGap));
    s("--layout-header-title-size", px(L.header.titleSize));
    s("--layout-header-title-tracking", String(L.header.titleLetterSpacing));
    s("--layout-header-subtitle-size", px(L.header.subtitleSize));
    s("--layout-header-right-gap", px(L.header.rightGap));
    s("--layout-icon-btn-pad", px(L.header.iconBtnPad));
    s("--layout-icon-btn-radius", px(L.header.iconBtnRadius));
    s("--layout-action-col-gap", px(L.actionBar.colGap));
    s("--layout-action-pad-v", px(L.actionBar.padV));
    s("--layout-action-pad-h", px(L.actionBar.padH));
    s("--layout-action-row-gap", px(L.actionBar.rowGap));
    s("--layout-action-spacer-min", px(L.actionBar.spacerMin));
    s("--layout-action-end-gap", px(L.actionBar.endGap));
    s("--layout-action-end-links-gap", px(L.actionBar.endLinksGap));
    s("--layout-tooltip-pad-top", px(L.actionBar.tooltipPadTop));
    s("--layout-tooltip-font", px(L.actionBar.tooltipFont));
    s("--layout-link-font", px(L.actionBar.linkFont));
    s("--layout-add-btn-gap", px(L.addButton.gap));
    s("--layout-add-btn-pad-v", px(L.addButton.padV));
    s("--layout-add-btn-pad-h", px(L.addButton.padH));
    s("--layout-add-btn-radius", px(L.addButton.radius));
    s("--layout-add-btn-font", px(L.addButton.fontSize));
    s("--layout-add-btn-shadow-y", px(L.addButton.shadowOffsetY));
    s("--layout-add-btn-shadow-blur", px(L.addButton.shadowBlur));
    s("--layout-capsule-gap", px(L.capsule.gap));
    s("--layout-capsule-knob", px(L.capsule.knob));
    s("--layout-capsule-border", px(L.capsule.borderWidth));
    s("--layout-capsule-font", px(L.capsule.fontSize));
    const capOn = L.capsule.on;
    const capOff = L.capsule.off;
    s(
      "--layout-capsule-pad-on",
      `${px(capOn.top)} ${px(capOn.right)} ${px(capOn.bottom)} ${px(capOn.left)}`
    );
    s(
      "--layout-capsule-pad-off",
      `${px(capOff.top)} ${px(capOff.right)} ${px(capOff.bottom)} ${px(capOff.left)}`
    );
    s("--layout-move-btn-size", px(L.moveButton.size));
    s("--layout-move-btn-radius", px(L.moveButton.radius));
    s("--layout-move-btn-gap", px(L.moveButton.gap));
    s("--layout-export-btn-pad", px(L.exportButton.pad));
    s("--layout-export-btn-radius", px(L.exportButton.radius));
    s("--layout-mode-tooltip-gap", px(L.actionBar.rowGap));
    s("--layout-tasks-wrap-pad-bottom", px(L.task.listPadBottom));
    s("--layout-task-row-gap", px(L.task.rowGap));
    s("--layout-task-row-pad-v", px(L.task.rowPadV));
    s("--layout-task-row-pad-h", px(L.task.rowPadH));
    s("--layout-task-child-pad-left", px(L.task.childPadLeft));
    s("--layout-task-main-gap", px(L.task.mainGap));
    s("--layout-task-font-size", px(L.task.fontSize));
    s("--layout-task-line-height", String(L.task.lineHeight));
    s("--layout-task-textarea-min-h", px(L.task.textareaMinHeight));
    s("--layout-merge-top", px(L.task.mergeTop));
    s("--layout-merge-pad", px(L.task.mergePad));
    s("--layout-merge-shadow-y", px(L.task.mergeShadowY));
    s("--layout-merge-shadow-blur", px(L.task.mergeShadowBlur));
    s("--layout-sq-control", px(L.task.controlSize));
    s("--layout-sq-radius", px(L.task.controlRadius));
    s("--layout-sq-border", px(L.task.controlBorder));
    s("--layout-url-chip-gap", px(L.task.urlChipGap));
    s("--layout-url-chip-pad-v", px(L.task.urlChipPadV));
    s("--layout-url-chip-pad-h", px(L.task.urlChipPadH));
    s("--layout-url-chip-radius", px(L.task.urlChipRadius));
    s("--layout-url-chip-font", px(L.task.urlChipFont));
    s("--layout-empty-min-h", px(L.empty.minHeight));
    s("--layout-empty-gap", px(L.empty.gap));
    s("--layout-empty-font", px(L.empty.fontSize));
  }

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
  var COLOR_URL_CHIP_CHECKED_TEXT = "#6B7280";
  var COLOR_URL_CHIP_CHECKED_BG = "#F3F4F6";
  var COLOR_URL_CHIP_CHECKED_BORDER = "#E5E7EB";
  var COLOR_URL_CHIP_CHECKED_HOVER = "#E5E7EB";
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
  var DARK_COLOR_URL_CHIP_CHECKED_TEXT = "#64748B";
  var DARK_COLOR_URL_CHIP_CHECKED_BG = "#334155";
  var DARK_COLOR_URL_CHIP_CHECKED_BORDER = "#475569";
  var DARK_COLOR_URL_CHIP_CHECKED_HOVER = "#475569";
  var DARK_COLOR_FLOAT_BTN = "#334155";
  var DARK_COLOR_SHADOW = "#00000066";
  var DARK_COLOR_MOVE = "#14D7C0";
  var DARK_COLOR_MOVE_BG = "#008273";

  // shared/themeCssVars.ts
  function applyThemeCssVars(root2, t, isDark) {
    const set = (name, val) => root2.style.setProperty(name, val);
    set("--page-bg", isDark ? LAYOUT.pageBg.dark : LAYOUT.pageBg.light);
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
    set("--t-url-chip-checked-text", t.urlChipCheckedText);
    set("--t-url-chip-checked-bg", t.urlChipCheckedBg);
    set("--t-url-chip-checked-border", t.urlChipCheckedBorder);
    set("--t-url-chip-checked-hover", t.urlChipCheckedHover);
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

  // shared/uiCopy.ts
  var UI = {
    title: "Checklist",
    addItems: "Add Items",
    edit: "Edit",
    delete: "Delete",
    deleteCompleted: "Delete Completed",
    clearAll: "Clear All",
    emptyLine1: "Your checklist is empty",
    emptyLine2: "Start by adding some tasks",
    noTasksYet: "No tasks yet",
    allTasksDone: (n) => `All ${n} tasks completed \u2713`,
    progress: (done, total) => `${done} / ${total} tasks completed`,
    modeTooltipEditLeft: "Update text, double Enter to split",
    modeTooltipEditRight: "Check then use \u2191 / \u2193 to reorder tasks",
    modeTooltipDeleteLeft: "Click \xD7 to delete a task",
    /** Figma tooltip row uses empty right column in delete mode */
    modeTooltipDeleteRight: "",
    exportWindowTitle: "Export Tasks",
    addModalTitle: "Start typing or paste your list\u2026",
    addModalLabel: "Paste tasks below (separate lines)",
    addModalButton: "Add to Checklist",
    addModalPlaceholder: `# Example #
1. Review design specs
2. Update components
   - Fix button states
   - Check contrast ratios`,
    exportModalLabel: "Your tasks \u2014 select all and copy, or click the button below",
    exportCopy: "Copy to Clipboard",
    exportCopied: "Copied!",
    ariaUndo: "Undo",
    ariaLightMode: "Light mode",
    ariaDarkMode: "Dark mode",
    ariaMoveUp: "Move up",
    ariaMoveDown: "Move down",
    ariaExport: "Export",
    ariaMergeUp: "Merge with task above",
    ariaRemoveTask: "Remove task",
    ariaMarkComplete: "Mark complete",
    ariaMarkIncomplete: "Mark incomplete",
    ariaIndent: "Indent",
    ariaOutdent: "Outdent",
    ariaSelectForMove: "Select for move"
  };
  function progressSubtitle(taskCount, completedCount) {
    if (taskCount === 0) return UI.noTasksYet;
    if (completedCount === taskCount) return UI.allTasksDone(taskCount);
    return UI.progress(completedCount, taskCount);
  }
  function modeTooltipForState(isEditing, isRemoving) {
    if (isEditing) return { left: UI.modeTooltipEditLeft, right: UI.modeTooltipEditRight };
    if (isRemoving) return { left: UI.modeTooltipDeleteLeft, right: UI.modeTooltipDeleteRight };
    return null;
  }

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
  var ICON_LINK_CHECKED_LIGHT = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" stroke="#6B7280" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 1h3v3" stroke="#6B7280" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 1L6 6" stroke="#6B7280" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  var ICON_LINK_CHECKED_DARK = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" stroke="#64748B" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 1h3v3" stroke="#64748B" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 1L6 6" stroke="#64748B" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
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
  var TRAILING_PUNCT_REGEX = /[.,;:!?]+$/;
  function extractUrls(text) {
    const matches = text.match(URL_REGEX);
    if (!matches) return [];
    const normalizedUrls = matches.map((url) => url.replace(TRAILING_PUNCT_REGEX, ""));
    return [...new Set(normalizedUrls)];
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
      urlChipCheckedText: isDark ? DARK_COLOR_URL_CHIP_CHECKED_TEXT : COLOR_URL_CHIP_CHECKED_TEXT,
      urlChipCheckedBg: isDark ? DARK_COLOR_URL_CHIP_CHECKED_BG : COLOR_URL_CHIP_CHECKED_BG,
      urlChipCheckedBorder: isDark ? DARK_COLOR_URL_CHIP_CHECKED_BORDER : COLOR_URL_CHIP_CHECKED_BORDER,
      urlChipCheckedHover: isDark ? DARK_COLOR_URL_CHIP_CHECKED_HOVER : COLOR_URL_CHIP_CHECKED_HOVER,
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
  setLayoutCssVars(document.documentElement);
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
    head.textContent = UI.addModalTitle;
    const body = document.createElement("div");
    body.className = "modal-body";
    const label = document.createElement("div");
    label.className = "field-label";
    label.textContent = UI.addModalLabel;
    const ta = document.createElement("textarea");
    ta.placeholder = UI.addModalPlaceholder;
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
    btn.textContent = UI.addModalButton;
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
    lbl.textContent = UI.exportModalLabel;
    const ta = document.createElement("textarea");
    ta.readOnly = true;
    ta.value = text;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn-copy";
    btn.textContent = UI.exportCopy;
    btn.addEventListener("click", () => {
      ta.select();
      void (() => __async(null, null, function* () {
        try {
          yield navigator.clipboard.writeText(ta.value);
        } catch (e) {
          document.execCommand("copy");
        }
        btn.textContent = UI.exportCopied;
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = UI.exportCopy;
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
  function fitTaskTextarea(ta) {
    const lh = parseFloat(window.getComputedStyle(ta).lineHeight) || 22.5;
    const minH = Math.max(LAYOUT.task.textareaMinHeight, lh * 2);
    ta.style.height = "auto";
    ta.style.height = `${Math.max(minH, ta.scrollHeight)}px`;
  }
  function render() {
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
    h1.textContent = UI.title;
    const sub = document.createElement("p");
    sub.className = "subtitle" + (allDone ? " all-done" : "");
    sub.textContent = subtitle;
    titleBlock.append(h1, sub);
    const hdrRight = document.createElement("div");
    hdrRight.className = "header-right";
    const undoBtn = document.createElement("button");
    undoBtn.type = "button";
    undoBtn.className = "icon-btn";
    undoBtn.setAttribute("aria-label", UI.ariaUndo);
    undoBtn.disabled = !canUndo;
    undoBtn.append(elFromHtml(ICON_UNDO));
    undoBtn.addEventListener("click", () => {
      if (canUndo) undo();
    });
    const themeBtn = document.createElement("button");
    themeBtn.type = "button";
    themeBtn.className = "icon-btn";
    themeBtn.setAttribute("aria-label", state.isDark ? UI.ariaLightMode : UI.ariaDarkMode);
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
    row1.className = "action-bar-row action-bar-row--main";
    const left = document.createElement("div");
    left.className = "action-bar-left";
    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "btn-add-items";
    addBtn.append(elFromHtml(ICON_PLUS), document.createTextNode(" " + UI.addItems));
    addBtn.addEventListener("click", () => openAddModal());
    left.append(addBtn);
    if (hasTasks) {
      const toggles = document.createElement("div");
      toggles.className = "action-bar-toggles";
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
      editCap.className = "capsule" + (state.isEditing ? " on-move" : " off");
      if (state.isEditing) {
        editCap.innerHTML = `<div class="capsule-knob move"></div><span class="label">${UI.edit}</span>`;
      } else {
        editCap.innerHTML = `<span class="label">${UI.edit}</span><div class="capsule-knob muted"></div>`;
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
        delCap.innerHTML = `<div class="capsule-knob danger"></div><span class="label">${UI.delete}</span>`;
      } else {
        delCap.innerHTML = `<span class="label">${UI.delete}</span><div class="capsule-knob muted"></div>`;
      }
      delWrap.append(delCap);
      toggles.append(editWrap, delWrap);
      left.append(toggles);
    }
    const spacer = document.createElement("div");
    spacer.className = "action-bar-spacer";
    spacer.setAttribute("aria-hidden", "true");
    const end = document.createElement("div");
    end.className = "action-bar-end";
    if (hasTasks && state.isRemoving) {
      const links = document.createElement("div");
      links.className = "action-bar-links";
      if (state.tasks.some((x) => x.checked)) {
        const delDone = document.createElement("button");
        delDone.type = "button";
        delDone.className = "link-muted";
        delDone.textContent = UI.deleteCompleted;
        delDone.addEventListener("click", () => {
          setTasksWithHistory(state.tasks.filter((task) => !task.checked));
        });
        links.append(delDone);
      }
      const clearAll = document.createElement("button");
      clearAll.type = "button";
      clearAll.className = "link-danger";
      clearAll.textContent = UI.clearAll;
      clearAll.addEventListener("click", () => {
        state.isEditing = false;
        state.isRemoving = false;
        state.moveSelectedIds = [];
        setTasksWithHistory([]);
      });
      links.append(clearAll);
      end.classList.add("links");
      end.append(links);
    } else if (hasTasks && state.isEditing) {
      const mw = document.createElement("div");
      mw.className = "move-btns";
      const up = document.createElement("button");
      up.type = "button";
      up.className = "move-btn";
      up.disabled = !canMove;
      up.setAttribute("aria-label", UI.ariaMoveUp);
      up.append(elFromHtml(ICON_ARROW_UP_WHITE));
      up.addEventListener("click", () => canMove && moveSelectedUp());
      const down = document.createElement("button");
      down.type = "button";
      down.className = "move-btn";
      down.disabled = !canMove;
      down.setAttribute("aria-label", UI.ariaMoveDown);
      down.append(elFromHtml(ICON_ARROW_DOWN_WHITE));
      down.addEventListener("click", () => canMove && moveSelectedDown());
      mw.append(up, down);
      end.append(mw);
    } else if (hasTasks && !state.isEditing && !state.isRemoving) {
      const ew = document.createElement("div");
      ew.className = "export-wrap";
      const ex = document.createElement("button");
      ex.type = "button";
      ex.className = "export-btn";
      ex.setAttribute("aria-label", UI.ariaExport);
      ex.append(elFromHtml(ICON_EXPORT));
      ex.addEventListener("click", () => openExportModal());
      ew.append(ex);
      end.append(ew);
    }
    row1.append(left, spacer, end);
    ab.append(row1);
    if (modeTooltip) {
      const tip = document.createElement("div");
      tip.className = "mode-tooltip";
      const left2 = document.createElement("span");
      left2.className = "mode-tooltip-left";
      left2.textContent = modeTooltip.left;
      tip.append(left2);
      if (modeTooltip.right !== "") {
        const right = document.createElement("span");
        right.className = "mode-tooltip-right";
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
      p1.textContent = UI.emptyLine1;
      const p2 = document.createElement("p");
      p2.className = "accent-line";
      p2.textContent = UI.emptyLine2;
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
          mergeBtn.setAttribute("aria-label", UI.ariaMergeUp);
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
          rm.setAttribute("aria-label", UI.ariaRemoveTask);
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
          cb.setAttribute("aria-label", task.checked ? UI.ariaMarkIncomplete : UI.ariaMarkComplete);
          if (task.checked) cb.append(elFromHtml(ICON_CHECK));
          cb.addEventListener("click", () => {
            setTasksWithHistory(toggleTaskChecked(state.tasks, index));
          });
          row.append(cb);
        } else {
          const ind = document.createElement("button");
          ind.type = "button";
          ind.className = "sq-20 indent-tile";
          ind.setAttribute("aria-label", task.isChild ? UI.ariaOutdent : UI.ariaIndent);
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
          ta.rows = 1;
          ta.addEventListener("input", () => fitTaskTextarea(ta));
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
            chip.className = "url-chip" + (task.checked ? " checked" : "");
            chip.href = url;
            chip.target = "_blank";
            chip.rel = "noopener noreferrer";
            const span = document.createElement("span");
            span.textContent = formatUrlLabel(url);
            const linkIcon = task.checked ? state.isDark ? ICON_LINK_CHECKED_DARK : ICON_LINK_CHECKED_LIGHT : ICON_LINK;
            chip.append(span, elFromHtml(linkIcon));
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
          mv.setAttribute("aria-label", UI.ariaSelectForMove);
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
    if (state.isEditing) {
      requestAnimationFrame(() => {
        root.querySelectorAll(".task-edit").forEach(fitTaskTextarea);
      });
    }
  }
  render();
})();

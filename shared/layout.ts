/**
 * Single source for spacing / radii / sizes used by the Figma widget and the web app.
 * Web: call setLayoutCssVars(document.documentElement) once; CSS uses var(--layout-*).
 */

/** Target for CSS custom properties (no DOM lib required for widget `tsc`). */
export type CssVarRoot = { style: { setProperty(name: string, value: string): void } };

export const LAYOUT = {
  page: { padY: 24, padX: 16, padBottom: 48 },
  pageBg: { light: '#f1f5f9', dark: '#0f172a' },
  card: {
    maxWidth: 640,
    outerPad: 6,
    outerRadius: 8,
  },
  innerCard: {
    radius: 6,
    shadowOffsetY: 6,
    shadowBlur: 12,
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
    iconBtnRadius: 999,
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
    linkFont: 12,
  },
  addButton: {
    gap: 8,
    padV: 8,
    padH: 16,
    radius: 8,
    fontSize: 14,
    shadowOffsetY: 4,
    shadowBlur: 8,
  },
  capsule: {
    gap: 10,
    knob: 20,
    borderWidth: 1.5,
    fontSize: 14,
    /** Knob left, label right */
    on: { top: 8, right: 16, bottom: 8, left: 8 },
    /** Label left, knob right */
    off: { top: 8, right: 8, bottom: 8, left: 16 },
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
    urlChipFont: 12,
  },
  empty: { minHeight: 200, gap: 12, fontSize: 14 },
  modals: {
    addTasks: { width: 500, height: 400 },
    export: { width: 480, height: 360 },
  },
} as const;

/** CSS background for the outer gradient frame (same colors as widget radial gradient). */
export const CARD_GRADIENT_CSS =
  'radial-gradient(ellipse 140% 120% at 0% 100%, rgb(20, 244, 181) 0%, rgb(99, 102, 241) 52%, rgb(236, 72, 153) 100%)';

/** Figma widget radial gradient — keep in sync with CARD_GRADIENT_CSS. */
export const WIDGET_CARD_GRADIENT_STOPS = [
  { position: 0, color: { r: 20 / 255, g: 244 / 255, b: 181 / 255, a: 1 } },
  { position: 0.5, color: { r: 99 / 255, g: 102 / 255, b: 241 / 255, a: 1 } },
  { position: 1, color: { r: 236 / 255, g: 72 / 255, b: 153 / 255, a: 1 } },
] as const;

export const WIDGET_CARD_GRADIENT_HANDLES = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
] as const;

const px = (n: number) => `${n}px`;

/** Inject layout tokens as CSS variables on :root (call once when the web app loads). */
export function setLayoutCssVars(root: CssVarRoot): void {
  const L = LAYOUT;
  const s = (name: string, value: string) => root.style.setProperty(name, value);

  s('--layout-page-pad-y', px(L.page.padY));
  s('--layout-page-pad-x', px(L.page.padX));
  s('--layout-page-pad-bottom', px(L.page.padBottom));
  s('--layout-card-max', px(L.card.maxWidth));
  s('--layout-card-outer-pad', px(L.card.outerPad));
  s('--layout-card-outer-radius', px(L.card.outerRadius));
  s('--layout-card-gradient', CARD_GRADIENT_CSS);
  s('--layout-inner-radius', px(L.innerCard.radius));
  s('--layout-inner-shadow-y', px(L.innerCard.shadowOffsetY));
  s('--layout-inner-shadow-blur', px(L.innerCard.shadowBlur));

  s('--layout-header-gap', px(L.header.gap));
  s('--layout-header-pad-v', px(L.header.padV));
  s('--layout-header-pad-h', px(L.header.padH));
  s('--layout-header-title-sub-gap', px(L.header.titleSubtitleGap));
  s('--layout-header-title-size', px(L.header.titleSize));
  s('--layout-header-title-tracking', String(L.header.titleLetterSpacing));
  s('--layout-header-subtitle-size', px(L.header.subtitleSize));
  s('--layout-header-right-gap', px(L.header.rightGap));
  s('--layout-icon-btn-pad', px(L.header.iconBtnPad));
  s('--layout-icon-btn-radius', px(L.header.iconBtnRadius));

  s('--layout-action-col-gap', px(L.actionBar.colGap));
  s('--layout-action-pad-v', px(L.actionBar.padV));
  s('--layout-action-pad-h', px(L.actionBar.padH));
  s('--layout-action-row-gap', px(L.actionBar.rowGap));
  s('--layout-action-spacer-min', px(L.actionBar.spacerMin));
  s('--layout-action-end-gap', px(L.actionBar.endGap));
  s('--layout-action-end-links-gap', px(L.actionBar.endLinksGap));
  s('--layout-tooltip-pad-top', px(L.actionBar.tooltipPadTop));
  s('--layout-tooltip-font', px(L.actionBar.tooltipFont));
  s('--layout-link-font', px(L.actionBar.linkFont));

  s('--layout-add-btn-gap', px(L.addButton.gap));
  s('--layout-add-btn-pad-v', px(L.addButton.padV));
  s('--layout-add-btn-pad-h', px(L.addButton.padH));
  s('--layout-add-btn-radius', px(L.addButton.radius));
  s('--layout-add-btn-font', px(L.addButton.fontSize));
  s('--layout-add-btn-shadow-y', px(L.addButton.shadowOffsetY));
  s('--layout-add-btn-shadow-blur', px(L.addButton.shadowBlur));

  s('--layout-capsule-gap', px(L.capsule.gap));
  s('--layout-capsule-knob', px(L.capsule.knob));
  s('--layout-capsule-border', String(L.capsule.borderWidth));
  s('--layout-capsule-font', px(L.capsule.fontSize));
  const capOn = L.capsule.on;
  const capOff = L.capsule.off;
  s(
    '--layout-capsule-pad-on',
    `${px(capOn.top)} ${px(capOn.right)} ${px(capOn.bottom)} ${px(capOn.left)}`
  );
  s(
    '--layout-capsule-pad-off',
    `${px(capOff.top)} ${px(capOff.right)} ${px(capOff.bottom)} ${px(capOff.left)}`
  );

  s('--layout-move-btn-size', px(L.moveButton.size));
  s('--layout-move-btn-radius', px(L.moveButton.radius));
  s('--layout-move-btn-gap', px(L.moveButton.gap));
  s('--layout-export-btn-pad', px(L.exportButton.pad));
  s('--layout-export-btn-radius', px(L.exportButton.radius));

  s('--layout-mode-tooltip-gap', px(L.actionBar.rowGap));
  s('--layout-tasks-wrap-pad-bottom', px(L.task.listPadBottom));
  s('--layout-task-row-gap', px(L.task.rowGap));
  s('--layout-task-row-pad-v', px(L.task.rowPadV));
  s('--layout-task-row-pad-h', px(L.task.rowPadH));
  s('--layout-task-child-pad-left', px(L.task.childPadLeft));
  s('--layout-task-main-gap', px(L.task.mainGap));
  s('--layout-task-font-size', px(L.task.fontSize));
  s('--layout-task-line-height', String(L.task.lineHeight));
  s('--layout-task-textarea-min-h', px(L.task.textareaMinHeight));
  s('--layout-merge-top', px(L.task.mergeTop));
  s('--layout-merge-pad', px(L.task.mergePad));
  s('--layout-merge-shadow-y', px(L.task.mergeShadowY));
  s('--layout-merge-shadow-blur', px(L.task.mergeShadowBlur));
  s('--layout-sq-control', px(L.task.controlSize));
  s('--layout-sq-radius', px(L.task.controlRadius));
  s('--layout-sq-border', String(L.task.controlBorder));
  s('--layout-url-chip-gap', px(L.task.urlChipGap));
  s('--layout-url-chip-pad-v', px(L.task.urlChipPadV));
  s('--layout-url-chip-pad-h', px(L.task.urlChipPadH));
  s('--layout-url-chip-radius', px(L.task.urlChipRadius));
  s('--layout-url-chip-font', px(L.task.urlChipFont));

  s('--layout-empty-min-h', px(L.empty.minHeight));
  s('--layout-empty-gap', px(L.empty.gap));
  s('--layout-empty-font', px(L.empty.fontSize));
}

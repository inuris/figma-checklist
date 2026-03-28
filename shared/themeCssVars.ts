/**
 * Maps widget Theme + page chrome to CSS custom properties for the web app.
 */
import { COLOR_SUCCESS } from '../widget-src/constants/colors';
import type { Theme } from '../widget-src/utils/theme';
import { LAYOUT, type CssVarRoot } from './layout';

export function applyThemeCssVars(root: CssVarRoot, t: Theme, isDark: boolean): void {
  const set = (name: string, val: string) => root.style.setProperty(name, val);
  set('--page-bg', isDark ? LAYOUT.pageBg.dark : LAYOUT.pageBg.light);
  set('--t-bg', t.bg);
  set('--t-bg-hover', t.bgHover);
  set('--t-primary', t.primary);
  set('--t-muted', t.muted);
  set('--t-border', t.border);
  set('--t-surface', t.surface);
  set('--t-task-child', t.taskChild);
  set('--t-task-checked', t.taskChecked);
  set('--t-checkbox-bg', t.checkboxBg);
  set('--t-checkbox-unchecked', t.checkboxUnchecked);
  set('--t-checkbox-hover', t.checkboxHover);
  set('--t-edit-active-bg', t.editActiveBg);
  set('--t-remove-btn-bg', t.removeBtnBg);
  set('--t-remove-btn-hover', t.removeBtnHover);
  set('--t-float-btn', t.floatBtn);
  set('--t-float-btn-hover', t.floatBtnHover);
  set('--t-link-border', t.linkBorder);
  set('--t-link-hover', t.linkHover);
  set('--t-url-chip-checked-text', t.urlChipCheckedText);
  set('--t-url-chip-checked-bg', t.urlChipCheckedBg);
  set('--t-url-chip-checked-border', t.urlChipCheckedBorder);
  set('--t-url-chip-checked-hover', t.urlChipCheckedHover);
  set('--t-accent', t.accent);
  set('--t-accent-hover', t.accentHover);
  set('--t-accent-shadow', t.accentShadow);
  set('--t-danger', t.danger);
  set('--t-danger-hover', t.dangerHover);
  set('--t-success', COLOR_SUCCESS);
  set('--t-move', t.move);
  set('--t-move-bg', t.moveBg);
  set('--t-white', t.white);
  set('--t-shadow', t.shadow);
}

import {
  COLOR_ACCENT, COLOR_ACCENT_HOVER, COLOR_ACCENT_SHADOW,
  COLOR_BG, COLOR_BORDER, COLOR_CHECKBOX_HOVER, COLOR_CHECKBOX_UNCHECKED,
  COLOR_DANGER, COLOR_DANGER_HOVER, COLOR_EDIT_ACTIVE_BG, COLOR_HOVER_BG,
  COLOR_LINK_BORDER, COLOR_LINK_HOVER, COLOR_MUTED, COLOR_PRIMARY,
  COLOR_REMOVE_ACTIVE_BG, COLOR_REMOVE_BTN_BG, COLOR_REMOVE_BTN_HOVER,
  COLOR_SHADOW, COLOR_SUCCESS, COLOR_SURFACE, COLOR_TASK_CHECKED,
  COLOR_TASK_CHILD, COLOR_TRANSPARENT, COLOR_WHITE,
  DARK_COLOR_BG, DARK_COLOR_BORDER, DARK_COLOR_CHECKBOX_HOVER,
  DARK_COLOR_CHECKBOX_UNCHECKED, DARK_COLOR_EDIT_ACTIVE_BG, DARK_COLOR_FLOAT_BTN,
  DARK_COLOR_HOVER_BG, DARK_COLOR_LINK_BORDER, DARK_COLOR_LINK_HOVER,
  DARK_COLOR_MUTED, DARK_COLOR_PRIMARY, DARK_COLOR_REMOVE_ACTIVE_BG,
  DARK_COLOR_REMOVE_BTN_BG, DARK_COLOR_REMOVE_BTN_HOVER, DARK_COLOR_SHADOW,
  DARK_COLOR_SURFACE, DARK_COLOR_TASK_CHECKED, DARK_COLOR_TASK_CHILD,
} from '../constants/colors';

export interface Theme {
  bg: string;
  bgHover: string;
  primary: string;
  muted: string;
  border: string;
  surface: string;
  taskChild: string;
  taskChecked: string;
  checkboxBg: string;
  checkboxUnchecked: string;
  checkboxHover: string;
  editActiveBg: string;
  removeActiveBg: string;
  removeBtnBg: string;
  removeBtnHover: string;
  floatBtn: string;
  floatBtnHover: string;
  linkBorder: string;
  linkHover: string;
  // Constant across themes
  accent: string;
  accentHover: string;
  accentShadow: string;
  danger: string;
  dangerHover: string;
  success: string;
  white: string;
  transparent: string;
  shadow: string;
}

export function getTheme(isDark: boolean): Theme {
  return {
    bg:                isDark ? DARK_COLOR_BG                  : COLOR_BG,
    bgHover:           isDark ? DARK_COLOR_HOVER_BG            : COLOR_HOVER_BG,
    primary:           isDark ? DARK_COLOR_PRIMARY             : COLOR_PRIMARY,
    muted:             isDark ? DARK_COLOR_MUTED               : COLOR_MUTED,
    border:            isDark ? DARK_COLOR_BORDER              : COLOR_BORDER,
    surface:           isDark ? DARK_COLOR_SURFACE             : COLOR_SURFACE,
    taskChild:         isDark ? DARK_COLOR_TASK_CHILD          : COLOR_TASK_CHILD,
    taskChecked:       isDark ? DARK_COLOR_TASK_CHECKED        : COLOR_TASK_CHECKED,
    checkboxBg:        isDark ? DARK_COLOR_BG                  : COLOR_WHITE,
    checkboxUnchecked: isDark ? DARK_COLOR_CHECKBOX_UNCHECKED  : COLOR_CHECKBOX_UNCHECKED,
    checkboxHover:     isDark ? DARK_COLOR_CHECKBOX_HOVER      : COLOR_CHECKBOX_HOVER,
    editActiveBg:      isDark ? DARK_COLOR_EDIT_ACTIVE_BG      : COLOR_EDIT_ACTIVE_BG,
    removeActiveBg:    isDark ? DARK_COLOR_REMOVE_ACTIVE_BG    : COLOR_REMOVE_ACTIVE_BG,
    removeBtnBg:       isDark ? DARK_COLOR_REMOVE_BTN_BG       : COLOR_REMOVE_BTN_BG,
    removeBtnHover:    isDark ? DARK_COLOR_REMOVE_BTN_HOVER    : COLOR_REMOVE_BTN_HOVER,
    floatBtn:          isDark ? DARK_COLOR_FLOAT_BTN           : COLOR_WHITE,
    floatBtnHover:     isDark ? DARK_COLOR_SURFACE             : COLOR_HOVER_BG,
    linkBorder:        isDark ? DARK_COLOR_LINK_BORDER         : COLOR_LINK_BORDER,
    linkHover:         isDark ? DARK_COLOR_LINK_HOVER          : COLOR_LINK_HOVER,
    // Same in both themes
    accent:      COLOR_ACCENT,
    accentHover: COLOR_ACCENT_HOVER,
    accentShadow:COLOR_ACCENT_SHADOW,
    danger:      COLOR_DANGER,
    dangerHover: COLOR_DANGER_HOVER,
    success:     COLOR_SUCCESS,
    white:       COLOR_WHITE,
    transparent: COLOR_TRANSPARENT,
    shadow:      isDark ? DARK_COLOR_SHADOW : COLOR_SHADOW,
  };
}

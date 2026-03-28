const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;

import { LAYOUT } from '../../shared/layout';
import { UI, progressSubtitle } from '../../shared/uiCopy';
import { COLOR_SUCCESS } from '../constants/colors';
import { ICON_MOON, ICON_SUN, ICON_UNDO } from '../constants/icons';
import { getTheme } from '../utils/theme';

interface HeaderProps {
  taskCount: number;
  completedCount: number;
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  onUndo?: () => void;
  canUndo?: boolean;
}

export function Header({ taskCount, completedCount, isDark, setIsDark, onUndo, canUndo = false }: HeaderProps) {
  const t = getTheme(isDark);
  const allDone = taskCount > 0 && completedCount === taskCount;

  return (
    <AutoLayout
      name="CardHeader"
      width="fill-parent"
      verticalAlignItems="center"
      padding={{ vertical: LAYOUT.header.padV, horizontal: LAYOUT.header.padH }}
      fill={t.bg}
      stroke={{ type: 'solid', color: t.border }}
      spacing={LAYOUT.header.gap}
    >
      {/* Title + subtitle */}
      <AutoLayout direction="vertical" spacing={LAYOUT.header.titleSubtitleGap} width="fill-parent" name="Title">
        <Text
          fontSize={LAYOUT.header.titleSize}
          fontWeight="bold"
          fill={t.primary}
          letterSpacing={LAYOUT.header.titleLetterSpacing}
          fontFamily="Inter"
        >
          {UI.title}
        </Text>
        <Text
          fontSize={LAYOUT.header.subtitleSize}
          fill={allDone ? COLOR_SUCCESS : t.muted}
          fontFamily="Inter"
          fontWeight={allDone ? "bold" : "normal"}
        >
          {progressSubtitle(taskCount, completedCount)}
        </Text>
      </AutoLayout>

      {/* Undo + Theme toggle — top right */}
      <AutoLayout name="HeaderRight" spacing={LAYOUT.header.rightGap} verticalAlignItems="center">
        {onUndo && (
          <AutoLayout
            name="UndoHeaderButton"
            padding={LAYOUT.header.iconBtnPad}
            cornerRadius={LAYOUT.header.iconBtnRadius}
            fill={t.transparent}
            hoverStyle={{ fill: t.bgHover }}
            opacity={canUndo ? 1 : 0.4}
            horizontalAlignItems="center"
            verticalAlignItems="center"
            onClick={canUndo ? onUndo : undefined}
          >
            <SVG src={ICON_UNDO} />
          </AutoLayout>
        )}
        <AutoLayout
          name="ThemeToggle"
          padding={LAYOUT.header.iconBtnPad}
          cornerRadius={LAYOUT.header.iconBtnRadius}
          fill={t.transparent}
          hoverStyle={{ fill: t.bgHover }}
          horizontalAlignItems="center"
          verticalAlignItems="center"
          onClick={() => setIsDark(!isDark)}
        >
          <SVG src={isDark ? ICON_SUN : ICON_MOON} />
        </AutoLayout>
      </AutoLayout>

    </AutoLayout>
  );
}

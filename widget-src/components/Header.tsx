const { widget } = figma;
const { AutoLayout, Text } = widget;

import {
  COLOR_BG,
  COLOR_BORDER,
  COLOR_MUTED,
  COLOR_PRIMARY,
  COLOR_SUCCESS,
} from '../constants/colors';

interface HeaderProps {
  taskCount: number;
  completedCount: number;
}

export function Header({ taskCount, completedCount }: HeaderProps) {
  const allDone = taskCount > 0 && completedCount === taskCount;

  return (
    <AutoLayout
      width="fill-parent"
      verticalAlignItems="center"
      padding={{ vertical: 20, horizontal: 24 }}
      fill={COLOR_BG}
      stroke={{ type: 'solid', color: COLOR_BORDER }}
    >
      <AutoLayout direction="vertical" spacing={4} width="fill-parent">
        <Text
          fontSize={20}
          fontWeight="bold"
          fill={COLOR_PRIMARY}
          letterSpacing={-0.5}
          fontFamily="Inter"
        >
          Checklist
        </Text>
        <Text
          fontSize={12}
          fill={allDone ? COLOR_SUCCESS : COLOR_MUTED}
          fontFamily="Inter"
          fontWeight={allDone ? "bold" : "normal"}
        >
          {taskCount === 0
            ? "No tasks yet"
            : allDone
            ? `All ${taskCount} tasks completed`
            : `${completedCount} / ${taskCount} tasks completed`}
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}

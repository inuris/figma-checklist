const { widget } = figma;
const { AutoLayout, Text } = widget;

import {
  COLOR_BG,
  COLOR_BORDER,
  COLOR_MUTED,
  COLOR_PRIMARY,
} from '../constants/colors';

interface HeaderProps {
  taskCount: number;
}

export function Header({ taskCount }: HeaderProps) {
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
        <Text fontSize={12} fill={COLOR_MUTED} fontFamily="Inter">
          {taskCount} {taskCount === 1 ? 'task' : 'tasks'} remaining
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}

const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;

import { COLOR_SUCCESS } from '../constants/colors';
import { ICON_MOON, ICON_SUN } from '../constants/icons';
import { getTheme } from '../utils/theme';

interface HeaderProps {
    taskCount: number;
    completedCount: number;
    isDark: boolean;
    setIsDark: (val: boolean) => void;
}

export function Header({ taskCount, completedCount, isDark, setIsDark }: HeaderProps) {
    const t = getTheme(isDark);
    const allDone = taskCount > 0 && completedCount === taskCount;

    return (
        <AutoLayout
            width="fill-parent"
            verticalAlignItems="center"
            padding={{ vertical: 20, horizontal: 24 }}
            fill={t.bg}
            stroke={{ type: 'solid', color: t.border }}
            spacing={12}
        >
            {/* Title + subtitle */}
            <AutoLayout direction="vertical" spacing={4} width="fill-parent">
                <Text
                    fontSize={20}
                    fontWeight="bold"
                    fill={t.primary}
                    letterSpacing={-0.5}
                    fontFamily="Inter"
                >
                    Checklist
                </Text>
                <Text
                    fontSize={12}
                    fill={allDone ? COLOR_SUCCESS : t.muted}
                    fontFamily="Inter"
                    fontWeight={allDone ? "bold" : "normal"}
                >
                    {taskCount === 0
                        ? "No tasks yet"
                        : allDone
                            ? `All ${taskCount} tasks completed ✓`
                            : `${completedCount} / ${taskCount} tasks completed`}
                </Text>
            </AutoLayout>

            {/* Theme toggle — top right, bare icon only */}
            <AutoLayout padding={8}>
                <SVG
                    src={isDark ? ICON_SUN : ICON_MOON}
                    onClick={() => setIsDark(!isDark)}
                />
            </AutoLayout>

        </AutoLayout>
    );
}

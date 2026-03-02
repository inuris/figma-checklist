const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;

import { TaskItem } from '../types';
import { parseTasks } from '../utils/parseTasks';
import { exportTasksAsText, buildExportHtml } from '../utils/exportTasks';
import { getTheme } from '../utils/theme';
import { ICON_PLUS, ICON_EXPORT } from '../constants/icons';

interface ActionBarProps {
  tasks: TaskItem[];
  isEditing: boolean;
  isRemoving: boolean;
  isDark: boolean;
  setTasks: (tasks: TaskItem[]) => void;
  setIsEditing: (val: boolean) => void;
  setIsRemoving: (val: boolean) => void;
}

export function ActionBar({
  tasks,
  isEditing,
  isRemoving,
  isDark,
  setTasks,
  setIsEditing,
  setIsRemoving,
}: ActionBarProps) {
  const t = getTheme(isDark);
  return (
    <AutoLayout
      width="fill-parent"
      verticalAlignItems="center"
      horizontalAlignItems="start"
      spacing={12}
      padding={{ vertical: 16, horizontal: 24 }}
      fill={t.bgHover}
    >
      {/* Add Items Button */}
      <AutoLayout
        padding={{ vertical: 8, horizontal: 16 }}
        cornerRadius={8}
        fill={t.accent}
        effect={{
          type: "drop-shadow",
          color: t.accentShadow,
          offset: { x: 0, y: 4 },
          blur: 8,
        }}
        onClick={() => {
          return new Promise<void>((resolve) => {
            figma.showUI(__html__, {
              width: 500,
              height: 400,
              title: "Start typing or paste your list...",
            });
            figma.ui.onmessage = (msg) => {
              if (msg.type === 'add-tasks' && msg.text) {
                try {
                  const newTasks = parseTasks(msg.text);
                  setTasks([...tasks, ...newTasks]);
                } catch (e) {
                  console.error('Error parsing tasks:', e);
                }
                figma.ui.close();
                resolve();
              }
            };
          });
        }}
        hoverStyle={{ fill: t.accentHover }}
        verticalAlignItems="center"
        spacing={8}
      >
        <SVG src={ICON_PLUS} />
        <Text fontSize={14} fontWeight="bold" fill={t.white} fontFamily="Inter">
          Add Items
        </Text>
      </AutoLayout>

      {/* Edit / Remove Toggles */}
      {tasks.length > 0 && (
        <AutoLayout spacing={8} verticalAlignItems="center">
          {/* Edit Toggle */}
          <AutoLayout
            verticalAlignItems="center"
            spacing={6}
            onClick={() => {
              if (!isEditing) setIsRemoving(false);
              setIsEditing(!isEditing);
            }}
            padding={{ vertical: 8, horizontal: 12 }}
            cornerRadius={8}
            stroke={isEditing ? t.accent : undefined}
            fill={isEditing ? t.editActiveBg : t.transparent}
            hoverStyle={{ fill: t.surface }}
          >
            <Text
              fontSize={13}
              fontWeight="medium"
              fill={isEditing ? t.accent : t.muted}
              fontFamily="Inter"
            >
              Edit
            </Text>
          </AutoLayout>

          {/* Remove Toggle */}
          <AutoLayout
            verticalAlignItems="center"
            spacing={6}
            onClick={() => {
              if (!isRemoving) setIsEditing(false);
              setIsRemoving(!isRemoving);
            }}
            padding={{ vertical: 8, horizontal: 12 }}
            cornerRadius={8}
            stroke={isRemoving ? t.danger : undefined}
            fill={isRemoving ? t.removeActiveBg : t.transparent}
            hoverStyle={{ fill: t.removeActiveBg }}
          >
            <Text
              fontSize={13}
              fontWeight="medium"
              fill={isRemoving ? t.danger : t.muted}
              fontFamily="Inter"
            >
              Delete
            </Text>
          </AutoLayout>
        </AutoLayout>
      )}

      {/* Delete Completed + Clear All */}
      {tasks.length > 0 && isRemoving && (
        <AutoLayout
          width="fill-parent"
          horizontalAlignItems="end"
          verticalAlignItems="center"
          spacing={16}
        >
          {tasks.some(t => t.checked) && (
            <Text
              fontSize={12}
              fill={t.muted}
              onClick={() => {
                setTasks(tasks.filter(task => !task.checked));
              }}
              hoverStyle={{ fill: t.danger }}
              fontWeight="bold"
              fontFamily="Inter"
              textDecoration="underline"
            >
              Delete Completed
            </Text>
          )}
          <Text
            fontSize={12}
            fill={t.danger}
            onClick={() => {
              setTasks([]);
              setIsEditing(false);
              setIsRemoving(false);
            }}
            hoverStyle={{ fill: t.dangerHover }}
            fontWeight="bold"
            fontFamily="Inter"
            textDecoration="underline"
          >
            Clear All
          </Text>
        </AutoLayout>
      )}

      {/* Export button — right-aligned, only in normal view mode */}
      {tasks.length > 0 && !isEditing && !isRemoving && (
        <AutoLayout
          width="fill-parent"
          horizontalAlignItems="end"
          verticalAlignItems="center"
        >
          <AutoLayout
            padding={8}
            cornerRadius={8}
            fill={t.transparent}
            hoverStyle={{ fill: t.surface }}
            onClick={() => {
              return new Promise<void>((resolve) => {
                const exportedText = exportTasksAsText(tasks);
                const html = buildExportHtml(exportedText);
                figma.showUI(html, {
                  width: 480,
                  height: 360,
                  title: 'Export Tasks',
                });
                figma.ui.onmessage = () => {
                  figma.ui.close();
                  resolve();
                };
              });
            }}
          >
            <SVG src={ICON_EXPORT} />
          </AutoLayout>
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

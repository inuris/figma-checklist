const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;

import { TaskItem } from '../types';
import { parseTasks } from '../utils/parseTasks';
import {
  COLOR_ACCENT,
  COLOR_ACCENT_HOVER,
  COLOR_DANGER,
  COLOR_HOVER_BG,
  COLOR_MUTED,
} from '../constants/colors';
import { ICON_PLUS } from '../constants/icons';

interface ActionBarProps {
  tasks: TaskItem[];
  isEditing: boolean;
  isRemoving: boolean;
  setTasks: (tasks: TaskItem[]) => void;
  setIsEditing: (val: boolean) => void;
  setIsRemoving: (val: boolean) => void;
}

export function ActionBar({
  tasks,
  isEditing,
  isRemoving,
  setTasks,
  setIsEditing,
  setIsRemoving,
}: ActionBarProps) {
  return (
    <AutoLayout
      width="fill-parent"
      verticalAlignItems="center"
      horizontalAlignItems="start"
      spacing={12}
      padding={{ vertical: 16, horizontal: 24 }}
      fill={COLOR_HOVER_BG}
    >
      {/* Add Items Button */}
      <AutoLayout
        padding={{ vertical: 8, horizontal: 16 }}
        cornerRadius={8}
        fill={COLOR_ACCENT}
        effect={{
          type: "drop-shadow",
          color: "#3B82F64D",
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
        hoverStyle={{ fill: COLOR_ACCENT_HOVER }}
        verticalAlignItems="center"
        spacing={8}
      >
        <SVG src={ICON_PLUS} />
        <Text fontSize={14} fontWeight="bold" fill="#FFFFFF" fontFamily="Inter">
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
            stroke={isEditing ? COLOR_ACCENT : undefined}
            fill={isEditing ? "#EFF6FF" : "#FFFFFF00"}
            hoverStyle={{ fill: "#F1F5F9" }}
          >
            <Text
              fontSize={13}
              fontWeight="medium"
              fill={isEditing ? COLOR_ACCENT : COLOR_MUTED}
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
            stroke={isRemoving ? COLOR_DANGER : undefined}
            fill={isRemoving ? "#FEF2F2" : "#FFFFFF00"}
            hoverStyle={{ fill: "#FEF2F2" }}
          >
            <Text
              fontSize={13}
              fontWeight="medium"
              fill={isRemoving ? COLOR_DANGER : COLOR_MUTED}
              fontFamily="Inter"
            >
              Delete
            </Text>
          </AutoLayout>
        </AutoLayout>
      )}

      {/* Clear All */}
      {tasks.length > 0 && isRemoving && (
        <AutoLayout
          width="fill-parent"
          horizontalAlignItems="end"
          verticalAlignItems="center"
        >
          <Text
            fontSize={12}
            fill={COLOR_DANGER}
            onClick={() => {
              setTasks([]);
              setIsEditing(false);
              setIsRemoving(false);
            }}
            hoverStyle={{ fill: "#B91C1C" }}
            fontWeight="bold"
            fontFamily="Inter"
            textDecoration="underline"
          >
            Clear All
          </Text>
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

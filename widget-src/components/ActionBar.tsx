const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;

import { TaskItem } from '../types';
import { parseTasks } from '../utils/parseTasks';
import { exportTasksAsText, buildExportHtml } from '../utils/exportTasks';
import { getTheme } from '../utils/theme';
import { ICON_PLUS, ICON_EXPORT, ICON_UNDO, ICON_ARROW_UP_WHITE, ICON_ARROW_DOWN_WHITE } from '../constants/icons';

interface ActionBarProps {
  tasks: TaskItem[];
  isEditing: boolean;
  isRemoving: boolean;
  isDark: boolean;
  setTasks: (tasks: TaskItem[]) => void;
  setIsEditing: (val: boolean) => void;
  setIsRemoving: (val: boolean) => void;
  setMoveSelectedIds: (ids: string[]) => void;
  moveSelectedUp?: () => void;
  moveSelectedDown?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  onUndo?: () => void;
  canUndo?: boolean;
}

export function ActionBar({
  tasks,
  isEditing,
  isRemoving,
  isDark,
  setTasks,
  setIsEditing,
  setIsRemoving,
  setMoveSelectedIds,
  moveSelectedUp,
  moveSelectedDown,
  canMoveUp = false,
  canMoveDown = false,
  onUndo,
  canUndo = false,
}: ActionBarProps) {
  const t = getTheme(isDark);

  const modeTooltip =
    isEditing ? 'Update text, double Enter to split. Use ↑ / ↓ to reorder checked tasks.'
    : isRemoving ? 'Click × to delete a task.'
    : null;

  return (
    <AutoLayout
      width="fill-parent"
      direction="vertical"
      spacing={8}
      padding={{ vertical: 16, horizontal: 24 }}
      fill={t.bgHover}
      name="ActionBar"
    >
      <AutoLayout
        width="fill-parent"
        verticalAlignItems="center"
        horizontalAlignItems="start"
        spacing={12}
        name="ActionBarRow"
      >
      {/* Add Items Button */}
      <AutoLayout
        name="AddItemsButton"
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
        <SVG name="PlusIcon" src={ICON_PLUS} />
        <Text fontSize={14} fontWeight="bold" fill={t.white} fontFamily="Inter">
          Add Items
        </Text>
      </AutoLayout>

      {/* Edit / Move / Remove Toggles */}
      {tasks.length > 0 && (
        <AutoLayout spacing={12} verticalAlignItems="center" name="EditRemoveToggles">
          {/* Edit "capsule" switch (no ON/OFF label, sized similar to Add Items) */}
          <AutoLayout
            name="EditToggleGroup"
            onClick={() => {
              const next = !isEditing;
              if (next) {
                setIsRemoving(false);
              } else {
                setMoveSelectedIds([]);
              }
              setIsEditing(!isEditing);
            }}
          >
            {isEditing ? (
              <AutoLayout
                name="EditToggleOn"
                padding={{ top: 8, bottom: 8, left: 8, right: 16 }}
                cornerRadius={999}
                spacing={10}
                fill={t.white}
                stroke={t.move}
                verticalAlignItems="center"
              >
                <AutoLayout
                  name="EditKnobOn"
                  width={20}
                  height={20}
                  cornerRadius={999}
                  fill={t.move}
                />
                <Text
                  fontSize={14}
                  fontWeight="bold"
                  fill={t.move}
                  fontFamily="Inter"
                >
                  Edit
                </Text>
              </AutoLayout>
            ) : (
              <AutoLayout
                name="EditToggleOff"
                padding={{ top: 8, bottom: 8, left: 16, right: 8 }}
                cornerRadius={999}
                spacing={10}
                fill={t.white}
                stroke={t.border}
                verticalAlignItems="center"
              >
                <Text
                  fontSize={14}
                  fontWeight="bold"
                  fill={t.muted}
                  fontFamily="Inter"
                >
                  Edit
                </Text>
                <AutoLayout
                  name="EditKnobOff"
                  width={20}
                  height={20}
                  cornerRadius={999}
                  fill={t.border}
                />
              </AutoLayout>
            )}
          </AutoLayout>

          {/* Delete "capsule" switch */}
          <AutoLayout
            name="RemoveToggleGroup"
            onClick={() => {
              const next = !isRemoving;
              if (next) {
                setIsEditing(false);
              }
              setIsRemoving(!isRemoving);
            }}
          >
            {isRemoving ? (
              <AutoLayout
                name="RemoveToggleOn"
                padding={{ top: 8, bottom: 8, left: 8, right: 16 }}
                cornerRadius={999}
                spacing={10}
                fill={t.white}
                stroke={t.danger}
                verticalAlignItems="center"
              >
                <AutoLayout
                  name="RemoveKnobOn"
                  width={20}
                  height={20}
                  cornerRadius={999}
                  fill={t.danger}
                />
                <Text
                  fontSize={14}
                  fontWeight="bold"
                  fill={t.danger}
                  fontFamily="Inter"
                >
                  Delete
                </Text>
              </AutoLayout>
            ) : (
              <AutoLayout
                name="RemoveToggleOff"
                padding={{ top: 8, bottom: 8, left: 16, right: 8 }}
                cornerRadius={999}
                spacing={10}
                fill={t.white}
                stroke={t.border}
                verticalAlignItems="center"
              >
                <Text
                  fontSize={14}
                  fontWeight="bold"
                  fill={t.muted}
                  fontFamily="Inter"
                >
                  Delete
                </Text>
                <AutoLayout
                  name="RemoveKnobOff"
                  width={20}
                  height={20}
                  cornerRadius={999}
                  fill={t.border}
                />
              </AutoLayout>
            )}
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
          name="DeleteCompletedClearAll">
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

      {/* Undo button — right-aligned when Edit mode (same position as Export) */}
      {tasks.length > 0 && isEditing && (
        <AutoLayout
          width="fill-parent"
          horizontalAlignItems="end"
          verticalAlignItems="center"
          name="UndoButtonWrap"
        >
          <AutoLayout
            name="UndoButtonContainer"
            padding={8}
            cornerRadius={8}
            fill={t.transparent}
            hoverStyle={{ fill: t.surface }}
            opacity={canUndo ? 1 : 0.5}
            onClick={canUndo ? onUndo : undefined}
          >
            <SVG src={ICON_UNDO} />
          </AutoLayout>
        </AutoLayout>
      )}
      {/* Export button — right-aligned, only in normal view mode */}
      {tasks.length > 0 && !isEditing && !isRemoving && (
        <AutoLayout
          width="fill-parent"
          horizontalAlignItems="end"
          verticalAlignItems="center"
          name="ExportButton">
          <AutoLayout
            name="ExportButtonContainer"
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

      {/* Tooltip bar: simple guide for current mode; Move mode adds Up/Down buttons aligned right */}
      {tasks.length > 0 && modeTooltip && (
        <AutoLayout
          name="ModeTooltipBar"
          width="fill-parent"
          direction="horizontal"
          spacing={12}
          verticalAlignItems="center"
          padding={{ top: 4, bottom: 0, left: 0, right: 0 }}
        >
          <AutoLayout width="fill-parent" name="ModeTooltipTextWrap">
            <Text
              name="ModeTooltipText"
              fontSize={12}
              fill={t.muted}
              fontFamily="Inter"
            >
              {modeTooltip}
            </Text>
          </AutoLayout>
          {isEditing && moveSelectedUp != null && moveSelectedDown != null && (
            <AutoLayout name="MoveButtonsRow" spacing={8} verticalAlignItems="center">
              <AutoLayout
                name="MoveUpButton"
                width={28}
                height={28}
                cornerRadius={6}
                fill={t.move}
                horizontalAlignItems="center"
                verticalAlignItems="center"
                opacity={canMoveUp ? 1 : 0.5}
                onClick={canMoveUp ? moveSelectedUp : undefined}
              >
                <SVG name="MoveUpIcon" src={ICON_ARROW_UP_WHITE} />
              </AutoLayout>
              <AutoLayout
                name="MoveDownButton"
                width={28}
                height={28}
                cornerRadius={6}
                fill={t.move}
                horizontalAlignItems="center"
                verticalAlignItems="center"
                opacity={canMoveDown ? 1 : 0.5}
                onClick={canMoveDown ? moveSelectedDown : undefined}
              >
                <SVG name="MoveDownIcon" src={ICON_ARROW_DOWN_WHITE} />
              </AutoLayout>
            </AutoLayout>
          )}
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

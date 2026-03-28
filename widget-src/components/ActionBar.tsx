const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;

import { LAYOUT } from '../../shared/layout';
import { UI, modeTooltipForState } from '../../shared/uiCopy';
import { TaskItem } from '../types';
import { parseTasks } from '../utils/parseTasks';
import { exportTasksAsText, buildExportHtml } from '../utils/exportTasks';
import { getTheme } from '../utils/theme';
import { ICON_PLUS, ICON_EXPORT, ICON_ARROW_UP_WHITE, ICON_ARROW_DOWN_WHITE } from '../constants/icons';

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
}: ActionBarProps) {
  const t = getTheme(isDark);

  const modeTooltip = modeTooltipForState(isEditing, isRemoving);

  return (
    <AutoLayout
      width="fill-parent"
      direction="vertical"
      spacing={LAYOUT.actionBar.colGap}
      padding={{ vertical: LAYOUT.actionBar.padV, horizontal: LAYOUT.actionBar.padH }}
      fill={t.bgHover}
      name="ActionBar"
    >
      <AutoLayout
        width="fill-parent"
        verticalAlignItems="center"
        horizontalAlignItems="start"
        spacing={LAYOUT.actionBar.rowGap}
        name="ActionBarRow"
      >
      {/* Add Items Button */}
      <AutoLayout
        name="AddItemsButton"
        padding={{ vertical: LAYOUT.addButton.padV, horizontal: LAYOUT.addButton.padH }}
        cornerRadius={LAYOUT.addButton.radius}
        fill={t.accent}
        effect={{
          type: "drop-shadow",
          color: t.accentShadow,
          offset: { x: 0, y: LAYOUT.addButton.shadowOffsetY },
          blur: LAYOUT.addButton.shadowBlur,
        }}
        onClick={() => {
          return new Promise<void>((resolve) => {
            figma.showUI(__html__, {
              width: LAYOUT.modals.addTasks.width,
              height: LAYOUT.modals.addTasks.height,
              title: UI.addModalTitle,
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
        spacing={LAYOUT.addButton.gap}
      >
        <SVG name="PlusIcon" src={ICON_PLUS} />
        <Text fontSize={LAYOUT.addButton.fontSize} fontWeight="bold" fill={t.white} fontFamily="Inter">
          {UI.addItems}
        </Text>
      </AutoLayout>

      {/* Edit / Move / Remove Toggles */}
      {tasks.length > 0 && (
        <AutoLayout spacing={LAYOUT.actionBar.rowGap} verticalAlignItems="center" name="EditRemoveToggles">
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
                padding={{
                  top: LAYOUT.capsule.on.top,
                  bottom: LAYOUT.capsule.on.bottom,
                  left: LAYOUT.capsule.on.left,
                  right: LAYOUT.capsule.on.right,
                }}
                cornerRadius={999}
                spacing={LAYOUT.capsule.gap}
                fill={t.white}
                stroke={t.move}
                verticalAlignItems="center"
              >
                <AutoLayout
                  name="EditKnobOn"
                  width={LAYOUT.capsule.knob}
                  height={LAYOUT.capsule.knob}
                  cornerRadius={999}
                  fill={t.move}
                />
                <Text
                  fontSize={LAYOUT.capsule.fontSize}
                  fontWeight="bold"
                  fill={t.move}
                  fontFamily="Inter"
                >
                  {UI.edit}
                </Text>
              </AutoLayout>
            ) : (
              <AutoLayout
                name="EditToggleOff"
                padding={{
                  top: LAYOUT.capsule.off.top,
                  bottom: LAYOUT.capsule.off.bottom,
                  left: LAYOUT.capsule.off.left,
                  right: LAYOUT.capsule.off.right,
                }}
                cornerRadius={999}
                spacing={LAYOUT.capsule.gap}
                fill={t.white}
                stroke={t.border}
                verticalAlignItems="center"
              >
                <Text
                  fontSize={LAYOUT.capsule.fontSize}
                  fontWeight="bold"
                  fill={t.muted}
                  fontFamily="Inter"
                >
                  {UI.edit}
                </Text>
                <AutoLayout
                  name="EditKnobOff"
                  width={LAYOUT.capsule.knob}
                  height={LAYOUT.capsule.knob}
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
                padding={{
                  top: LAYOUT.capsule.on.top,
                  bottom: LAYOUT.capsule.on.bottom,
                  left: LAYOUT.capsule.on.left,
                  right: LAYOUT.capsule.on.right,
                }}
                cornerRadius={999}
                spacing={LAYOUT.capsule.gap}
                fill={t.white}
                stroke={t.danger}
                verticalAlignItems="center"
              >
                <AutoLayout
                  name="RemoveKnobOn"
                  width={LAYOUT.capsule.knob}
                  height={LAYOUT.capsule.knob}
                  cornerRadius={999}
                  fill={t.danger}
                />
                <Text
                  fontSize={LAYOUT.capsule.fontSize}
                  fontWeight="bold"
                  fill={t.danger}
                  fontFamily="Inter"
                >
                  {UI.delete}
                </Text>
              </AutoLayout>
            ) : (
              <AutoLayout
                name="RemoveToggleOff"
                padding={{
                  top: LAYOUT.capsule.off.top,
                  bottom: LAYOUT.capsule.off.bottom,
                  left: LAYOUT.capsule.off.left,
                  right: LAYOUT.capsule.off.right,
                }}
                cornerRadius={999}
                spacing={LAYOUT.capsule.gap}
                fill={t.white}
                stroke={t.border}
                verticalAlignItems="center"
              >
                <Text
                  fontSize={LAYOUT.capsule.fontSize}
                  fontWeight="bold"
                  fill={t.muted}
                  fontFamily="Inter"
                >
                  {UI.delete}
                </Text>
                <AutoLayout
                  name="RemoveKnobOff"
                  width={LAYOUT.capsule.knob}
                  height={LAYOUT.capsule.knob}
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
          spacing={LAYOUT.actionBar.endLinksGap}
          name="DeleteCompletedClearAll">
          {tasks.some(t => t.checked) && (
            <Text
              fontSize={LAYOUT.actionBar.linkFont}
              fill={t.muted}
              onClick={() => {
                setTasks(tasks.filter(task => !task.checked));
              }}
              hoverStyle={{ fill: t.danger }}
              fontWeight="bold"
              fontFamily="Inter"
              textDecoration="underline"
            >
              {UI.deleteCompleted}
            </Text>
          )}
          <Text
            fontSize={LAYOUT.actionBar.linkFont}
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
            {UI.clearAll}
          </Text>
        </AutoLayout>
      )}

      {/* Move buttons — right-aligned when Edit mode (same position as Export) */}
      {tasks.length > 0 && isEditing && (
        <AutoLayout
          width="fill-parent"
          horizontalAlignItems="end"
          verticalAlignItems="center"
          name="MoveButtonsWrap"
        >
          <AutoLayout
            name="MoveButtonsRow"
            direction="horizontal"
            spacing={LAYOUT.moveButton.gap}
            verticalAlignItems="center"
          >
            {moveSelectedUp != null && moveSelectedDown != null && (
              <>
                <AutoLayout
                  name="MoveUpButton"
                  width={LAYOUT.moveButton.size}
                  height={LAYOUT.moveButton.size}
                  cornerRadius={LAYOUT.moveButton.radius}
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
                  width={LAYOUT.moveButton.size}
                  height={LAYOUT.moveButton.size}
                  cornerRadius={LAYOUT.moveButton.radius}
                  fill={t.move}
                  horizontalAlignItems="center"
                  verticalAlignItems="center"
                  opacity={canMoveDown ? 1 : 0.5}
                  onClick={canMoveDown ? moveSelectedDown : undefined}
                >
                  <SVG name="MoveDownIcon" src={ICON_ARROW_DOWN_WHITE} />
                </AutoLayout>
              </>
            )}
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
            padding={LAYOUT.exportButton.pad}
            cornerRadius={LAYOUT.exportButton.radius}
            fill={t.transparent}
            hoverStyle={{ fill: t.surface }}
            onClick={() => {
              return new Promise<void>((resolve) => {
                const exportedText = exportTasksAsText(tasks);
                const html = buildExportHtml(exportedText);
                figma.showUI(html, {
                  width: LAYOUT.modals.export.width,
                  height: LAYOUT.modals.export.height,
                  title: UI.exportWindowTitle,
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

      {/* Tooltip bar: simple guide for current mode */}
      {tasks.length > 0 && modeTooltip && (
        <AutoLayout
          name="ModeTooltipBar"
          width="fill-parent"
          direction="horizontal"
          spacing={LAYOUT.actionBar.rowGap}
          verticalAlignItems="center"
          padding={{ top: LAYOUT.actionBar.tooltipPadTop, bottom: 0, left: 0, right: 0 }}
        >
          <Text
            name="ModeTooltipTextLeft"
            fontSize={LAYOUT.actionBar.tooltipFont}
            fill={t.muted}
            fontFamily="Inter"
          >
            {modeTooltip.left}
          </Text>

          {modeTooltip.right !== '' ? (
            <AutoLayout
              name="ModeTooltipRightWrap"
              width="fill-parent"
              horizontalAlignItems="end"
              verticalAlignItems="center"
            >
              <Text
                name="ModeTooltipTextRight"
                fontSize={LAYOUT.actionBar.tooltipFont}
                fill={t.muted}
                fontFamily="Inter"
              >
                {modeTooltip.right}
              </Text>
            </AutoLayout>
          ) : null}
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

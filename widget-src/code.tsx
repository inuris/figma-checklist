const { widget } = figma;
const { AutoLayout, Text, useSyncedState } = widget;

import { LAYOUT, WIDGET_CARD_GRADIENT_HANDLES, WIDGET_CARD_GRADIENT_STOPS } from '../shared/layout';
import { UI } from '../shared/uiCopy';
import { TaskItem } from './types';
import { getTheme } from './utils/theme';
import { Header } from './components/Header';
import { ActionBar } from './components/ActionBar';
import { TaskRow } from './components/TaskRow';

const gradientBackground = {
  type: 'gradient-radial' as const,
  gradientHandlePositions: [...WIDGET_CARD_GRADIENT_HANDLES] as [Vector, Vector, Vector],
  gradientStops: [...WIDGET_CARD_GRADIENT_STOPS],
};

function TextToChecklistWidget() {
  const [tasks, setTasks] = useSyncedState<TaskItem[]>('tasks', []);
  const [taskHistory, setTaskHistory] = useSyncedState<TaskItem[][]>('taskHistory', []);
  const [isEditing, setIsEditing] = useSyncedState('isEditing', false);
  const [isRemoving, setIsRemoving] = useSyncedState('isRemoving', false);
  const [moveSelectedIds, setMoveSelectedIds] = useSyncedState<string[]>('moveSelectedIds', []);
  const [isDark, setIsDark] = useSyncedState('isDark', false);

  const theme = getTheme(isDark);

  const MAX_UNDO = 50;
  const setTasksWithHistory = (newTasks: TaskItem[]) => {
    setTaskHistory([...taskHistory.slice(-(MAX_UNDO - 1)), JSON.parse(JSON.stringify(tasks))]);
    setTasks(newTasks);
  };
  const canUndo = taskHistory.length > 0;
  const undo = () => {
    if (taskHistory.length === 0) return;
    const prev = taskHistory[taskHistory.length - 1];
    setTaskHistory(taskHistory.slice(0, -1));
    setTasks(prev);
  };

  // Indices of tasks that are checked for move (0-based) — used when Edit mode is on
  const selectedIndices = tasks
    .map((t, i) => (moveSelectedIds.includes(t.id) ? i : -1))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b);

  // Move buttons enabled when at least one task is checked for move
  const canMoveUp = moveSelectedIds.length > 0;
  const canMoveDown = moveSelectedIds.length > 0;

  // Move each checked task up by 1 row; tasks at top (index 0) stay
  const moveSelectedUp = () => {
    if (!canMoveUp || selectedIndices.length === 0) return;
    const copy = tasks.map((t) => ({ ...t }));
    for (const i of selectedIndices) {
      if (i > 0) {
        [copy[i - 1], copy[i]] = [copy[i], copy[i - 1]];
      }
    }
    setTasksWithHistory(copy);
  };

  // Move each checked task down by 1 row; tasks at bottom stay
  const moveSelectedDown = () => {
    if (!canMoveDown || selectedIndices.length === 0) return;
    const copy = tasks.map((t) => ({ ...t }));
    const last = tasks.length - 1;
    for (const i of [...selectedIndices].reverse()) {
      if (i < last) {
        [copy[i], copy[i + 1]] = [copy[i + 1], copy[i]];
      }
    }
    setTasksWithHistory(copy);
  };

  const toggleMoveSelected = (id: string) => {
    setMoveSelectedIds(
      moveSelectedIds.includes(id) ? moveSelectedIds.filter((x) => x !== id) : [...moveSelectedIds, id]
    );
  };

  return (
    <AutoLayout
      direction="vertical"
      padding={LAYOUT.card.outerPad}
      width={LAYOUT.card.maxWidth}
      cornerRadius={LAYOUT.card.outerRadius}
      fill={[gradientBackground]}
      name="Card"
    >
      <AutoLayout
        direction="vertical"
        padding={0}
        fill={theme.bg}
        cornerRadius={LAYOUT.innerCard.radius}
        width="fill-parent"
        effect={{
          type: "drop-shadow",
          color: theme.shadow,
          offset: { x: 0, y: LAYOUT.innerCard.shadowOffsetY },
          blur: LAYOUT.innerCard.shadowBlur,
        }}
        name="Container"
      >
        <Header
          taskCount={tasks.length}
          completedCount={tasks.filter(task => task.checked).length}
          isDark={isDark}
          setIsDark={setIsDark}
          onUndo={undo}
          canUndo={canUndo}
        />

        <ActionBar
          tasks={tasks}
          isEditing={isEditing}
          isRemoving={isRemoving}
          isDark={isDark}
          setTasks={setTasksWithHistory}
          setIsEditing={setIsEditing}
          setIsRemoving={setIsRemoving}
          setMoveSelectedIds={setMoveSelectedIds}
          moveSelectedUp={moveSelectedUp}
          moveSelectedDown={moveSelectedDown}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
        />

        {tasks.length > 0 ? (
          <AutoLayout
            direction="vertical"
            spacing={0}
            width="fill-parent"
            padding={{ bottom: LAYOUT.task.listPadBottom }}
            name="TasksContainer"
          >
            <AutoLayout direction="vertical" spacing={0} width="fill-parent" name="Tasks">
              {tasks.map((task, index) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  index={index}
                  tasks={tasks}
                isEditing={isEditing}
                isRemoving={isRemoving}
                moveSelectedIds={moveSelectedIds}
                onToggleMoveSelected={toggleMoveSelected}
                isDark={isDark}
                setTasks={setTasksWithHistory}
                />
              ))}
            </AutoLayout>
          </AutoLayout>
        ) : (
          <AutoLayout
            name="EmptyChecklist"
            width="fill-parent"
            height={LAYOUT.empty.minHeight}
            horizontalAlignItems="center"
            verticalAlignItems="center"
            direction="vertical"
            spacing={LAYOUT.empty.gap}
          >
            <Text name="EmptyChecklistText" fill={theme.muted} fontSize={LAYOUT.empty.fontSize} fontFamily="Inter">
              {UI.emptyLine1}
            </Text>
            <Text name="EmptyChecklistButton" fill={theme.accent} fontSize={LAYOUT.empty.fontSize} fontFamily="Inter" fontWeight="bold">
              {UI.emptyLine2}
            </Text>
          </AutoLayout>
        )}
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(TextToChecklistWidget);
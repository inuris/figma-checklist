const { widget } = figma;
const { AutoLayout, Text, useSyncedState } = widget;

import { TaskItem } from './types';
import { getTheme } from './utils/theme';
import { Header } from './components/Header';
import { ActionBar } from './components/ActionBar';
import { TaskRow } from './components/TaskRow';

// Gradient background behind the white checklist card
const gradientBackground = {
  type: 'gradient-radial' as const,
  gradientHandlePositions: [
    { x: 0, y: 1 }, // bottom-left
    { x: 1, y: 0 }, // top-right
    { x: 1, y: 1 }, // controls radius
  ] as [Vector, Vector, Vector],
  gradientStops: [
    // Teal in bottom-left
    { position: 0, color: { r: 20 / 255, g: 244 / 255, b: 181 / 255, a: 1 } },
    // Soft purple in the middle
    { position: 0.5, color: { r: 99 / 255, g: 102 / 255, b: 241 / 255, a: 1 } },
    // Pink toward the opposite side
    { position: 1, color: { r: 236 / 255, g: 72 / 255, b: 153 / 255, a: 1 } },
  ],
};

function TextToChecklistWidget() {
  const [tasks, setTasks] = useSyncedState<TaskItem[]>('tasks', []);
  const [isEditing, setIsEditing] = useSyncedState('isEditing', false);
  const [isRemoving, setIsRemoving] = useSyncedState('isRemoving', false);
  const [isDark, setIsDark] = useSyncedState('isDark', false);

  const theme = getTheme(isDark);

  return (
    <AutoLayout
      direction="vertical"
      padding={6}
      width={640}
      cornerRadius={8}
      fill={[gradientBackground]}
      name="Card"
    >
      <AutoLayout
        direction="vertical"
        padding={0}
        fill={theme.bg}
        cornerRadius={6}
        width="fill-parent"
        effect={{
          type: "drop-shadow",
          color: theme.shadow,
          offset: { x: 0, y: 6 },
          blur: 12,
        }}
        name="Container"
      >
        <Header
          taskCount={tasks.length}
          completedCount={tasks.filter(task => task.checked).length}
          isDark={isDark}
          setIsDark={setIsDark}
        />

        <ActionBar
          tasks={tasks}
          isEditing={isEditing}
          isRemoving={isRemoving}
          isDark={isDark}
          setTasks={setTasks}
          setIsEditing={setIsEditing}
          setIsRemoving={setIsRemoving}
        />

        {tasks.length > 0 ? (
          <AutoLayout direction="vertical" spacing={0} width="fill-parent" padding={{ bottom: 12 }} name="Tasks">
            {tasks.map((task, index) => (
              <TaskRow
                key={task.id}
                task={task}
                index={index}
                tasks={tasks}
                isEditing={isEditing}
                isRemoving={isRemoving}
                isDark={isDark}
                setTasks={setTasks}
              />
            ))}
          </AutoLayout>
        ) : (
          <AutoLayout
            name="EmptyChecklist"
            width="fill-parent"
            height={200}
            horizontalAlignItems="center"
            verticalAlignItems="center"
            direction="vertical"
            spacing={12}
          >
            <Text name="EmptyChecklistText" fill={theme.muted} fontSize={14} fontFamily="Inter">
              Your checklist is empty
            </Text>
            <Text name="EmptyChecklistButton" fill={theme.accent} fontSize={14} fontFamily="Inter" fontWeight="bold">
              Start by adding some tasks
            </Text>
          </AutoLayout>
        )}
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(TextToChecklistWidget);
const { widget } = figma;
const { AutoLayout, Text, useSyncedState } = widget;

import { TaskItem } from './types';
import { COLOR_ACCENT, COLOR_BG, COLOR_BORDER, COLOR_MUTED, COLOR_SHADOW } from './constants/colors';
import { Header } from './components/Header';
import { ActionBar } from './components/ActionBar';
import { TaskRow } from './components/TaskRow';

function TextToChecklistWidget() {
  const [tasks, setTasks] = useSyncedState<TaskItem[]>('tasks', []);
  const [isEditing, setIsEditing] = useSyncedState('isEditing', false);
  const [isRemoving, setIsRemoving] = useSyncedState('isRemoving', false);

  return (
    <AutoLayout
      direction="vertical"
      padding={0}
      fill={COLOR_BG}
      cornerRadius={16}
      stroke={COLOR_BORDER}
      strokeWidth={1}
      width={600}
      effect={{
        type: "drop-shadow",
        color: COLOR_SHADOW,
        offset: { x: 0, y: 8 },
        blur: 24,
      }}
    >
      <Header taskCount={tasks.length} completedCount={tasks.filter(t => t.checked).length} />

      <ActionBar
        tasks={tasks}
        isEditing={isEditing}
        isRemoving={isRemoving}
        setTasks={setTasks}
        setIsEditing={setIsEditing}
        setIsRemoving={setIsRemoving}
      />

      {tasks.length > 0 ? (
        <AutoLayout direction="vertical" spacing={0} width="fill-parent" padding={{ bottom: 12 }}>
          {tasks.map((task, index) => (
            <TaskRow
              key={task.id}
              task={task}
              index={index}
              tasks={tasks}
              isEditing={isEditing}
              isRemoving={isRemoving}
              setTasks={setTasks}
            />
          ))}
        </AutoLayout>
      ) : (
        <AutoLayout
          width="fill-parent"
          height={200}
          horizontalAlignItems="center"
          verticalAlignItems="center"
          direction="vertical"
          spacing={12}
        >
          <Text fill={COLOR_MUTED} fontSize={14} fontFamily="Inter">
            Your checklist is empty
          </Text>
          <Text fill={COLOR_ACCENT} fontSize={14} fontFamily="Inter" fontWeight="bold">
            Start by adding some tasks
          </Text>
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

widget.register(TextToChecklistWidget);
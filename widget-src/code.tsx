const { widget } = figma

const { AutoLayout, Text, Input, SVG, useSyncedState } = widget

interface TaskItem {
  id: string;
  text: string;
  checked: boolean;
  isChild?: boolean;
}

function parseTasks(inputText: string): TaskItem[] {
  const lines = inputText.split('\n').filter(l => l.trim().length > 0);
  const parsedTasks: TaskItem[] = [];

  // Matches lines starting with a number followed by /, ., or ) (e.g., "1/", "2.", "3)")
  const parentRegex = /^\d+[/.)]\s*/;

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    const isParent = parentRegex.test(trimmedLine);

    if (isParent || parsedTasks.length === 0) {
      // It's a parent task (or the very first line, which defaults to parent)
      parsedTasks.push({
        id: Date.now().toString() + "-" + index,
        text: trimmedLine,
        checked: false,
        isChild: false
      });
    } else {
      // It's a child task belonging to the previous parent
      parsedTasks.push({
        id: Date.now().toString() + "-" + index,
        text: trimmedLine,
        checked: false,
        isChild: true
      });
    }
  });

  return parsedTasks;
}

function TextToChecklistWidget() {
  const [tasks, setTasks] = useSyncedState<TaskItem[]>('tasks', [])
  const [isEditing, setIsEditing] = useSyncedState('isEditing', false)
  const [isRemoving, setIsRemoving] = useSyncedState('isRemoving', false)

  // Modern Professional Color Palette
  const COLOR_PRIMARY = "#111827"; // Gray 900
  const COLOR_ACCENT = "#3B82F6"; // Blue 500
  const COLOR_ACCENT_HOVER = "#2563EB"; // Blue 600
  const COLOR_DANGER = "#EF4444"; // Red 500
  const COLOR_BG = "#FFFFFF";
  const COLOR_BORDER = "#E2E8F0"; // Slate 200
  const COLOR_MUTED = "#64748B"; // Slate 500
  const COLOR_HOVER_BG = "#F8FAFC"; // Slate 50
  const COLOR_HEADER_BG = "#F1F5F9"; // Slate 100

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
        color: "#0F172A1A", // Slate 900 with opacity
        offset: { x: 0, y: 8 },
        blur: 24,
      }}
    >
      {/* Header Section */}
      <AutoLayout
        width="fill-parent"
        verticalAlignItems="center"
        padding={{ vertical: 20, horizontal: 24 }}
        fill={COLOR_BG}
        stroke={{ type: 'solid', color: COLOR_BORDER, side: 'bottom' }}
      >
        <AutoLayout direction="vertical" spacing={4} width="fill-parent">
          <Text fontSize={20} fontWeight="bold" fill={COLOR_PRIMARY} letterSpacing={-0.5} fontFamily="Inter">
            Checklist
          </Text>
          <Text fontSize={12} fill={COLOR_MUTED} fontFamily="Inter">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} remaining
          </Text>
        </AutoLayout>
      </AutoLayout>

      {/* Action Bar */}
      <AutoLayout
        width="fill-parent"
        verticalAlignItems="center"
        horizontalAlignItems="start"
        spacing={12}
        padding={{ vertical: 16, horizontal: 24 }}
        fill={COLOR_HOVER_BG}
      >
        <AutoLayout
          padding={{ vertical: 8, horizontal: 16 }}
          cornerRadius={8}
          fill={COLOR_ACCENT}
          effect={{
            type: "drop-shadow",
            color: "#3B82F64D", // Blue shadow
            offset: { x: 0, y: 4 },
            blur: 8,
          }}
          onClick={() => {
            return new Promise<void>((resolve) => {
              figma.showUI(__html__, { width: 500, height: 400, title: "Start typing or paste your list..." });
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
          <SVG src={`<svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1V11M1 6H11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`} />
          <Text fontSize={14} fontWeight="bold" fill="#FFFFFF" fontFamily="Inter">
            Add Items
          </Text>
        </AutoLayout>

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
              stroke={isEditing ? COLOR_ACCENT : undefined} // Active state border
              fill={isEditing ? "#EFF6FF" : "#FFFFFF00"}
              hoverStyle={{ fill: "#F1F5F9" }}
            >
              <Text fontSize={13} fontWeight="medium" fill={isEditing ? COLOR_ACCENT : COLOR_MUTED} fontFamily="Inter">
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
              <Text fontSize={13} fontWeight="medium" fill={isRemoving ? COLOR_DANGER : COLOR_MUTED} fontFamily="Inter">
                Delete
              </Text>
            </AutoLayout>
          </AutoLayout>
        )}

        {tasks.length > 0 && isRemoving && (
          <AutoLayout width="fill-parent" horizontalAlignItems="end" verticalAlignItems="center">
            <Text fontSize={12} fill={COLOR_DANGER} onClick={() => {
              setTasks([])
              setIsEditing(false)
              setIsRemoving(false)
            }} hoverStyle={{ fill: "#B91C1C" }}
              fontWeight="bold"
              fontFamily="Inter"
              textDecoration="underline"
            >Clear All</Text>
          </AutoLayout>
        )}
      </AutoLayout>

      {/* Task List */}
      {tasks.length > 0 ? (
        <AutoLayout direction="vertical" spacing={0} width="fill-parent" padding={{ bottom: 12 }}>
          {tasks.map((task, index) => (
            <AutoLayout
              key={task.id}
              direction="vertical"
              width="fill-parent"
              overflow="visible"
            >
              {/* Separator */}
              {index > 0 && (
                <AutoLayout width="fill-parent" height={1} fill={COLOR_BORDER} opacity={0.5} />
              )}

              <AutoLayout
                padding={{
                  top: 16,
                  bottom: 16,
                  right: 24,
                  left: task.isChild ? 56 : 24
                }}
                width="fill-parent"
                verticalAlignItems="start"
                spacing={16}
                hoverStyle={{ fill: COLOR_HOVER_BG }}
                overflow="visible"
                fill={COLOR_BG}
              >
                {/* Checkbox / Controls */}
                {isRemoving ? (
                  <AutoLayout
                    width={20}
                    height={20}
                    cornerRadius={6}
                    fill="#FEE2E2"
                    horizontalAlignItems="center"
                    verticalAlignItems="center"
                    onClick={() => {
                      const copy = JSON.parse(JSON.stringify(tasks));
                      copy.splice(index, 1);
                      setTasks(copy);
                    }}
                    hoverStyle={{ fill: "#FECACA" }}
                  >
                    <SVG
                      src={`<svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/></svg>`}
                    />
                  </AutoLayout>
                ) : !isEditing ? (
                  <AutoLayout
                    width={20}
                    height={20}
                    cornerRadius={6}
                    fill={task.checked ? COLOR_ACCENT : "#FFFFFF"}
                    stroke={task.checked ? COLOR_ACCENT : "#CBD5E1"}
                    strokeWidth={1.5}
                    horizontalAlignItems="center"
                    verticalAlignItems="center"
                    onClick={() => {
                      const copy = JSON.parse(JSON.stringify(tasks));
                      const isNowChecked = !copy[index].checked;
                      copy[index].checked = isNowChecked;

                      if (!copy[index].isChild) {
                        for (let i = index + 1; i < copy.length; i++) {
                          if (copy[i].isChild) {
                            copy[i].checked = isNowChecked;
                          } else {
                            break;
                          }
                        }
                      } else {
                        let parentIndex = -1;
                        for (let i = index - 1; i >= 0; i--) {
                          if (!copy[i].isChild) {
                            parentIndex = i;
                            break;
                          }
                        }

                        if (parentIndex !== -1) {
                          let allChildrenChecked = true;
                          for (let i = parentIndex + 1; i < copy.length; i++) {
                            if (copy[i].isChild) {
                              if (!copy[i].checked) {
                                allChildrenChecked = false;
                                break;
                              }
                            } else {
                              break;
                            }
                          }
                          copy[parentIndex].checked = allChildrenChecked;
                        }
                      }
                      setTasks(copy);
                    }}
                    hoverStyle={!task.checked ? { stroke: "#94A3B8" } : {}}
                  >
                    {task.checked && (
                      <SVG
                        src={`<svg width="12" height="10" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
                      />
                    )}
                  </AutoLayout>
                ) : (
                  <AutoLayout
                    width={20}
                    height={20}
                    cornerRadius={6}
                    fill="#F1F5F9"
                    horizontalAlignItems="center"
                    verticalAlignItems="center"
                    onClick={() => {
                      const copy = JSON.parse(JSON.stringify(tasks));
                      copy[index].isChild = !copy[index].isChild;
                      setTasks(copy);
                    }}
                    hoverStyle={{ fill: "#E2E8F0" }}
                  >
                    <SVG
                      src={task.isChild ?
                        `<svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 5h6" stroke="#64748B" stroke-width="1.5" stroke-linecap="round"/></svg>` :
                        `<svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 3h6M2 5h4M2 7h6" stroke="#64748B" stroke-width="1.5" stroke-linecap="round"/></svg>`
                      }
                    />
                  </AutoLayout>
                )}

                {/* Task Text Input */}
                <AutoLayout width="fill-parent" padding={{ top: 0 }} verticalAlignItems="start">
                  <Input
                    value={task.text}
                    onTextEditEnd={(e) => {
                      const copy = JSON.parse(JSON.stringify(tasks));
                      if (e.characters.trim().length === 0) {
                        copy.splice(index, 1);
                      } else {
                        copy[index].text = e.characters;
                      }
                      setTasks(copy);
                    }}
                    fontSize={15}
                    fontWeight={!task.isChild ? 'semi-bold' : 'normal'}
                    fontFamily="Inter"
                    fill={task.checked ? "#9CA3AF" : (task.isChild ? "#4B5563" : "#111827")}
                    textDecoration={task.checked ? "strikethrough" : "none"}
                    width="fill-parent"
                    inputBehavior="multiline"
                  />
                </AutoLayout>

                {/* Input Controls (Merge Up) */}
                {isEditing && index > 0 && (
                  <AutoLayout
                    positioning="absolute"
                    x={{ type: 'right', offset: 12 }}
                    y={{ type: 'top', offset: -4 }}
                    padding={6}
                    cornerRadius={100}
                    fill="#FFFFFF"
                    stroke="#E2E8F0"
                    effect={{
                      type: "drop-shadow",
                      color: "#0F172A1A",
                      offset: { x: 0, y: 2 },
                      blur: 4,
                    }}
                    hoverStyle={{ fill: "#F8FAFC" }}
                    onClick={() => {
                      const copy = JSON.parse(JSON.stringify(tasks));
                      copy[index - 1].text += "\n" + copy[index].text;
                      copy.splice(index, 1);
                      setTasks(copy);
                    }}
                  >
                    <SVG
                      src={`<svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 8V2M3 4l2-2 2 2" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
                    />
                  </AutoLayout>
                )}
              </AutoLayout>
            </AutoLayout>
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
          <Text fill={COLOR_MUTED} fontSize={14} fontFamily="Inter">Your checklist is empty</Text>
          <Text fill={COLOR_ACCENT} fontSize={14} opacity={1} fontFamily="Inter" fontWeight="bold">Start by adding some tasks</Text>
        </AutoLayout>
      )}
    </AutoLayout>
  )
}

widget.register(TextToChecklistWidget)
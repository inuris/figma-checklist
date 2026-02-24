const { widget } = figma
const { AutoLayout, Text, Input, useSyncedState } = widget

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

function HelloWorldWidget() {
  const [inputText, setInputText] = useSyncedState('inputText', '')
  const [tasks, setTasks] = useSyncedState<TaskItem[]>('tasks', [])
  const [isEditing, setIsEditing] = useSyncedState('isEditing', false)

  return (
    <AutoLayout 
      direction="vertical"
      padding={24} 
      spacing={16}
      fill="#FFFFFF" 
      cornerRadius={8}
      stroke="#E5E5E5"
      width={800}
    >
      <AutoLayout width="fill-parent" verticalAlignItems="center">
        <Text fontSize={24} fontWeight="bold">
          Text to Checklist
        </Text>
        <AutoLayout
          padding={{ vertical: 4, horizontal: 12 }}
          cornerRadius={4}
          fill={isEditing ? "#18A0FB" : "#E5E5E5"}
          onClick={() => setIsEditing(!isEditing)}
          hoverStyle={{ fill: isEditing ? "#0D8BD8" : "#CCCCCC" }}
        >
          <Text fontSize={14} fontWeight="bold" fill={isEditing ? "#FFFFFF" : "#333333"}>
            Edit
          </Text>
        </AutoLayout>
      </AutoLayout>
      
      <Input
        value={inputText}
        placeholder="Type text here to add to checklist..."
        onTextEditEnd={(e) => setInputText(e.characters)}
        fontSize={16}
        fill="#333333"
        width="fill-parent"
        inputBehavior="multiline"
      />

      <AutoLayout 
        fill="#18A0FB" 
        padding={{ vertical: 8, horizontal: 16 }} 
        cornerRadius={6}
        onClick={() => {
          if (inputText.trim().length > 0) {
            const newTasks = parseTasks(inputText);
            setTasks([...tasks, ...newTasks]);
            setInputText(''); // Clear the input
          }
        }}
        hoverStyle={{ fill: "#0D8BD8" }}
      >
        <Text fill="#FFFFFF" fontWeight="bold" fontSize={14}>
          Add
        </Text>
      </AutoLayout>

      {tasks.length > 0 && (
        <AutoLayout direction="vertical" spacing={0} width="fill-parent">
          {tasks.map((task, index) => (
            <AutoLayout 
              key={task.id}
              direction="vertical"
              width="fill-parent"
            >
              {/* Top Border (except for the first task) */}
              {index > 0 && (
                <AutoLayout 
                  width="fill-parent" 
                  height={1} 
                  fill={task.isChild ? undefined : "#E5E5E5"}
                  stroke={task.isChild ? "#E5E5E5" : undefined}
                  strokeWidth={task.isChild ? 1 : 0}
                  strokeDashPattern={task.isChild ? [4, 4] : []}
                />
              )}
              
              <AutoLayout 
                padding={{ 
                  top: 12, 
                  bottom: 12, 
                  right: 12, 
                  left: task.isChild ? 44 : 12 
                }} 
                fill="#FFFFFF"
                width="fill-parent"
                verticalAlignItems="start"
                spacing={12}
                hoverStyle={{ fill: "#EBEBEB" }}
              >
                {/* Custom Checkbox Box */}
              <AutoLayout
                width={20}
                height={20}
                cornerRadius={4}
                fill={task.checked ? "#18A0FB" : "#FFFFFF"}
                stroke={task.checked ? "#18A0FB" : "#CCCCCC"}
                strokeWidth={1.5}
                horizontalAlignItems="center"
                verticalAlignItems="center"
                onClick={() => {
                  const copy = JSON.parse(JSON.stringify(tasks));
                  copy[index].checked = !copy[index].checked;
                  setTasks(copy);
                }}
              >
                {task.checked && (
                  <Text fill="#FFFFFF" fontSize={14} fontWeight="bold" horizontalAlignText="center" verticalAlignText="center">
                    ✓
                  </Text>
                )}
              </AutoLayout>

              {/* Task Text */}
              <AutoLayout width="fill-parent" padding={{ top: 2 }} verticalAlignItems="start">
                <Input
                  value={task.text}
                  onTextEditEnd={(e) => {
                    const copy = JSON.parse(JSON.stringify(tasks));
                    copy[index].text = e.characters;
                    setTasks(copy);
                  }}
                  fontSize={14} 
                  fill={task.checked ? "#888888" : "#333333"}
                  textDecoration={task.checked ? "strikethrough" : "none"}
                  width="fill-parent"
                  inputBehavior="multiline"
                />
              </AutoLayout>

              {/* Merge Up Button (only show if not the first task and isEditing is true) */}
              {isEditing && index > 0 && (
                <AutoLayout
                  padding={{ vertical: 4, horizontal: 8 }}
                  cornerRadius={4}
                  fill="#FFFFFF"
                  hoverStyle={{ fill: "#EBEBEB" }}
                  onClick={() => {
                    const copy = JSON.parse(JSON.stringify(tasks));
                    // Merge current task text into the previous task
                    copy[index - 1].text += "\n" + copy[index].text;
                    // Remove the current task
                    copy.splice(index, 1);
                    setTasks(copy);
                  }}
                >
                  <Text fontSize={14} fill="#CCCCCC" hoverStyle={{ fill: "#666666" }} fontWeight="bold">
                    ↑
                  </Text>
                </AutoLayout>
              )}
              </AutoLayout>
            </AutoLayout>
          ))}
          
          <AutoLayout width="fill-parent" horizontalAlignItems="end" padding={{ top: 8 }}>
            <Text fontSize={12} fill="#F24822" onClick={() => setTasks([])} hoverStyle={{ fill: "#C73014" }}>Clear All</Text>
          </AutoLayout>
        </AutoLayout>
      )}
    </AutoLayout>
  )
}

widget.register(HelloWorldWidget)
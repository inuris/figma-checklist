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
  const parentRegex = /^\d+[\/\.\)]\s*/;

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
      <Text fontSize={24} fontWeight="bold">
        Text to Checklist
      </Text>
      
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
        <AutoLayout direction="vertical" spacing={8} width="fill-parent">
          {tasks.map((task, index) => (
            <AutoLayout 
              key={task.id}
              padding={{ 
                top: 12, 
                bottom: 12, 
                right: 12, 
                left: task.isChild ? 44 : 12 
              }} 
              fill={task.isChild ? "#FAFAFA" : "#F5F5F5"} 
              cornerRadius={4} 
              width="fill-parent"
              verticalAlignItems="center"
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
              <AutoLayout width="fill-parent" onClick={() => {
                const copy = JSON.parse(JSON.stringify(tasks));
                copy[index].checked = !copy[index].checked;
                setTasks(copy);
              }}>
                <Text 
                  fontSize={14} 
                  fill={task.checked ? "#888888" : "#333333"}
                  textDecoration={task.checked ? "strikethrough" : "none"}
                  width="fill-parent"
                >
                  {task.text}
                </Text>
              </AutoLayout>

              {/* Merge Up Button (only show if not the first task) */}
              {index > 0 && (
                <AutoLayout
                  padding={4}
                  cornerRadius={4}
                  fill="#EBEBEB"
                  hoverStyle={{ fill: "#D6D6D6" }}
                  onClick={() => {
                    const copy = JSON.parse(JSON.stringify(tasks));
                    // Merge current task text into the previous task
                    copy[index - 1].text += "\n" + copy[index].text;
                    // Remove the current task
                    copy.splice(index, 1);
                    setTasks(copy);
                  }}
                >
                  <Text fontSize={12} fill="#666666">
                    ↑
                  </Text>
                </AutoLayout>
              )}
            </AutoLayout>
          ))}
          
          <AutoLayout width="fill-parent" horizontalAlignItems="end" paddingTop={8}>
            <Text fontSize={12} fill="#F24822" onClick={() => setTasks([])} hoverStyle={{ fill: "#C73014" }}>Clear All</Text>
          </AutoLayout>
        </AutoLayout>
      )}
    </AutoLayout>
  )
}

widget.register(HelloWorldWidget)
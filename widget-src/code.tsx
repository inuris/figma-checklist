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
      </AutoLayout>

      <AutoLayout width="fill-parent" verticalAlignItems="center" spacing={8}>
        <AutoLayout
          padding={{ vertical: 8, horizontal: 16 }}
          cornerRadius={6}
          fill="#18A0FB"
          onClick={() => {
            if (inputText.trim().length > 0) {
              const newTasks = parseTasks(inputText);
              setTasks([...tasks, ...newTasks]);
              setInputText(''); // Clear the input
            }
          }}
          hoverStyle={{ fill: "#0D8BD8" }}
        >
          <Text fontSize={14} fontWeight="bold" fill="#FFFFFF">
            Add
          </Text>
        </AutoLayout>
        <AutoLayout
          verticalAlignItems="center"
          spacing={6}
          onClick={() => setIsEditing(!isEditing)}
          padding={{ vertical: 8, horizontal: 8 }}
          hoverStyle={{ opacity: 0.8 }}
        >
          <Text fontSize={14} fontWeight="bold" fill="#333333">
            Edit
          </Text>
          <AutoLayout
            width={32}
            height={18}
            cornerRadius={9}
            fill={isEditing ? "#18A0FB" : "#CCCCCC"}
            padding={2}
            horizontalAlignItems={isEditing ? "end" : "start"}
            verticalAlignItems="center"
          >
            <AutoLayout
              width={14}
              height={14}
              cornerRadius={7}
              fill="#FFFFFF"
              effect={{
                type: "drop-shadow",
                color: "#00000033",
                offset: { x: 0, y: 1 },
                blur: 2,
              }}
            />
          </AutoLayout>
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


      {tasks.length > 0 && (
        <AutoLayout direction="vertical" spacing={0} width="fill-parent">
          {tasks.map((task, index) => (
            <AutoLayout
              key={task.id}
              direction="vertical"
              width="fill-parent"
              overflow="visible"
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
                width="fill-parent"
                verticalAlignItems="start"
                spacing={12}
                hoverStyle={{ fill: "#EBEBEB" }}
                overflow="visible"
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
                    positioning="absolute"
                    x={{ type: 'right', offset: 8 }}
                    y={{ type: 'top', offset: -14 }}
                    padding={{ vertical: 4, horizontal: 4 }}
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
                    <SVG
                      src={`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.0215 11.0938C10.1131 11.0937 10.2044 11.1124 10.2891 11.1475C10.3735 11.1825 10.45 11.2341 10.5146 11.2988L12.7354 13.5176C12.8039 13.5814 12.8593 13.6586 12.8975 13.7441C12.9355 13.8296 12.9553 13.9221 12.957 14.0156C12.9587 14.1093 12.9413 14.2032 12.9062 14.29C12.8712 14.3767 12.8191 14.4554 12.7529 14.5215C12.6867 14.5877 12.6083 14.6407 12.5215 14.6758C12.4346 14.7109 12.3407 14.7272 12.2471 14.7256C12.1535 14.7239 12.061 14.7041 11.9756 14.666C11.89 14.6279 11.8129 14.5724 11.749 14.5039L10.6982 13.4531V18.6045H18.6055V12.5576H14.6523C14.4673 12.5576 14.289 12.4844 14.1582 12.3535C14.0275 12.2227 13.9542 12.0452 13.9541 11.8604C13.9541 11.6755 14.0276 11.498 14.1582 11.3672C14.289 11.2364 14.4673 11.1621 14.6523 11.1621H18.8379C19.4797 11.1621 20.001 11.6834 20.001 12.3252V18.8369C20.0009 19.4787 19.4797 19.999 18.8379 19.999H1.16406C0.522271 19.999 0.00107077 19.4787 0.000976563 18.8369V12.3252C0.000988967 11.6834 0.52222 11.1621 1.16406 11.1621H5.34961C5.53464 11.1621 5.71194 11.2364 5.84277 11.3672C5.97357 11.498 6.04785 11.6753 6.04785 11.8604C6.04779 12.0453 5.97355 12.2227 5.84277 12.3535C5.71195 12.4842 5.53456 12.5576 5.34961 12.5576H1.39648V18.6045H9.30273V13.498L8.29688 14.5049C8.23215 14.5696 8.15488 14.6212 8.07031 14.6562C7.98564 14.6913 7.89439 14.709 7.80273 14.709C7.71123 14.709 7.62068 14.6913 7.53613 14.6562C7.45147 14.6212 7.37436 14.5697 7.30957 14.5049H7.30859C7.17795 14.3741 7.10449 14.1966 7.10449 14.0117C7.10455 13.8269 7.178 13.6493 7.30859 13.5186L9.52832 11.2988C9.59311 11.234 9.67021 11.1825 9.75488 11.1475C9.83947 11.1125 9.92994 11.0938 10.0215 11.0938ZM18.8379 0C19.4797 6.94419e-06 20.001 0.52124 20.001 1.16309V7.67383C20.001 8.31567 19.4797 8.83691 18.8379 8.83691H14.6523C14.4673 8.83691 14.289 8.76365 14.1582 8.63281C14.0275 8.50208 13.9542 8.3245 13.9541 8.13965C13.9541 7.95462 14.0274 7.77635 14.1582 7.64551C14.289 7.51468 14.4673 7.44141 14.6523 7.44141H18.6055V1.39551H10.6982V6.4873L11.748 5.4375C11.8797 5.31048 12.0563 5.23954 12.2393 5.24121C12.4222 5.24289 12.5973 5.31688 12.7266 5.44629C12.8558 5.57569 12.9292 5.75073 12.9307 5.93359C12.9321 6.11644 12.8614 6.29234 12.7344 6.42383L10.5146 8.64453C10.3839 8.77509 10.2063 8.84863 10.0215 8.84863C9.8824 8.84854 9.74769 8.80676 9.63379 8.73047C9.58862 8.70245 9.54503 8.67101 9.50684 8.63281C9.48889 8.61486 9.47473 8.59383 9.45898 8.57422L7.30859 6.42383C7.17803 6.29303 7.10449 6.11548 7.10449 5.93066C7.10462 5.74602 7.17814 5.56916 7.30859 5.43848V5.4375C7.43941 5.30685 7.61688 5.2334 7.80176 5.2334C7.98656 5.23346 8.16416 5.3069 8.29492 5.4375L9.30273 6.44531V1.39551H1.39648V7.44141H5.34961C5.53448 7.44141 5.71197 7.51488 5.84277 7.64551C5.97361 7.77634 6.04785 7.95462 6.04785 8.13965C6.04774 8.32453 5.97351 8.50207 5.84277 8.63281C5.71196 8.76349 5.53452 8.83691 5.34961 8.83691H1.16406C0.522213 8.83691 0.000976591 8.31568 0.000976563 7.67383V1.16309C0.000976534 0.521236 0.522213 2.80562e-08 1.16406 0H18.8379Z" fill="#ccc"/>
</svg>`}
                    />
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
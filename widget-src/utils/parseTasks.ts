import { TaskItem } from '../types';

export function parseTasks(inputText: string): TaskItem[] {
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
        isChild: false,
      });
    } else {
      // It's a child task belonging to the previous parent
      parsedTasks.push({
        id: Date.now().toString() + "-" + index,
        text: trimmedLine,
        checked: false,
        isChild: true,
      });
    }
  });

  return parsedTasks;
}

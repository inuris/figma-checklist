import type { TaskItem } from './types';

type LineType = 'numbered' | 'lettered' | 'bulleted' | 'plain';

const NUMBERED_REGEX = /^\d+[/.)]\s+/;
const LETTERED_REGEX = /^[a-zA-Z][.)]\s+/;
const BULLETED_REGEX = /^[•·*-]\s*/;
const INDENTED_REGEX = /^(\t| {2,})/;

function getLineType(trimmedLine: string): LineType {
  if (NUMBERED_REGEX.test(trimmedLine)) return 'numbered';
  if (LETTERED_REGEX.test(trimmedLine)) return 'lettered';
  if (BULLETED_REGEX.test(trimmedLine)) return 'bulleted';
  return 'plain';
}

export function parseTasks(inputText: string): TaskItem[] {
  const lines = inputText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];

  const parentType = getLineType(lines[0].trim());

  return lines.map((line, index) => {
    const trimmedLine = line.trim();
    const isIndented = INDENTED_REGEX.test(line);
    const isParent = !isIndented && getLineType(trimmedLine) === parentType;
    const text = trimmedLine.replace(/ \\ /g, '\n');

    return {
      id: Date.now().toString() + '-' + index,
      text,
      checked: false,
      isChild: !isParent,
    };
  });
}

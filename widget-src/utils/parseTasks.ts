import { TaskItem } from '../types';

type LineType = 'numbered' | 'lettered' | 'bulleted' | 'plain';

// Matches: 1. / 1) / 1/ etc.
const NUMBERED_REGEX = /^\d+[/.)]\s+/;
// Matches: a. / b) / A. etc. (single letter sub-lists)
const LETTERED_REGEX = /^[a-zA-Z][.)]\s+/;
// Matches: • · * - as bullet prefix
const BULLETED_REGEX = /^[•·*\-]\s*/;
// Matches lines indented with a tab or 2+ spaces (before trimming)
const INDENTED_REGEX = /^(\t| {2,})/;

function getLineType(trimmedLine: string): LineType {
  if (NUMBERED_REGEX.test(trimmedLine)) return 'numbered';
  if (LETTERED_REGEX.test(trimmedLine)) return 'lettered';
  if (BULLETED_REGEX.test(trimmedLine)) return 'bulleted';
  return 'plain';
}

export function parseTasks(inputText: string): TaskItem[] {
  // Support both Unix and Windows line endings
  const lines = inputText.split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length === 0) return [];

  // Determine parent type from the first non-empty line (after trimming).
  // Examples:
  //   "1. Task"   → parentType = 'numbered' (numbered lines = parents, rest = children)
  //   "Parent"    → parentType = 'plain'    (plain non-indented lines = parents, rest = children)
  //   "- Task"    → parentType = 'bulleted' (bulleted lines = parents, rest = children)
  const parentType = getLineType(lines[0].trim());

  return lines.map((line, index) => {
    const trimmedLine = line.trim();

    // Indented lines (tab or 2+ leading spaces) are always children,
    // regardless of their content type.
    const isIndented = INDENTED_REGEX.test(line);
    const isParent = !isIndented && getLineType(trimmedLine) === parentType;

    return {
      id: Date.now().toString() + "-" + index,
      text: trimmedLine,
      checked: false,
      isChild: !isParent,
    };
  });
}
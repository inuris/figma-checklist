/**
 * User-visible strings shared by the Figma widget and the web checklist.
 */

export const UI = {
  title: 'Checklist',
  addItems: 'Add Items',
  edit: 'Edit',
  delete: 'Delete',
  deleteCompleted: 'Delete Completed',
  clearAll: 'Clear All',
  emptyLine1: 'Your checklist is empty',
  emptyLine2: 'Start by adding some tasks',
  noTasksYet: 'No tasks yet',
  allTasksDone: (n: number) => `All ${n} tasks completed ✓`,
  progress: (done: number, total: number) => `${done} / ${total} tasks completed`,
  modeTooltipEditLeft: 'Update text, double Enter to split',
  modeTooltipEditRight: 'Check then use ↑ / ↓ to reorder tasks',
  modeTooltipDeleteLeft: 'Click × to delete a task',
  /** Figma tooltip row uses empty right column in delete mode */
  modeTooltipDeleteRight: '',
  exportWindowTitle: 'Export Tasks',
  addModalTitle: 'Start typing or paste your list…',
  addModalLabel: 'Paste tasks below (separate lines)',
  addModalButton: 'Add to Checklist',
  addModalPlaceholder: `# Example #
1. Review design specs
2. Update components
   - Fix button states
   - Check contrast ratios`,
  exportModalLabel: 'Your tasks — select all and copy, or click the button below',
  exportCopy: 'Copy to Clipboard',
  exportCopied: 'Copied!',
  ariaUndo: 'Undo',
  ariaLightMode: 'Light mode',
  ariaDarkMode: 'Dark mode',
  ariaMoveUp: 'Move up',
  ariaMoveDown: 'Move down',
  ariaExport: 'Export',
  ariaMergeUp: 'Merge with task above',
  ariaRemoveTask: 'Remove task',
  ariaMarkComplete: 'Mark complete',
  ariaMarkIncomplete: 'Mark incomplete',
  ariaIndent: 'Indent',
  ariaOutdent: 'Outdent',
  ariaSelectForMove: 'Select for move',
} as const;

export function progressSubtitle(taskCount: number, completedCount: number): string {
  if (taskCount === 0) return UI.noTasksYet;
  if (completedCount === taskCount) return UI.allTasksDone(taskCount);
  return UI.progress(completedCount, taskCount);
}

export function modeTooltipForState(
  isEditing: boolean,
  isRemoving: boolean
): { left: string; right: string } | null {
  if (isEditing) return { left: UI.modeTooltipEditLeft, right: UI.modeTooltipEditRight };
  if (isRemoving) return { left: UI.modeTooltipDeleteLeft, right: UI.modeTooltipDeleteRight };
  return null;
}

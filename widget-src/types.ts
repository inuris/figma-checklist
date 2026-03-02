export interface TaskItem {
  id: string;
  text: string;
  checked: boolean;
  isChild?: boolean;
}

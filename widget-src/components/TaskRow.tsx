const { widget } = figma;
const { AutoLayout, SVG, Input, Text } = widget;

import { TaskItem } from '../types';
import {
  COLOR_ACCENT,
  COLOR_BG,
  COLOR_BORDER,
  COLOR_CHECKBOX_HOVER,
  COLOR_CHECKBOX_UNCHECKED,
  COLOR_EDIT_ACTIVE_BG,
  COLOR_HOVER_BG,
  COLOR_LINK_BORDER,
  COLOR_LINK_HOVER,
  COLOR_PRIMARY,
  COLOR_REMOVE_BTN_BG,
  COLOR_REMOVE_BTN_HOVER,
  COLOR_SHADOW,
  COLOR_SURFACE,
  COLOR_TASK_CHECKED,
  COLOR_TASK_CHILD,
  COLOR_WHITE,
} from '../constants/colors';
import {
  ICON_CHECK,
  ICON_INDENT,
  ICON_LINK,
  ICON_MERGE,
  ICON_OUTDENT,
  ICON_REMOVE,
} from '../constants/icons';
import { extractUrls, formatUrlLabel } from '../utils/parseUrls';

interface TaskRowProps {
  task: TaskItem;
  index: number;
  tasks: TaskItem[];
  isEditing: boolean;
  isRemoving: boolean;
  setTasks: (tasks: TaskItem[]) => void;
}

export function TaskRow({
  task,
  index,
  tasks,
  isEditing,
  isRemoving,
  setTasks,
}: TaskRowProps) {
  return (
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
          left: task.isChild ? 56 : 24,
        }}
        width="fill-parent"
        verticalAlignItems="start"
        spacing={16}
        hoverStyle={{ fill: COLOR_HOVER_BG }}
        overflow="visible"
        fill={COLOR_BG}
      >
        {/* --- Checkbox / Controls --- */}

        {/* Remove Mode: red X button */}
        {isRemoving ? (
          <AutoLayout
            width={20}
            height={20}
            cornerRadius={6}
            fill={COLOR_REMOVE_BTN_BG}
            horizontalAlignItems="center"
            verticalAlignItems="center"
            onClick={() => {
              const copy: TaskItem[] = JSON.parse(JSON.stringify(tasks));
              copy.splice(index, 1);
              setTasks(copy);
            }}
            hoverStyle={{ fill: COLOR_REMOVE_BTN_HOVER }}
          >
            <SVG src={ICON_REMOVE} />
          </AutoLayout>

        ) : !isEditing ? (
          /* Normal Mode: checkbox */
          <AutoLayout
            width={20}
            height={20}
            cornerRadius={6}
            fill={task.checked ? COLOR_ACCENT : COLOR_WHITE}
            stroke={task.checked ? COLOR_ACCENT : COLOR_CHECKBOX_UNCHECKED}
            strokeWidth={1.5}
            horizontalAlignItems="center"
            verticalAlignItems="center"
            onClick={() => {
              const copy: TaskItem[] = JSON.parse(JSON.stringify(tasks));
              const isNowChecked = !copy[index].checked;
              copy[index].checked = isNowChecked;

              if (!copy[index].isChild) {
                // Check/uncheck all immediate children
                for (let i = index + 1; i < copy.length; i++) {
                  if (copy[i].isChild) {
                    copy[i].checked = isNowChecked;
                  } else {
                    break;
                  }
                }
              } else {
                // If all siblings are checked, check the parent too
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
            hoverStyle={!task.checked ? { stroke: COLOR_CHECKBOX_HOVER } : {}}
          >
            {task.checked && <SVG src={ICON_CHECK} />}
          </AutoLayout>

        ) : (
          /* Edit Mode: indent/outdent toggle */
          <AutoLayout
            width={20}
            height={20}
            cornerRadius={6}
            fill={COLOR_SURFACE}
            horizontalAlignItems="center"
            verticalAlignItems="center"
            onClick={() => {
              const copy: TaskItem[] = JSON.parse(JSON.stringify(tasks));
              copy[index].isChild = !copy[index].isChild;
              setTasks(copy);
            }}
            hoverStyle={{ fill: COLOR_BORDER }}
          >
            <SVG src={task.isChild ? ICON_OUTDENT : ICON_INDENT} />
          </AutoLayout>
        )}

        {/* Task Text + URL chips */}
        <AutoLayout direction="vertical" width="fill-parent" spacing={6}>

          {/* Text: display-only in view mode, editable Input in edit mode */}
          {isEditing ? (
            <Input
              value={task.text}
              onTextEditEnd={(e) => {
                const copy: TaskItem[] = JSON.parse(JSON.stringify(tasks));
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
              fill={task.checked ? COLOR_TASK_CHECKED : task.isChild ? COLOR_TASK_CHILD : COLOR_PRIMARY}
              textDecoration={task.checked ? "strikethrough" : "none"}
              width="fill-parent"
              inputBehavior="multiline"
            />
          ) : (
            <Text
              fontSize={15}
              fontWeight={!task.isChild ? 'semi-bold' : 'normal'}
              fontFamily="Inter"
              fill={task.checked ? COLOR_TASK_CHECKED : task.isChild ? COLOR_TASK_CHILD : COLOR_PRIMARY}
              textDecoration={task.checked ? "strikethrough" : "none"}
              width="fill-parent"
            >
              {task.text}
            </Text>
          )}

          {/* URL chips — shown whenever URLs are detected in the task text */}
          {extractUrls(task.text).map((url) => (
            <AutoLayout
              key={url}
              direction="horizontal"
              spacing={5}
              verticalAlignItems="center"
              padding={{ vertical: 3, horizontal: 8 }}
              cornerRadius={6}
              fill={COLOR_EDIT_ACTIVE_BG}
              stroke={COLOR_LINK_BORDER}
              strokeWidth={1}
              hoverStyle={{ fill: COLOR_LINK_HOVER }}
            >
              <Text
                fontSize={12}
                fontFamily="Inter"
                fill={COLOR_ACCENT}
                textDecoration="underline"
                href={url}
              >
                {formatUrlLabel(url)}
              </Text>
              <SVG src={ICON_LINK} />
            </AutoLayout>
          ))}

        </AutoLayout>

        {/* Merge Up button (edit mode only, not first item) */}
        {isEditing && index > 0 && (
          <AutoLayout
            positioning="absolute"
            x={{ type: 'right', offset: 12 }}
            y={{ type: 'top', offset: -13 }}
            padding={6}
            cornerRadius={100}
            fill={COLOR_WHITE}
            stroke={COLOR_BORDER}
            effect={{
              type: "drop-shadow",
              color: COLOR_SHADOW,
              offset: { x: 0, y: 2 },
              blur: 4,
            }}
            hoverStyle={{ fill: COLOR_HOVER_BG }}
            onClick={() => {
              const copy: TaskItem[] = JSON.parse(JSON.stringify(tasks));
              copy[index - 1].text += "\n" + copy[index].text;
              copy.splice(index, 1);
              setTasks(copy);
            }}
          >
            <SVG src={ICON_MERGE} />
          </AutoLayout>
        )}
      </AutoLayout>
    </AutoLayout>
  );
}

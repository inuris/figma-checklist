const { widget } = figma;
const { AutoLayout, SVG, Input, Text } = widget;

import { TaskItem } from '../types';
import { getTheme } from '../utils/theme';
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
  isDark: boolean;
  setTasks: (tasks: TaskItem[]) => void;
}

export function TaskRow({
  task,
  index,
  tasks,
  isEditing,
  isRemoving,
  isDark,
  setTasks,
}: TaskRowProps) {
  const t = getTheme(isDark);
  return (
    <AutoLayout
      key={task.id}
      direction="vertical"
      width="fill-parent"
      overflow="visible"
      name="TaskRow"
    >
      {/* Separator */}
      {index > 0 && (
        <AutoLayout width="fill-parent" height={1} fill={t.border} opacity={0.5} name="Separator" />
      )}

      <AutoLayout
        name="TaskRowContent"
        padding={{
          top: 16,
          bottom: 16,
          right: 24,
          left: task.isChild ? 56 : 24,
        }}
        width="fill-parent"
        verticalAlignItems="start"
        spacing={16}
        hoverStyle={{ fill: t.bgHover }}
        overflow="visible"
        fill={t.bg}
      >
        {/* --- Checkbox / Controls --- */}

        {/* Remove Mode: red X button */}
        {isRemoving ? (
          <AutoLayout
            name="RemoveButton"
            width={20}
            height={20}
            cornerRadius={6}
            fill={t.removeBtnBg}
            horizontalAlignItems="center"
            verticalAlignItems="center"
            onClick={() => {
              const copy: TaskItem[] = tasks.map(t => ({ ...t }));
              copy.splice(index, 1);
              setTasks(copy);
            }}
            hoverStyle={{ fill: t.removeBtnHover }}
          >
            <SVG name="RemoveIcon" src={ICON_REMOVE} />
          </AutoLayout>

        ) : !isEditing ? (
          /* Normal Mode: checkbox */
          <AutoLayout
            name="Checkbox"
            width={20}
            height={20}
            cornerRadius={6}
            fill={task.checked ? t.accent : t.checkboxBg}
            stroke={task.checked ? t.accent : t.checkboxUnchecked}
            strokeWidth={1.5}
            horizontalAlignItems="center"
            verticalAlignItems="center"
            onClick={() => {
              const copy: TaskItem[] = tasks.map(t => ({ ...t }));
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
            hoverStyle={!task.checked ? { stroke: t.checkboxHover } : {}}
          >
            {task.checked && <SVG name="CheckboxIcon" src={ICON_CHECK} />}
          </AutoLayout>

        ) : (
          /* Edit Mode: indent/outdent toggle */
          <AutoLayout
            name="IndentToggle"
            width={20}
            height={20}
            cornerRadius={6}
            fill={t.surface}
            horizontalAlignItems="center"
            verticalAlignItems="center"
            onClick={() => {
              const copy: TaskItem[] = tasks.map(t => ({ ...t }));
              copy[index].isChild = !copy[index].isChild;
              setTasks(copy);
            }}
            hoverStyle={{ fill: t.border }}
          >
            <SVG name="IndentToggleIcon" src={task.isChild ? ICON_OUTDENT : ICON_INDENT} />
          </AutoLayout>
        )}

        {/* Task Text + URL chips */}
        <AutoLayout direction="vertical" width="fill-parent" spacing={6} name="TaskTextAndUrlChips">

          {/* Text: display-only in view mode, editable Input in edit mode */}
          {isEditing ? (
            <Input
              name="TaskTextInput"
              value={task.text}
              onTextEditEnd={(e) => {
                const copy: TaskItem[] = tasks.map(t => ({ ...t }));
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
              fill={task.checked ? t.taskChecked : task.isChild ? t.taskChild : t.primary}
              textDecoration={task.checked ? "strikethrough" : "none"}
              width="fill-parent"
              inputBehavior="multiline"
            />
          ) : (
            <Text
              name="TaskText"
              fontSize={15}
              fontWeight={!task.isChild ? 'semi-bold' : 'normal'}
              fontFamily="Inter"
              fill={task.checked ? t.taskChecked : task.isChild ? t.taskChild : t.primary}
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
              name="UrlChip"
              direction="horizontal"
              spacing={5}
              verticalAlignItems="center"
              padding={{ vertical: 3, horizontal: 8 }}
              cornerRadius={6}
              fill={t.editActiveBg}
              stroke={t.linkBorder}
              strokeWidth={1}
              hoverStyle={{ fill: t.linkHover }}
            >
              <Text
                name="UrlChipText"
                fontSize={12}
                fontFamily="Inter"
                fill={t.accent}
                textDecoration="underline"
                href={url}
              >
                {formatUrlLabel(url)}
              </Text>
              <SVG name="LinkIcon" src={ICON_LINK} />
            </AutoLayout>
          ))}

        </AutoLayout>

        {/* Merge Up button (edit mode only, not first item) */}
        {isEditing && index > 0 && (
          <AutoLayout
            name="MergeUpButton"
            positioning="absolute"
            x={{ type: 'right', offset: 12 }}
            y={{ type: 'top', offset: -13 }}
            padding={6}
            cornerRadius={100}
            fill={t.floatBtn}
            stroke={t.border}
            effect={{
              type: "drop-shadow",
              color: t.shadow,
              offset: { x: 0, y: 2 },
              blur: 4,
            }}
            hoverStyle={{ fill: t.floatBtnHover }}
            onClick={() => {
              const copy: TaskItem[] = tasks.map(t => ({ ...t }));
              copy[index - 1].text += "\n" + copy[index].text;
              copy.splice(index, 1);
              setTasks(copy);
            }}
          >
            <SVG name="MergeUpIcon" src={ICON_MERGE} />
          </AutoLayout>
        )}
      </AutoLayout>
    </AutoLayout>
  );
}

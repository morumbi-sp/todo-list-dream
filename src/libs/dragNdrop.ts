import { ITodo } from '../App';

export function changeArrayItem(
  arr: ITodo[],
  draggedItem: number,
  targetIndex: number
): ITodo[] {
  const excludedValue = arr.splice(draggedItem, 1)[0];

  arr.splice(targetIndex, 0, excludedValue);

  return arr;
}

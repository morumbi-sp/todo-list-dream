import { FaTrashAlt } from 'react-icons/fa';
import { IoIosFlag } from 'react-icons/io';
import { ITodo } from '../App';
import { DraggableProvidedDraggableProps } from 'react-beautiful-dnd';

interface Props {
  item: ITodo;
  onDeleteTodo: (id: string) => void;
  onChangeStatus: (id: string, e: React.BaseSyntheticEvent) => void;
  onChangeFlag: (id: string, e: React.BaseSyntheticEvent) => void;
  drag?: boolean;
  refData?: any;
  draggableProps?: any;
  dragHandleProps?: any;
}

export default function TodoItem({
  item,
  onDeleteTodo,
  onChangeStatus,
  onChangeFlag,
  drag,
  refData,
  draggableProps,
  dragHandleProps,
}: Props) {
  return (
    <div
      {...draggableProps}
      ref={refData}
      className='flex items-center justify-between'
    >
      <div className='flex items-center space-x-2 truncate'>
        <input
          type='checkbox'
          className='h-4 w-4'
          onChange={(e: React.BaseSyntheticEvent) => onChangeStatus(item.id, e)}
          checked={item.status === 'complete'}
        />
        <span className='truncate text-light-text dark:text-dark-text'>
          {item.text}
        </span>
      </div>
      {drag ? (
        <div
          {...dragHandleProps}
          className='rounded-md bg-gray-500 px-3 py-[2px] text-sm text-white'
        >
          DRAG
        </div>
      ) : (
        <div className='flex space-x-4'>
          <button
            className={`flex aspect-square h-6 items-center justify-center rounded-full ${
              item.status === 'flag'
                ? 'bg-red-500 dark:bg-orange-600'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            onClick={(e: React.BaseSyntheticEvent) => onChangeFlag(item.id, e)}
          >
            <IoIosFlag
              className={`text-sm  ${
                item.status === 'flag'
                  ? 'text-dark-text dark:text-light-text'
                  : 'text-light-text dark:text-dark-text'
              }`}
            />
          </button>
          <button
            className='flex aspect-square h-6 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600'
            onClick={() => onDeleteTodo(item.id)}
          >
            <FaTrashAlt className='text-sm text-light-text dark:text-dark-text' />
          </button>
        </div>
      )}
    </div>
  );
}

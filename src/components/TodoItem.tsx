import { FaTrashAlt } from 'react-icons/fa';
import { IoIosFlag } from 'react-icons/io';
import { ITodo } from '../App';

interface Props {
  item: ITodo;
  onDeleteTodo: (id: string) => void;
  onChangeStatus: (id: string, e: React.BaseSyntheticEvent) => void;
  onChangeFlag: (id: string, e: React.BaseSyntheticEvent) => void;
}

export default function TodoItem({
  item,
  onDeleteTodo,
  onChangeStatus,
  onChangeFlag,
}: Props) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center space-x-2'>
        <input
          type='checkbox'
          className='h-4 w-4'
          onChange={(e: React.BaseSyntheticEvent) => onChangeStatus(item.id, e)}
          checked={item.status === 'completed'}
        />
        <span className='text-light-text dark:text-dark-text'>{item.text}</span>
      </div>
      <div className='flex space-x-4'>
        <button
          className={`flex aspect-square h-6 items-center justify-center rounded-full ${
            item.flag
              ? 'bg-red-500 dark:bg-orange-600'
              : 'bg-gray-300 dark:bg-gray-600'
          }`}
          onClick={(e: React.BaseSyntheticEvent) => onChangeFlag(item.id, e)}
        >
          <IoIosFlag
            className={`text-sm  ${
              item.flag
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
    </div>
  );
}

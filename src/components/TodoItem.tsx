import { FaTrashAlt } from 'react-icons/fa';

interface Props {
  item: string;
  id: string;
  status: string;
  onDeleteTodo: (id: string) => void;
  onChangeStatus: (id: string, e: React.BaseSyntheticEvent) => void;
}

export default function TodoItem({
  id,
  item,
  onDeleteTodo,
  onChangeStatus,
  status,
}: Props) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center space-x-2'>
        <input
          type='checkbox'
          className='h-4 w-4'
          onChange={(e: React.BaseSyntheticEvent) => onChangeStatus(id, e)}
          checked={status === 'completed'}
        />
        <span className='text-light-text dark:text-dark-text'>{item}</span>
      </div>
      <button
        className='flex aspect-square h-6 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600'
        onClick={() => onDeleteTodo(id)}
      >
        <FaTrashAlt className='text-sm text-light-text dark:text-dark-text' />
      </button>
    </div>
  );
}

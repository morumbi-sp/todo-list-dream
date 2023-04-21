import { FaTrashAlt } from 'react-icons/fa';

interface Props {
  item: string;
}

export default function TodoItem({ item }: Props) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center space-x-2'>
        <input type='checkbox' className='h-4 w-4' />
        <span className='text-light-text dark:text-dark-text'>{item}</span>
      </div>
      <button className='flex aspect-square h-6 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600'>
        <FaTrashAlt className='text-sm text-light-text dark:text-dark-text' />
      </button>
    </div>
  );
}

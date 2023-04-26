import React, { useState } from 'react';

interface Props {
  onAddTodo: (data: string) => void;
  toggleDragMode: () => void;
  dragMode: boolean;
}

export default function Footer({ onAddTodo, toggleDragMode, dragMode }: Props) {
  const [todoText, setTodoText] = useState('');
  const handleChange = (event: React.BaseSyntheticEvent) => {
    setTodoText(event.target.value);
  };
  return (
    <div className='flex justify-center bg-light-200 px-5 py-5 dark:bg-dark-200'>
      <form
        className='flex w-full justify-between'
        onSubmit={() => {
          onAddTodo(todoText);
          setTodoText('');
        }}
      >
        <input
          type='text'
          className=' w-full rounded-l-lg border-transparent'
          placeholder='Add Todo'
          value={todoText}
          onChange={handleChange}
          required
          onFocus={dragMode ? toggleDragMode : undefined}
        />
        <button
          className='w-28 rounded-r-lg bg-light-accent text-lg font-semibold text-dark-text dark:bg-dark-accent'
          type='submit'
        >
          Add
        </button>
      </form>
    </div>
  );
}

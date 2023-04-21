import React from 'react';
import TodoItem from './TodoItem';

export default function MainBoard() {
  return (
    <div className='min-h-[300px] space-y-4 bg-light-100 px-5 py-5 dark:bg-dark-100'>
      {['Study React', 'Work out', 'visit park', 'eat stake'].map(
        (item, idx) => (
          <TodoItem key={idx} item={item} />
        )
      )}
    </div>
  );
}

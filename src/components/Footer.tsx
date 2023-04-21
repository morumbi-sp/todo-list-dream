import React from 'react';

export default function Footer() {
  return (
    <div className='flex justify-center bg-light-200 px-5 py-5 dark:bg-dark-200'>
      <form className='flex w-full justify-between'>
        <input
          type='text'
          className=' w-full rounded-l-lg border-transparent'
          placeholder='Add Todo'
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

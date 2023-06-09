import React from 'react';
import { BsFillMoonFill } from 'react-icons/bs';
import { MdSunny } from 'react-icons/md';
import { RiDragMove2Fill } from 'react-icons/ri';
import NavButton from './NavButton';

interface Props {
  toggleDarkMode: () => void;
  toggleDragMode: () => void;
  darkMode: boolean;
  dragMode: boolean;
  onNavMenu: (event: React.BaseSyntheticEvent) => void;
  navMenu: string;
}

export default function NavBar({
  toggleDarkMode,
  toggleDragMode,
  darkMode,
  dragMode,
  onNavMenu,
  navMenu,
}: Props) {
  return (
    <div className='border-b border-gray-300 bg-light-200 py-4 text-light-accent dark:border-gray-600 dark:bg-dark-200 dark:text-dark-accent'>
      <div className='w-full border-b  border-gray-300'>
        <div className=' px-5 pb-3 text-center text-2xl  font-semibold'>
          Shion's Todo List
        </div>
      </div>
      <div className=' flex items-center justify-between px-5 pt-3'>
        {/* <div>
          <button className='pt-2 text-xl' onClick={toggleDarkMode}>
            {darkMode ? <MdSunny /> : <BsFillMoonFill />}
          </button>
        </div> */}

        <div className='flex items-center justify-between space-x-4 font-semibold'>
          {dragMode ? (
            <span className=' text-lg font-normal'> Move your todo</span>
          ) : (
            <>
              <NavButton
                handleNavMenu={onNavMenu}
                title='all'
                active={navMenu}
              />
              <NavButton
                handleNavMenu={onNavMenu}
                title='active'
                active={navMenu}
              />
              <NavButton
                handleNavMenu={onNavMenu}
                title='completed'
                active={navMenu}
              />
            </>
          )}
        </div>

        <button
          className={`mt-1 flex aspect-square h-[24px] items-center justify-center rounded-full text-lg text-white ${
            dragMode ? 'bg-light-accent' : 'e bg-gray-400'
          }`}
          onClick={toggleDragMode}
        >
          <RiDragMove2Fill />
        </button>
      </div>
    </div>
  );
}

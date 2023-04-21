import React, { useState } from 'react';
import { BsFillMoonFill } from 'react-icons/bs';
import { MdSunny } from 'react-icons/md';
import NavButton from './NavButton';

interface Props {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

export default function NavBar({ toggleDarkMode, darkMode }: Props) {
  const [navMenu, setNavMenu] = useState<'all' | 'active' | 'completed'>('all');

  const handleNavMenu = (event: React.BaseSyntheticEvent) => {
    setNavMenu(event.target.name);
  };

  return (
    <div className=' flex items-center justify-between border-b border-gray-300 bg-light-200 px-5 py-4 text-light-accent dark:border-gray-600 dark:bg-dark-200 dark:text-dark-accent'>
      <div>
        <button className='pt-2 text-xl' onClick={toggleDarkMode}>
          {darkMode ? <MdSunny /> : <BsFillMoonFill />}
        </button>
      </div>
      <div className='flex items-center justify-between space-x-4 font-semibold'>
        <NavButton handleNavMenu={handleNavMenu} title='all' active={navMenu} />
        <NavButton
          handleNavMenu={handleNavMenu}
          title='active'
          active={navMenu}
        />
        <NavButton
          handleNavMenu={handleNavMenu}
          title='completed'
          active={navMenu}
        />
      </div>
    </div>
  );
}

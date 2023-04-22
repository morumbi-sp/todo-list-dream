import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  handleNavMenu: (e: React.BaseSyntheticEvent) => void;
  title: string;
  active: string;
}

export default function NavButton({ handleNavMenu, title, active }: Props) {
  return (
    <div className='relative'>
      <button className={`capitalize `} name={title} onClick={handleNavMenu}>
        {title}
      </button>
      {active === title && (
        <motion.div
          layoutId='bar'
          className='absolute w-full border-b-2 border-light-text dark:border-dark-text'
        ></motion.div>
      )}
    </div>
  );
}

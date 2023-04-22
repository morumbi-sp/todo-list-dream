import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  darkMode: boolean;
}

export default function BackBoard({ children, darkMode }: Props) {
  return (
    <div className={`${darkMode && 'dark'} mx-auto mt-10 max-w-sm  px-4`}>
      <div className='overflow-hidden rounded-2xl shadow-xl'> {children}</div>
    </div>
  );
}

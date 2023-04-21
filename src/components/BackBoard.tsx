import React, { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
  darkMode: boolean;
}

export default function BackBoard({ children, darkMode }: Props) {
  return (
    <div
      className={`${
        darkMode && 'dark'
      } mx-auto mt-10 min-h-[400px] max-w-sm overflow-hidden rounded-2xl `}
    >
      {children}
    </div>
  );
}

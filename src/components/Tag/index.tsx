'use client';

import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
  initialState?: boolean;
  customStyle?: string;
  onClickFunc?: any;
}

const STYLE = {
  selected: 'text-white bg-black',
  default: 'text-black bg-gray-5',
};

function Tag({ children, initialState = false, customStyle = '', onClickFunc }: Props) {
  const [isSelected, setIsSelected] = useState(initialState);
  const style = ['py-[10px] rounded-lg text-14 font-400', STYLE[isSelected ? 'selected' : 'default'], customStyle].join(' ');

  const handleTagClick = () => {
    setIsSelected((prev) => !prev);
    if (onClickFunc) onClickFunc();
  };

  useEffect(() => {
    setIsSelected(initialState);
  }, [initialState]);

  return (
    <button type="button" onClick={handleTagClick} className={style}>
      {children}
    </button>
  );
}

export default Tag;

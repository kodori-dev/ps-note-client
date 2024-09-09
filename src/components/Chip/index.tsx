import { ReactNode } from 'react';

interface Props {
  type: 'AC' | 'WA';
  children?: ReactNode;
}

/**
 * 문제 채점 결과 chip
 */
function Chip({ type, children = 'Solved' }: Props) {
  const style =
    'px-3 h-[17px] text-gray-2 rounded-sm text-12 bg-opacity-30 flex justify-center w-fit min-w-[46px]' +
    ` ${type === 'AC' ? 'bg-chip-green' : 'bg-chip-red'}`;

  return <span className={style}>{children}</span>;
}

export default Chip;

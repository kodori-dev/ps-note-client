import { ReactNode } from 'react';

interface Props {
  type: 'AC' | 'WA' | 'ETC';
  children?: ReactNode;
}

/**
 * 문제 채점 결과 chip
 */
function Chip({ type, children = 'Solved' }: Props) {
  const style =
    'px-3 h-[17px] text-gray-2 rounded-sm text-12 bg-opacity-30 flex justify-center' +
    ` ${type === 'AC' ? 'bg-chip-green' : type === 'WA' ? 'bg-chip-red' : 'bg-chip-yellow'}`;

  return <span className={style}>{children}</span>;
}

export default Chip;

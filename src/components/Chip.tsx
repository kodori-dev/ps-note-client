interface Props {
  type: 'AC' | 'WA';
}

function Chip({ type }: Props) {
  const style = 'w-[43px] h-[17px] text-gray-2 rounded-sm text-12 bg-opacity-30 flex justify-center' + ` ${type === 'AC' ? 'bg-chip-green' : 'bg-chip-red'}`;

  return <div className={style}>{type}</div>;
}

export default Chip;

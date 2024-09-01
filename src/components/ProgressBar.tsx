const PROGRESS_SIZE = {
  0: 'w-0',
  1: 'w-1/5',
  2: 'w-2/5',
  3: 'w-3/5',
  4: 'w-4/5',
  5: 'w-full',
};
interface Props {
  sols: '0' | '1' | '2' | '3' | '4' | '5';
}

const ProgressBar = ({ sols }: Props) => {
  const style = PROGRESS_SIZE[sols] + ' h-4 rounded-full bg-primary';

  return (
    <div className="relative h-4 w-full rounded-full bg-gray-5">
      <p className={['absolute -top-5 text-14 text-primary text-end', PROGRESS_SIZE[sols]].join(' ')}>{sols}</p>
      <div className={style} />
    </div>
  );
};

export default ProgressBar;

const PROGRESS_SIZE = {
  1: 'w-1/5',
  2: 'w-2/5',
  3: 'w-3/5',
  4: 'w-4/5',
  5: 'w-full',
};
interface Props {
  sols: '1' | '2' | '3' | '4' | '5';
}

const ProgressBar = ({ sols }: Props) => {
  const style = PROGRESS_SIZE[sols] + ' h-4 rounded-full bg-primary';

  return (
    <div className="h-4 w-full rounded-full bg-gray-5">
      <div className={style} />
    </div>
  );
};

export default ProgressBar;

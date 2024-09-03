import { STEP } from '@/constants/level';
import { LevelType } from '@/types/api/problem';

interface Props {
  type: LevelType;
  step?: 1 | 2 | 3 | 4 | 5;
  style?: 'mini' | 'default';
}

const STYLE = {
  unrated: 'bg-black/25 text-black',
  bronze: 'bg-chip-bronze/25 text-chip-bronze',
  silver: 'bg-chip-silver/25 text-chip-silver',
  gold: 'bg-chip-gold/25 text-chip-gold',
  platinum: 'bg-chip-platinum/25 text-chip-platinum',
  diamond: 'bg-chip-diamond/25 text-chip-diamond',
  ruby: 'bg-chip-ruby/25 text-chip-ruby',
};

function LevelChip({ type, step, style = 'default' }: Props) {
  return (
    <span className={'py-1 px-2 rounded-sm ' + STYLE[type] + (style === 'mini' ? ' text-12 py-0 w-fit' : '')}>
      {type.charAt(0).toUpperCase()}
      {type.slice(1)} {step && STEP[step]}
    </span>
  );
}

export default LevelChip;

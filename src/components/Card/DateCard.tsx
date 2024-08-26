interface Props {
  day: number;
  date: number;
  isHoliday?: boolean;
  isToday?: boolean;
}

const DAY_STRING = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DATE_STYLE = {
  default: 'text-gray-1',
  today: 'text-primary',
  holiday: 'text-red',
  defaultDay: 'text-gray-3',
};

function DateCard({ day, date, isHoliday = false, isToday = false }: Props) {
  return (
    <div className="w-[172px] h-[100px] flex gap-4 items-center rounded-md hover:shadow-lg px-4 py-7">
      <p className={['text-20 font-700', DATE_STYLE[isHoliday ? 'holiday' : isToday ? 'today' : 'default']].join(' ')}>{date}</p>
      <p className={['text-40 font-700 text-center', DATE_STYLE[isHoliday ? 'holiday' : isToday ? 'today' : 'defaultDay']].join(' ')}>{DAY_STRING[day]}</p>
    </div>
  );
}

export default DateCard;

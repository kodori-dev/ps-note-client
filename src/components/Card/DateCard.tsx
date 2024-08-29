interface Props {
  day: number;
  date: number;
  isHoliday?: boolean;
  isToday?: boolean;
  holidayName?: string;
}

const DAY_STRING = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DATE_STYLE = {
  default: 'text-gray-1',
  today: 'text-primary',
  holiday: 'text-red',
  defaultDay: 'text-gray-3',
};

function DateCard({ day, date, isHoliday = false, isToday = false, holidayName }: Props) {
  return (
    <div className="relative w-[172px] h-[100px] shrink-0 flex gap-4 items-center rounded-md px-4 py-7">
      <p className={['text-20 font-700', DATE_STYLE[isHoliday ? 'holiday' : isToday ? 'today' : 'default']].join(' ')}>{date}</p>
      <p className={['text-40 font-700 text-center', DATE_STYLE[isHoliday ? 'holiday' : isToday ? 'today' : 'defaultDay']].join(' ')}>{DAY_STRING[day]}</p>
      {(isHoliday || isToday) && <p className="absolute text-gray-3 left-4 bottom-2 text-center">{isToday ? 'today✨' : holidayName}</p>}
    </div>
  );
}

export default DateCard;

import Link from 'next/link';
import LinkIcon from '../../../../../public/icon-link-arrow.svg';
import Chip from '@/components/Chip';

interface Props {
  number: string;
  title: string;
  isCorrectAnswer: boolean;
  answerLabel: string;
  problemId: number;
}

function ProblemSection({ number, title, problemId, isCorrectAnswer, answerLabel }: Props) {
  return (
    <section className="flex flex-col gap-1">
      <div className="flex gap-2 items-center">
        <div className="relative text-gray-2 text-24 ">{number}</div>
        <Chip type={isCorrectAnswer ? 'AC' : 'WA'}>{answerLabel}</Chip>
      </div>
      <Link href={`/problem/${problemId}`} className="group relative w-fit hover:text-primary">
        <h1 className="text-40 font-700 border-b border-gray-3">{title}</h1>
        <LinkIcon fill="#ACACAC" className="absolute top-3 -right-3" />
      </Link>
    </section>
  );
}

export default ProblemSection;

import Link from "next/link";
import Chip from "@/components/Chip";
import { OJ_TYPE_STRING } from "@/constants/ojType";

interface Props {
  number: string;
  title: string;
  isCorrectAnswer: boolean;
  answerLabel: string;
  problemId: number;
  type: string;
}

function ProblemSection({ type, number, title, problemId, isCorrectAnswer, answerLabel }: Props) {
  return (
    <section className="flex flex-col gap-1">
      <div className="flex gap-2 items-center">
        <div className="relative text-gray-2">
          #{OJ_TYPE_STRING[type]} #{number}
        </div>
        <Chip type={isCorrectAnswer ? "AC" : "WA"}>{answerLabel}</Chip>
      </div>
      <h1 className="text-40 font-700">{title}</h1>
      {/* <Link href={`/problem/${problemId}`} className="group relative w-fit hover:text-primary">
        <h1 className="text-40 font-700">{title}</h1>
      </Link> */}
    </section>
  );
}

export default ProblemSection;

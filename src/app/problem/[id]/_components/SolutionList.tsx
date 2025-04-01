import Chip from "@/components/Chip";
import Link from "next/link";
import { Spinner } from "@chakra-ui/react";
import { SolutionSchema } from "../../../../../models";
import dayjs from "dayjs";

interface Props {
  solutions: SolutionSchema[];
}

const CATEGORY = ["제출일", "채점 결과", "언어", "사람", "백준 연동 여부"];

function SolutionList({ solutions }: Props) {
  return (
    <div>
      <div className="grid grid-cols-5 gap-1 border-b border-gray-3 pb-1 px-3 mb-3">
        {CATEGORY.map((category) => (
          <p key={category} className="text-gray-3">
            {category}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {solutions?.map((solution) => (
          <Link href={`/solution/${solution.id}`} key={solution.id}>
            <div className="grid grid-cols-5 gap-1 items-center px-3 py-5 border rounded-sm border-gray-4 hover:opacity-50">
              <p className="text-gray-2 text-14">{dayjs(solution.submitted_at).format("YYYY-MM-DD")}</p>
              <Chip type={solution.is_correct_answer ? "AC" : "WA"}>{solution.score_label}</Chip>
              <p>{solution.source_lang}</p>
              <p>{solution.member.nickname}</p>
              <div className="group relative flex items-center z-star">
                {solution.is_boj_verified === null ? (
                  <Spinner color="blue.200" size="md" borderWidth="3px" />
                ) : (
                  <input className="w-4 h-4 cursor-pointer" type="checkbox" defaultChecked={solution.is_boj_verified} readOnly />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SolutionList;

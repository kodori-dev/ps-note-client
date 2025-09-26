import Chip from "@/components/Chip";
import LevelChip from "@/components/Chip/LevelChip";
import Link from "next/link";
import GoodIcon from "../../../../../public/icon-problem-good.svg";
import LevelIcon from "../../../../../public/icon-problem-level.svg";
import ListIcon from "../../../../../public/icon-problem-list.svg";
import LinkIcon from "../../../../../public/icon-link-arrow.svg";
import Button from "@/components/Button";
import { LevelType } from "@/types/problem";
import { ProblemTagSchema } from "../../../../../types/models/data-contracts";
import { OJ_TYPE_STRING } from "@/constants/ojType";

interface Props {
  id: number;
  ojId: string;
  isSolved?: "AC" | "WA" | null;
  title: string;
  level: string;
  isStar?: boolean;
  stars: number;
  tags: ProblemTagSchema[];
  ojType: string;
}

function ProblemInfo({ id, ojId, isSolved = null, title, level, isStar = false, stars, tags, ojType }: Props) {
  const INFO_GRID = [
    { icon: <GoodIcon fill="#ACACAC" />, head: "이 문제를 찜한 사람", body: <p className="text-20">{stars}</p> },
    {
      icon: <LevelIcon fill="#ACACAC" />,
      head: "난이도",
      body: <LevelChip level={level} />,
    },
    {
      icon: <ListIcon fill="#ACACAC" />,
      head: "문제 분류",
      body: (
        <div className="flex gap-2 flex-wrap justify-center w-[320px]">
          {tags.map(({ id, name }) => (
            <span key={id} className="py-1 px-2 bg-gray-4/60 rounded-sm">
              {name}
            </span>
          ))}
        </div>
      ),
    },
  ];

  const OJ_LINK = {
    boj: "https://www.acmicpc.net/problem",
    programmers: "https://school.programmers.co.kr/learn/courses/30/lessons",
  };

  return (
    <div className="relative">
      <Link href={`/post?id=${id}&oj_id=${ojId} - ${title}`}>
        <Button heightSize="sm" roundSize="sm" customStyle="px-4 absolute top-0 right-0">
          이 문제 바로 체크인하기
        </Button>
      </Link>

      <div className="flex gap-5 items-center">
        <Link
          title="문제 링크로 이동"
          aria-label="클릭 시 프로그래머스 링크로 이동"
          target="_blank"
          href={`${OJ_LINK[ojType]}/${ojId}`}
          className="group relative hover:text-black text-gray-2 border-b border-gray-3"
        >
          {OJ_TYPE_STRING[ojType]}({ojId})
          <LinkIcon fill="#ACACAC" className="absolute top-[6px] -right-3" />
        </Link>
        {isSolved && <Chip type={isSolved} />}
      </div>

      <h1 className="text-40 font-700 mt-2 mb-8">{title}</h1>

      <div className="grid grid-cols-3">
        {INFO_GRID.map(({ icon, head, body }) => (
          <div key={head} className="flex flex-col gap-2 items-center">
            {icon}
            <p className="text-gray-3">{head}</p>
            {body}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProblemInfo;

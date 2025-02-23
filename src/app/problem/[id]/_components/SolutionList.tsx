'use client';
import Chip from '@/components/Chip';
import { Fragment } from 'react';
import Link from 'next/link';
import { Spinner } from '@chakra-ui/react';
import { useClientFlag } from '@/hooks/useClientFlag';
import { SolutionSchema } from '../../../../../models';
import dayjs from 'dayjs';

interface Props {
  solutions: SolutionSchema[];
}

const CATEGORY = [
  '제출일',
  '채점 결과',
  '언어',
  '사람',
  '백준 연동 여부',
  '풀이 보기',
];

function SolutionList({ solutions }: Props) {
  const isClient = useClientFlag();

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-6 gap-1 border-b border-gray-3 pb-1">
        {CATEGORY.map((category) => (
          <p key={category} className=" text-gray-3">
            {category}
          </p>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {solutions?.map((solution) => (
          <Fragment key={solution.id}>
            <div className="grid grid-cols-6 items-center gap-1">
              <p className="text-gray-2 text-14">
                {dayjs(solution.submitted_at).format('YYYY-MM-DD')}
              </p>
              <Chip type={solution.is_correct_answer ? 'AC' : 'WA'}>
                {solution.score_label}
              </Chip>
              <p>{solution.source_lang}</p>
              <Link
                target="_blank"
                href={`https://www.acmicpc.net/user/${solution.member.boj_id}`}
              >
                {solution.member.nickname}
              </Link>
              <Link
                target="_blank"
                href={`https://www.acmicpc.net/source/${solution.boj_solution_id}`}
                className="group relative flex items-center z-star"
              >
                {solution.is_boj_verified === null ? (
                  <Spinner color="blue.200" size="md" borderWidth="3px" />
                ) : (
                  <input
                    className="w-4 h-4 cursor-pointer"
                    type="checkbox"
                    defaultChecked={solution.is_boj_verified}
                    readOnly
                  />
                )}
                <span className="hidden group-hover:inline-block text-12 absolute whitespace-nowrap -right-11 top-0 px-2 py-[2px] bg-black/30 text-white rounded-md">
                  클릭하면 풀이 내역으로 이동해요
                </span>
              </Link>
              <Link
                href={`/solution/${solution.id}`}
                className="flex items-center"
              >
                {/* {isClient && <ChevronRightIcon boxSize={6} />} */}
                {isClient && '>'}
              </Link>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default SolutionList;

'use client';

import Chip from '@/components/Chip';
import CommentIcon from '../../../../../public/icon-sol-comment.svg';
import CodeIcon from '../../../../../public/icon-sol-code.svg';
import { LanguageType, SolutionType } from '@/types/api/solution';
import { Fragment, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import MDEditor from '@uiw/react-md-editor';
import { LANGUAGE_FOR_MD } from '@/constants/language';
import Link from 'next/link';

interface Props {
  solutions: SolutionType[];
}

const CATEGORY = ['날짜', '풀이 결과', '언어', '사람', '백준 연동 여부', '풀이 보기'];

function SolutionList({ solutions }: Props) {
  const [selected, setSelected] = useState(-1);

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
        {solutions.map((solution) => (
          <Fragment key={solution.id}>
            <div className="grid grid-cols-6 items-center gap-1">
              <p className="text-gray-2 text-14">{solution.submitted_at}</p>
              <Chip type={solution.is_correct_answer ? 'AC' : 'WA'} />
              <p>{solution.source_lang}</p>
              <Link passHref href={`https://www.acmicpc.net/user/${solution.member.boj_id}`}>
                {solution.member.nickname}
              </Link>
              <Link href={`https://www.acmicpc.net/source/${solution.boj_solution_id}`} className="group relative flex items-center z-star">
                <input className="w-4 h-4" type="checkbox" defaultChecked={solution.is_boj_verified} readOnly />
                <span className="hidden group-hover:inline-block text-12 absolute whitespace-nowrap -right-11 top-0 px-2 py-[2px] bg-black/30 text-white rounded-md">
                  클릭하면 풀이 내역으로 이동해요
                </span>
              </Link>
              <button className="flex items-center" onClick={() => setSelected(selected > 0 && selected === solution.id ? -1 : solution.id)}>
                {selected > 0 && selected === solution.id ? <ChevronUpIcon boxSize={6} /> : <ChevronDownIcon boxSize={6} />}
              </button>
            </div>
            {selected > 0 && solution.id === selected && (
              <div className="bg-white shadow-sm px-5 py-7 rounded-md my-2">
                <div className="flex gap-1 mb-3">
                  <CommentIcon fill="#0090FE" />
                  <h1 className="text-primary text-40 font-700">Comment</h1>
                </div>
                <MDEditor.Markdown source={solution.comment} style={{ whiteSpace: 'pre-wrap' }} />
                <div className="flex gap-1 mt-12 mb-3">
                  <CodeIcon fill="#0090FE" />
                  <h1 className="text-primary text-40 font-700">Code</h1>
                </div>
                <MDEditor.Markdown
                  source={`\`\`\`${LANGUAGE_FOR_MD[solution.source_lang.toLowerCase() as LanguageType]}\n${solution.source_code}\n\`\`\``}
                  style={{ whiteSpace: 'pre-wrap' }}
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default SolutionList;

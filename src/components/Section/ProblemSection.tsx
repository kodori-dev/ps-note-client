'use client';

import HomeLock from '../Lock/HomeLock';
import ProblemCard from '../Card/ProblemCard';
import { ProblemType } from '@/types/api/problem';
import { useHomePageContext } from '@/contexts/HomePageContext';
import EmblaCarousel from '../Carousel/Carousel';
import { useEffect, useState } from 'react';

interface Props {
  problems: ProblemType[];
}

function ProblemSection({ problems }: Props) {
  return (
    <>
      {problems ? (
        problems.length === 0 ? (
          <div className="h-[177px] flex items-center justify-center">오늘 풀어진 문제가 없어요😓</div>
        ) : (
          <EmblaCarousel options={{ slidesToScroll: 'auto' }}>
            <>
              {problems.map(({ boj_id, id, is_starred, name, stars, is_solved, solutions }: ProblemType) => (
                <ProblemCard key={id} problemId={id} bojId={boj_id} stars={stars} title={name} isStar={is_starred} isSolved={is_solved} solNum={solutions} />
              ))}
            </>
          </EmblaCarousel>
        )
      ) : (
        <HomeLock type="today" />
      )}
    </>
  );
}

export default ProblemSection;

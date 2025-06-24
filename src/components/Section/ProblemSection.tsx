"use client";

import HomeLock from "../Lock/HomeLock";
import ProblemCard from "../Card/ProblemCard";
import EmblaCarousel from "../Carousel/Carousel";
import { ProblemSchema } from "../../../types/models/data-contracts";

interface Props {
  problems: ProblemSchema[];
}

function ProblemSection({ problems }: Props) {
  return (
    <>
      {problems ? (
        problems.length === 0 ? (
          <div className="h-[177px] flex items-center justify-center">오늘 풀어진 문제가 없어요😓</div>
        ) : (
          <EmblaCarousel options={{ slidesToScroll: "auto" }}>
            <>
              {problems.map(({ oj_id, id, is_starred, level, name, stars, is_solved, solutions, oj_type, url }) => (
                <ProblemCard
                  key={id}
                  level={level}
                  problemId={id}
                  ojType={oj_type}
                  ojId={oj_id}
                  stars={stars}
                  title={name}
                  isStar={is_starred ?? false}
                  isSolved={is_solved ?? false}
                  solNum={solutions}
                  url={url}
                />
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

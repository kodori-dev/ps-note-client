"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import SolutionCard from "@/components/Card/SolutionCard";
import { PaginatedSolutionSchema, SolutionSchema } from "../../../../../types/models/data-contracts";
import { api } from "@/utils/api";
import { Spinner } from "@chakra-ui/react";
import SolutionListCard from "@/components/Card/SolutionListCard";

interface Props {
  initData: PaginatedSolutionSchema;
  memberId: number;
  viewType: "card" | "list";
}

const PAGE_SIZE = 30;

async function fetchSolutions(memberId: number, page: number, size: number = PAGE_SIZE): Promise<PaginatedSolutionSchema> {
  const res = await api("GET", "/solutions", null, { member_id: memberId, page, size, ordering: ["-submitted_at"] });
  return res;
}

function CardSection({ viewType, initData, memberId }: Props) {
  const [solutions, setSolutions] = useState<SolutionSchema[]>(initData.items);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(initData.count == initData.size);

  const { ref, inView } = useInView({
    threshold: 0, // 요소가 0% 보이면 바로 감지
    triggerOnce: false, // 여러 번 감지
  });

  const loadMoreSolutions = async () => {
    const nextPage = page + 1;
    const data = await fetchSolutions(memberId, nextPage);

    if (data.count > 0) {
      setSolutions((prev) => [...prev, ...data.items]);
      setPage(nextPage);
      setHasNextPage(data.count >= PAGE_SIZE);
    } else {
      setHasNextPage(false);
    }
  };

  // inView가 true이고, 다음 페이지가 있을 때 실행
  useEffect(() => {
    if (inView && hasNextPage) {
      loadMoreSolutions();
    }
  }, [inView, hasNextPage]);

  return (
    <section>
      {/* {initData.count}개의 문제를 풀었어요. */}
      {solutions.length > 0 ? (
        solutions.map((solution, index) => (
          <div key={solution.id} ref={index === solutions.length - 1 ? ref : null}>
            {viewType === "card" && <SolutionCard {...solution} />}
            {viewType === "list" && <SolutionListCard {...solution} />}
          </div>
        ))
      ) : (
        <p>아직 푼 문제가 없어요.</p>
      )}

      {hasNextPage && (
        <div className="flex justify-center">
          <Spinner zIndex={50} color="blue.200" size="lg" borderWidth="4px" />
        </div>
      )}
    </section>
  );
}

export default CardSection;

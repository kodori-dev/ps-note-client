"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import SolutionCard from "@/components/Card/SolutionCard";
import { PaginatedSolutionSchema, SolutionSchema } from "../../../../../types/models/data-contracts";
import { api } from "@/utils/api";
import { createListCollection, Spinner } from "@chakra-ui/react";
import SolutionListCard from "@/components/Card/SolutionListCard";
import { Select } from "@chakra-ui/react";

interface Props {
  initData: PaginatedSolutionSchema;
  memberId: number;
  viewType: "card" | "list";
}

const PAGE_SIZE = 30;
const orderList = createListCollection({
  items: [
    { label: "최신 순", value: "-submitted_at" },
    { label: "오래된 순", value: "submitted_at" },
    { label: "풀이 언어 순 (Z-A)", value: "-source_lang" },
    { label: "풀이 언어 순 (A-Z)", value: "source_lang" },
  ],
});

async function fetchSolutions(order, memberId: number, page: number, size: number = PAGE_SIZE): Promise<PaginatedSolutionSchema> {
  const res = await api("GET", "/solutions", null, { member_id: memberId, page, size, ordering: [order] });
  return res;
}

function CardSection({ viewType, initData, memberId }: Props) {
  const [solutions, setSolutions] = useState<SolutionSchema[]>(initData.items);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(initData.count == initData.size);
  const [order, setOrder] = useState("-submitted_at");
  const [isRefetch, setIsRefetch] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const isInitialRender = useRef(true);

  const { ref, inView } = useInView({
    threshold: 0, // 요소가 0% 보이면 바로 감지
    triggerOnce: false, // 여러 번 감지
  });

  // 정렬 순서 변경 시 데이터 리페치
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const refetchOnOrderChange = async () => {
      setIsRefetch(true);

      const data = await fetchSolutions(order, memberId, 1);
      setSolutions(data.items);
      setPage(1);
      setHasNextPage(data.count >= PAGE_SIZE);

      setIsRefetch(false);
    };

    refetchOnOrderChange();
  }, [order, memberId]);

  const loadMoreSolutions = async () => {
    // 2. 다른 로딩 작업이 진행 중일 때는 실행 방지
    if (isRefetch || isLoadMore) return;

    setIsLoadMore(true);

    const nextPage = page + 1;
    const data = await fetchSolutions(order, memberId, nextPage);

    if (data.items.length > 0) {
      setSolutions((prev) => [...prev, ...data.items]);
      setPage(nextPage);
      setHasNextPage(data.count >= PAGE_SIZE);
    } else {
      setHasNextPage(false);
    }

    setIsLoadMore(false);
  };

  // 무한 스크롤 트리거
  useEffect(() => {
    if (inView && hasNextPage && !isRefetch) {
      loadMoreSolutions();
    }
  }, [inView, hasNextPage]);

  return (
    <div className="flex flex-col gap-2">
      <Select.Root
        width={220}
        size={"sm"}
        collection={orderList}
        defaultValue={["-submitted_at"]}
        onValueChange={(details) => {
          if (details.value.length > 0) {
            setOrder(details.value[0]);
          }
        }}
      >
        <Select.HiddenSelect />
        <Select.Label />

        <Select.Control>
          <Select.Trigger>
            <Select.ValueText />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>

        <Select.Positioner>
          <Select.Content>
            {orderList.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
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
    </div>
  );
}

export default CardSection;

"use client";

import PostSectionLayout from "@/components/Layout/PostSectionLayout";
import SearchPreview from "@/components/Search/SearchPreview";
import Tag from "@/components/Tag";
import { Checkbox } from "@/components/ui/checkbox";
import { REQUIRED_INPUT } from "@/constants/errorMsg";
import { useDebouncingSearch } from "@/hooks/useDebouncingSearch";
import { createListCollection, Field, Input, Portal, Select } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface Props {
  type: "post" | "edit";
}

const OJ_TYPE = createListCollection({
  items: [
    { label: "백준", value: "boj" },
    { label: "프로그래머스", value: "programmers" },
  ],
});

function ProblemSection({ type }: Props) {
  const { register, setValue, watch } = useFormContext();
  const { oj_id, is_correct_answer, isStar, oj_type } = watch();
  const { data, isLoading, isSuccess, isOpen, setIsOpen } = useDebouncingSearch(oj_id, oj_id && oj_id.split("-").length < 2);

  const handleTagClick = (state: "WA" | "AC") => {
    setValue("is_correct_answer", state === is_correct_answer ? "" : state);
  };

  const handleStarCheck = (e) => {
    setValue("isStar", !!e.checked);
  };

  const handleListClick = (id: number, bojId: string, name: string) => {
    setValue("oj_id", `${bojId} - ${name}`);
    setValue("pid", id);
    setIsOpen(false);
  };

  return (
    <PostSectionLayout title="Problem" description="오늘은 어떤 문제를 풀었나요?">
      <div className="flex flex-col gap-5 w-[373px] mobile:w-full">
        <Field.Root required>
          <Field.Label>
            제출 날짜
            <Field.RequiredIndicator />
          </Field.Label>
          <Input type="date" {...register("submitted_at")} />
          <Field.HelperText>실제로 해당 문제를 제출한 날짜를 선택해 주세요.</Field.HelperText>
        </Field.Root>

        {/* <Field.Root required>
          <Field.Label>
            OJ 플랫폼
            <Field.RequiredIndicator />
          </Field.Label>
          <Select.Root collection={OJ_TYPE} {...register("oj_type")}>
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="OJ 유형 선택" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content width={372}>
                  {OJ_TYPE.items.map((framework) => (
                    <Select.Item item={framework} key={framework.value}>
                      {framework.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Field.Root> */}

        <div className="relative">
          <Field.Root required>
            <Field.Label>
              문제 검색
              <Field.RequiredIndicator />
            </Field.Label>
            <Input disabled={type === "edit"} placeholder="번호 또는 이름 검색" {...register("oj_id", { required: REQUIRED_INPUT })} />
          </Field.Root>
          {isOpen && <SearchPreview query={oj_id} isLoading={isLoading} isSuccess={isSuccess} data={data} handleListClick={handleListClick} />}
        </div>

        <div className="flex flex-col gap-2 text-14">
          <p>
            채점 결과 <span className="text-red-500">*</span>
          </p>
          <div className="flex gap-3">
            <Tag customStyle="w-[68px]" initialState={is_correct_answer === "AC"} onClickFunc={() => handleTagClick("AC")}>
              AC
            </Tag>
            <Tag customStyle="w-[68px]" initialState={is_correct_answer === "WA"} onClickFunc={() => handleTagClick("WA")}>
              WA
            </Tag>
          </div>
          <input hidden {...register("is_correct_answer", { required: REQUIRED_INPUT })} />
        </div>

        <div>
          <Checkbox checked={isStar} onCheckedChange={(e) => handleStarCheck(e)}>
            이 문제를 찜할까요?
          </Checkbox>
          <p className="text-12 text-gray-3">문제를 찜하고, 나중에 다시 풀어보세요.</p>
        </div>

        <input hidden {...register("isStar")} />
        <input hidden {...register("pid")} />
      </div>
    </PostSectionLayout>
  );
}

export default ProblemSection;

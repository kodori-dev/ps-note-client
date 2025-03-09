import CommentSection from "@/app/post/_components/CommentSection";
import ProblemSection from "@/app/post/_components/ProblemSection";
import SolutionSection from "@/app/post/_components/SolutionSection";
import { PostFormType } from "@/types/input";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";

interface Props {
  type?: "post" | "edit";
  children: ReactNode;
  onSubmitFunc: () => void;
  methods: UseFormReturn<PostFormType>;
}

/**
 * /post와 /solution/[id]/edit의 공통 form layout
 * @param children 제출 버튼
 */
function PostLayout({ type = "post", children, onSubmitFunc, methods }: Props) {
  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-16 mb-24" onSubmit={onSubmitFunc}>
        <div className="flex flex-col gap-1">
          <h1 className="text-48 font-700 text-primary mt-11">Today's Check-In</h1>
          <p className="text-12 text-gray-3">* 출석 날짜는 BOJ 기준(06시 초기화)에 맞춰 자동 반영됩니다.</p>
        </div>

        <ProblemSection type={type} />
        <SolutionSection />
        <CommentSection defaultComment={methods.getValues("comment")} />
        <div className="flex justify-end">{children}</div>
      </form>
    </FormProvider>
  );
}

export default PostLayout;

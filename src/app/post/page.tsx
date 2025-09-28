"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "@/components/Button";
import { api } from "@/utils/api";
import ScreenLoading from "@/components/Loading/ScreenLoading";
import MetaTag from "@/components/MetaTag";
import PostLayout from "@/components/Layout/PostLayout";
import { PostFormType } from "@/types/input";
import { useSearchParams } from "next/navigation";
import { getBojTime } from "@/utils/getBojTime";
import { toaster } from "@/components/ui/toaster";

function Post() {
  const param = useSearchParams();
  const today = getBojTime();

  const DEFAULT_INPUT: PostFormType = {
    submitted_at: today,
    oj_type: "",
    oj_id: param.get("oj_id") || "",
    is_correct_answer: "",
    isStar: false,
    source_lang: "풀이 언어를 선택하세요.",
    source_code: "",
    pid: param.get("id") || "",
    comment: "## 아이디어\n<!-- AC의 경우에는 간단한 아이디어를,\nWA의 경우에는 문제 풀이를 상세히 기록해 주세요.\n(주석은 삭제 후 코멘트를 작성해 주세요.) -->",
  };

  const methods = useForm({ mode: "onSubmit", defaultValues: DEFAULT_INPUT });
  const { watch, getValues, handleSubmit } = methods;
  const { pid, oj_id, is_correct_answer, source_lang, source_code, submitted_at } = watch();
  const isSave = submitted_at && pid && oj_id && is_correct_answer && source_lang !== DEFAULT_INPUT.source_lang && source_code;
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckIn = async () => {
    setIsLoading(true);
    const { oj_type, pid, isStar, is_correct_answer, source_code, source_lang, comment, submitted_at } = getValues();

    try {
      const res = await api("POST", "/solutions", {
        comment,
        is_correct_answer: is_correct_answer == "AC",
        problem_id: Number(pid),
        source_code,
        source_lang: source_lang.toLowerCase(),
        star: isStar,
        submitted_at: submitted_at,
      });
      if (typeof res === "string") throw Error(res);
      toaster.create({
        title: `체크인 완료!`,
        description: "내일도 화이팅❤️‍🔥!",
        type: "success",
      });
      window.location.href = `/solution/${res.id}`;
    } catch (err: any) {
      const [code, msg] = err.message.split("/");
      toaster.create({
        title: `체크인 실패!`,
        description: msg,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MetaTag title="체크인" description="오늘 푼 문제의 솔루션을 등록하세요. 아이디어 섹션을 통해 자유롭게 문제 풀이 방법을 기록해 보세요." />
      <PostLayout methods={methods} onSubmitFunc={handleSubmit(handleCheckIn)}>
        <Button customStyle="w-[120px]" disabled={!Boolean(isSave) || isLoading}>
          Save
        </Button>
      </PostLayout>
      {isLoading && <ScreenLoading />}
    </>
  );
}

export default Post;

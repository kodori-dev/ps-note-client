'use client';

import { FormProvider, useForm } from 'react-hook-form';
import ProblemSection from './_components/ProblemSection';
import SolutionSection from './_components/SolutionSection';
import CommentSection from './_components/CommentSection';
import { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import Button from '@/components/Button';
import { api } from '@/utils/api';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import ScreenLoading from '@/components/Loading/ScreenLoading';
import { PostSolReq } from '@/types/api/solution';

const DEFAULT_INPUT = {
  boj_id: '',
  is_correct_answer: '',
  isStar: false,
  source_lang: '풀이 언어를 선택하세요.',
  source_code: '',
};

function Post() {
  const methods = useForm({ mode: 'onSubmit', defaultValues: DEFAULT_INPUT });
  const editorRef = useRef<Editor>(null);
  const { watch, getValues, handleSubmit } = methods;
  const { boj_id, is_correct_answer, source_lang, source_code } = watch();
  const isSave = boj_id && is_correct_answer && source_lang !== DEFAULT_INPUT.source_lang && source_code;
  const { data: user } = useGetUserInfo();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckIn = async () => {
    setIsLoading(true);
    const { boj_id, isStar, is_correct_answer, source_code, source_lang } = getValues();
    const instance = editorRef.current?.getInstance();
    const comment = instance.getHTML();

    try {
      const problems = await api('GET', '/api/problems', null, { query: `${boj_id}`, order_by: 'id' });
      if (typeof problems === 'string') throw Error();

      let serverId;
      for (let problem of problems.results) {
        if (problem.boj_id == boj_id) {
          serverId = problem.id;
          break;
        }
      }

      const date = new Date();
      const body = {
        member: user?.id,
        problem: serverId,
        comment,
        source_lang,
        source_code,
        submitted_at: String(date),
        star: isStar,
        is_correct_answer: is_correct_answer == 'AC',
      } as PostSolReq;

      const res = await api('POST', '/api/solutions', body);
      if (typeof res === 'string') throw Error();
      window.location.href = `/solution/${res.id}`;
    } catch (err) {
      alert('solution을 등록하는 데 문제가 발생했습니다.\n잠시 후 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-16 mb-24" onSubmit={handleSubmit(handleCheckIn)}>
        <div className="flex flex-col gap-1">
          <h1 className="text-48 font-700 text-primary">Today's Check-In✏️</h1>
          <p className="text-12 text-gray-3">* 출석 날짜는 BOJ 기준(06시 초기화)에 맞춰 자동 반영됩니다.</p>
        </div>
        <ProblemSection />
        <SolutionSection />
        <CommentSection forwardRef={editorRef} />
        <div className="flex justify-end">
          <Button customStyle="w-[120px]" disabled={!Boolean(isSave)}>
            Save
          </Button>
        </div>
      </form>
      {isLoading && <ScreenLoading />}
    </FormProvider>
  );
}

export default Post;
'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from '@/components/Button';
import { api } from '@/utils/api';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import ScreenLoading from '@/components/Loading/ScreenLoading';
import { PostSolReq } from '@/types/api/solution';
import MetaTag from '@/components/MetaTag';
import PostLayout from '@/components/Layout/PostLayout';
import { PostFormType } from '@/types/input';

const DEFAULT_INPUT: PostFormType = {
  boj_id: '',
  is_correct_answer: '',
  isStar: false,
  source_lang: '풀이 언어를 선택하세요.',
  source_code: '',
  pid: '',
  comment:
    '## 아이디어\n<!-- AC의 경우에는 간단한 아이디어를,\nWA의 경우에는 문제 풀이를 상세히 기록해 주세요.\n(주석은 삭제 후 코멘트를 작성해 주세요.) -->',
};

function Post() {
  const methods = useForm({ mode: 'onSubmit', defaultValues: DEFAULT_INPUT });
  const { watch, getValues, handleSubmit } = methods;
  const { pid, boj_id, is_correct_answer, source_lang, source_code } = watch();
  const isSave = pid && boj_id && is_correct_answer && source_lang !== DEFAULT_INPUT.source_lang && source_code;
  const { data: user } = useGetUserInfo();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckIn = async () => {
    setIsLoading(true);
    const { pid, isStar, is_correct_answer, source_code, source_lang, comment } = getValues();

    try {
      const body = {
        member: user.userId,
        problem: Number(pid),
        comment,
        source_lang: source_lang.toLowerCase(),
        source_code,
        star: isStar,
        is_correct_answer: is_correct_answer == 'AC',
      } as PostSolReq;

      const res = await api('POST', '/solutions', body);
      if (typeof res === 'string') throw Error();
      alert('solution이 정상적으로 등록되었습니다.');
      window.location.href = `/solution/${res.id}`;
    } catch (err) {
      alert('solution을 등록하는 데 문제가 발생했습니다.\n잠시 후 다시 시도해 주세요.');
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

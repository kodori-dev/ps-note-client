'use client';

import Button from '@/components/Button';
import PostLayout from '@/components/Layout/PostLayout';
import ScreenLoading from '@/components/Loading/ScreenLoading';
import { PostSolReq } from '@/types/api/solution';
import { PostFormType } from '@/types/input';
import { api } from '@/utils/api';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  defaultValue: PostFormType;
  userId: number;
  solutionId: string;
}

function EditForm({ defaultValue, userId, solutionId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm({ mode: 'onSubmit', defaultValues: defaultValue });
  const { handleSubmit, getValues, watch } = methods;
  const { pid, is_correct_answer, source_lang, source_code, comment, isStar } = watch();
  const isNotDefault =
    defaultValue.pid !== pid ||
    defaultValue.is_correct_answer !== is_correct_answer ||
    defaultValue.source_lang !== source_lang ||
    defaultValue.source_code !== source_code ||
    defaultValue.comment !== comment ||
    defaultValue.isStar !== isStar;
  const toast = useToast();

  const handleEditClick = async () => {
    setIsLoading(true);
    const { pid, isStar, is_correct_answer, source_code, source_lang, comment } = getValues();

    try {
      const body = {
        member: userId,
        problem: Number(pid),
        comment,
        source_lang: source_lang.toLowerCase(),
        source_code,
        star: isStar,
        is_correct_answer: is_correct_answer == 'AC',
      } as PostSolReq;

      const res = await api('PATCH', `/solutions/${solutionId}`, body);
      if (typeof res === 'string') throw Error();
      toast({
        title: `solution 수정 완료!`,
        description: '오늘도 행복한 하루 ~✨',
        status: 'success',
      });
      window.location.href = `/solution/${res.id}`;
    } catch (err) {
      toast({
        title: `solution 수정 실패!`,
        description: '잠시 후 다시 시도해 주세요.',
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PostLayout methods={methods} onSubmitFunc={handleSubmit(handleEditClick)}>
      <Button customStyle="w-[120px]" disabled={isLoading || !Boolean(isNotDefault)}>
        수정하기
      </Button>
      {isLoading && <ScreenLoading />}
    </PostLayout>
  );
}

export default EditForm;

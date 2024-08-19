'use client';

import Input from '@/components/Input';
import PostSectionLayout from '@/components/Layout/PostSectionLayout';
import Tag from '@/components/Tag';
import { REQUIRED_INPUT } from '@/constants/errorMsg';
import { Checkbox } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

function ProblemSection() {
  const { register, setValue, watch } = useFormContext();
  const { is_correct_answer, isStar } = watch();

  const handleTagClick = (state: 'WA' | 'AC') => {
    setValue('is_correct_answer', state === is_correct_answer ? '' : state);
  };

  const handleStarCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('isStar', e.target.checked);
  };

  return (
    <PostSectionLayout title="Problem" description="오늘은 어떤 문제를 풀었나요?">
      <div className="flex flex-col gap-5 w-[373px]">
        <Input label="백준 번호*" placeholder="12345" register={register('boj_id', { required: REQUIRED_INPUT })} />
        <div className="flex flex-col gap-2 text-14 font-700">
          채점 결과*
          <div className="flex gap-3">
            <Tag customStyle="w-[68px]" initialState={is_correct_answer === 'AC'} onClickFunc={() => handleTagClick('AC')}>
              AC
            </Tag>
            <Tag customStyle="w-[68px]" initialState={is_correct_answer === 'WA'} onClickFunc={() => handleTagClick('WA')}>
              WA
            </Tag>
          </div>
          <input hidden {...register('is_correct_answer', { required: REQUIRED_INPUT })} />
        </div>
        <Checkbox isChecked={isStar} onChange={handleStarCheck}>
          이 문제를 추천할까요?
        </Checkbox>
        <input hidden {...register('isStar')} />
      </div>
    </PostSectionLayout>
  );
}

export default ProblemSection;

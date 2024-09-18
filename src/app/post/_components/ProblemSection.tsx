'use client';

import Input from '@/components/Input';
import PostSectionLayout from '@/components/Layout/PostSectionLayout';
import SearchPreview from '@/components/Search/SearchPreview';
import Tag from '@/components/Tag';
import { REQUIRED_INPUT } from '@/constants/errorMsg';
import { useDebouncingSearch } from '@/hooks/useDebouncingSearch';
import { Checkbox } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  type: 'post' | 'edit';
}

function ProblemSection({ type }: Props) {
  const { register, setValue, watch } = useFormContext();
  const { boj_id, is_correct_answer, isStar } = watch();
  const { data, isLoading, isSuccess, isOpen, setIsOpen } = useDebouncingSearch(boj_id, boj_id && boj_id.split('-').length < 2);

  const handleTagClick = (state: 'WA' | 'AC') => {
    setValue('is_correct_answer', state === is_correct_answer ? '' : state);
  };

  const handleStarCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('isStar', e.target.checked);
  };

  const handleListClick = (id: number, bojId: string, name: string) => {
    setValue('boj_id', `${bojId} - ${name}`);
    setValue('pid', id);
    setIsOpen(false);
  };

  return (
    <PostSectionLayout title="Problem" description="오늘은 어떤 문제를 풀었나요?">
      <div className="flex flex-col gap-5 w-[373px]">
        <Input label="제출 날짜*" description="실제로 해당 문제를 제출한 날짜를 선택해 주세요." type="date" register={register('submitted_at')} />
        <div className="relative">
          <Input
            disabled={type === 'edit'}
            label="백준 번호*"
            placeholder="번호 또는 이름 검색"
            register={register('boj_id', { required: REQUIRED_INPUT })}
          />
          {isOpen && <SearchPreview query={boj_id} isLoading={isLoading} isSuccess={isSuccess} data={data} handleListClick={handleListClick} />}
        </div>
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
        <input hidden {...register('pid')} />
      </div>
    </PostSectionLayout>
  );
}

export default ProblemSection;

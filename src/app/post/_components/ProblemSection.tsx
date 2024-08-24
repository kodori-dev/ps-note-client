'use client';

import Input from '@/components/Input';
import PostSectionLayout from '@/components/Layout/PostSectionLayout';
import Tag from '@/components/Tag';
import { REQUIRED_INPUT } from '@/constants/errorMsg';
import { useDebouncingSearch } from '@/hooks/useDebouncingSearch';
import { api } from '@/utils/api';
import { Checkbox, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

function ProblemSection() {
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
        <div className="relative">
          <Input label="백준 번호*" placeholder="번호 또는 이름 검색" register={register('boj_id', { required: REQUIRED_INPUT })} />
          {isOpen && data && (
            <div className="w-full absolute top-[91px] bg-white rounded-md shadow-xl p-4 z-menu">
              <div className="h-[380px] flex flex-col items-center overflow-y-scroll">
                {isLoading ? (
                  <Spinner color="blue.500" />
                ) : isSuccess && data.count > 0 ? (
                  data?.results.map(({ id, boj_id: bojId, name }) => (
                    <div
                      onClick={() => handleListClick(id, bojId, name)}
                      key={id}
                      className="w-full flex gap-5 border-b text-gray-1 border-gray-4 text-14 p-3 hover:bg-primary-background hover:text-black cursor-pointer"
                    >
                      <p className="w-20">
                        {bojId.includes(boj_id) ? (
                          <>
                            {bojId.slice(0, bojId.indexOf(boj_id))}
                            <span className="text-primary">{bojId.slice(bojId.indexOf(boj_id), bojId.indexOf(boj_id) + boj_id.length)}</span>
                            {bojId.slice(bojId.indexOf(boj_id) + boj_id.length)}
                          </>
                        ) : (
                          bojId
                        )}
                      </p>
                      <p>
                        {name.includes(boj_id) ? (
                          <>
                            {name.slice(0, name.indexOf(boj_id))}
                            <span className="text-primary">{name.slice(name.indexOf(boj_id), name.indexOf(boj_id) + boj_id.length)}</span>
                            {name.slice(name.indexOf(boj_id) + boj_id.length)}
                          </>
                        ) : (
                          name
                        )}
                      </p>
                    </div>
                  ))
                ) : (
                  `검색 결과가 없습니다.`
                )}
              </div>
            </div>
          )}
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

'use client';

import { FormProvider, useForm } from 'react-hook-form';
import ProblemSection from './_components/ProblemSection';

function Post() {
  const methods = useForm({ mode: 'onSubmit' });

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-16">
        <div className="flex flex-col gap-1">
          <h1 className="text-48 font-700 text-primary">Today's Check-In</h1>
          <p className="text-12 text-gray-3">* 출석 날짜는 BOJ 기준(06시 초기화)에 맞춰 자동 반영됩니다.</p>
        </div>
        <ProblemSection />
      </form>
    </FormProvider>
  );
}

export default Post;

'use client';

import Button from '@/components/Button';
import PostLayout from '@/components/Layout/PostLayout';
import { PostFormType } from '@/types/input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  defaultValue: PostFormType;
}

function EditForm({ defaultValue }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm({ mode: 'onSubmit', defaultValues: defaultValue });
  const { handleSubmit } = methods;

  const handleEditClick = () => {
    console.log('수정 클릭');
  };

  return (
    <PostLayout methods={methods} onSubmitFunc={handleSubmit(handleEditClick)}>
      <Button customStyle="w-[120px]" disabled={isLoading}>
        수정하기
      </Button>
    </PostLayout>
  );
}

export default EditForm;

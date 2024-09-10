'use client';

import PostSectionLayout from '@/components/Layout/PostSectionLayout';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import MDEditor from '@uiw/react-md-editor';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  defaultComment: string;
}

function CommentSection({ defaultComment }: Props) {
  const [commentValue, setCommentValue] = useState(defaultComment);
  const { register, setValue } = useFormContext();

  useEffect(() => {
    setValue('comment', commentValue);
  }, [commentValue]);

  return (
    <PostSectionLayout title="Comment" description="어떻게 풀었는지 기록해 보세요.">
      <div className="w-[668px] bg-white">
        <MDEditor value={commentValue} onChange={(val) => setCommentValue(val as string)} height={500} />
        <input hidden {...register('comment')} />
      </div>
    </PostSectionLayout>
  );
}

export default CommentSection;

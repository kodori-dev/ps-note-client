'use client';

import PostSectionLayout from '@/components/Layout/PostSectionLayout';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import MDEditor from '@uiw/react-md-editor';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

function CommentSection() {
  const [commentValue, setCommentValue] = useState(
    '## 아이디어\n<!-- AC의 경우에는 간단한 아이디어를,\nWA의 경우에는 문제 풀이를 상세히 기록해 주세요.\n(주석은 삭제 후 코멘트를 작성해 주세요.) -->'
  );
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

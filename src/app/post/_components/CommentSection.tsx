'use client';

import PostSectionLayout from '@/components/Layout/PostSectionLayout';
import { Editor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import { ForwardedRef } from 'react';

const EditorWrapper = dynamic(() => import('./EditorWrapper'), { ssr: false });

interface Props {
  forwardRef: ForwardedRef<Editor>;
}

function CommentSection({ forwardRef }: Props) {
  return (
    <PostSectionLayout title="Comment" description="어떻게 풀었는지 기록해 보세요.">
      <div className="w-[668px] bg-white">
        <EditorWrapper forwardRef={forwardRef} />
      </div>
    </PostSectionLayout>
  );
}

export default CommentSection;

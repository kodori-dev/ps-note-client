'use client';

import { LANGUAGE_FOR_MD } from '@/constants/language';
import { LanguageType } from '@/types/api/solution';
import MDEditor from '@uiw/react-md-editor';
import CommentIcon from '../../../../../public/icon-sol-comment.svg';
import CodeIcon from '../../../../../public/icon-sol-code.svg';

interface Props {
  comment: string;
  code: string;
  language: LanguageType;
}

function BodySection({ comment, code, language }: Props) {
  return (
    <section className="bg-white shadow-sm px-8 py-9 rounded-lg flex flex-col gap-24">
      <article>
        <div className="flex gap-2 mb-3">
          <CommentIcon fill="#0090FE" />
          <h2 className="text-primary text-36 font-700">이렇게 풀었어요</h2>
        </div>
        <div data-color-mode="light">
          <MDEditor.Markdown source={comment} style={{ whiteSpace: 'pre-wrap' }} />
        </div>
      </article>
      <article>
        <div className="flex gap-2 mb-3">
          <CodeIcon fill="#0090FE" />
          <h2 className="text-primary text-36 font-700">정답 코드</h2>
        </div>
        <MDEditor.Markdown source={`\`\`\`${LANGUAGE_FOR_MD[language.toLowerCase() as LanguageType]}\n${code}\n\`\`\``} style={{ whiteSpace: 'pre-wrap' }} />
      </article>
    </section>
  );
}

export default BodySection;
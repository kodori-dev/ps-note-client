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
    <section className="bg-white shadow-sm px-8 py-9 rounded-lg flex flex-col gap-14">
      <article>
        <div className="flex gap-1 mb-3">
          <CommentIcon fill="#0090FE" />
          <h2 className="text-primary text-40 font-700">Comment</h2>
        </div>
        <div data-color-mode="light">
          <MDEditor.Markdown source={comment} style={{ whiteSpace: 'pre-wrap' }} />
        </div>
      </article>
      <article>
        <div className="flex gap-1 mt-12 mb-3">
          <CodeIcon fill="#0090FE" />
          <h2 className="text-primary text-40 font-700">Answer Code</h2>
        </div>
        <MDEditor.Markdown source={`\`\`\`${LANGUAGE_FOR_MD[language.toLowerCase() as LanguageType]}\n${code}\n\`\`\``} style={{ whiteSpace: 'pre-wrap' }} />
      </article>
    </section>
  );
}

export default BodySection;

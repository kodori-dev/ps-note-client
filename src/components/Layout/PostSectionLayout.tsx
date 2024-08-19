import { ReactNode } from 'react';

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

function PostSectionLayout({ title, description, children }: Props) {
  return (
    <div className="flex gap-11">
      <div className="flex flex-col gap-1 w-[264px]">
        <h2 className="text-32 font-700">{title}</h2>
        <p className="text-gray-2">{description}</p>
      </div>
      <section>{children}</section>
    </div>
  );
}

export default PostSectionLayout;

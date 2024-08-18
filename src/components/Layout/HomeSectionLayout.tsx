import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

function HomeSectionLayout({ title, children }: Props) {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-32 font-700">{title}</h1>
      {children}
    </section>
  );
}

export default HomeSectionLayout;

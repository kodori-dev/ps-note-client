import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '$$합법 PS 놀이터$$',
  description: '주 4회 이상 PS 스터디',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

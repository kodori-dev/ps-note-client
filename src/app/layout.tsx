import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import AuthProvider from '@/providers/AuthProvider';
import ReactQueryProvider from '@/providers/ReactQueryProvider';

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
      <body>
        <ReactQueryProvider>
          <AuthProvider>
            <div className="w-[1024px] mx-auto px-6">
              <Header />
              {children}
            </div>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

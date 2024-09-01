import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import AuthProvider from '@/providers/AuthProvider';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { ChakraProvider } from '@chakra-ui/react';

export const metadata: Metadata = {
  title: '$$합법 PS 놀이터$$',
  description: '"주 4회 PS 스터디를 했을 뿐인데 부자가 되어 있는? 사이트"',
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    title: '$$합법 PS 놀이터$$',
    description: '"주 4회 PS 스터디를 했을 뿐인데 부자가 되어 있는? 사이트"',
    images: '/thumbnail.png',
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
        <ChakraProvider disableGlobalStyle toastOptions={{ defaultOptions: { position: 'top' } }}>
          <ReactQueryProvider>
            <AuthProvider>
              <div className="w-[1024px] mx-auto px-6 mb-24">
                <Header />
                {children}
              </div>
            </AuthProvider>
          </ReactQueryProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}

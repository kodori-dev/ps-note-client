import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import AuthProvider from "@/providers/AuthProvider";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "@/components/ui/provider";
import { PublicEnvScript } from "next-runtime-env";

export const metadata: Metadata = {
  title: "$$합법 PS 놀이터$$",
  description: '"주 4회 PS 스터디를 했을 뿐인데 부자가 되어 있는? 사이트"',
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "$$합법 PS 놀이터$$",
    description: '"주 4회 PS 스터디를 했을 뿐인데 부자가 되어 있는? 사이트"',
    images: "/thumbnail.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <PublicEnvScript />
      </head>
      <body>
        <Provider>
          <ReactQueryProvider>
            <AuthProvider>
              <div className="max-w-[1024px] min-h-dvh mx-auto px-6 mb-24">
                <Toaster />
                <Header />
                {children}
              </div>
            </AuthProvider>
          </ReactQueryProvider>
        </Provider>
      </body>
    </html>
  );
}

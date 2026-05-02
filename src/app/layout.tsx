import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: '알고 — AI 카드뉴스',
  description: 'GPT-4o와 Tavily가 매일 최신 AI 뉴스를 수집하고, DALL-E 3가 디자인해 Instagram에 자동 업로드합니다.',
  openGraph: {
    title: '알고 — AI 카드뉴스',
    description: 'AI가 매일 만드는 카드뉴스',
    siteName: '알고',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}

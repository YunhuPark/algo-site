import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Algo Pipeline — Reliability Console',
  description: 'LLM 콘텐츠 파이프라인의 Quality Gate, DB 격리, 실패 상태와 Dry-run 검증을 보여주는 AI Engineer 포트폴리오 콘솔.',
  openGraph: {
    title: 'Algo Pipeline — Reliability Console',
    description: '104 tests · production DB mutation 0 · unsupported numeric claim blocked · publish disabled',
    siteName: 'Algo Pipeline Reliability Console',
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

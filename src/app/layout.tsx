import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Algo Pipeline — Reliability Console',
  description: 'Queue Lineage V2, Fact Checker V2, durable publish boundary와 사람 승인 기반 운영 구조를 보여주는 evidence-bound AI content agent console.',
  openGraph: {
    title: 'Algo Pipeline — Reliability Console',
    description: '198 tests on hardened main · Queue Lineage V2 · Fact Checker V2 · unattended publish OFF',
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

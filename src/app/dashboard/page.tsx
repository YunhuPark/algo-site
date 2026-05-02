import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

const FEATURES = [
  {
    id: 'main',
    label: '대시보드',
    file: 'main.png',
    title: '전체 현황 한눈에',
    desc: '오늘 게시물 수, 이번 주 실적, 전체 누적, 큐 대기 현황을 실시간으로 보여줍니다. 최근 게시물 목록과 좋아요 기준 성과 Top 3도 함께 표시됩니다.',
    tags: ['게시물 현황', '성과 요약', '큐 대기'],
  },
  {
    id: 'generate',
    label: '생성',
    file: 'generate.png',
    title: '수동 카드뉴스 생성',
    desc: '주제를 입력하면 Tavily로 최신 기사를 수집하고 GPT-4o가 스크립트를 작성합니다. 생성 진행 상황을 실시간 로그로 확인하고, 완료 후 미리보기 및 Instagram 발행까지 한 화면에서 처리할 수 있습니다.',
    tags: ['주제 입력', '실시간 로그', '미리보기', '즉시 발행'],
  },
  {
    id: 'queue',
    label: '큐',
    file: 'queue.png',
    title: '예약 큐 관리',
    desc: '생성할 주제를 미리 큐에 쌓아두면 자동화 엔진이 순서대로 처리합니다. GPT가 오늘의 트렌드에 맞는 주제를 자동으로 추천하는 기능도 포함되어 있습니다.',
    tags: ['주제 예약', 'AI 주제 추천', '우선순위 조정'],
  },
  {
    id: 'analytics',
    label: '분석',
    file: 'analytics.png',
    title: '성과 분석',
    desc: 'Instagram Graph API로 수집한 좋아요·댓글·저장·도달 데이터를 테이블과 차트로 시각화합니다. 어떤 주제와 앵글이 반응이 좋은지 데이터로 확인하고 다음 콘텐츠에 반영합니다.',
    tags: ['좋아요·댓글·저장', '앵글별 비교', '트렌드 차트'],
  },
  {
    id: 'settings',
    label: '설정',
    file: 'settings.png',
    title: '페르소나 & API 설정',
    desc: '브랜드 톤, 타겟 독자, 색상 스키마 등 persona.json을 웹에서 직접 편집할 수 있습니다. Instagram·OpenAI·Tavily API 키 현황도 한 화면에서 확인됩니다.',
    tags: ['페르소나 편집', 'API 키 현황', '브랜드 설정'],
  },
];

function hasScreenshot(file: string): boolean {
  try {
    const p = path.join(process.cwd(), 'public', 'dashboard', file);
    return fs.existsSync(p);
  } catch {
    return false;
  }
}

export default function DashboardPage() {
  const featuresWithState = FEATURES.map((f) => ({
    ...f,
    hasImg: hasScreenshot(f.file),
  }));

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100">
      <Header />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-36 pb-20">
        <p className="text-[11px] font-mono text-zinc-600 tracking-[0.18em] uppercase mb-5">
          Local Management Tool
        </p>
        <h1
          className="font-semibold text-zinc-50 leading-[0.92] tracking-[-0.04em] mb-8"
          style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
        >
          대시보드
        </h1>
        <p className="text-base text-zinc-500 max-w-sm leading-relaxed">
          카드뉴스 생성·발행·분석을 한 화면에서 처리하는
          <br />
          로컬 관리 도구입니다. Flask 기반으로 노트북에서 실행됩니다.
        </p>

        {/* 요약 스탯 */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
          {[
            { label: '페이지', value: '5' },
            { label: '자동 생성 건수', value: '10+' },
            { label: '지원 플랫폼', value: 'Instagram' },
            { label: '스택', value: 'Flask · SQLite' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#090909] px-5 py-4">
              <p className="text-xl font-semibold text-zinc-100 mb-0.5">{value}</p>
              <p className="text-[11px] font-mono text-zinc-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 기능 상세 ─────────────────────────────────── */}
      <section className="border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-6 py-20 space-y-24">
          {featuresWithState.map((f, i) => (
            <div
              key={f.id}
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-start ${
                i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              {/* 텍스트 */}
              <div>
                <p className="text-[10px] font-mono text-zinc-700 mb-2 uppercase tracking-widest">
                  {String(i + 1).padStart(2, '0')} / {f.label}
                </p>
                <h2 className="text-xl font-semibold text-zinc-100 mb-4 tracking-tight">
                  {f.title}
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed mb-6">{f.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {f.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-zinc-600 border border-[#222] px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 스크린샷 또는 플레이스홀더 */}
              <div className="border border-[#1a1a1a] overflow-hidden">
                {f.hasImg ? (
                  <Image
                    src={`/dashboard/${f.file}`}
                    alt={f.title}
                    width={960}
                    height={600}
                    className="w-full h-auto"
                    unoptimized
                  />
                ) : (
                  <div className="bg-[#0d0d0d] aspect-video flex flex-col items-center justify-center gap-3">
                    <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                      {f.label}
                    </p>
                    <p className="text-[11px] text-zinc-800">
                      /dashboard/{f.file}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 기술 노트 ─────────────────────────────────── */}
      <section className="border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-[11px] font-mono text-zinc-700 tracking-[0.15em] uppercase mb-3">
            Architecture
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100 mb-10">
            어떻게 동작하나요
          </h2>
          <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-6">
            <pre className="text-[12px] font-mono text-zinc-400 leading-relaxed overflow-x-auto whitespace-pre">
{`# start_services.bat 실행 시 자동 시작
Flask dashboard  →  localhost:5001
Proxy router     →  localhost:9000
ngrok tunnel     →  image.ngrok-free.dev → :9000

# 대시보드에서 "생성 시작" 클릭 시
1. Tavily API    →  최신 기사 수집 + 전문 추출
2. GPT-4o        →  6장 스크립트 생성 (앵글 선택 + 팩트체크)
3. DALL-E 3      →  배경 이미지 생성
4. Pillow        →  1080×1350px 카드 렌더링
5. Instagram API →  캐러셀 자동 업로드
6. SQLite DB     →  게시물 이력 + 성과 데이터 저장`}
            </pre>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

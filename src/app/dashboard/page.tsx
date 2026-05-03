import Header from '@/components/Header';
import Footer from '@/components/Footer';
import fs from 'fs';
import path from 'path';

interface PostMeta {
  topic: string;
  source_title: string;
  source_url: string;
  angle: string;
  fact_confirmed: number;
  fact_disputed: number;
  fact_unverifiable: number;
  generation_seconds: number;
  ig_post_id: string;
  permalink: string;
  posted_at: string;
  folder: string;
}

function loadMeta(): PostMeta[] {
  try {
    const p = path.join(process.cwd(), 'src', 'data', 'posts_meta.json');
    return JSON.parse(fs.readFileSync(p, 'utf-8')) as PostMeta[];
  } catch {
    return [];
  }
}

function formatDate(s: string) {
  return s ? s.slice(0, 10) : '—';
}

function formatTime(sec: number) {
  if (!sec) return '—';
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m}분 ${s}초` : `${s}초`;
}

export default function DashboardPage() {
  const all = loadMeta();
  const published = all.filter((p) => p.ig_post_id);
  const withFact = all.filter((p) => p.fact_confirmed + p.fact_disputed + p.fact_unverifiable > 0);
  const totalFacts = withFact.reduce((a, p) => a + p.fact_confirmed + p.fact_disputed + p.fact_unverifiable, 0);
  const confirmedFacts = withFact.reduce((a, p) => a + p.fact_confirmed, 0);
  const factRate = totalFacts > 0 ? Math.round((confirmedFacts / totalFacts) * 100) : 0;
  const withTime = all.filter((p) => p.generation_seconds > 0);
  const avgTime = withTime.length > 0
    ? Math.round(withTime.reduce((a, p) => a + p.generation_seconds, 0) / withTime.length)
    : 0;

  const STATS = [
    { label: '총 생성', value: String(all.length) },
    { label: '인스타 발행', value: String(published.length) },
    { label: '팩트 확인율', value: totalFacts > 0 ? `${factRate}%` : '—' },
    { label: '평균 생성시간', value: avgTime > 0 ? formatTime(avgTime) : '—' },
  ];

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100">
      <Header />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-36 pb-16">
        <p className="text-[11px] font-mono text-zinc-600 tracking-[0.18em] uppercase mb-5">
          Automation Dashboard
        </p>
        <h1
          className="font-semibold text-zinc-50 leading-[0.92] tracking-[-0.04em] mb-8"
          style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
        >
          대시보드
        </h1>
        <p className="text-base text-zinc-500 max-w-sm leading-relaxed">
          AI 파이프라인이 생성·발행한 카드뉴스 전체 기록입니다.
        </p>

        {/* 요약 스탯 */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
          {STATS.map(({ label, value }) => (
            <div key={label} className="bg-[#090909] px-5 py-5">
              <p className="text-2xl font-semibold text-zinc-100 mb-1 tracking-tight">{value}</p>
              <p className="text-[11px] font-mono text-zinc-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 게시물 목록 ────────────────────────────────────── */}
      <section className="border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-[11px] font-mono text-zinc-700 tracking-[0.15em] uppercase mb-2">
            History
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-100 mb-8">
            전체 게시물 ({all.length}건)
          </h2>

          <div className="border border-[#1a1a1a] divide-y divide-[#1a1a1a]">
            {/* 헤더 */}
            <div className="grid grid-cols-[1fr_90px_80px_60px] gap-4 px-5 py-3 bg-[#0d0d0d]">
              <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">주제</p>
              <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">날짜</p>
              <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest text-right">팩트</p>
              <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest text-right">상태</p>
            </div>

            {all.map((post, i) => {
              const total = post.fact_confirmed + post.fact_disputed + post.fact_unverifiable;
              const rate = total > 0 ? Math.round((post.fact_confirmed / total) * 100) : null;
              const isPublished = !!post.ig_post_id;

              return (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_90px_80px_60px] gap-4 px-5 py-4 hover:bg-[#0d0d0d] transition-colors"
                >
                  {/* 주제 */}
                  <div className="min-w-0">
                    <p className="text-sm text-zinc-300 truncate">{post.topic}</p>
                    {post.source_title && (
                      <p className="text-[11px] text-zinc-700 truncate mt-0.5">
                        {post.source_title}
                      </p>
                    )}
                  </div>

                  {/* 날짜 */}
                  <p className="text-[11px] font-mono text-zinc-600 self-center">
                    {formatDate(post.posted_at)}
                  </p>

                  {/* 팩트 확인율 */}
                  <div className="self-center text-right">
                    {rate !== null ? (
                      <span
                        className={`text-[11px] font-mono ${
                          rate >= 80 ? 'text-emerald-600' : rate >= 50 ? 'text-yellow-600' : 'text-red-700'
                        }`}
                      >
                        {rate}%
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-zinc-800">—</span>
                    )}
                  </div>

                  {/* 상태 */}
                  <div className="self-center text-right">
                    {isPublished ? (
                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        발행 ↗
                      </a>
                    ) : (
                      <span className="text-[10px] font-mono text-zinc-800">미발행</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 파이프라인 구조 ─────────────────────────────────── */}
      <section className="border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-[11px] font-mono text-zinc-700 tracking-[0.15em] uppercase mb-2">
            Architecture
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-100 mb-8">
            어떻게 동작하나요
          </h2>
          <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-6">
            <pre className="text-[12px] font-mono text-zinc-400 leading-relaxed overflow-x-auto whitespace-pre">
{`# 매일 오전 9시 Windows Task Scheduler 자동 실행
1. Tavily API    →  최신 AI/테크 기사 수집 + 전문 추출
2. GPT-4o        →  앵글 선택 + 6장 스크립트 생성
3. FactChecker   →  hallucination 검사 + 외부 교차 검증
4. DALL-E 3      →  슬라이드별 배경 이미지 생성
5. Pillow        →  1080×1350px 카드 렌더링
6. Instagram API →  캐러셀 자동 업로드
7. SQLite DB     →  게시물 이력 + 성과 데이터 저장`}
            </pre>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

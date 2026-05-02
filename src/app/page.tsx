import { getPosts } from '@/lib/instagram';
import PostCard, { PostMeta } from '@/components/PostCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import fs from 'fs';

const PIPELINE = [
  { step: '01', label: '뉴스 수집', desc: 'Tavily API' },
  { step: '02', label: '스크립트 생성', desc: 'GPT-4o' },
  { step: '03', label: '이미지 렌더링', desc: 'DALL-E 3 · Pillow' },
  { step: '04', label: '자동 업로드', desc: 'Instagram Graph API' },
];

const SCRIPT_EXAMPLE = `{
  "topic": "AI 대화에서의 고블린 언급 급증",
  "hook": "GPT-5.1 이후 고블린 언급 175% 증가!",
  "slides": [
    {
      "slide_type": "cover",
      "title": "고블린, AI 대화의 일상으로",
      "body": "결국 AI가 고블린을 자주 언급하게 됐다."
    },
    {
      "slide_type": "content",
      "title": "AI 대화의 변화",
      "body": "GPT-5.1 출시 이후 '고블린' 언급이 175% 증가..."
    }
    // ... 6장
  ]
}`;

const TOOLS = [
  {
    name: 'Tavily',
    desc: '실시간 AI 뉴스 검색 · 기사 전문 추출',
    url: 'https://tavily.com',
    tag: 'Trend Analyzer',
  },
  {
    name: 'OpenAI GPT-4o',
    desc: '카드뉴스 스크립트 생성 · 팩트체크 · 자기검증',
    url: 'https://openai.com',
    tag: 'Content Creator',
  },
  {
    name: 'DALL-E 3',
    desc: '슬라이드별 배경 이미지 AI 생성',
    url: 'https://openai.com/dall-e-3',
    tag: 'Image Generator',
  },
  {
    name: 'Instagram Graph API',
    desc: '캐러셀 자동 업로드 · 퍼머링크 조회',
    url: 'https://developers.facebook.com/docs/instagram-api',
    tag: 'Publisher',
  },
  {
    name: 'Python · Pillow',
    desc: '1080×1350 카드 이미지 렌더링 파이프라인',
    url: 'https://python-pillow.org',
    tag: 'Design Renderer',
  },
  {
    name: 'ngrok',
    desc: '로컬 이미지 서버 공개 터널링',
    url: 'https://ngrok.com',
    tag: 'Infrastructure',
  },
];

function loadMeta(): PostMeta[] {
  try {
    const raw = fs.readFileSync(
      process.cwd() + '/src/data/posts_meta.json',
      'utf-8'
    );
    return JSON.parse(raw) as PostMeta[];
  } catch {
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts(18);
  const metaList = loadMeta();
  const metaByPermalink = Object.fromEntries(
    metaList.filter((m) => m.permalink).map((m) => [m.permalink, m])
  );

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100">
      <Header />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-36 pb-24">
        <p className="text-[11px] font-mono text-zinc-600 tracking-[0.18em] uppercase mb-5">
          AI-generated · updated daily
        </p>
        <h1
          className="font-semibold text-zinc-50 leading-[0.92] tracking-[-0.04em] mb-8"
          style={{ fontSize: 'clamp(72px, 11vw, 128px)' }}
        >
          알고
        </h1>
        <p className="text-base text-zinc-500 max-w-sm leading-relaxed">
          GPT-4o와 Tavily가 매일 최신 AI 뉴스를 수집하고
          <br />
          DALL-E 3가 디자인해 Instagram에 자동 업로드합니다.
        </p>

        {/* 파이프라인 플로우 */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
          {PIPELINE.map(({ step, label, desc }) => (
            <div key={step} className="bg-[#090909] px-5 py-4">
              <p className="text-[10px] font-mono text-zinc-700 mb-1">{step}</p>
              <p className="text-sm text-zinc-300 font-medium mb-0.5">{label}</p>
              <p className="text-[11px] font-mono text-zinc-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 이렇게 만들어요 ──────────────────────────── */}
      <section className="border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-[11px] font-mono text-zinc-700 tracking-[0.15em] uppercase mb-3">
            How it works
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100 mb-16">
            이렇게 만들어요
          </h2>

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-[11px] font-mono text-zinc-700 mb-2">STEP 01</p>
                <h3 className="text-lg font-medium text-zinc-200 mb-3">
                  Tavily로 최신 뉴스 수집
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  매일 Tavily API가 최신 AI 관련 기사를 자동 수집합니다.
                  단순 헤드라인이 아니라 기사 전문을 추출해
                  GPT-4o가 깊이 있는 스크립트를 작성할 수 있도록 합니다.
                </p>
              </div>
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-sm p-5">
                <p className="text-[10px] font-mono text-zinc-700 mb-3">trend_analyzer.py</p>
                <pre className="text-[12px] font-mono text-zinc-400 leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`client = TavilyClient(api_key=TAVILY_API_KEY)
results = client.search(
    query="AI 최신 뉴스",
    search_depth="advanced",
    max_results=10,
)
# 기사 전문 추출 → 14,000자+`}
                </pre>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-[11px] font-mono text-zinc-700 mb-2">STEP 02</p>
                <h3 className="text-lg font-medium text-zinc-200 mb-3">
                  GPT-4o가 스크립트 생성
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  수집한 기사를 바탕으로 GPT-4o가 6장짜리 카드뉴스
                  스크립트를 생성합니다. 커버 · 콘텐츠 · CTA 슬라이드
                  구조로 자동 구성되며, 팩트체크까지 자동으로 수행합니다.
                </p>
              </div>
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-sm p-5">
                <p className="text-[10px] font-mono text-zinc-700 mb-3">script.json — 실제 생성 결과</p>
                <pre className="text-[12px] font-mono text-zinc-400 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {SCRIPT_EXAMPLE}
                </pre>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-[11px] font-mono text-zinc-700 mb-2">STEP 03 · 04</p>
                <h3 className="text-lg font-medium text-zinc-200 mb-3">
                  렌더링 후 Instagram 자동 업로드
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Python Pillow로 1080×1350px 카드를 렌더링하고,
                  DALL-E 3로 배경 이미지를 생성합니다.
                  완성된 카드는 Instagram Graph API로 캐러셀 형태로 자동 게시됩니다.
                </p>
              </div>
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-sm p-5">
                <p className="text-[10px] font-mono text-zinc-700 mb-3">publisher.py</p>
                <pre className="text-[12px] font-mono text-zinc-400 leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`# 캐러셀 컨테이너 생성 후 게시
carousel_id = _create_carousel_container(
    container_ids, caption
)
post_id = _publish_carousel(carousel_id)
permalink = get_post_permalink(post_id)
# → instagram.com/p/DX0lvabGPqf/`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 카드뉴스 갤러리 ──────────────────────────── */}
      <section className="border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] font-mono text-zinc-700 tracking-[0.15em] uppercase mb-3">
                Gallery
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
                실제 생성된 카드뉴스
              </h2>
            </div>
            <p className="text-[11px] font-mono text-zinc-700 hidden sm:block">
              {posts.length}개 · 매일 업데이트
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-0">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} meta={metaByPermalink[post.permalink]} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center">
              <p className="text-xs font-mono text-zinc-700">게시물을 불러오는 중...</p>
            </div>
          )}
        </div>
      </section>

      {/* ── 실제로 사용한 도구들 ────────────────────── */}
      <section className="border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-[11px] font-mono text-zinc-700 tracking-[0.15em] uppercase mb-3">
            Built with
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100 mb-10">
            실제로 사용한 도구들
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
            {TOOLS.map(({ name, desc, url, tag }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#090909] px-6 py-5 hover:bg-[#0f0f0f] transition-colors duration-200"
              >
                <p className="text-[10px] font-mono text-zinc-700 mb-2">{tag}</p>
                <p className="text-sm font-medium text-zinc-200 group-hover:text-zinc-50 transition-colors duration-200 mb-1">
                  {name} ↗
                </p>
                <p className="text-xs text-zinc-600 leading-relaxed">{desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-6">
          <p className="text-[11px] font-mono text-zinc-700 tracking-[0.15em] uppercase">
            매일 오전 자동 업로드 중
          </p>
          <h2
            className="font-semibold text-zinc-100 tracking-tight leading-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            실제로 운영 중인<br />Instagram 계정
          </h2>
          <p className="text-sm text-zinc-500 max-w-xs">
            이 사이트에 있는 모든 카드뉴스는 AI가 자동으로
            생성하고 아래 계정에 직접 업로드한 것들입니다.
          </p>
          <a
            href="https://instagram.com/algo__kr"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 border border-[#2a2a2a] hover:border-zinc-600 bg-[#0f0f0f] hover:bg-[#141414] text-sm text-zinc-300 hover:text-zinc-100 font-mono px-6 py-3 transition-all duration-200"
          >
            @algo__kr 팔로우 ↗
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

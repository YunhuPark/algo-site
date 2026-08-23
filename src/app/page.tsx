import Header from '@/components/Header';
import Footer from '@/components/Footer';

const METRICS = [
  { value: '104', label: 'tests passed', note: 'quality hardening branch' },
  { value: '0', label: 'prod DB mutations', note: 'pytest + sandbox audit' },
  { value: 'BLOCKED', label: 'unsupported number', note: 'NUMBER_UNSUPPORTED' },
  { value: 'OFF', label: 'external publish', note: 'dry-run protection' },
];

const FLOW = [
  ['01', 'COLLECT', '기사와 근거 후보를 수집합니다.'],
  ['02', 'GENERATE', 'Claim과 콘텐츠 초안을 생성합니다.'],
  ['03', 'VERIFY', '숫자·근거·형식·의미를 분리해 검사합니다.'],
  ['04', 'OPERATE', '상태·재시도·DB·발행 경계를 통제합니다.'],
];

const CHECKS = [
  {
    label: 'DETERMINISTIC GATE',
    title: '근거 없는 숫자는 게시 후보가 되지 않습니다.',
    before: '"175% 증가"',
    result: 'NUMBER_UNSUPPORTED → BLOCKED',
    detail: '출처 근거가 없는 정량 Claim은 규칙 기반 검증에서 차단합니다.',
  },
  {
    label: 'TEST ISOLATION',
    title: '검증 과정이 운영 DB를 건드리지 않습니다.',
    before: 'pytest / sandbox',
    result: 'production DB mutation → 0',
    detail: '동적 DB 경로 주입과 테스트 격리로 운영 데이터 오염을 방지했습니다.',
  },
  {
    label: 'PUBLISH BOUNDARY',
    title: '품질 강화 버전은 자동 게시를 일부러 막아두었습니다.',
    before: 'Meta / Instagram API',
    result: 'external publish → DISABLED',
    detail: '현재 hardened branch는 외부 발행보다 검증 완결성을 우선한 Dry-run 상태입니다.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100">
      <Header />

      <main>
        <section className="max-w-6xl mx-auto px-6 pt-36 pb-24">
          <div className="flex flex-wrap items-center gap-3 mb-8 font-mono text-[10px] tracking-[0.18em] uppercase">
            <span className="border border-orange-500/50 text-orange-400 px-3 py-1.5">Draft hardening</span>
            <span className="text-zinc-600">Offline verification</span>
            <span className="text-zinc-700">2026</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_.75fr] gap-14 items-end">
            <div>
              <p className="text-[11px] font-mono text-zinc-600 tracking-[0.18em] uppercase mb-5">
                Reliability-aware autonomous content agent
              </p>
              <h1
                className="font-semibold text-zinc-50 leading-[0.88] tracking-[-0.055em]"
                style={{ fontSize: 'clamp(62px, 10vw, 132px)' }}
              >
                ALGO<br />PIPELINE
              </h1>
            </div>
            <div className="pb-2">
              <p className="text-xl text-zinc-300 leading-relaxed tracking-tight">
                콘텐츠를 많이 만드는 자동화보다,
                <br />
                <span className="text-orange-400">잘못된 결과를 멈출 수 있는 시스템</span>을 만들었습니다.
              </p>
              <p className="text-sm text-zinc-600 leading-relaxed mt-6 max-w-md">
                기존 카드뉴스 자동화 파이프라인을 Quality Gate, 실패 상태, DB 격리,
                재시도 정책과 실험 지표를 갖춘 Reliability Engineering 사례로 재구성했습니다.
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
            {METRICS.map((metric) => (
              <div key={metric.label} className="bg-[#0b0b0b] px-5 py-6 min-h-36">
                <p className="text-3xl lg:text-4xl font-semibold tracking-[-0.04em] text-zinc-50">{metric.value}</p>
                <p className="text-xs font-mono text-zinc-400 mt-3 uppercase tracking-wide">{metric.label}</p>
                <p className="text-[10px] font-mono text-zinc-700 mt-2">{metric.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-[#1a1a1a]">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-[.7fr_1.3fr] gap-16">
              <div>
                <p className="text-[11px] font-mono text-orange-500 tracking-[0.16em] uppercase mb-4">System flow</p>
                <h2 className="text-3xl lg:text-5xl font-semibold tracking-[-0.04em] leading-tight">
                  Generate 다음에<br />Verify를 둡니다.
                </h2>
                <p className="text-sm text-zinc-600 leading-relaxed mt-6 max-w-sm">
                  좋은 프롬프트 하나에 의존하지 않고, 규칙으로 판단할 오류와 의미로 판단할 오류를 분리했습니다.
                </p>
              </div>

              <div className="border-y border-[#1f1f1f]">
                {FLOW.map(([step, title, desc]) => (
                  <div key={step} className="grid grid-cols-[52px_150px_1fr] gap-4 py-6 border-b border-[#171717] last:border-b-0 items-start">
                    <span className="text-[10px] font-mono text-orange-500">{step}</span>
                    <strong className="text-sm tracking-wide text-zinc-200">{title}</strong>
                    <p className="text-sm text-zinc-600 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#1a1a1a] bg-[#0b0b0b]">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <div>
                <p className="text-[11px] font-mono text-orange-500 tracking-[0.16em] uppercase mb-4">Verified evidence</p>
                <h2 className="text-3xl lg:text-5xl font-semibold tracking-[-0.04em]">무엇을 막았는지 보여줍니다.</h2>
              </div>
              <p className="text-xs font-mono text-zinc-700 max-w-sm leading-relaxed">
                Source: algo-pipeline draft PR #1 / offline audit. 현재 외부 게시 호출은 활성화하지 않았습니다.
              </p>
            </div>

            <div className="space-y-px bg-[#1a1a1a] border border-[#1a1a1a]">
              {CHECKS.map((check) => (
                <article key={check.label} className="bg-[#090909] p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-[.65fr_1.35fr] gap-8">
                  <div>
                    <p className="text-[10px] font-mono text-orange-500 tracking-[0.14em] mb-4">{check.label}</p>
                    <h3 className="text-xl lg:text-2xl font-medium tracking-tight text-zinc-100 leading-snug">{check.title}</h3>
                  </div>
                  <div className="border border-[#202020] bg-[#0d0d0d] p-5 font-mono">
                    <div className="grid grid-cols-[90px_1fr] gap-4 text-xs py-2 border-b border-[#1b1b1b]">
                      <span className="text-zinc-700">INPUT</span>
                      <span className="text-zinc-400">{check.before}</span>
                    </div>
                    <div className="grid grid-cols-[90px_1fr] gap-4 text-xs py-3">
                      <span className="text-zinc-700">RESULT</span>
                      <span className="text-orange-400">{check.result}</span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed mt-4 font-sans">{check.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#1a1a1a]">
          <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <p className="text-[11px] font-mono text-orange-500 tracking-[0.16em] uppercase mb-4">Current boundary</p>
              <h2 className="text-3xl lg:text-5xl font-semibold tracking-[-0.04em] leading-tight">
                운영 중인 척하지 않습니다.
              </h2>
            </div>
            <div className="space-y-7 text-sm text-zinc-500 leading-relaxed">
              <p>
                과거에는 Windows Task Scheduler와 Instagram Graph API를 이용한 자동 발행 흐름을 운영했지만,
                현재 품질 강화 브랜치는 실제 외부 게시를 차단한 Dry-run 상태입니다.
              </p>
              <p>
                이 콘솔은 현재 시점의 시스템 경계를 그대로 보여주기 위해 만들어졌습니다. 예전 사이트의
                “매일 자동 업로드 중” 같은 표현은 더 이상 사용하지 않습니다.
              </p>
              <div className="flex flex-wrap gap-3 pt-3">
                <a
                  href="https://github.com/YunhuPark/algo-pipeline/pull/1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex border border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-black px-5 py-3 text-xs font-mono transition-colors"
                >
                  Inspect hardening PR ↗
                </a>
                <a
                  href="https://github.com/YunhuPark/algo-pipeline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex border border-[#2a2a2a] text-zinc-400 hover:border-zinc-500 hover:text-zinc-100 px-5 py-3 text-xs font-mono transition-colors"
                >
                  Repository ↗
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

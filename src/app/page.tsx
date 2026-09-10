import Header from '@/components/Header';
import Footer from '@/components/Footer';

const METRICS = [
  { value: '198', label: 'main tests passed', note: 'Instagram auth hardening merge' },
  { value: 'V2', label: 'queue + fact check', note: 'lineage + evidence contract' },
  { value: 'BLOCKED', label: 'unsupported number', note: 'deterministic verifier' },
  { value: 'OFF', label: 'unattended publish', note: 'staged rollout default' },
];

const FLOW = [
  ['01', 'COLLECT', '원문과 보조 출처를 수집하고 출처 metadata를 남깁니다.'],
  ['02', 'GENERATE', 'Claim과 카드뉴스 초안을 생성합니다.'],
  ['03', 'VERIFY', 'Queue lineage, 수치 근거, schema, 의미 품질을 분리해 검사합니다.'],
  ['04', 'REVIEW', '사람 편집·승인 뒤에만 게시 후보가 됩니다.'],
  ['05', 'PUBLISH', 'durable attempt와 원격 ID 상태를 기준으로 게시 상태를 확정합니다.'],
];

const CHECKS = [
  {
    label: 'QUEUE LINEAGE V2',
    title: '출처 연결이 깨진 콘텐츠는 게시 후보가 되지 않습니다.',
    before: 'source metadata / schema / lineage hash',
    result: 'ATTESTED OR BLOCKED',
    detail: 'legacy·malformed·hash mismatch 항목은 fail-closed로 격리합니다.',
  },
  {
    label: 'FACT CHECKER V2',
    title: '근거 없는 숫자와 의미 왜곡을 서로 다른 방식으로 검사합니다.',
    before: 'claim + evidence',
    result: 'DETERMINISTIC + SEMANTIC',
    detail: '명확한 오류는 코드로, 문맥 왜곡은 Semantic Critic으로 다시 확인합니다.',
  },
  {
    label: 'PUBLISH BOUNDARY',
    title: '원격 게시가 불확실하면 자동으로 다시 보내지 않습니다.',
    before: 'durable attempt / remote id',
    result: 'UNCERTAIN → STOP',
    detail: 'stale·uncertain attempt는 자동 reset·자동 retry하지 않습니다.',
  },
  {
    label: 'INSTAGRAM AUTH',
    title: 'Queue를 꺼내기 전에 게시 계정부터 확인합니다.',
    before: 'Instagram Login / read-only /me',
    result: 'ACCOUNT MATCH REQUIRED',
    detail: '자격증명과 계정 불일치는 Queue 상태를 건드리기 전에 fail-closed 처리합니다.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100">
      <Header />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-36 pb-24">
          <div className="flex flex-wrap items-center gap-3 mb-8 font-mono text-[10px] tracking-[0.18em] uppercase">
            <span className="border border-orange-500/50 text-orange-400 px-3 py-1.5">Hardened main</span>
            <span className="text-zinc-600">Staged rollout</span>
            <span className="text-zinc-700">2026</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_.75fr] gap-14 items-end">
            <div>
              <p className="text-[11px] font-mono text-zinc-600 tracking-[0.18em] uppercase mb-5">Evidence-bound autonomous content agent</p>
              <h1 className="font-semibold text-zinc-50 leading-[0.88] tracking-[-0.055em]" style={{ fontSize: 'clamp(62px, 10vw, 132px)' }}>
                ALGO<br />PIPELINE
              </h1>
            </div>
            <div className="pb-2">
              <p className="text-xl text-zinc-300 leading-relaxed tracking-tight">
                생성량보다,<br /><span className="text-orange-400">검증 가능한 운영 경계</span>를 먼저 만들었습니다.
              </p>
              <p className="text-sm text-zinc-600 leading-relaxed mt-6 max-w-md">
                뉴스 수집 → 근거 기반 생성 → 검증 → 사람 승인 → 게시 상태 기록을 하나의 fail-closed 흐름으로 연결했습니다.
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
                <h2 className="text-3xl lg:text-5xl font-semibold tracking-[-0.04em] leading-tight">Generate 다음에<br />검증과 승인을 둡니다.</h2>
                <p className="text-sm text-zinc-600 leading-relaxed mt-6 max-w-sm">좋은 프롬프트 하나에 의존하지 않고 근거, 상태, 권한을 각각 확인합니다.</p>
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
                <p className="text-[11px] font-mono text-orange-500 tracking-[0.16em] uppercase mb-4">Verified boundaries</p>
                <h2 className="text-3xl lg:text-5xl font-semibold tracking-[-0.04em]">무엇을 막는지가 시스템을 설명합니다.</h2>
              </div>
              <p className="text-xs font-mono text-zinc-700 max-w-sm leading-relaxed">Source: algo-pipeline hardened main. Unattended publishing remains disabled by default.</p>
            </div>

            <div className="space-y-px bg-[#1a1a1a] border border-[#1a1a1a]">
              {CHECKS.map((check) => (
                <article key={check.label} className="bg-[#090909] p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-[.65fr_1.35fr] gap-8">
                  <div>
                    <p className="text-[10px] font-mono text-orange-500 tracking-[0.14em] mb-4">{check.label}</p>
                    <h3 className="text-xl lg:text-2xl font-medium tracking-tight text-zinc-100 leading-snug">{check.title}</h3>
                  </div>
                  <div className="border border-[#202020] bg-[#0d0d0d] p-5 font-mono">
                    <div className="grid grid-cols-[90px_1fr] gap-4 text-xs py-2 border-b border-[#1b1b1b]"><span className="text-zinc-700">INPUT</span><span className="text-zinc-400">{check.before}</span></div>
                    <div className="grid grid-cols-[90px_1fr] gap-4 text-xs py-3"><span className="text-zinc-700">RESULT</span><span className="text-orange-400">{check.result}</span></div>
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
              <p className="text-[11px] font-mono text-orange-500 tracking-[0.16em] uppercase mb-4">Current experiment</p>
              <h2 className="text-3xl lg:text-5xl font-semibold tracking-[-0.04em] leading-tight">다음 단계는<br />closed-loop quality입니다.</h2>
            </div>
            <div className="space-y-7 text-sm text-zinc-500 leading-relaxed">
              <p>현재 Draft PR #7에서는 근거 기반 생성 → 사람 편집·승인 → Instagram 성과 snapshot → 주간 품질 회고 → 승인 대기 실험 제안을 연결하고 있습니다.</p>
              <p>Draft 기능과 main 완료 기능을 섞지 않습니다. 실제 카드뉴스 샘플의 시각 검토 전에는 병합하지 않도록 경계를 유지하고 있습니다.</p>
              <div className="flex flex-wrap gap-3 pt-3">
                <a href="https://github.com/YunhuPark/algo-pipeline/pull/7" target="_blank" rel="noopener noreferrer" className="inline-flex border border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-black px-5 py-3 text-xs font-mono transition-colors">Inspect active Draft #7 ↗</a>
                <a href="https://github.com/YunhuPark/algo-pipeline" target="_blank" rel="noopener noreferrer" className="inline-flex border border-[#2a2a2a] text-zinc-400 hover:border-zinc-500 hover:text-zinc-100 px-5 py-3 text-xs font-mono transition-colors">Repository ↗</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

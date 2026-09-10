import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LOGS = [
  { id: 'AUDIT-001', gate: 'NUMBER_UNSUPPORTED', result: 'BLOCKED', evidence: '근거 없는 숫자 Claim은 결정론 검증에서 차단' },
  { id: 'AUDIT-002', gate: 'QUEUE_LINEAGE_V2', result: 'PASS', evidence: 'source metadata · schema version · lineage hash 검증' },
  { id: 'AUDIT-003', gate: 'PUBLISH_ATTEMPT', result: 'DURABLE', evidence: '원격 게시 전에 attempt 기록, uncertain/stale 자동 재시도 차단' },
  { id: 'AUDIT-004', gate: 'INSTAGRAM_PREFLIGHT', result: 'FAIL-CLOSED', evidence: 'remote /me account match 전 Queue dequeue 금지' },
  { id: 'AUDIT-005', gate: 'TEST_SUITE', result: '198 PASS', evidence: 'Instagram 인증 하드닝 병합 시 main 전체 테스트 기록' },
  { id: 'AUDIT-006', gate: 'AUTO_PUBLISH', result: 'OFF', evidence: '무인 자동 게시 기본 비활성화, staged rollout 필요' },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100">
      <Header />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-36 pb-16">
          <p className="text-[11px] font-mono text-orange-500 tracking-[0.18em] uppercase mb-5">Verification log</p>
          <h1 className="font-semibold text-zinc-50 leading-[0.92] tracking-[-0.045em] mb-8" style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}>검증 기록</h1>
          <p className="text-base text-zinc-500 max-w-xl leading-relaxed">
            실시간 운영 대시보드가 아니라, 현재 hardened main에 병합된 신뢰성·보안 경계와 검증 근거를 포트폴리오용으로 정리한 화면입니다.
          </p>
        </section>

        <section className="border-t border-[#1a1a1a]">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1a1a1a] border border-[#1a1a1a] mb-14">
              <div className="bg-[#0b0b0b] p-5"><strong className="text-3xl">198</strong><p className="text-[10px] font-mono text-zinc-600 mt-2">MAIN TESTS PASSED</p></div>
              <div className="bg-[#0b0b0b] p-5"><strong className="text-3xl text-orange-400">BLOCKED</strong><p className="text-[10px] font-mono text-zinc-600 mt-2">UNSUPPORTED NUMBER</p></div>
              <div className="bg-[#0b0b0b] p-5"><strong className="text-3xl">V2</strong><p className="text-[10px] font-mono text-zinc-600 mt-2">QUEUE + FACT CHECK</p></div>
              <div className="bg-[#0b0b0b] p-5"><strong className="text-3xl">OFF</strong><p className="text-[10px] font-mono text-zinc-600 mt-2">UNATTENDED PUBLISH</p></div>
            </div>

            <div className="border border-[#1f1f1f]">
              <div className="hidden md:grid grid-cols-[120px_190px_130px_1fr] gap-5 px-6 py-3 bg-[#0d0d0d] border-b border-[#1f1f1f] text-[10px] font-mono text-zinc-700 uppercase tracking-wider">
                <span>ID</span><span>Gate</span><span>Result</span><span>Evidence</span>
              </div>
              {LOGS.map((log) => (
                <article key={log.id} className="grid grid-cols-1 md:grid-cols-[120px_190px_130px_1fr] gap-3 md:gap-5 px-6 py-5 border-b border-[#171717] last:border-b-0 hover:bg-[#0d0d0d] transition-colors">
                  <span className="text-[11px] font-mono text-zinc-700">{log.id}</span>
                  <span className="text-xs font-mono text-zinc-400">{log.gate}</span>
                  <strong className="text-xs font-mono text-orange-400">{log.result}</strong>
                  <span className="text-sm text-zinc-500 leading-relaxed">{log.evidence}</span>
                </article>
              ))}
            </div>

            <div className="mt-12 border-l-2 border-orange-500 pl-5 max-w-2xl space-y-3">
              <p className="text-sm text-zinc-400 leading-relaxed">
                초기 Quality Hardening PR #1은 이미 main에 병합됐습니다. 이후 staged rollout, public image delivery guard, Instagram Login credential hardening까지 추가 병합됐습니다.
              </p>
              <p className="text-sm text-zinc-500 leading-relaxed">
                현재 Draft PR #7의 closed-loop quality review는 별도 실험 단계입니다. Draft의 최신 CI 숫자는 main 완료 증거와 섞지 않습니다.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

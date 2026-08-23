import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LOGS = [
  {
    id: 'AUDIT-001',
    gate: 'NUMBER_UNSUPPORTED',
    result: 'BLOCKED',
    evidence: '근거 없는 숫자 Claim 회귀테스트 통과',
  },
  {
    id: 'AUDIT-002',
    gate: 'DB_ISOLATION',
    result: 'PASS',
    evidence: 'pytest / sandbox 전후 production DB hash 변화 없음',
  },
  {
    id: 'AUDIT-003',
    gate: 'EXTERNAL_PUBLISH',
    result: 'DISABLED',
    evidence: 'Meta / Instagram 외부 게시 호출 Dry-run 보호',
  },
  {
    id: 'AUDIT-004',
    gate: 'TEST_SUITE',
    result: '104 PASS',
    evidence: '품질 강화 브랜치 전체 자동화 테스트 기록',
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100">
      <Header />

      <main>
        <section className="max-w-6xl mx-auto px-6 pt-36 pb-16">
          <p className="text-[11px] font-mono text-orange-500 tracking-[0.18em] uppercase mb-5">
            Verification log
          </p>
          <h1
            className="font-semibold text-zinc-50 leading-[0.92] tracking-[-0.045em] mb-8"
            style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
          >
            검증 기록
          </h1>
          <p className="text-base text-zinc-500 max-w-xl leading-relaxed">
            이 페이지는 실시간 운영 대시보드가 아닙니다. 현재 hardening branch에서 확인한
            오프라인 테스트와 안전 경계를 포트폴리오용으로 정리한 검증 로그입니다.
          </p>
        </section>

        <section className="border-t border-[#1a1a1a]">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[#1a1a1a] border border-[#1a1a1a] mb-14">
              <div className="bg-[#0b0b0b] p-5"><strong className="text-3xl">104</strong><p className="text-[10px] font-mono text-zinc-600 mt-2">TESTS PASSED</p></div>
              <div className="bg-[#0b0b0b] p-5"><strong className="text-3xl">0</strong><p className="text-[10px] font-mono text-zinc-600 mt-2">PROD DB MUTATIONS</p></div>
              <div className="bg-[#0b0b0b] p-5"><strong className="text-3xl text-orange-400">BLOCKED</strong><p className="text-[10px] font-mono text-zinc-600 mt-2">UNSUPPORTED NUMBER</p></div>
              <div className="bg-[#0b0b0b] p-5"><strong className="text-3xl">OFF</strong><p className="text-[10px] font-mono text-zinc-600 mt-2">EXTERNAL PUBLISH</p></div>
            </div>

            <div className="border border-[#1f1f1f]">
              <div className="hidden md:grid grid-cols-[120px_180px_130px_1fr] gap-5 px-6 py-3 bg-[#0d0d0d] border-b border-[#1f1f1f] text-[10px] font-mono text-zinc-700 uppercase tracking-wider">
                <span>ID</span><span>Gate</span><span>Result</span><span>Evidence</span>
              </div>
              {LOGS.map((log) => (
                <article key={log.id} className="grid grid-cols-1 md:grid-cols-[120px_180px_130px_1fr] gap-3 md:gap-5 px-6 py-5 border-b border-[#171717] last:border-b-0 hover:bg-[#0d0d0d] transition-colors">
                  <span className="text-[11px] font-mono text-zinc-700">{log.id}</span>
                  <span className="text-xs font-mono text-zinc-400">{log.gate}</span>
                  <strong className="text-xs font-mono text-orange-400">{log.result}</strong>
                  <span className="text-sm text-zinc-500 leading-relaxed">{log.evidence}</span>
                </article>
              ))}
            </div>

            <div className="mt-12 border-l-2 border-orange-500 pl-5 max-w-2xl">
              <p className="text-sm text-zinc-400 leading-relaxed">
                현재 결과는 Draft PR #1의 품질 강화 브랜치 기준입니다. 실제 Meta/Instagram 게시 재활성화와
                Scheduler 운영은 별도 검증이 필요한 다음 단계이며, 이 페이지에서는 완료된 것처럼 표현하지 않습니다.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

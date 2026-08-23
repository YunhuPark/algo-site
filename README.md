# Algo Pipeline — Reliability Console

Algo Pipeline의 현재 품질 강화 상태를 과장 없이 보여주는 포트폴리오용 웹 콘솔입니다.

이 사이트는 더 이상 “매일 자동 업로드 중인 서비스”를 주장하지 않습니다. 현재 `algo-pipeline`의 품질 강화 브랜치는 외부 Meta/Instagram 게시를 차단한 **Dry-run** 상태이며, 이 웹사이트는 그 검증 결과와 시스템 경계를 설명합니다.

## What this site shows

- 104 automated tests passed on the hardening branch
- production DB mutation 0 during pytest / sandbox verification
- `NUMBER_UNSUPPORTED` hallucinated numeric claim blocked
- external Meta / Instagram publishing disabled in the hardened branch
- Collect → Generate → Verify → Operate reliability flow
- static verification log at `/dashboard`

## Source of truth

- Pipeline repository: https://github.com/YunhuPark/algo-pipeline
- Hardening PR: https://github.com/YunhuPark/algo-pipeline/pull/1

The hardening PR is still a Draft PR. Scheduler reactivation and real external publishing require separate validation.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Vercel

## Local run

```bash
npm install
npm run dev
```

No Instagram token is required for the Reliability Console pages. Legacy Instagram integration code remains in the repository for historical reference but is no longer used by the homepage or verification log.

# 알고

GPT-4o · Tavily · DALL-E 3 · Instagram Graph API로 구성된 AI 카드뉴스 자동화 파이프라인의 결과물을 보여주는 Next.js 사이트입니다.

매일 최신 AI 뉴스를 수집해 카드뉴스로 변환하고 Instagram에 자동 업로드하며, 이 사이트에서는 생성된 카드뉴스와 파이프라인 동작 방식을 확인할 수 있습니다.

**배포 주소:** https://algo-site-hazel.vercel.app  
**Instagram:** [@algo__kr](https://instagram.com/algo__kr)

---

## 파이프라인 구조

```
Tavily API          →  최신 AI 뉴스 수집 (기사 전문 추출)
GPT-4o              →  6장 카드뉴스 스크립트 생성 + 팩트체크
DALL-E 3 · Pillow   →  1080×1350px 슬라이드 렌더링
Instagram Graph API →  캐러셀 자동 업로드
```

## 주요 기능

- **갤러리** — Instagram에 업로드된 카드뉴스를 실시간으로 불러와 표시 (1시간 캐시)
- **투명성 오버레이** — 카드 호버 시 출처 기사, GPT 앵글, 팩트체크 결과, 생성 소요시간 표시
- **파이프라인 설명** — 실제 코드 스니펫과 함께 각 단계 동작 방식 소개

## 기술 스택

| 역할 | 도구 |
|------|------|
| 프레임워크 | Next.js 15 (App Router) |
| 스타일 | Tailwind CSS |
| 폰트 | Geist / Geist Mono |
| 데이터 | Instagram Graph API (ISR revalidate: 1h) |
| 배포 | Vercel |

## 로컬 실행

```bash
npm install
```

`.env.local` 파일 생성:

```
IG_ACCESS_TOKEN=인스타그램_액세스_토큰
IG_USER_ID=인스타그램_유저_ID
```

```bash
npm run dev
```

## 환경변수

| 변수 | 설명 |
|------|------|
| `IG_ACCESS_TOKEN` | Instagram Graph API 액세스 토큰 |
| `IG_USER_ID` | Instagram 비즈니스 계정 유저 ID |
| `NEXT_PUBLIC_DASHBOARD_URL` | (선택) 내부 대시보드 URL — 설정 시 헤더에 링크 노출 |

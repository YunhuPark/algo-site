# 알고 (algo)

매일 아침 AI가 최신 뉴스를 수집하고, 스크립트를 쓰고, 디자인하고, 인스타그램에 올립니다.
사람은 아무것도 하지 않아도 됩니다.

**사이트**: https://algo-site-hazel.vercel.app  
**인스타그램**: [@algo__kr](https://instagram.com/algo__kr)

---

## 어떻게 동작하나요

뉴스 수집부터 업로드까지 전 과정이 자동화되어 있습니다.

```
01. Tavily API      최신 AI 뉴스 기사 전문 수집 (14,000자+)
02. GPT-4o          6장 카드뉴스 스크립트 생성
                    → 5가지 마케팅 앵글 중 자동 선택
                    → 핵심 수치 팩트체크 자기검증
03. DALL-E 3        슬라이드별 배경 이미지 생성
    Pillow          1080×1350px 카드 렌더링
04. Instagram       캐러셀 자동 업로드 + 퍼머링크 저장
    Graph API
```

하루 한 번 Windows 작업 스케줄러가 파이프라인을 자동 실행합니다.
노트북 절전 해제 시에도 트리거됩니다.

---

## 카드뉴스 한 장이 만들어지는 과정

**앵글 선택** — GPT가 수집된 뉴스를 보고 "Why Now", "Controversy", "Data Insight" 등 5가지 앵글 중 가장 적합한 방향을 선택합니다.

**스크립트 생성** — 커버(훅) → 콘텐츠 4장 → CTA 구조로 스크립트를 JSON으로 생성합니다. 생성 직후 수치와 사실관계를 자동으로 재검증합니다.

**이미지 렌더링** — 슬라이드 타입(커버/콘텐츠/CTA)에 따라 레이아웃이 달라집니다. DALL-E 3가 배경을 만들고, Pillow가 텍스트·배지·그라디언트를 합성합니다.

**업로드** — Instagram Graph API로 캐러셀을 게시하고, 결과를 DB와 `meta.json`으로 저장합니다.

---

## 이 사이트에서 볼 수 있는 것

- 생성된 카드뉴스 갤러리 (Instagram Graph API, 1시간 캐시)
- 카드 호버 시 생성 메타데이터: 출처 기사, GPT 앵글, 팩트체크 결과, 소요 시간

---

## 기술 스택

**파이프라인 (Python)**

| 역할 | 도구 |
|------|------|
| 뉴스 수집 | Tavily API |
| 스크립트 | GPT-4o (OpenAI) |
| 이미지 생성 | DALL-E 3 |
| 카드 렌더링 | Pillow |
| 업로드 | Instagram Graph API |
| 이미지 서버 | ngrok |
| 스케줄링 | Windows 작업 스케줄러 |

**사이트 (Next.js)**

| 역할 | 도구 |
|------|------|
| 프레임워크 | Next.js 15 App Router |
| 스타일 | Tailwind CSS |
| 폰트 | Geist / Geist Mono |
| 배포 | Vercel |

---

## 로컬 실행

```bash
npm install
```

`.env.local` 생성:

```env
IG_ACCESS_TOKEN=인스타그램_액세스_토큰
IG_USER_ID=인스타그램_비즈니스_계정_유저_ID
# NEXT_PUBLIC_DASHBOARD_URL=http://localhost:5001  # 선택
```

```bash
npm run dev
```

카드뉴스 생성 메타데이터를 갱신하려면:

```bash
# cardnews 프로젝트에서 실행
python scripts/export_meta.py
```

---

## 환경변수

| 변수 | 필수 | 설명 |
|------|------|------|
| `IG_ACCESS_TOKEN` | O | Instagram Graph API 액세스 토큰 |
| `IG_USER_ID` | O | Instagram 비즈니스 계정 유저 ID |
| `NEXT_PUBLIC_DASHBOARD_URL` | X | 내부 대시보드 URL (설정 시 헤더에 링크 노출) |

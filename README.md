# KIS정보통신 이메일 클라이언트

React + TypeScript + Tailwind CSS로 구현된 이메일 클라이언트 웹 애플리케이션입니다.  
메일 보기 화면과 AI 연동 버튼을 포함한 데모 UI를 제공합니다.

## 주요 기능

- 메일 목록/본문 보기 UI
- 수신자, 참조, 서명 등의 메타 정보 표시
- `mail_context` 생성 후 API로 전송
- 응답으로 받은 `conversation_id`로 새 창 열기

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프리뷰 실행
npm run preview
```

## 환경 및 요구사항

- Node.js 18 이상 권장
- 패키지 매니저: npm

## API 연동

`src/components/EmailViewer.tsx`에서 아래 엔드포인트로 POST 요청을 전송합니다.

- URL: `http://127.0.0.1:8000/api/v1/conversation`
- Payload: `{ mail_context: string }`

응답 예시:

```json
{
  "conversation_id": "abc123"
}
```

`conversation_id`가 존재하면 `http://localhost:5173?conversation_id=...`로 새 창을 엽니다.

## 프로젝트 구조

```
src/
  components/   UI 컴포넌트
  data/         샘플 데이터
  types/        타입 정의
```

## 스크립트

- `npm run dev`: 로컬 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run preview`: 빌드 결과 미리보기

## 기술 스택

- React 18
- TypeScript
- Tailwind CSS
- Vite

# npm 배포 가이드 — vietnamese-legal-mcp

## 패키지 구성

| 명령 | 스크립트 |
|------|----------|
| `npx vietnamese-legal-mcp` | `install-mcp.js` — Claude/Cursor/Codex에 MCP 서버 등록 |
| `npx vietnamese-legal-skill` | `install-skill.js` — SKILL.md + reference.md + query.py 설치 |

---

## 배포 순서

### 1. npm 토큰 설정

npmjs.com → **Account → Access Tokens → Generate New Token**

두 가지 방식 중 하나:

| 방식 | 설정 | Bypass 2FA |
|------|------|-----------|
| **Classic → Automation** | 권장. 만료일 설정 불가 | 자동 |
| **Granular** | 만료일 설정 가능 | **"Bypass 2FA" 체크 필수** |

> Granular 토큰 발급 시 "Bypass 2FA" 를 체크하지 않으면 403 오류 발생.  
> 현재 사용 중인 토큰: npmjs.com Access Tokens 페이지에서 확인 (Granular, Bypass 2FA 설정)

```bash
npm config set //registry.npmjs.org/:_authToken npm_xxxxxxxxxxxxxxxx
```

### 2. 버전 올리기

`package.json`의 `version` 필드를 수동으로 수정합니다.

```json
"version": "1.2.11"
```

> `npm version patch` 명령은 git 커밋이 필요하므로 수동 수정이 편합니다.

### 3. 배포

```bash
cd C:\workspace\ruleway-vietnam\ruleway-vietnam-mcp
npm publish --access public
```

### 4. GitHub push (선택)

```bash
git add -A
git commit -m "release: vX.X.X - 변경 내용 요약"
git push origin main
```

> GitHub push는 npm 배포와 무관합니다. 별도로 진행해도 됩니다.

---

## 변경 시 배포 기준

| 변경 내용 | 배포 필요 여부 |
|-----------|---------------|
| SKILL.md 내용 변경 | **필요** (skill 재설치해야 반영) |
| server.ts 도구 설명 변경 | **불필요** (MCP SSE로 자동 반영) |
| openapi.yaml 변경 | **불필요** (GPTs에서 직접 붙여넣기) |
| install-mcp.js / install-skill.js 변경 | **필요** |
| reference.md / query.py 변경 | **필요** |

---

## 주의사항

- SKILL.md는 반드시 **UTF-8 without BOM** 으로 저장 (BOM 포함 시 frontmatter 파싱 오류)
- `install-skill.js`의 `copyFile` 함수가 복사 시 BOM을 자동 제거하도록 처리됨 (v1.2.11~)

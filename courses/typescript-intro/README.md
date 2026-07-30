# 타입으로 버그 막기 — TypeScript 입문

8개 레슨으로 구성된 TypeScript 입문 과정입니다. 각 레슨은 독립적으로 실행 가능한 `.ts` 파일로 제공됩니다.

## 사전 요구사항

- Node.js 20+

## 설치

```bash
npm install
```

## 실행 방법

각 레슨 파일을 `npx tsx`로 직접 실행합니다:

```bash
npx tsx src/01-basic-types.ts
npx tsx src/02-type-inference.ts
npx tsx src/03-interfaces.ts
npx tsx src/04-function-types.ts
npx tsx src/05-union-narrowing.ts
npx tsx src/06-generics.ts
npx tsx src/07-modules.ts
npx tsx src/08-migration-example/after.ts
```

## 레슨 목록

| # | 파일 | 주제 |
|---|------|------|
| 1 | `src/01-basic-types.ts` | 기본 타입: string, number, boolean, array, tuple, enum |
| 2 | `src/02-type-inference.ts` | 타입 추론: let/const, 반환 타입, 문맥적 타이핑 |
| 3 | `src/03-interfaces.ts` | 인터페이스와 타입: interface vs type, extends, optional, readonly |
| 4 | `src/04-function-types.ts` | 함수 타입: 매개변수, 반환 타입, 선택적 매개변수, 나머지 매개변수, 오버로드 |
| 5 | `src/05-union-narrowing.ts` | 유니온과 내로잉: union, typeof, in, 판별 유니온 |
| 6 | `src/06-generics.ts` | 제네릭: 함수, 인터페이스, 제약, 유틸리티 타입 |
| 7 | `src/07-modules.ts` | 모듈: named export, default export, re-export |
| 8 | `src/08-migration-example/` | JS→TS 마이그레이션 실습 |

## 타입 검사

전체 프로젝트의 타입 검사를 실행합니다:

```bash
npx tsc --noEmit
```

// ============================================================
// 레슨 7: 모듈 (Modules)
// import/export로 코드를 파일 단위로 분리하고 재사용합니다.
// ============================================================

// --- named import: 이름으로 가져오기 ---
import { add, subtract, PI } from "./07-utils.js";

console.log("named import (add):", add(10, 5));
console.log("named import (subtract):", subtract(10, 5));
console.log("named import (PI):", PI);

// --- default import: 기본 가져오기 ---
// default export는 가져올 때 이름을 자유롭게 정할 수 있습니다.
import Calculator from "./07-utils.js";

const calc = new Calculator();
console.log("default import:", calc.calculate("add", 3, 7));
console.log("default import:", calc.calculate("multiply", 4, 5));
console.log("계산 이력:", calc.getHistory());

// --- 타입 가져오기 (type-only import) ---
// 런타임에 필요 없는 타입만 가져올 때 사용합니다.
import type { MathResult } from "./07-utils.js";

function formatResult(r: MathResult): string {
  return `${r.operation}: ${r.result}`;
}
console.log("type import:", formatResult({ operation: "test", result: 42 }));

// --- 별칭으로 가져오기 (alias) ---
import { add as plus, subtract as minus } from "./07-utils.js";
console.log("alias (plus):", plus(1, 2));
console.log("alias (minus):", minus(10, 3));

// --- 전체 모듈 가져오기 (namespace import) ---
import * as MathUtils from "./07-utils.js";
console.log("namespace import:", MathUtils.add(100, 200));
console.log("namespace PI:", MathUtils.PI);

// --- re-export 패턴 ---
// 실제 프로젝트에서는 index.ts에서 여러 모듈을 모아 re-export합니다.
// export { add, subtract } from "./07-utils.js";
// export { default as Calculator } from "./07-utils.js";

// --- 모듈 구성 팁 ---
// 1. 한 파일에 관련 기능을 모으고 named export 사용
// 2. default export는 모듈의 주요 클래스/함수에만 사용
// 3. 타입만 가져올 때는 import type 사용 (번들 크기 최적화)
// 4. barrel 파일(index.ts)로 공개 API를 정리

console.log("\n✅ 레슨 7 완료: 모듈로 코드를 체계적으로 구성하세요!");

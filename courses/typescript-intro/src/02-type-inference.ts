// ============================================================
// 레슨 2: 타입 추론 (Type Inference)
// TypeScript는 명시적 타입 선언 없이도 타입을 자동으로 추론합니다.
// ============================================================
export {};

// --- let vs const 추론 차이 ---
let city = "서울";        // 타입: string (변경 가능)
city = "부산";            // ✅ 다른 문자열 할당 가능

const country = "한국";   // 타입: "한국" (리터럴 타입)
// country = "일본";      // ❌ const는 재할당 불가

console.log("let 추론 (string):", city);
console.log("const 추론 (리터럴):", country);

// --- 숫자와 배열 추론 ---
let count = 10;           // 타입: number
const maxRetries = 3;     // 타입: 3 (리터럴)
const mixed = [1, "두", 3]; // 타입: (string | number)[]
console.log("배열 추론:", mixed);

// --- 반환 타입 추론 ---
function add(a: number, b: number) {
  return a + b; // 반환 타입: number (자동 추론)
}

function greet(name: string) {
  return `안녕하세요, ${name}님!`; // 반환 타입: string
}

console.log("반환 타입 추론 (number):", add(3, 5));
console.log("반환 타입 추론 (string):", greet("민지"));

// 조건부 반환은 유니온 타입으로 추론됩니다.
function getResult(success: boolean) {
  if (success) return { data: "성공 데이터" };
  return null;
}
// 반환 타입: { data: string } | null
console.log("조건부 반환 추론:", getResult(true));

// --- 문맥적 타이핑 (Contextual Typing) ---
const names = ["철수", "영희", "민수"];

// map 콜백에서 name은 자동으로 string으로 추론
const upperNames = names.map((name) => name.toUpperCase());
console.log("문맥적 타이핑 (map):", upperNames);

// --- 변수 초기화 없이 선언하면 any ---
let laterAssigned; // 타입: any (초기값 없음)
laterAssigned = "문자열";
laterAssigned = 100;
// ⚠️ 가능하면 선언 시 초기화하여 타입 추론을 활용하세요.

// --- 구조 분해에서의 추론 ---
const point = { x: 10, y: 20 };
const { x, y } = point; // x: number, y: number
console.log("구조 분해 추론:", x, y);

const [first, second] = ["하나", "둘"];
console.log("배열 구조 분해:", first, second);

// --- Best Practice: 언제 타입을 명시할까? ---
// 1. 함수 매개변수: 항상 명시 (추론 불가)
// 2. 함수 반환 타입: 복잡하거나 공개 API일 때 명시
// 3. 변수: 초기값에서 추론 가능하면 생략
function parseAge(input: string): number | null {
  const parsed = parseInt(input, 10);
  return isNaN(parsed) ? null : parsed;
}
console.log("명시적 반환 타입:", parseAge("25"), parseAge("abc"));

console.log("\n✅ 레슨 2 완료: 타입 추론으로 코드를 간결하게 작성할 수 있습니다!");

// ============================================================
// 레슨 4: 함수 타입 (Function Types)
// 함수의 매개변수와 반환값에 타입을 지정하는 방법을 알아봅니다.
// ============================================================
export {};

// --- 기본 매개변수 타입과 반환 타입 ---
function multiply(a: number, b: number): number {
  return a * b;
}
console.log("기본 함수:", multiply(3, 7));

// 반환 타입이 맞지 않으면 에러:
// function broken(a: number, b: number): string {
//   return a * b; // ❌ number를 string으로 반환할 수 없음
// }

// --- 화살표 함수 ---
const divide = (a: number, b: number): number => {
  if (b === 0) throw new Error("0으로 나눌 수 없습니다");
  return a / b;
};
console.log("화살표 함수:", divide(10, 3));

// --- 함수 타입 표현식 ---
type MathOperation = (x: number, y: number) => number;

const add: MathOperation = (x, y) => x + y;
const subtract: MathOperation = (x, y) => x - y;
console.log("함수 타입 표현식:", add(5, 3), subtract(10, 4));

// --- 선택적 매개변수 (Optional Parameters) ---
function createUser(name: string, age?: number): string {
  if (age !== undefined) return `${name} (${age}세)`;
  return name;
}
console.log("선택적 매개변수:", createUser("영희"));
console.log("선택적 매개변수:", createUser("철수", 30));

// 선택적 매개변수는 항상 필수 매개변수 뒤에 와야 합니다.
// function bad(age?: number, name: string) {} // ❌ 에러

// --- 기본값 매개변수 (Default Parameters) ---
function greet(name: string, greeting: string = "안녕하세요"): string {
  return `${greeting}, ${name}님!`;
}
console.log("기본값:", greet("민수"));
console.log("기본값 재정의:", greet("민수", "환영합니다"));

// --- 나머지 매개변수 (Rest Parameters) ---
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log("나머지 매개변수:", sum(1, 2, 3, 4, 5));

function logWithPrefix(prefix: string, ...messages: string[]): void {
  messages.forEach((msg) => console.log(`[${prefix}] ${msg}`));
}
logWithPrefix("INFO", "서버 시작", "포트 3000", "준비 완료");

// --- 함수 오버로드 (Overloads) ---
function format(value: string): string;
function format(value: number): string;
function format(value: Date): string;
function format(value: string | number | Date): string {
  if (typeof value === "string") return value.toUpperCase();
  if (typeof value === "number") return value.toLocaleString("ko-KR");
  return value.toLocaleDateString("ko-KR");
}

console.log("오버로드 (string):", format("hello"));
console.log("오버로드 (number):", format(1234567));
console.log("오버로드 (Date):", format(new Date(2024, 0, 15)));

// --- 콜백 함수 타입 ---
function processItems(items: string[], callback: (item: string, index: number) => void): void {
  items.forEach((item, i) => callback(item, i));
}

processItems(["A", "B", "C"], (item, index) => {
  console.log(`콜백: [${index}] ${item}`);
});

// --- void 반환 타입 ---
type VoidCallback = () => void;
const cb: VoidCallback = () => {
  return 42; // ✅ void 타입이지만 에러 아님 (값이 무시됨)
};
// const result: number = cb(); // ❌ void를 number에 할당 불가

console.log("\n✅ 레슨 4 완료: 함수에 타입을 지정하여 호출 실수를 방지하세요!");

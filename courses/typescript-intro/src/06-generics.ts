// ============================================================
// 레슨 6: 제네릭 (Generics)
// 타입을 매개변수처럼 사용하여 재사용 가능한 코드를 작성합니다.
// ============================================================
export {};

// --- 제네릭 함수 기본 ---
// T는 타입 매개변수: 호출 시 실제 타입으로 대체됩니다.
function identity<T>(value: T): T {
  return value;
}

// 명시적으로 타입 지정
console.log("제네릭 (명시):", identity<string>("안녕"));
console.log("제네릭 (명시):", identity<number>(42));

// 타입 추론으로 자동 결정
console.log("제네릭 (추론):", identity("자동 추론"));

// --- 제네릭 배열 함수 ---
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log("getFirst (string[]):", getFirst(["사과", "바나나"]));
console.log("getFirst (number[]):", getFirst([10, 20, 30]));
console.log("getFirst (빈 배열):", getFirst([]));

// --- 여러 타입 매개변수 ---
function pair<A, B>(first: A, second: B): [A, B] {
  return [first, second];
}

const p = pair("이름", 25);
console.log("여러 타입 매개변수:", p);

// --- 제네릭 인터페이스 ---
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: number;
}

const userResponse: ApiResponse<{ name: string; age: number }> = {
  success: true,
  data: { name: "김민지", age: 28 },
  timestamp: Date.now(),
};
console.log("제네릭 인터페이스:", userResponse);

const listResponse: ApiResponse<string[]> = {
  success: true,
  data: ["항목1", "항목2", "항목3"],
  timestamp: Date.now(),
};
console.log("제네릭 인터페이스 (배열):", listResponse);

// --- 제네릭 제약 (Constraints) ---
// extends로 타입 매개변수에 조건을 부여합니다.
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(value: T): void {
  console.log(`길이: ${value.length}`);
}

logLength("문자열");       // string은 length 속성이 있음
logLength([1, 2, 3]);     // 배열도 length 속성이 있음
// logLength(123);         // ❌ number에는 length가 없음

// keyof를 이용한 제약
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "철수", age: 30, city: "서울" };
console.log("keyof 제약:", getProperty(person, "name"));
console.log("keyof 제약:", getProperty(person, "age"));
// getProperty(person, "phone"); // ❌ "phone"은 person의 키가 아님

// --- 유틸리티 타입 (Utility Types) ---
interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// Partial<T>: 모든 속성을 선택적으로
function updateTodo(todo: Todo, update: Partial<Todo>): Todo {
  return { ...todo, ...update };
}

const todo: Todo = { id: 1, title: "학습", description: "TS 공부", completed: false };
const updated = updateTodo(todo, { completed: true });
console.log("Partial:", updated);

// Pick<T, K>: 특정 속성만 선택
type TodoPreview = Pick<Todo, "id" | "title">;
const preview: TodoPreview = { id: 1, title: "학습" };
console.log("Pick:", preview);

// Omit<T, K>: 특정 속성 제외
type TodoWithoutDesc = Omit<Todo, "description">;
const simple: TodoWithoutDesc = { id: 2, title: "운동", completed: false };
console.log("Omit:", simple);

// Record<K, V>: 키-값 매핑
type ScoreMap = Record<string, number>;
const scores: ScoreMap = { 수학: 95, 영어: 88, 국어: 92 };
console.log("Record:", scores);

// Required<T>: 모든 속성을 필수로
interface OptionalConfig {
  host?: string;
  port?: number;
}
type FullConfig = Required<OptionalConfig>;
const fullConfig: FullConfig = { host: "localhost", port: 3000 };
console.log("Required:", fullConfig);

console.log("\n✅ 레슨 6 완료: 제네릭으로 타입 안전하고 재사용 가능한 코드를 작성하세요!");

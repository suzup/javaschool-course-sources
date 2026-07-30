// ============================================================
// 레슨 1: 기본 타입 (Basic Types)
// TypeScript의 핵심 기본 타입을 알아봅니다.
// ============================================================
export {};

// --- string: 문자열 ---
const greeting: string = "안녕하세요, TypeScript!";
console.log("string:", greeting);

// --- number: 숫자 (정수와 소수 모두 number) ---
const age: number = 25;
const pi: number = 3.14159;
console.log("number:", age, pi);

// --- boolean: 참/거짓 ---
const isStudent: boolean = true;
console.log("boolean:", isStudent);

// --- array: 배열 (두 가지 표기법) ---
const fruits: string[] = ["사과", "바나나", "체리"];
const testScores: Array<number> = [95, 88, 72];
console.log("array (string[]):", fruits);
console.log("array (Array<number>):", testScores);

// --- tuple: 고정 길이·고정 타입 배열 ---
const user: [string, number] = ["김철수", 30];
console.log("tuple:", user[0], "님은", user[1], "세입니다.");

// 튜플에 잘못된 타입을 넣으면 에러:
// const badTuple: [string, number] = [30, "김철수"]; // ❌ 타입 에러

// --- enum: 열거형 ---
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

const move: Direction = Direction.Up;
console.log("enum:", move);

// 숫자 enum (기본값은 0부터 자동 증가)
enum Status {
  Pending,   // 0
  Active,    // 1
  Inactive,  // 2
}
console.log("숫자 enum:", Status.Pending, Status.Active, Status.Inactive);

// --- any: 모든 타입 허용 (가능하면 피하세요) ---
let anything: any = "문자열";
anything = 42;
anything = true;
console.log("any:", anything);

// --- unknown: any보다 안전한 대안 ---
let mysterious: unknown = "비밀 메시지";
// console.log(mysterious.length); // ❌ unknown은 직접 접근 불가
if (typeof mysterious === "string") {
  console.log("unknown (확인 후):", mysterious.length);
}

// --- null과 undefined ---
const empty: null = null;
const notDefined: undefined = undefined;
console.log("null:", empty);
console.log("undefined:", notDefined);

// --- void: 반환값이 없는 함수 ---
function logMessage(msg: string): void {
  console.log("void 함수:", msg);
}
logMessage("이 함수는 값을 반환하지 않습니다");

// --- never: 절대 발생하지 않는 타입 ---
function throwError(message: string): never {
  throw new Error(message);
}
// throwError("테스트"); // 주석 해제하면 에러 발생

console.log("\n✅ 레슨 1 완료: 기본 타입을 모두 살펴보았습니다!");

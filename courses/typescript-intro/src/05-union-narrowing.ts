// ============================================================
// 레슨 5: 유니온 타입과 내로잉 (Union Types & Narrowing)
// 여러 타입을 하나로 합치고, 안전하게 좁히는 방법을 배웁니다.
// ============================================================
export {};

// --- 유니온 타입 기본 ---
type StringOrNumber = string | number;

function printId(id: StringOrNumber): void {
  console.log("ID:", id);
  // id.toUpperCase(); // ❌ number에는 toUpperCase가 없음
}
printId("ABC-123");
printId(456);

// --- typeof 가드 ---
function processValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase(); // 이 블록에서 value는 string
  } else {
    return value.toFixed(2); // 이 블록에서 value는 number
  }
}
console.log("typeof 가드 (string):", processValue("hello"));
console.log("typeof 가드 (number):", processValue(3.14159));

// --- in 연산자 가드 ---
interface Dog {
  bark(): string;
  breed: string;
}

interface Cat {
  meow(): string;
  indoor: boolean;
}

function makeSound(animal: Dog | Cat): string {
  if ("bark" in animal) {
    return animal.bark(); // animal은 Dog
  } else {
    return animal.meow(); // animal은 Cat
  }
}

const myDog: Dog = { bark: () => "멍멍!", breed: "골든리트리버" };
const myCat: Cat = { meow: () => "야옹~", indoor: true };
console.log("in 연산자 (Dog):", makeSound(myDog));
console.log("in 연산자 (Cat):", makeSound(myCat));

// --- instanceof 가드 ---
class NetworkError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

class ValidationError extends Error {
  fields: string[];
  constructor(message: string, fields: string[]) {
    super(message);
    this.fields = fields;
  }
}

function handleError(error: NetworkError | ValidationError): string {
  if (error instanceof NetworkError) {
    return `네트워크 오류 (${error.statusCode}): ${error.message}`;
  } else {
    return `검증 오류 [${error.fields.join(", ")}]: ${error.message}`;
  }
}
console.log("instanceof:", handleError(new NetworkError("Not Found", 404)));
console.log("instanceof:", handleError(new ValidationError("필수 입력", ["이름", "이메일"])));

// --- 판별 유니온 (Discriminated Unions) ---
interface SuccessResponse {
  status: "success";
  data: string;
}
interface ErrorResponse {
  status: "error";
  message: string;
  code: number;
}
interface LoadingResponse {
  status: "loading";
}

type ApiResponse = SuccessResponse | ErrorResponse | LoadingResponse;

function handleResponse(response: ApiResponse): string {
  switch (response.status) {
    case "success": return `✅ 데이터: ${response.data}`;
    case "error": return `❌ 오류 ${response.code}: ${response.message}`;
    case "loading": return "⏳ 로딩 중...";
  }
}

console.log(handleResponse({ status: "success", data: "사용자 목록" }));
console.log(handleResponse({ status: "error", message: "인증 실패", code: 401 }));
console.log(handleResponse({ status: "loading" }));

// --- 철저한 검사 (Exhaustiveness Checking) ---
function assertNever(value: never): never {
  throw new Error(`처리되지 않은 케이스: ${value}`);
}

function getResponseIcon(response: ApiResponse): string {
  switch (response.status) {
    case "success": return "✅";
    case "error": return "❌";
    case "loading": return "⏳";
    default: return assertNever(response);
  }
}
console.log("Exhaustiveness:", getResponseIcon({ status: "success", data: "" }));

// --- 리터럴 타입 유니온 ---
type Theme = "light" | "dark" | "system";

function setTheme(theme: Theme): void {
  console.log(`테마 설정: ${theme}`);
}
setTheme("dark");
// setTheme("blue"); // ❌ "blue"는 Theme에 포함되지 않음

console.log("\n✅ 레슨 5 완료: 유니온과 내로잉으로 타입을 안전하게 다루세요!");

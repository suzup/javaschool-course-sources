// ============================================================
// 레슨 3: 인터페이스와 타입 (Interfaces & Types)
// 객체의 형태를 정의하는 두 가지 방법을 비교합니다.
// ============================================================
export {};

// --- interface: 객체의 구조를 정의 ---
interface User {
  name: string;
  age: number;
  email: string;
}

const user1: User = { name: "김민지", age: 28, email: "minji@example.com" };
console.log("interface 사용:", user1);

// 누락된 속성은 에러:
// const badUser: User = { name: "홍길동" }; // ❌ age, email 누락

// --- type alias: 타입 별칭 ---
type Product = { id: number; name: string; price: number };

const laptop: Product = { id: 1, name: "노트북", price: 1500000 };
console.log("type alias 사용:", laptop);

// --- interface vs type 차이점 ---
// 1. interface는 선언 병합(Declaration Merging)이 가능
interface Animal {
  name: string;
}
interface Animal {
  sound: string; // 같은 이름으로 추가 선언 → 자동 병합
}
const cat: Animal = { name: "고양이", sound: "야옹" };
console.log("선언 병합:", cat);

// type은 같은 이름으로 다시 선언할 수 없습니다.
// type Animal = { legs: number }; // ❌ 중복 식별자 에러

// 2. type은 유니온·교차 타입을 직접 정의할 수 있음
type StringOrNumber = string | number;
type Coordinate = { x: number } & { y: number };
const coord: Coordinate = { x: 10, y: 20 };
console.log("교차 타입:", coord);

// --- extends: 인터페이스 확장 ---
interface Shape {
  color: string;
}

interface Circle extends Shape {
  radius: number;
}

interface Rectangle extends Shape {
  width: number;
  height: number;
}

const circle: Circle = { color: "빨강", radius: 5 };
const rect: Rectangle = { color: "파랑", width: 10, height: 20 };
console.log("extends (Circle):", circle);
console.log("extends (Rectangle):", rect);

// 다중 상속
interface Printable {
  print(): string;
}

interface ColoredShape extends Shape, Printable {
  sides: number;
}

const triangle: ColoredShape = {
  color: "초록",
  sides: 3,
  print() { return `${this.color} ${this.sides}각형`; },
};
console.log("다중 상속:", triangle.print());

// --- optional properties: 선택적 속성 (?) ---
interface Config {
  host: string;
  port: number;
  debug?: boolean;
  timeout?: number;
}

const config1: Config = { host: "localhost", port: 3000 };
const config2: Config = { host: "localhost", port: 3000, debug: true, timeout: 5000 };
console.log("선택적 속성 (최소):", config1);
console.log("선택적 속성 (전체):", config2);

// --- readonly: 읽기 전용 속성 ---
interface Point {
  readonly x: number;
  readonly y: number;
}

const origin: Point = { x: 0, y: 0 };
console.log("readonly:", origin);
// origin.x = 10; // ❌ 읽기 전용 속성에 할당할 수 없습니다.

const readonlyNumbers: ReadonlyArray<number> = [1, 2, 3];
// readonlyNumbers.push(4); // ❌ push 메서드가 없음
console.log("ReadonlyArray:", readonlyNumbers);

// --- 인덱스 시그니처: 동적 키 ---
interface Dictionary {
  [key: string]: string;
}

const koreanEnglish: Dictionary = {
  "사과": "apple",
  "바나나": "banana",
};
console.log("인덱스 시그니처:", koreanEnglish);

console.log("\n✅ 레슨 3 완료: interface와 type으로 안전한 객체 구조를 정의하세요!");

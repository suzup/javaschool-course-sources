// ============================================================
// 레슨 7 보조 파일: 모듈에서 내보내기 (Exports)
// 이 파일은 07-modules.ts에서 가져옵니다.
// ============================================================

// --- named export: 이름으로 내보내기 ---
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export const PI = 3.14159;

export interface MathResult {
  operation: string;
  result: number;
}

// --- default export: 기본 내보내기 ---
// 모듈당 하나만 가능합니다.
export default class Calculator {
  private history: MathResult[] = [];

  calculate(operation: string, a: number, b: number): number {
    let result: number;
    switch (operation) {
      case "add": result = a + b; break;
      case "subtract": result = a - b; break;
      case "multiply": result = a * b; break;
      case "divide":
        if (b === 0) throw new Error("0으로 나눌 수 없습니다");
        result = a / b;
        break;
      default:
        throw new Error(`알 수 없는 연산: ${operation}`);
    }
    this.history.push({ operation, result });
    return result;
  }

  getHistory(): MathResult[] {
    return [...this.history];
  }
}

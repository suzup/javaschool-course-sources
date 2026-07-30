// ============================================================
// 레슨 8: JS → TS 마이그레이션 (After - TypeScript 버전)
// before.js를 strict TypeScript로 변환한 결과입니다.
// 변경 포인트에 🔄 표시를 달았습니다.
// ============================================================

// 🔄 역할을 유니온 리터럴 타입으로 정의
type Role = "admin" | "editor" | "viewer";

// 🔄 사용자 인터페이스 정의
interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  active: boolean;
}

// 🔄 업데이트 가능한 필드만 Partial로 제한
type UserUpdate = Partial<Pick<User, "name" | "email" | "role" | "active">>;

// 🔄 배열에 타입 지정
const users: User[] = [];
let nextId = 1;

// 🔄 매개변수와 반환 타입을 명시
function createUser(name: string, email: string, role: Role = "viewer"): User {
  const user: User = {
    id: nextId++,
    name,
    email,
    role,       // 🔄 기본값을 매개변수 기본값으로 이동
    createdAt: new Date(),
    active: true,
  };
  users.push(user);
  return user;
}

// 🔄 오버로드로 검색 방법을 명확하게 표현
function findUser(query: number): User | undefined;
function findUser(query: string): User | undefined;
function findUser(query: number | string): User | undefined {
  if (typeof query === "number") {
    return users.find((u) => u.id === query);
  }
  return users.find((u) => u.email === query);
}

// 🔄 반환 타입으로 null 가능성을 명시
function updateUser(id: number, updates: UserUpdate): User | null {
  const user = findUser(id);
  if (!user) return null;
  // 🔄 Object.assign 대신 안전한 속성 할당
  if (updates.name !== undefined) user.name = updates.name;
  if (updates.email !== undefined) user.email = updates.email;
  if (updates.role !== undefined) user.role = updates.role;
  if (updates.active !== undefined) user.active = updates.active;
  return user;
}

// 🔄 매개변수 타입으로 잘못된 비교 방지
function canEdit(user: User, targetUser: User): boolean {
  if (user.role === "admin") return true;
  if (user.role === "editor" && targetUser.role !== "admin") return true;
  return user.id === targetUser.id;
}

// 🔄 선택적 매개변수로 필터 조건을 명시
function getActiveUsers(role?: Role): User[] {
  let filtered = users.filter((u) => u.active);
  if (role) {
    filtered = filtered.filter((u) => u.role === role);
  }
  return filtered;
}

// --- 실행 ---
const admin = createUser("관리자", "admin@example.com", "admin");
const editor = createUser("편집자", "editor@example.com", "editor");
const viewer = createUser("독자", "viewer@example.com");
// createUser("잘못됨", "x@x.com", "superuser"); // ❌ "superuser"는 Role이 아님

console.log("생성된 사용자:", users.length);
console.log("검색 (id):", findUser(1));
console.log("검색 (email):", findUser("editor@example.com"));

updateUser(3, { name: "독자님" });
// updateUser(3, { password: "1234" }); // ❌ UserUpdate에 password 없음
console.log("업데이트 후:", findUser(3));

console.log("권한 (admin→viewer):", canEdit(admin, viewer));
console.log("권한 (viewer→admin):", canEdit(viewer, admin));

console.log("활성 사용자:", getActiveUsers().length);
console.log("편집자만:", getActiveUsers("editor").length);
// getActiveUsers("superuser"); // ❌ Role 타입에 없음

// --- 마이그레이션 요약 ---
console.log("\n--- 마이그레이션으로 잡은 잠재적 버그들 ---");
console.log("1. role에 잘못된 문자열 전달 → 리터럴 유니온으로 방지");
console.log("2. updateUser에 존재하지 않는 필드 전달 → UserUpdate 타입으로 제한");
console.log("3. findUser 반환값 null 체크 누락 → undefined 반환 타입 명시");
console.log("4. canEdit에 잘못된 객체 전달 → User 인터페이스로 보장");

console.log("\n✅ 레슨 8 완료: JS에서 TS로 점진적으로 마이그레이션하세요!");

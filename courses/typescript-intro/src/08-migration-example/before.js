// ============================================================
// 레슨 8: JS → TS 마이그레이션 (Before - 원본 JavaScript)
// 이 파일은 타입이 없는 원래 JavaScript 코드입니다.
// after.ts에서 어떻게 TypeScript로 변환되었는지 비교하세요.
// ============================================================

// --- 사용자 관리 모듈 ---

// 데이터 저장소
const users = [];
let nextId = 1;

// 사용자 생성
function createUser(name, email, role) {
  const user = {
    id: nextId++,
    name: name,
    email: email,
    role: role || "viewer", // 기본값
    createdAt: new Date(),
    active: true,
  };
  users.push(user);
  return user;
}

// 사용자 검색
function findUser(query) {
  if (typeof query === "number") {
    return users.find((u) => u.id === query);
  }
  return users.find((u) => u.email === query);
}

// 사용자 업데이트
function updateUser(id, updates) {
  const user = findUser(id);
  if (!user) return null;
  Object.assign(user, updates);
  return user;
}

// 권한 확인
function canEdit(user, targetUser) {
  if (user.role === "admin") return true;
  if (user.role === "editor" && targetUser.role !== "admin") return true;
  return user.id === targetUser.id;
}

// 사용자 목록 필터
function getActiveUsers(role) {
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

console.log("생성된 사용자:", users.length);
console.log("검색 (id):", findUser(1));
console.log("검색 (email):", findUser("editor@example.com"));

updateUser(3, { name: "독자님" });
console.log("업데이트 후:", findUser(3));

console.log("권한:", canEdit(admin, viewer));
console.log("권한:", canEdit(viewer, admin));

console.log("활성 사용자:", getActiveUsers().length);
console.log("편집자만:", getActiveUsers("editor").length);

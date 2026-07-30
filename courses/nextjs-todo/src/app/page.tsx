import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Next.js Todo App</h1>
        <p className="mb-8 text-lg text-gray-600">
          서버 컴포넌트와 서버 액션으로 구현한 풀스택 Todo 애플리케이션
        </p>
        {session ? (
          <Link
            href="/todos"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            내 할 일 목록으로 이동
          </Link>
        ) : (
          <Link
            href="/login"
            className="rounded-lg bg-gray-900 px-6 py-3 text-white transition hover:bg-gray-800"
          >
            GitHub로 로그인
          </Link>
        )}
      </div>
    </div>
  );
}

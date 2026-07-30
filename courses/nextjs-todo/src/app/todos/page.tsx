import Image from "next/image";
import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { addTodo, toggleTodo, deleteTodo } from "./actions";

export default async function TodosPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">내 할 일</h1>
        <div className="flex items-center gap-3">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name ?? "사용자"}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <span className="text-sm text-gray-600">{session.user.name}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="rounded bg-gray-200 px-3 py-1 text-sm transition hover:bg-gray-300"
            >
              로그아웃
            </button>
          </form>
        </div>
      </header>

      <form action={addTodo} className="mb-6 flex gap-2">
        <input
          type="text"
          name="title"
          placeholder="새 할 일을 입력하세요..."
          required
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          추가
        </button>
      </form>

      {todos.length === 0 ? (
        <p className="text-center text-gray-500">
          할 일이 없습니다. 새 할 일을 추가해보세요!
        </p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4"
            >
              <form action={toggleTodo.bind(null, todo.id)} className="flex">
                <button
                  type="submit"
                  className={`h-5 w-5 rounded border-2 transition ${
                    todo.completed
                      ? "border-green-500 bg-green-500"
                      : "border-gray-300 hover:border-green-400"
                  }`}
                  aria-label={
                    todo.completed ? "완료 취소" : "완료로 표시"
                  }
                >
                  {todo.completed && (
                    <svg
                      className="h-full w-full text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              </form>
              <span
                className={`flex-1 ${
                  todo.completed
                    ? "text-gray-400 line-through"
                    : "text-gray-900"
                }`}
              >
                {todo.title}
              </span>
              <form action={deleteTodo.bind(null, todo.id)}>
                <button
                  type="submit"
                  className="rounded p-1 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                  aria-label="삭제"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-6 text-center text-sm text-gray-400">
        총 {todos.length}개 · 완료 {todos.filter((t) => t.completed).length}개
      </p>
    </div>
  );
}

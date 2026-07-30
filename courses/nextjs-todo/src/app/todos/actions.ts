"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function addTodo(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("로그인이 필요합니다");
  }

  const title = formData.get("title") as string;
  if (!title || title.trim().length === 0) {
    throw new Error("할 일을 입력해주세요");
  }

  await prisma.todo.create({
    data: {
      title: title.trim(),
      userId: session.user.id,
    },
  });

  revalidatePath("/todos");
}

export async function toggleTodo(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("로그인이 필요합니다");
  }

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== session.user.id) {
    throw new Error("권한이 없습니다");
  }

  await prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed },
  });

  revalidatePath("/todos");
}

export async function deleteTodo(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("로그인이 필요합니다");
  }

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== session.user.id) {
    throw new Error("권한이 없습니다");
  }

  await prisma.todo.delete({ where: { id } });

  revalidatePath("/todos");
}

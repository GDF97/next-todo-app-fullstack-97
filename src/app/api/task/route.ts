"use server";

import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const task = await prisma.tb_task.findMany();
    return Response.json({ message: "ok!", task });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
}

export async function POST(req: Request) {
  const { nm_task } = await req.json();
  try {
    const task = await prisma.tb_task.create({
      data: {
        nm_task,
        isCompleted: false,
      },
    });
    return Response.json({ message: "Tarefa adicionada com Sucesso!", task });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id_task");
  const id_task = Number(id);

  try {
    const task = await prisma.tb_task.delete({
      where: { id_task },
    });
    return Response.json({ message: "Tarefa deletada!", task });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
}

export async function PUT(req: Request) {
  const { id_task, nm_task } = await req.json();
  try {
    const task = await prisma.tb_task.update({
      where: {
        id_task,
      },
      data: {
        nm_task,
      },
    });
    return Response.json({ message: "Tarefa atualizada com Sucesso!", task });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
}

export async function PATCH(req: Request) {
  const { id_task, isCompleted } = await req.json();
  try {
    const task = await prisma.tb_task.update({
      where: {
        id_task,
      },
      data: {
        isCompleted,
      },
    });
    return Response.json({
      message: `Tarefa ${isCompleted ? "foi Completada" : "não Completada"}!`,
      task,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
}

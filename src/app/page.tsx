"use client";

import TaskItem from "@/components/TaskItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import useTaskAPI from "@/hooks/useTaskAPI";
import { TaskType } from "@/types/TaskType";
import React, { useEffect, useState } from "react";

export default function Home() {
  const api = useTaskAPI();

  const [taskName, setTaskName] = useState("");
  const [taskArray, setTaskArray] = useState<Array<TaskType> | null>(null);

  async function addTask(taskName: string) {
    console.log(taskArray);
    if (!taskName) return;

    alert(taskName);
  }

  async function getTasks(): Promise<void> {
    try {
      const { task } = await api.getTasks();
      if (task) {
        setTaskArray(task);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updateTask(id_task: number, newTaskName: string) {}

  async function deleteTask(id_task: number) {
    alert(`deletando task #${id_task}`);
  }

  async function completeTodo(id_task: number, isCompleted: boolean) {
    alert(`status da task #${id_task}, ${!isCompleted}`);
  }

  function handleModalUpdate(id_task: number) {
    let newTaskName = prompt("Insira o nome da nova task!");
    if (!newTaskName) return;
    updateTask(id_task, newTaskName);
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-12 p-6">
      <h1 className="text-4xl italic text-zinc-200">Todo-App 97!</h1>
      <div className="flex flex-col gap-12 w-[500px]">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Insira uma tarefa..."
            className="text-zinc-200"
            value={taskName}
            onChange={(e) => setTaskName(e.currentTarget.value)}
          />
          <Button variant={"outline"} onClick={() => addTask(taskName)}>
            Adicionar
          </Button>
        </div>
        <ScrollArea className="h-96">
          {taskArray && taskArray.map((task) => <p>{task.nm_task}</p>)}
        </ScrollArea>
      </div>
    </div>
  );
}

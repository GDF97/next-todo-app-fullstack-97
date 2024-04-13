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
  const [taskArray, setTaskArray] = useState<TaskType[]>([]);

  async function addTask(taskName: string) {
    if (!taskName) return;

    try {
      const { message, stats } = await api.addTask(taskName);

      if (stats == 200) {
        console.log(message);
      }
      getTasks();
      setTaskName("");
    } catch (error) {
      console.log(error);
    }
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

  async function updateTask(id_task: number, newTaskName: string) {
    if (!newTaskName) return;
    try {
      const { message } = await api.updateTask(id_task, newTaskName);
      console.log(message);
    } catch (error) {
      console.log(error);
    } finally {
      getTasks();
    }
  }

  async function deleteTask(id_task: number) {
    try {
      const { message } = await api.deleteTask(id_task);
      console.log(message);
    } catch (error) {
      console.log(error);
    } finally {
      getTasks();
    }
  }

  async function completeTodo(id_task: number, isCompleted: boolean) {
    try {
      const { message } = await api.completeTodo(id_task, !isCompleted);
      console.log(message);
    } catch (error) {
      console.log(error);
    } finally {
      getTasks();
    }
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
          <Button
            variant={"outline"}
            onClick={() => {
              addTask(taskName);
            }}
          >
            Adicionar
          </Button>
        </div>
        <ScrollArea className="h-[500px] pr-4">
          {taskArray != null &&
            taskArray.map((task) => (
              <TaskItem
                key={task.id_task}
                {...task}
                fnCompleteTodo={completeTodo}
                fnDeleteTask={deleteTask}
                fnUpdate={updateTask}
              />
            ))}
        </ScrollArea>
      </div>
    </div>
  );
}

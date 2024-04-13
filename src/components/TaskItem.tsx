import React from "react";
import { Button } from "./ui/button";
import { TaskType } from "@/types/TaskType";

type fnProps = {
  fnUpdate: (id_task: number) => void;
  fnDeleteTask: (id_task: number) => Promise<void>;
  fnCompleteTodo: (id_task: number, isCompleted: boolean) => Promise<void>;
};

export default function TaskItem(props: TaskType & fnProps) {
  return (
    <div
      className={`flex items-center justify-between p-2 rounded-lg mb-4  ${
        props.isCompleted ? "bg-green-900" : "bg-zinc-800"
      }`}
    >
      <p className={props.isCompleted ? "line-through" : "text-zinc-50"}>
        {props.nm_task}
      </p>
      <div className="flex items-center gap-4">
        <Button
          className="bg-green-500 border-none text-white outline-none"
          onClick={() =>
            props.fnCompleteTodo(
              Number(props.id_task),
              Boolean(props.isCompleted)
            )
          }
        >
          V
        </Button>
        <Button
          className="bg-yellow-500 border-none text-white outline-none"
          onClick={() => props.fnUpdate(Number(props.id_task))}
        >
          E
        </Button>
        <Button
          variant={"destructive"}
          onClick={() => props.fnDeleteTask(Number(props.id_task))}
        >
          x
        </Button>
      </div>
    </div>
  );
}

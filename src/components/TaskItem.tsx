import React, { useState } from "react";
import { Button } from "./ui/button";
import { TaskType } from "@/types/TaskType";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

type fnProps = {
  fnUpdate: (id_task: number, newTaskName: string) => Promise<void>;
  fnDeleteTask: (id_task: number) => Promise<void>;
  fnCompleteTodo: (id_task: number, isCompleted: boolean) => Promise<void>;
};

export default function TaskItem(props: TaskType & fnProps) {
  const [newTaskName, setNewTaskName] = useState(props.nm_task);
  const { toast } = useToast();
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
          onClick={() => {
            props.fnCompleteTodo(
              Number(props.id_task),
              Boolean(props.isCompleted)
            );

            toast({
              title: `${!props.isCompleted ? "Sucesso!" : "Aviso!"}`,
              description: `Tarefa #${props.id_task} ${
                !props.isCompleted ? "foi Completada!" : "não foi Completada"
              }`,
            });
          }}
        >
          V
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-yellow-500 border-none text-white outline-none">
              E
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Atualizando Tarefa #{props.id_task}!</DialogTitle>
            </DialogHeader>
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => {
                e.preventDefault();

                if (props.nm_task != newTaskName && newTaskName) {
                  props.fnUpdate(Number(props.id_task), String(newTaskName));

                  toast({
                    title: "Sucesso!",
                    description: `Tarefa ${props.id_task} Atualizada com Sucesso!`,
                  });
                }
              }}
            >
              <Input
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.currentTarget.value)}
              />
              <DialogFooter>
                <Button type="submit">Atualizar Tarefa!</Button>
                <DialogClose asChild>
                  <Button type="reset" variant="ghost">
                    Fechar PopIn!
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Button
          variant={"destructive"}
          onClick={() => {
            props.fnDeleteTask(Number(props.id_task));
            toast({
              title: "Alerta!",
              description: `Tarefa #${props.id_task}  Excluida com Sucesso!`,
            });
          }}
        >
          x
        </Button>
      </div>
    </div>
  );
}

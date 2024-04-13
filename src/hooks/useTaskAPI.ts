import axios from "axios";

const base_url = "http://localhost:3000/api/task";

export default function useTaskAPI() {
  return {
    getTasks: async function () {
      const response = await axios.get(base_url);
      return response.data;
    },
    addTask: async function (nm_task: string) {
      const response = await axios.post(base_url, {
        nm_task,
      });
      return response.data;
    },
    deleteTask: async function (id_task: number) {
      const response = await axios.delete(`${base_url}?id_task=${id_task}`);
      return response.data;
    },
    updateTask: async function (id_task: number, nm_task: string) {
      const response = await axios.put(base_url, {
        id_task,
        nm_task,
      });
      return response.data;
    },
    completeTodo: async function (id_task: number, isCompleted: boolean) {
      const response = await axios.patch(base_url, {
        id_task,
        isCompleted,
      });
      return response.data;
    },
  };
}

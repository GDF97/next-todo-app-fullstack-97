import axios from "axios";

export default function useTaskAPI() {
  return {
    getTasks: async function () {
      const response = await axios.get("http://localhost:3000/api/task");
      return response.data;
    },
  };
}

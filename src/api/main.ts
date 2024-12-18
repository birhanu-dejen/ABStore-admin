import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL,
});

export default instance;
 
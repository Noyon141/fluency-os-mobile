import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://192.168.0.197:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

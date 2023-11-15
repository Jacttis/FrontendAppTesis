import axios from "axios";
import { BACKEND_HOST } from "@env";

const server_path = BACKEND_HOST;

export default axios.create({
  baseURL: server_path,
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = (accessToken) =>
  axios.create({
    baseURL: server_path,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });

import axios from "axios";

const server_path = "http://10.0.2.2:8080/";
//const vercel_path = "https://best-ai-prompts-backend.vercel.app/restapi";

//const server_path = process.env.REACT_APP_SERVER_PATH;

export default axios.create({
  baseURL: server_path,
  headers: { "Content-Type": "application/json" }
});

export const axiosReview = axios.create({
  baseURL: "http://10.0.2.2:8082/api/",
  headers: { "Content-Type": "application/json" }
});

export const axiosMatching = axios.create({
  baseURL: "http://10.0.2.2:8083/api/",
  headers: { "Content-Type": "application/json" }
});

export const axiosAuth = () =>
  axios.create({
    baseURL: server_path,
    headers: {
      "Content-Type": "application/json"
    }
  });

import axios, { axiosMatching } from "./client";
import { axiosAuth, axiosReview } from "./client";

export const searchWorkers = async (clientData) => {
  return axios.post(
    "search/api/search/searchWorkers",
    JSON.stringify(clientData)
  );
};

export const getWorkerReviews = async (workerInfo) => {
  return axios.post(
    "review/api/review/workerReviews",
    JSON.stringify(workerInfo)
  );
};

export const interactWorker = async (interactionInfo) => {
  return axios.post(
    "matching/api/matching/interaction",
    JSON.stringify(interactionInfo)
  );
};

export const registerClient = async (clientInfo) => {
  return axiosAuth().post("api/auth/client/register", JSON.stringify(clientInfo));
};

export const loginClient = async (clientInfo) => {
  return axiosAuth().post("api/auth/client/login", JSON.stringify(clientInfo));
};

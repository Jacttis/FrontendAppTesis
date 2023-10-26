import axios, { axiosMatching } from "./client";
import { axiosAuth, axiosReview } from "./client";

export const searchWorkers = async (clientData) => {
  return axios.post("search/searchWorkers", JSON.stringify(clientData));
};

export const getWorkerReviews = async (workerInfo) => {
  return axiosReview.post("review/workerReviews", JSON.stringify(workerInfo));
};

export const interactWorker = async (interactionInfo) => {
  return axiosMatching.post(
    "matching/interaction",
    JSON.stringify(interactionInfo)
  );
};

export const registerClient = async (clientInfo) => {
  return axiosAuth().post("api/auth/client/register", JSON.stringify(clientInfo));
};

export const loginClient = async (clientInfo) => {
  return axiosAuth().post("api/auth/client/login", JSON.stringify(clientInfo));
};

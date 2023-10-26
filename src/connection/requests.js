import axios from "./client";
import { axiosAuth } from "./client";

export const searchWorkers = async (accessToken, clientData) => {
  return axiosAuth(accessToken).post(
    "search/client/searchWorkers",
    JSON.stringify(clientData)
  );
};

export const getWorkerReviews = async (workerInfo) => {
  return axios.post("review/workerReviews", JSON.stringify(workerInfo));
};

export const interactWorker = async (accessToken, interactionInfo) => {
  return axiosAuth(accessToken).post(
    "matching/client/interaction",
    JSON.stringify(interactionInfo)
  );
};

export const postMatchClient = async (accessToken, matchInfo) => {
  return axiosAuth(accessToken).post(
    "matching/worker/match",
    JSON.stringify(matchInfo)
  );
};

export const postRejectClient = async (accessToken, rejectInfo) => {
  return axiosAuth(accessToken).post(
    "matching/worker/reject",
    JSON.stringify(rejectInfo)
  );
};

export const registerClient = async (clientInfo) => {
  return axios.post("auth/client/register", JSON.stringify(clientInfo));
};

export const loginClient = async (clientInfo) => {
  return axios.post("auth/client/login", JSON.stringify(clientInfo));
};

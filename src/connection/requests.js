import axios from "./client";
import { axiosAuth } from "./client";

export const searchWorkers = async (accessToken, clientData) => {
  return axiosAuth(accessToken).post(
    "search/client/searchWorkers",
    JSON.stringify(clientData)
  );
};

export const getLikedClients = async (accessToken) => {
  return axiosAuth(accessToken).post("search/worker/getLikedClients");
};

export const getMatchedClients = async (accessToken) => {
  return axiosAuth(accessToken).post("search/worker/getMatchedClients");
};

export const getMatchedWorkers = async (accessToken) => {
  return axiosAuth(accessToken).post("search/client/getMatchedWorkers");
};

export const getWorkerReviews = async (workerInfo) => {
  return axios.post("review/workerReviews", JSON.stringify(workerInfo));
};

export const getWorkerRating = async (workerInfo) => {
  return axios.post("review/workerAverageRating", JSON.stringify(workerInfo));
};

export const addWorkerReview = async (accessToken, reviewInfo) => {
  return axiosAuth(accessToken).post(
    "review/addWorkerReview",
    JSON.stringify(reviewInfo)
  );
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

export const workerCancelMatch = async (accessToken, cancelMatchInfo) => {
  return axiosAuth(accessToken).post(
    "matching/worker/cancelMatch",
    JSON.stringify(cancelMatchInfo)
  );
};

export const clientCancelMatch = async (accessToken, cancelMatchInfo) => {
  return axiosAuth(accessToken).post(
    "matching/client/cancelMatch",
    JSON.stringify(cancelMatchInfo)
  );
};

export const registerClient = async (clientInfo) => {
  return axios.post("auth/client/register", JSON.stringify(clientInfo));
};

export const loginClient = async (clientInfo) => {
  return axios.post("auth/client/login", JSON.stringify(clientInfo));
};

export const registerWorker = async (workerInfo) => {
  return axios.post("auth/worker/register", JSON.stringify(workerInfo));
};

export const loginWorker = async (workerInfo) => {
  return axios.post("auth/worker/login", JSON.stringify(workerInfo));
};

export const getWorker = async (accessToken, email) => {
  return axiosAuth(accessToken).get(`auth/workers/getWorker?email=${email}`);
};

export const getClient = async (accessToken, email) => {
  return axiosAuth(accessToken).get(`auth/clients/getClient?email=${email}`);
};

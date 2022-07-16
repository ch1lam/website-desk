import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import { getToken } from "./auth";

const instance = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: { Authorization: getToken() ?? "" },
});

axiosRetry(instance, { retries: 3 });

const request = async (url: string, config?: AxiosRequestConfig) => {
  const response = await instance
    .request({ url, ...config })
    .then((res) => [null, res.data])
    .catch((err) => [err, null]);

  return response;
};

export { request };

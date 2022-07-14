import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";

const instance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

axiosRetry(instance, { retries: 3 });

const request = async (
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  const response = await instance.request({ url, ...config });
  const result = response.data;

  return result;
};

export { request };

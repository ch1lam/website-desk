import { request } from "../utils/request";

const login = (username: string, password: string) => {
  return request("/login", { method: "get" });
};

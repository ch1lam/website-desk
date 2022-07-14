import { request } from "../utils/request";

const loginReq = (username: string, password: string) => {
  return request("/login", {
    method: "post",
    data: {
      username: username,
      password: password,
    },
  })
    .then((data) => [null, data])
    .catch((err) => [err, null]);
};

export { loginReq };

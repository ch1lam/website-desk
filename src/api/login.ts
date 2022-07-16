import { ElMessage } from "element-plus";
import { setToken } from "../utils/auth";
import { request } from "../utils/request";

const loginReq = async (username: string, password: string) => {
  const [err, data] = await request("/login", {
    method: "post",
    data: {
      username: username,
      password: password,
    },
  });

  if (err) {
    ElMessage({
      showClose: true,
      type: "error",
      message: err.response.data.message,
      center: true,
    });
  } else {
    setToken(data.data.token);
  }

  return data;
};

export { loginReq };

const getToken = () => {
  return window.sessionStorage.getItem("token");
};

const setToken = (token: string) => {
  return window.sessionStorage.setItem("token", token);
};

const removeToken = () => {
  return window.sessionStorage.removeItem("token");
};
export { getToken, setToken, removeToken };

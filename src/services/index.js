import axios from "axios";

const baseURL = "http://localhost:3000/api";
const service = axios.create({
  baseURL,
});

service.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

service.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { service };

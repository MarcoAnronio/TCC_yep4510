import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    let token = null;

    const directToken = localStorage.getItem("token");
    if (directToken) token = directToken;

    const jwtToken = localStorage.getItem("jwt_token");
    if (!token && jwtToken) token = jwtToken;

    const userData = localStorage.getItem("usuario");
    if (!token && userData) {
      try {
        const parsed = JSON.parse(userData);
        if (parsed.token) token = parsed.token;
      } catch (e) {
        console.error("Erro ao ler o objeto usuario:");
      }
    }

    if (token) {
      config.headers["User-Token"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

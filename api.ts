import axios from "axios";

const api = axios.create({
  // baseURL: "http://192.168.1.89:3000/api", //nix
  // baseURL: "http://192.168.43.55:3000/api",
  baseURL: "http://192.168.1.2:3000/api",

  timeout: 5000,
});

export default api;

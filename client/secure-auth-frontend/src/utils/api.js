import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend base
  withCredentials: true,
});

export default API;
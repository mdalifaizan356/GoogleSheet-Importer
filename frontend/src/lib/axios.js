import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://googlesheet-importer.onrender.com",
    withCredentials: true,
    headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
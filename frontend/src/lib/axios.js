import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:`http://${window.location.hostname}:5001`,
    withCredentials: true,
    headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
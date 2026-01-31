import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export const employeeAPI = {
  getAll: () => api.get("/employees"),
  create: (data) => api.post("/employees", data),
  delete: (id) => api.delete(`/employees/${id}`),
};

export const attendanceAPI = {
  mark: (data) => api.post("/attendance", data),
  getByEmployee: (employeeId) => api.get(`/attendance/${employeeId}`),
};

export default api;


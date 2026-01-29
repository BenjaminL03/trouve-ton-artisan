import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Services pour les catégories
export const categoryService = {
  getAll: () => api.get("/categories"),
  getById: (id) => api.get(`/categories/${id}`),
};

// Services pour les spécialités
export const specialiteService = {
  getAll: () => api.get("/specialites"),
  getByCategory: (categoryId) => api.get(`/specialites/category/${categoryId}`),
};

// Services pour les artisans
export const artisanService = {
  getAll: () => api.get("/artisans"),
  getTop: () => api.get("/artisans/top"),
  getById: (id) => api.get(`/artisans/${id}`),
  getByCategory: (categoryId) => api.get(`/artisans/category/${categoryId}`),
  search: (query) => api.get(`/artisans/search?q=${query}`),
};

// Service pour le formulaire de contact
export const contactService = {
  send: (data) => api.post("/contact", data),
};

export default api;

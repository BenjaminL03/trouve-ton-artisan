import axios from "axios";

// URL de base de l'API
const API_BASE_URL = "http://localhost:5000/api";

// Instance axios configurée
const api = axios.create({
  baseURL: API_BASE_URL,
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

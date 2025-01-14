import axios from "axios";

// Base URL de la API
const API_BOOKS_BASE_URL = import.meta.env.VITE_API_BOOK_BASE_URL;

// Obtener el token desde localStorage
const getAuthToken = () => localStorage.getItem("authToken");

// Función para incluir el token en los encabezados
const authHeaders = () => {
  const token = getAuthToken();
  console.log(token)
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getBooks = async () => {
  const response = await axios.get(API_BOOKS_BASE_URL);
  return response.data;
};

const createBook = async (bookData) => {
  const response = await axios.post(API_BOOKS_BASE_URL, bookData, {
    headers: authHeaders(),
  });
  return response.data;
};

const updateBook = async (id, bookData) => {
  const response = await axios.patch(`${API_BOOKS_BASE_URL}/${id}`, bookData, {
    headers: authHeaders(),
  });
  return response.data;
};

const deleteBook = async (id) => {
  const response = await axios.delete(`${API_BOOKS_BASE_URL}/${id}`, {
    headers: authHeaders(),
  });
  return response.data;
};

const getFilteredBooks = async (filters) => {
  const query = new URLSearchParams(filters).toString();
  const response = await axios.get(`${API_BOOKS_BASE_URL}/search?${query}`);
  return response.data;
};

const getStatsBooks = async () => {
  const response = await axios.get(`${API_BOOKS_BASE_URL}/stats`, {
    headers: authHeaders(),
  });
  return response.data;
};

export { getBooks, createBook, updateBook, deleteBook, getFilteredBooks, getStatsBooks };

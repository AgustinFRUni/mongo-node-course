import axios from "axios"

// "http://localhost:2345/api/books"
const API_BOOKS_BASE_URL = import.meta.env.VITE_API_BOOK_BASE_URL

const getBooks = async () => {
  const response = await axios.get(API_BOOKS_BASE_URL)
  return response.data
}

const createBook = async (bookData) => {
  const response = await axios.post(API_BOOKS_BASE_URL, bookData)
  return response.data
}

const updateBook = async (id, bookData) => {
  // "http://localhost:2345/api/books"
  const response = await axios.patch(`${API_BOOKS_BASE_URL}/${id}`, bookData)
  return response.data
}

const deleteBook = async (id) => {
  const response = await axios.delete(`${API_BOOKS_BASE_URL}/${id}`)
  return response.data
}

// http://localhost:2001/api/products?minStock=10&maxStock=30
const getFilteredBooks = async (filters) => {
  const query = new URLSearchParams(filters).toString()
  const response = await axios.get(`${API_BOOKS_BASE_URL}/search?${query}`)
  return response.data
}

const getStatsBooks = async () => {
  const response = await axios.get(`${API_BOOKS_BASE_URL}/stats`)
  return response.data
}

export { getBooks, createBook, updateBook, deleteBook, getFilteredBooks, getStatsBooks }
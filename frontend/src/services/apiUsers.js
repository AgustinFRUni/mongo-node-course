import axios from "axios"

// "http://localhost:2345/api/books"
const API_USERS_BASE_URL = import.meta.env.VITE_API_USER_BASE_URL

const registerUser = async (userData) => {
  const response = await axios.post(`${API_USERS_BASE_URL}/register`, userData)
  return response.data
}

const loginUser = async (userData) => {
  const response = await axios.post(`${API_USERS_BASE_URL}/login`, userData)
  return response.data
}

export { registerUser, loginUser }
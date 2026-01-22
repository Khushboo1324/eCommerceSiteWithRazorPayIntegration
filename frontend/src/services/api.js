import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// User APIs
export const createUser = async (userData) => {
  const response = await api.post('/users', userData)
  return response.data
}

// Product APIs
export const getAllProducts = async () => {
  const response = await api.get('/products')
  return response.data
}

export const createProduct = async (productData) => {
  const response = await api.post('/products', productData)
  return response.data
}

// Cart APIs
export const addToCart = async (cartData) => {
  const response = await api.post('/cart/add', cartData)
  return response.data
}

export const getCart = async (userId) => {
  const response = await api.get(`/cart/${userId}`)
  return response.data
}

export const clearCart = async (userId) => {
  await api.delete(`/cart/${userId}/clear`)
}

// Order APIs
export const createOrder = async (userId) => {
  const response = await api.post(`/orders/${userId}`)
  return response.data
}

export const getOrdersByUser = async (userId) => {
  const response = await api.get(`/orders/user/${userId}`)
  return response.data
}

export const getOrder = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`)
  return response.data
}

// Payment APIs
export const createPayment = async (orderId) => {
  const response = await api.post(`/payments/${orderId}`)
  return response.data
}

export default api

import axiosClient from './axiosClient'

const getProductList = () => {
  const url = '/admin/product'
  return axiosClient.get(url)
}

const createProduct = (data) => {
  const url = '/admin/product'
  return axiosClient.post(url, data)
}

const updateProduct = (data, product_id) => {
  const url = `/admin/product/${product_id}`
  return axiosClient.patch(url, data)
}

const deleteProduct = (product_id) => {
  const url = `/admin/product/${product_id}`
  return axiosClient.delete(url)
}

const getSeckillList = () => {
  const url = '/admin/seckill'
  return axiosClient.get(url)
}

const createSeckill = (data) => {
  const url = '/admin/seckill'
  return axiosClient.post(url, data)
}

const updateSeckill = (data, seckill_id) => {
  const url = `/admin/seckill/${seckill_id}`
  return axiosClient.patch(url, data)
}

const deleteSeckill = (seckill_id) => {
  const url = `/admin/seckill/${seckill_id}`
  return axiosClient.delete(url)
}

const getOrderList = () => {
  const url = '/admin/order'
  return axiosClient.get(url)
}

const updateOrder = (data, order_id) => {
  const url = `/admin/order/${order_id}`
  return axiosClient.patch(url, data)
}

const getAuthenticatedUserList = () => {
  const url = '/admin/users/'
  return axiosClient.get(url)
}

const logoutUsers = (data) => {
  const url = '/admin/users/'
  return axiosClient.post(url, data)
}

export default {
  getProductList,
  createProduct,
  updateProduct,
  deleteProduct,

  getSeckillList,
  createSeckill,
  updateSeckill,
  deleteSeckill,

  getOrderList,
  updateOrder,

  getAuthenticatedUserList,
  logoutUsers,
}

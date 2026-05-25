import { ElMessage } from 'element-plus'
import axiosClient from './axiosClient'

const getSeckillDetail = (id) => {
  const url = `/seckill/seckill_detail/${id}`
  return axiosClient.get(url)
}

const getSeckillList = (page = 1, size = 10) => {
  const url = '/seckill/seckill_list'
  const params = { page, size }
  return axiosClient.get(url, params)
}

const getOrderList = (page = 1, size = 10) => {
  const url = '/seckill/order_list'
  const params = { page, size }
  return axiosClient.get(url, params)
}

const createOrder = (quantity, seckill_id, address) => {
  const url = '/seckill/create_order'
  const data = { quantity, seckill_id, address }
  return axiosClient.post(url, data)
}

const makePayment = (id) => {
  const url = `/seckill/make_payment/${id}`
  return axiosClient.get(url)
}

const pollOrderStr = (id) => {
  return new Promise((resolve, reject) => {
    const timer = setInterval(async () => {
      try {
        const res = await makePayment(id)
        if (res.order_str) {
          clearInterval(timer)
          resolve(res.order_str)
        }
      } catch (err) {
        clearInterval(timer)
        reject(err)
      }
    }, 1000)

    setTimeout(() => {
      clearInterval(timer)
      reject(new Error('订单超时！'))
      ElMessage.error('订单超时！')
    }, 30000)
  })
}

export default {
  getSeckillDetail,
  getSeckillList,
  getOrderList,
  createOrder,
  makePayment,
  pollOrderStr,
}

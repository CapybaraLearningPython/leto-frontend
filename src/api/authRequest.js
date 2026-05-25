import axiosClient from './axiosClient'

// SendSMSCode
// Login
// UpdateAccessToken

const sendSMSCode = (tel) => {
  const url = `/auth/send_code/${tel}`
  return axiosClient.get(url)
}

const login = (data) => {
  const url = '/auth/login'
  return axiosClient.post(url, data)
}

const updateAccessToken = (refreshToken) => {
  const url = '/auth/update_access_token'
  const data = {
    refresh_token: refreshToken,
  }
  return axiosClient.post(url, data)
}   

export default {
    sendSMSCode,
    login,
    updateAccessToken,
}
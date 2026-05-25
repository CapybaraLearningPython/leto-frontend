import { ElMessage } from 'element-plus'
import axiosClient from './axiosClient'

/*
Overview: 
1. CreateAddress: CreateAddressRequest -> AddressInfoResponse
2. UpdateAddress: UpdateAddressRequest -> AddressInfoResponse
3. GetAddressList: GetAddressListRequest -> AddressListResponse
4. DeleteAddress: DeleteAddressRequest -> Empty
5. UpdateAvatar: UpdateAvatarRequest -> UpdateAvatarResponse
*/

const createAddress = (data) => {
  const url = '/user/create_address'
  return axiosClient.post(url, data)
}

const updateAddress = (id, data) => {
  const url = `/user/update_address/${id}`
  return axiosClient.put(url, data)
}

const getAddressList = (page = 1, size = 10) => {
  const url = '/user/address_list'
  const params = { page, size }
  return axiosClient.get(url, params)
}

const deleteAddress = (id) => {
  const url = `/user/delete_address/${id}`
  return axiosClient.delete(url)
}

const updateAvatar = (file_name, content_type) => {
  const url = '/user/update_avatar'
  const data = { file_name, content_type }
  return axiosClient.put(url, data)
}

const uploadAvatar = (presignedURL, presignedHeaders, file) => {
  return new Promise((resolve, reject) => {
    fetch(presignedURL, {
      method: 'PUT',
      headers: {
        ...presignedHeaders,
      },
      body: file,
    })
      .then((res) => {
        if (!res.ok) {
          reject(new Error('upload failed'))
          ElMessage.error('上传失败，请检查文件格式！')
          return
        }
        resolve(res)
        ElMessage.success('上传成功！')
      })
      .catch((err) => {
        reject(err)
        ElMessage.error('上传失败，请稍后再试！')
      })
  })
}

const changeAvatar = (file_url) => {
  const url = '/user/upload_avatar'
  const data = { file_url }
  return axiosClient.post(url, data)
}

const getAvatarDetail = () => {
  const url = '/user/get_avatar_detail'
  return axiosClient.get(url)
}

export default {
  createAddress,
  updateAddress,
  getAddressList,
  deleteAddress,
  updateAvatar,
  uploadAvatar,
  changeAvatar,
  getAvatarDetail,
}

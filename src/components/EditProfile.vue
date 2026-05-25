<template>
  <div class="page">

    <div class="container">

      <div class="header">
        <div class="title">修改资料</div>
        <div class="subtitle">
          用户基础信息与收货地址管理
        </div>
      </div>

      <div class="section">

        <div class="section-title">
          用户头像
        </div>

        <div class="avatar-row">

          <div class="avatar-area">
            <img class="avatar" :src="avatarURL" />
          </div>

          <div class="avatar-control">

            <input ref="fileInput" type="file" accept="image/*" class="file-input" @change="onAvatarChange" />

            <div class="right-box">

              <div class="file-line">

                <span class="file-name">
                  {{ fileName || '未选择文件' }}
                </span>

                <el-button class="upload-btn" size="large" @click="triggerFile">
                  选择图片
                </el-button>

                <el-button class="save-btn inline-save-btn" size="large" @click="saveAvatar">
                  保存
                </el-button>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div class="section">

        <div class="section-title">
          收货地址
        </div>

        <div class="address-item" v-for="addr in addressList" :key="addr.id">

          <div class="address-text">
            {{ addr.name }} {{ addr.tel }} {{ addr.region }} {{ addr.detail }}
          </div>

          <div class="address-actions">

            <el-button class="save-btn" size="large" @click="openEdit(addr)">
              修改
            </el-button>

            <el-button class="delete-btn" size="large" @click="deleteAddress(addr.id)">
              删除
            </el-button>

          </div>

        </div>

        <div class="add-box">

          <el-button class="add-btn" size="large" @click="openCreate">
            新增地址
          </el-button>

        </div>

      </div>

    </div>

    <!-- 编辑 / 新增 -->
    <el-dialog v-model="dialogVisible" width="520px" :close-on-click-modal="false" :close-on-press-escape="false">

      <div class="dialog-title">
        {{ editingId ? '修改地址' : '新增地址' }}
      </div>

      <div class="form">
        <el-input v-model="form.name" placeholder="收件人" size="large" />
        <el-input v-model="form.tel" placeholder="手机号" size="large" />
        <el-input v-model="form.region" placeholder="地区" size="large" />
        <el-input v-model="form.detail" placeholder="详细地址" size="large" />
      </div>

      <el-button class="save-btn dialog-save" size="large" @click="saveAddress">
        保存
      </el-button>

    </el-dialog>

    <!-- 删除确认 dialog（已补回） -->
    <el-dialog v-model="deleteDialogVisible" width="420px" align-center :close-on-click-modal="false"
      :close-on-press-escape="false">

      <div class="dialog-title">
        删除地址
      </div>

      <div class="delete-text">
        确认删除该地址？
      </div>

      <div class="delete-actions">

        <el-button class="delete-cancel-btn" @click="deleteDialogVisible = false">
          取消
        </el-button>

        <el-button class="delete-confirm-btn" @click="confirmDelete">
          删除
        </el-button>

      </div>

    </el-dialog>

  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import userRequest from '@/api/userRequest'
  import { useAuthStore } from '@/stores/authStore'
  import { ElMessage } from 'element-plus'

  const authStore = useAuthStore()

  const avatarURL = ref('')
  const fileInput = ref(null)
  const fileName = ref('')
  const avatarFile = ref(null)

  const triggerFile = () => fileInput.value?.click()

  const onAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    avatarFile.value = file
    fileName.value = file.name
  }

  const saveAvatar = async () => {
    if (!avatarFile.value) {
      ElMessage.error('请先上传图片！')
      return
    }
    const res = await userRequest.updateAvatar(fileName.value, avatarFile.value.type)
    const presignedURL = res.presigned_url
    avatarURL.value = res.file_url
    await userRequest.uploadAvatar(presignedURL, res.signed_headers, avatarFile.value)
    await userRequest.changeAvatar(avatarURL.value)
    avatarFile.value = null
    fileName.value = ''
  }

  const addressList = ref([])

  const dialogVisible = ref(false)

  const editingId = ref(null)

  /* 删除相关 */
  const deleteDialogVisible = ref(false)
  const deleteTargetId = ref(null)

  const form = ref({
    name: '',
    tel: '',
    region: '',
    detail: ''
  })

  const openEdit = (addr) => {
    editingId.value = addr.id
    form.value = { ...addr }
    dialogVisible.value = true
  }

  const openCreate = () => {
    editingId.value = null
    form.value = { name: '', tel: '', region: '', detail: '' }
    dialogVisible.value = true
  }

  const saveAddress = async () => {
    if (editingId.value) {
      await userRequest.updateAddress(editingId.value, form.value)
    } else {
      await userRequest.createAddress(form.value)
    }

    const res = await userRequest.getAddressList()
    addressList.value = res.addresses

    dialogVisible.value = false
  }

  /* 删除改为弹窗 */
  const deleteAddress = (id) => {
    deleteTargetId.value = id
    deleteDialogVisible.value = true
  }

  const confirmDelete = async () => {
    await userRequest.deleteAddress(deleteTargetId.value)

    const res = await userRequest.getAddressList()
    addressList.value = res.addresses

    deleteDialogVisible.value = false
    deleteTargetId.value = null
  }

  onMounted(async () => {
    avatarURL.value = authStore.user.avatar
    const res = await userRequest.getAddressList()
    addressList.value = res.addresses
    avatarURL.value = (await userRequest.getAvatarDetail()).url
  })
</script>

<style scoped>

  .page {
    min-height: 80vh;
    padding: 40px 20px;
    background: linear-gradient(135deg, #fff7ed, #ffedd5, #fdba74);
  }

  .container {
    max-width: 1100px;
    margin: 0 auto;
  }

  .header {
    margin-bottom: 36px;
  }

  .title {
    font-size: 16px;
    font-weight: 800;
    color: #7c2d12;
  }

  .subtitle {
    margin-top: 8px;
    font-size: 14px;
    color: #9a3412;
  }

  .section {
    margin-bottom: 34px;
    padding: 28px;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(249, 115, 22, 0.12);
  }

  .section-title {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
    color: #7c2d12;
  }

  .avatar-row {
    display: flex;
    align-items: center;
    gap: 28px;
  }

  .avatar-area {
    width: 110px;
    flex-shrink: 0;
    margin-left: 12px;
  }

  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
  }

  .avatar-control {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .file-line {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .file-input {
    display: none;
  }

  .file-name {
    font-size: 13px;
    color: #9a3412;
    max-width: 260px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .upload-btn {
    border: none;
    border-radius: 14px;
    font-weight: 700;
    color: white;
    background: linear-gradient(90deg, #fb923c, #f97316);
  }

  .inline-save-btn {
    width: 90px;
  }

  .address-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 16px 18px;
    margin-bottom: 16px;

    border-radius: 16px;
    background: rgba(255, 255, 255, 0.78);
    border: 1px solid rgba(249, 115, 22, 0.15);

    box-shadow: 0 6px 18px rgba(249, 115, 22, 0.06);

    transition: all 0.2s ease;
  }

  .address-item:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.92);
    border-color: rgba(249, 115, 22, 0.25);
    box-shadow: 0 10px 24px rgba(249, 115, 22, 0.10);
  }

  .address-text {
    flex: 1;

    font-size: 14px;
    line-height: 1.6;
    color: #7c2d12;

    padding-right: 16px;
    word-break: break-word;
  }

  .address-text::first-line {
    font-weight: 700;
    color: #9a3412;
  }

  .address-actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  /* 按钮不动 */
  .save-btn {
    width: 110px;
    border: none;
    border-radius: 14px;
    font-weight: 700;
    color: white;
    background: linear-gradient(90deg, #fb923c, #f97316);
  }

  .delete-btn {
    width: 110px;
    border: none;
    border-radius: 14px;
    font-weight: 700;
    color: white;
    background: linear-gradient(90deg, #f87171, #ef4444, #dc2626);
  }

  .add-box {
    margin-top: 28px;
  }

  .add-btn {
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 16px;
    font-size: 15px;
    font-weight: 700;
    color: white;
    background: linear-gradient(90deg, #f97316, #ef4444);
  }

  .dialog-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #7c2d12;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .dialog-save {
    margin-top: 18px;
    width: 100%;
  }

  /* delete dialog */
  .delete-text {
    font-size: 14px;
    color: #7c2d12;
    margin: 10px 0 20px;
  }

  .delete-actions {
    display: flex;
    gap: 12px;
  }

  .delete-cancel-btn {
    flex: 1;
    border: 1px solid #f97316;
    border-radius: 14px;
    background: linear-gradient(90deg, #fb923c, #f97316);
    color: white;
    font-weight: 700;
  }

  .delete-confirm-btn {
    flex: 1;
    border: none;
    border-radius: 14px;
    background: #dedede;
    color: rgb(145, 145, 145);
    font-weight: 700;
  }

  :deep(.el-dialog) {
    border-radius: 14px;
    overflow: hidden;
  }


</style>
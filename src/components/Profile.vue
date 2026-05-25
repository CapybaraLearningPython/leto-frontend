<template>
  <div class="page">

    <div class="container">

      <div class="avatar-wrap">
        <el-avatar :src="avatarURL" :size="120" />
      </div>

      <div class="name">
        {{ profile.username }}
      </div>

      <div class="meta">
        <div>用户ID：{{ profile.user_id }}</div>
        <div>手机号：{{ profile.phone }}</div>
      </div>

      <!-- 修改资料按钮 -->
      <el-button class="edit-btn" size="large" @click="onEditProfileClick">
        修改资料
      </el-button>

      <!-- 退出登录 -->
      <el-button class="logout-btn" size="large" @click="logout">
        退出登录
      </el-button>

    </div>

  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/authStore'
  import userRequest from '@/api/userRequest'

  const authStore = useAuthStore()
  const avatarURL = ref('')

  const router = useRouter()
  const logout = () => {
    authStore.clear()
    router.push('/login')
  }
  const profile = ref({
    user_id: authStore.user?.id,
    username: authStore.user?.username,
    phone: authStore.user?.tel,
    avatarURL: avatarURL
  })

  onMounted(async () => {
    avatarURL.value = (await userRequest.getAvatarDetail()).url
  })

  const onEditProfileClick = () => {
    if (authStore.user.is_seller) {
      router.push({ name: 'edit_seller_profile' })
    } else {
      router.push({ name: 'edit_profile' })
    }
  }

</script>

<style scoped>

  .page {
    min-height: 80vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background: linear-gradient(135deg, #fff7ed, #ffedd5, #fdba74);
  }

  /* 居中大布局 */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    max-width: 900px;

    padding: 80px 40px;
  }

  /* 头像 */
  .avatar-wrap {
    margin-bottom: 24px;
  }

  /* 用户名 */
  .name {
    font-size: 34px;
    font-weight: 800;
    color: #7c2d12;
    letter-spacing: 1px;
  }

  /* 用户信息 */
  .meta {
    margin-top: 14px;

    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;

    font-size: 14px;
    color: #9a3412;
  }

  /* 修改按钮 */
  .edit-btn {
    margin-top: 28px;

    width: 500px;
    height: 48px;

    border: none;
    border-radius: 14px;

    font-size: 15px;
    font-weight: 700;

    color: #7c2d12;

    background: rgba(255, 247, 237, 0.8);
    border: 1px solid rgba(249, 115, 22, 0.25);
  }

  .edit-btn:hover {
    background: rgba(255, 237, 213, 0.9);
  }

  /* 退出按钮 */
  .logout-btn {
    margin-top: 16px;

    width: 500px;
    height: 48px;

    border: none;
    border-radius: 14px;

    font-size: 15px;
    font-weight: 700;

    color: white;

    background: linear-gradient(90deg, #ef4444, #f97316);
  }

  .logout-btn:hover {
    opacity: 0.92;
  }

</style>
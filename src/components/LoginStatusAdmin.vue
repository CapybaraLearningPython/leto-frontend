<template>
    <div class="page">

        <div class="top-bar">
            <div class="title">在线用户</div>
        </div>

        <div class="list">

            <div class="item" v-for="u in userList" :key="u">

                <div class="main">

                    <img class="avatar" src="https://cdn-icons-png.flaticon.com/512/13051/13051844.png" />

                    <div class="info">

                        <div class="product-title">
                            用户ID：{{ u }}
                        </div>

                        <div class="online-tag">
                            已登录
                        </div>

                    </div>

                </div>

                <div class="actions">

                    <el-button class="btn" @click="openLogout(u)">
                        登出该用户
                    </el-button>

                </div>

            </div>

        </div>

        <!-- 确认登出 -->
        <el-dialog v-model="logoutVisible" width="420px">

            <div class="dialog-title">
                登出用户
            </div>

            <div class="delete-text">
                是否确认强制登出该用户?
            </div>

            <div class="delete-actions">

                <el-button class="cancel-btn" @click="logoutVisible = false">
                    取消
                </el-button>

                <el-button class="confirm-delete-btn" @click="confirmLogout">
                    确认登出
                </el-button>

            </div>

        </el-dialog>

    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import adminRequest from '@/api/adminRequest'
    import { ElMessage } from 'element-plus'

    const userList = ref([])

    const logoutVisible = ref(false)
    const currentId = ref(null)

    const openLogout = (u) => {
        currentId.value = u
        logoutVisible.value = true
    }

    const confirmLogout = async () => {

        logoutVisible.value = false

        await adminRequest.logoutUsers({
            user_ids: [currentId.value]
        })

        userList.value = (
            await adminRequest.getAuthenticatedUserList()
        ).user_ids

        ElMessage.success('成功登出该用户！')
    }

    onMounted(async () => {

        userList.value = (
            await adminRequest.getAuthenticatedUserList()
        ).user_ids

    })
</script>

<style scoped>
    .page {
        padding: 24px;
    }

    .top-bar {
        display: flex;
        justify-content: space-between;
        margin-bottom: 18px;
    }

    .title {
        font-size: 16px;
        font-weight: 800;
        color: #7c2d12;
    }

    .list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .item {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 22px 24px;
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.72);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(249, 115, 22, 0.15);
        overflow: hidden;
        transition: all 0.25s ease;
    }

    .main {
        display: flex;
        align-items: center;
        gap: 18px;
    }

    .avatar {
        width: 56px;
        height: 56px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background:
            linear-gradient(135deg,
                rgba(251, 146, 60, 0.18),
                rgba(249, 115, 22, 0.28));
        border: 1px solid rgba(249, 115, 22, 0.14);
        font-size: 18px;
        font-weight: 800;
        color: #c2410c;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .label {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: #9ca3af;
    }

    .product-title {
        font-size: 18px;
        font-weight: 800;
        color: #7c2d12;
    }

    .online-tag {
        margin-top: 4px;
        width: fit-content;
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 700;
        background: rgba(34, 197, 94, 0.1);
        color: #15803d;
    }

    .actions {
        display: flex;
        align-items: center;
    }

    .btn {
        height: 42px;
        padding: 0 18px;
        border: none;
        border-radius: 14px;
        font-weight: 700;
        color: white;
        background: linear-gradient(90deg, #ec5454, #f43333);
        box-shadow:
            0 8px 18px rgba(249, 115, 22, 0.18);
    }

    .btn:hover {
        transform: translateY(-1px);
    }

    .dialog-title {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 12px;
    }

    .delete-text {
        font-size: 14px;
        color: #7c2d12;
        margin: 10px 0 20px;
    }

    .delete-actions {
        display: flex;
        gap: 12px;
    }

    .cancel-btn {
        flex: 1;
        height: 44px;
        border-radius: 14px;
        border: none;
        font-weight: 700;
        color: white;
        background:
            linear-gradient(90deg,
                #fb923c,
                #f97316);
    }

    .confirm-delete-btn {
        flex: 1;
        height: 44px;
        border-radius: 14px;
        border: none;
        font-weight: 700;
        color: white;
        background:
            linear-gradient(90deg,
                #6b7280,
                #4b5563);
    }
</style>
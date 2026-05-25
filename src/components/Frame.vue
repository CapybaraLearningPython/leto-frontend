<template>
    <div class="layout">

        <!-- 顶部导航 -->
        <div class="nav">

            <div class="nav-left">
                <div class="logo" @click="go('seckill_list')">Leto</div>
                <div class="nav-title">乐淘</div>

                <div class="nav-item" :class="{ active: activeMenu === 'seckill_list' }" @click="go('seckill_list')">
                    秒杀列表
                </div>

                <div class="nav-item" :class="{ active: activeMenu === 'order_list' }" @click="go('order_list')">
                    订单列表
                </div>
            </div>

            <div class="nav-right">

                <div class="user" @click="go('profile')">
                    <el-avatar
                        :src="avatarURL ? avatarURL : 'https://cdn-icons-png.flaticon.com/512/13051/13051844.png'"
                        :size="34" />
                    <span class="username">{{ authStore.user?.username ? authStore.user.username : "游客" }}</span>
                </div>

            </div>

        </div>

        <!-- 页面内容 + 切换动画 -->
        <div class="content">

            <router-view v-slot="{ Component }">
                <transition name="fade-slide" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>

        </div>

    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { useAuthStore } from '@/stores/authStore'
    import userRequest from '@/api/userRequest'

    const router = useRouter()
    const route = useRoute()
    const path = route.path
    const authStore = useAuthStore()
    const activeMenu = ref('')
    const avatarURL = ref('')

    onMounted(async () => {
        activeMenu.value = path.slice(1)
        avatarURL.value = (await userRequest.getAvatarDetail()).url
    })

    const go = (name) => {
        activeMenu.value = name
        router.push('/' + name)
    }

</script>

<style scoped>

    .layout {
        height: 100vh;
        display: flex;
        flex-direction: column;

        background: linear-gradient(135deg, #fff7ed, #ffedd5, #fdba74);
    }

    /* nav */

    .nav {
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 0 28px;

        background: linear-gradient(90deg,
                rgba(255, 247, 237, 0.95),
                rgba(255, 237, 213, 0.9),
                rgba(253, 186, 116, 0.85));

        backdrop-filter: blur(10px);

        border-bottom: 3px solid rgba(249, 115, 22, 0.18);
    }


    .nav-left {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .logo {
        width: 45px;
        height: 45px;

        display: flex;
        align-items: center;
        justify-content: center;

        font-weight: 700;
        color: white;

        border-radius: 10px;

        background: linear-gradient(135deg, #f97316, #fb7185);

        cursor: pointer;
    }

    .nav-title {
        font-size: 20px;
        font-weight: 700;
        color: #9a3412;
        margin-right: 20px;
    }

    .nav-item {
        font-size: 14px;
        font-weight: 600;
        color: #7c2d12;
        cursor: pointer;
        position: relative;
    }

    .nav-item.active {
        color: #f97316;
    }

    .nav-item.active::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #f97316;
    }

    .nav-right {
        display: flex;
        align-items: center;
    }

    .user {
        display: flex;
        align-items: center;
        gap: 10px;

        padding: 6px 10px;

        border-radius: 14px;

        cursor: pointer;

        transition: all .2s ease;
    }

    .user:hover {
        background: rgba(255, 255, 255, 0.35);
    }


    .username {
        font-size: 14px;
        font-weight: 600;
        color: #7c2d12;
    }

    .arrow {
        width: 6px;
        height: 6px;
        border-right: 2px solid #7c2d12;
        border-bottom: 2px solid #7c2d12;
        transform: rotate(45deg);
        margin-top: -2px;
    }

    /* content */

    .content {
        flex: 1;
        overflow: auto;
    }

    /* 动画 */

    .fade-slide-enter-active,
    .fade-slide-leave-active {
        transition: all 0.3s ease;
    }

    .fade-slide-enter-from {
        opacity: 0;
        transform: translateX(18px);
    }

    .fade-slide-leave-to {
        opacity: 0;
        transform: translateX(-18px);
    }

</style>
<template>
    <div class="layout">

        <!-- 顶部导航 -->
        <div class="nav">

            <div class="nav-left">

                <div class="logo" @click="go('product_admin')">
                    Leto
                </div>

                <div class="nav-title">
                    乐淘后台
                </div>

                <div
                    class="nav-item"
                    :class="{ active: activeMenu === 'product_admin' }"
                    @click="go('product_admin')"
                >
                    管理商品
                </div>

                <div
                    class="nav-item"
                    :class="{ active: activeMenu === 'seckill_admin' }"
                    @click="go('seckill_admin')"
                >
                    管理秒杀
                </div>

                <div
                    class="nav-item"
                    :class="{ active: activeMenu === 'order_admin' }"
                    @click="go('order_admin')"
                >
                    管理订单
                </div>

                <div
                    class="nav-item"
                    :class="{ active: activeMenu === 'login_status_admin' }"
                    @click="go('login_status_admin')"
                >
                    管理用户
                </div>

            </div>

            <div class="nav-right">

                <div class="user" @click="go('seller_profile')">

                    <el-avatar
                        :src="avatarURL
                            ? avatarURL
                            : 'https://cdn-icons-png.flaticon.com/512/13051/13051844.png'"
                        :size="34"
                    />

                    <span class="username">
                        {{
                            authStore.user?.username
                                ? authStore.user.username
                                : '商家'
                        }}
                    </span>

                </div>

            </div>

        </div>

        <!-- 页面内容 -->
        <div class="content">

            <router-view v-slot="{ Component }">

                <transition
                    name="fade-slide"
                    mode="out-in"
                >
                    <component :is="Component" />
                </transition>

            </router-view>

        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import userRequest from '@/api/userRequest'

const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()

const activeMenu = ref('')
const avatarURL = ref('')

watch(
    () => route.name,
    (val) => {
        activeMenu.value = val
    },
    {
        immediate: true
    }
)

onMounted(async () => {
    avatarURL.value = (await userRequest.getAvatarDetail()).url
})

const go = (name) => {
    activeMenu.value = name
    router.push({ name })
}
</script>

<style scoped>

.layout {
    height: 100vh;
    display: flex;
    flex-direction: column;

    background:
        linear-gradient(
            135deg,
            #fff7ed,
            #ffedd5,
            #fdba74
        );
}

/* nav */

.nav {
    height: 64px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 30px;

    background:
        linear-gradient(
            90deg,
            rgba(255, 247, 237, 0.96),
            rgba(255, 237, 213, 0.92),
            rgba(253, 186, 116, 0.88)
        );

    backdrop-filter: blur(10px);

    border-bottom:
        2px solid rgba(249, 115, 22, 0.14);
}

.nav-left {
    display: flex;
    align-items: center;
    gap: 14px;
}

.logo {
    width: 46px;
    height: 46px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 12px;

    font-size: 15px;
    font-weight: 700;
    color: white;

    background:
        linear-gradient(
            135deg,
            #f97316,
            #fb7185
        );

    cursor: pointer;

    transition: all .2s ease;
}

.logo:hover {
    transform: translateY(-1px);
}

.nav-title {
    margin-right: 24px;

    font-size: 20px;
    font-weight: 800;

    color: #9a3412;
}

.nav-item {
    position: relative;

    font-size: 14px;
    font-weight: 700;

    color: #7c2d12;

    cursor: pointer;

    transition: all .2s ease;
}

.nav-item:hover {
    color: #f97316;
}

.nav-item.active {
    color: #f97316;
}

.nav-item.active::after {
    content: '';

    position: absolute;

    left: 0;
    bottom: -10px;

    width: 100%;
    height: 3px;

    border-radius: 999px;

    background: #f97316;
}

/* right */

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
    font-weight: 700;

    color: #7c2d12;
}

/* content */

.content {
    flex: 1;
    overflow: auto;
}

/* animation */

.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all .25s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(18px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-18px);
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

</style>
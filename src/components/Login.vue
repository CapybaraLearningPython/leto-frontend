<template>
    <div class="page">

        <div class="left">
            <div class="brand">
                <div class="logo">Leto</div>
                <div>
                    <div class="brand-title">乐淘秒杀商城</div>
                    <div class="brand-subtitle">
                        新一代秒杀平台
                    </div>
                </div>
            </div>

            <div class="slogan-wrap">
                <div class="slogan">
                    限时抢购<br />
                    快人一步
                </div>

                <div class="feature">
                    <div class="feature-item">⚡ 秒级下单</div>
                    <div class="feature-item">🔥 高并发秒杀</div>
                    <div class="feature-item">📦 实时库存同步</div>
                    <div class="feature-item">🚀 极速支付体验</div>
                </div>
            </div>

            <div class="desc">
                海量热门商品实时开抢<br />
                稳定、高效、流畅的秒杀体验
            </div>
        </div>

        <div class="right">

            <div class="card">

                <div class="card-title">
                    欢迎登录
                </div>

                <div class="card-subtitle">
                    使用手机号验证码登录系统
                </div>

                <el-form :model="form" :rules="rules" ref="loginFormRef">

                    <el-form-item prop="tel">
                        <el-input v-model="form.tel" placeholder="请输入手机号" size="large" />
                    </el-form-item>

                    <el-form-item prop="code">
                        <div class="code-row">

                            <el-input v-model="form.code" placeholder="请输入验证码" size="large" />

                            <el-button class="code-btn" size="large" :disabled="codeBtnDisabled" @click="sendCode">
                                {{ codeBtnText }}
                            </el-button>

                        </div>
                    </el-form-item>

                    <el-form-item>
                        <el-button class="login-btn" size="large" @click=login>
                            登录
                        </el-button>
                    </el-form-item>

                </el-form>

            </div>

        </div>

    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    import authRequest from '@/api/authRequest'
    import { useAuthStore } from '@/stores/authStore'
    import { reactive, ref, watch } from 'vue'
    import { ElMessage } from 'element-plus'

    const loginFormRef = ref()
    const authStore = useAuthStore()
    const router = useRouter()
    const form = reactive({
        tel: '',
        code: ''
    })
    const rules = {
        tel: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        code: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
    }

    const codeBtnDisabled = ref(false)
    const codeBtnText = ref('发送验证码')
    const countdown = ref(60)

    let timer = null

    const sendCode = async () => {
        if (!form.tel) {
            ElMessage.error('请先输入手机号！')
            return
        }
        await authRequest.sendSMSCode(form.tel)
        countdown.value = 60
        codeBtnText.value = '60s'
        codeBtnDisabled.value = true
        timer = setInterval(() => {
            countdown.value--
            codeBtnText.value = `${countdown.value}s`

            if (countdown.value <= 0) {
                clearInterval(timer)
                timer = null
                codeBtnDisabled.value = false
                codeBtnText.value = '发送验证码'
            }
        }, 1000);
    }
    const login = async () => {
        await loginFormRef.value.validate(async (valid) => {
            if (valid) {
                const res = await authRequest.login(form)
                authStore.setUser(res.user)
                authStore.setAccessToken(res.access_token)
                authStore.setRefreshToken(res.refresh_token)
                if (authStore.user.is_seller) {
                    router.push('seckill_admin')
                } else {
                    router.push('seckill_list')
                }
            }
        })
    }
</script>

<style scoped>

    .page {
        min-height: 100vh;
        display: flex;
        overflow: hidden;

        justify-content: center;
        gap: 60px;

        background:
            linear-gradient(135deg,
                #fff7ed 0%,
                #ffedd5 40%,
                #fdba74 100%);
    }

    /* 左侧：固定宽度，避免视觉偏移 */

    .left {
        width: 720px;
        padding: 70px 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .brand {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 40px;
    }

    .logo {
        width: 75px;
        height: 75px;
        border-radius: 16px;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 26px;
        font-weight: 700;
        color: white;

        background: linear-gradient(135deg, #f97316, #fb7185);
    }

    .brand-title {
        font-size: 30px;
        font-weight: 700;
        color: #9a3412;
    }

    .brand-subtitle {
        margin-top: 4px;
        color: #c2410c;
        font-size: 18px;
    }

    .slogan-wrap {
        display: flex;
        align-items: center;
        gap: 60px;
    }

    .slogan {
        font-size: 72px;
        line-height: 1.05;
        font-weight: 800;
        color: #7c2d12;
        white-space: nowrap;
    }

    .feature {
        display: flex;
        flex-direction: column;
        gap: 16px;

        font-size: 15px;
        font-weight: 600;
        color: #9a3412;

        padding-left: 18px;
        border-left: 2px solid rgba(249, 115, 22, .25);
    }

    .feature-item {
        opacity: .85;
        transition: all .2s ease;
    }

    .feature-item:hover {
        opacity: 1;
        transform: translateX(4px);
        color: #f97316;
    }

    .desc {
        margin-top: 40px;
        font-size: 18px;
        line-height: 1.9;
        color: #9a3412;
    }

    /* 右侧 */

    .right {
        width: 520px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card {
        width: 100%;
        padding: 42px;
        border-radius: 28px;
        background: white;
        box-shadow: 0 20px 60px rgba(249, 115, 22, .15);
    }

    .card-title {
        font-size: 30px;
        font-weight: 700;
        color: #1f2937;
    }

    .card-subtitle {
        margin-top: 10px;
        margin-bottom: 30px;
        color: #6b7280;
        font-size: 14px;
    }

    .code-row {
        display: flex;
        gap: 12px;
        width: 100%;
    }

    .code-btn {
        width: 130px;
        height: 48px;
        border: none;
        color: white;
        background: linear-gradient(135deg, #fb923c, #f97316);
        border-radius: 28px;
    }

    :deep(.code-btn.is-disabled) {
        background: #e5e7eb !important;
        color: #9ca3af !important;
        border: none !important;
        cursor: not-allowed;
        opacity: 1;
    }

    .login-btn {
        width: 100%;
        height: 48px;

        border: none;
        border-radius: 28px;
        font-size: 16px;
        font-weight: 700;
        color: white;

        background: linear-gradient(90deg, #fb923c, #f97316, #ef4444);
    }

    .login-btn:hover {
        opacity: .92;
    }

    /* element plus */

    :deep(.el-input__wrapper) {
        height: 48px;
        border-radius: 14px;
        background: #fff7ed;
        box-shadow: none;
    }

    :deep(.el-tabs__nav-wrap::after) {
        display: none;
    }

    :deep(.el-tabs__item) {
        font-weight: 600;
        color: #9ca3af;
    }

    :deep(.el-tabs__item.is-active) {
        color: #f97316;
    }

    :deep(.el-tabs__active-bar) {
        background: #f97316;
    }

</style>
<template>
  <div class="page">

    <!-- 左侧 -->
    <div class="left">

      <div class="brand">

        <div class="logo">
          Leto
        </div>

        <div>

          <div class="brand-title">
            乐淘秒杀商城
          </div>

          <div class="brand-subtitle">
            新一代高性能秒杀平台
          </div>

        </div>

      </div>

      <div class="slogan-wrap">

        <div class="slogan">
          马上登录<br>
          快人一步
        </div>

        <div class="feature">

          <div class="feature-item">
            ⚡ 极速秒杀抢购
          </div>

          <div class="feature-item">
            🔥 实时库存同步
          </div>

          <div class="feature-item">
            📦 查看订单状态
          </div>

          <div class="feature-item">
            🚀 收藏与地址管理
          </div>

        </div>

      </div>

      <div class="desc">
        海量热门商品实时开抢<br />
        稳定、高效、流畅的秒杀体验
      </div>

    </div>

    <!-- 右侧 -->
    <div class="right">

      <div class="card">

        <div class="lock-icon">
          🔒
        </div>

        <div class="card-title">
          当前尚未登录
        </div>

        <div class="card-subtitle">
          请先登录账号后继续操作
        </div>

        <div class="tip-box">

          <div class="tip-item">
            · 秒杀订单需要登录后创建
          </div>

          <div class="tip-item">
            · 地址与支付信息将自动同步
          </div>

          <div class="tip-item">
            · 支持手机号验证码快捷登录
          </div>

        </div>

        <el-button
          class="login-btn"
          size="large"
          @click="goLogin"
        >
          立即登录
        </el-button>

        <el-button
          class="back-btn"
          size="large"
          @click="goBack"
        >
          返回首页
        </el-button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goLogin = () => {
  router.push('/login')
}

const goBack = () => {
  router.push('/seckill_list')
}
</script>

<style scoped>

.page {
  height: 90vh;

  display: flex;
  justify-content: center;
  gap: 60px;

  overflow: hidden;

  background:
    linear-gradient(
      135deg,
      #fff7ed 0%,
      #ffedd5 40%,
      #fdba74 100%
    );
}

/* left */

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

  background:
    linear-gradient(
      135deg,
      #f97316,
      #fb7185
    );
}

.brand-title {
  font-size: 30px;
  font-weight: 700;

  color: #9a3412;
}

.brand-subtitle {
  margin-top: 4px;

  font-size: 18px;
  color: #c2410c;
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

  white-space: nowrap;

  color: #7c2d12;
}

.feature {
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding-left: 18px;

  border-left: 2px solid rgba(249,115,22,.25);

  font-size: 15px;
  font-weight: 600;

  color: #9a3412;
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

/* right */

.right {
  width: 520px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  width: 100%;

  padding: 48px 42px;

  border-radius: 28px;

  background: white;

  box-shadow:
    0 20px 60px rgba(249,115,22,.15);
}

.lock-icon {
  width: 90px;
  height: 90px;

  margin: 0 auto 28px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 42px;

  background:
    linear-gradient(
      135deg,
      #fff7ed,
      #fed7aa
    );
}

.card-title {
  text-align: center;

  font-size: 30px;
  font-weight: 700;

  color: #1f2937;
}

.card-subtitle {
  margin-top: 12px;

  text-align: center;

  font-size: 14px;
  color: #6b7280;
}

.tip-box {
  margin-top: 34px;

  padding: 22px;

  border-radius: 18px;

  background: #fff7ed;

  display: flex;
  flex-direction: column;
  gap: 14px;
}

.tip-item {
  font-size: 14px;
  color: #9a3412;
}

.login-btn {
  margin-top: 34px;

  width: 100%;
  height: 50px;

  border: none;
  border-radius: 14px;

  font-size: 16px;
  font-weight: 700;

  color: white;

  background:
    linear-gradient(
      90deg,
      #fb923c,
      #f97316,
      #ef4444
    );
}

.login-btn:hover {
  opacity: .92;
}

.back-btn {
  margin-top: 14px;
  margin-left: 0px;

  width: 100%;
  height: 50px;

  border-radius: 14px;

  font-size: 16px;
  font-weight: 700;

  color: #9a3412;

  border: 1px solid rgba(249,115,22,.18);

  background: #fff7ed;
}

.back-btn:hover {
  color: #f97316;
  border-color: #f97316;
}

/* element plus */

:deep(.el-button) {
  transition: all .2s ease;
}

</style>
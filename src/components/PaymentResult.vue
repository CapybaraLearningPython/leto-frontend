<template>
  <div class="page">

    <div class="container">

      <!-- 成功图标 -->
      <div class="icon-wrap">

        <div class="success-icon">

          <el-icon class="success-check">
            <Check />
          </el-icon>

        </div>

      </div>

      <!-- 标题 -->
      <div class="title">
        支付成功
      </div>

      <!-- 描述 -->
      <div class="desc">
        订单已支付完成，感谢您的购买
      </div>

      <!-- 倒计时 -->
      <div class="countdown">
        {{ countdown }} 秒后自动跳转订单列表
      </div>

      <!-- 按钮 -->
      <el-button class="btn" size="large" @click="onViewOrderClick">
        立即查看订单
      </el-button>

    </div>

  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { Check } from '@element-plus/icons-vue'


  const router = useRouter()

  const countdown = ref(5)

  let timer = null

  const onViewOrderClick = () => {
    router.push({ name: 'order_list' })
  }

  onMounted(() => {

    timer = setInterval(() => {

      countdown.value--

      if (countdown.value <= 0) {
        clearInterval(timer)
        onViewOrderClick()
      }

    }, 1000)

  })

  onUnmounted(() => {
    clearInterval(timer)
  })
</script>

<style scoped>

  .page {
    min-height: 90vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background:
      linear-gradient(135deg,
        #fff7ed,
        #ffedd5,
        #fdba74);
  }

  /* 主体 */

  .container {
    width: 100%;
    max-width: 700px;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 80px 40px;
  }

  /* 图标 */

  .icon-wrap {
    margin-bottom: 28px;
  }

  .success-icon {
    width: 150px;
    height: 150px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background:
      linear-gradient(135deg,
        #22c55e,
        #16a34a);

    box-shadow:
      0 20px 40px rgba(34, 197, 94, 0.25);
  }

  .success-check {
    font-size: 82px;
    color: white;
  }

  /* 标题 */

  .title {
    font-size: 40px;
    font-weight: 800;

    color: #7c2d12;
  }

  /* 描述 */

  .desc {
    margin-top: 18px;

    font-size: 16px;
    color: #9a3412;
  }

  /* 倒计时 */

  .countdown {
    margin-top: 14px;

    font-size: 14px;
    color: #c2410c;
  }

  /* 按钮 */

  .btn {
    margin-top: 40px;

    width: 260px;
    height: 50px;

    border: none;
    border-radius: 14px;

    font-size: 16px;
    font-weight: 700;

    color: white;

    background:
      linear-gradient(90deg,
        #fb923c,
        #f97316,
        #ef4444);
  }

  .btn:hover {
    opacity: 0.92;
  }

</style>
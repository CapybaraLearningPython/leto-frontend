<template>
  <div class="page">

    <div class="container" v-if="seckillDetail">

      <!-- 左侧 -->
      <div class="left">

        <div class="cover">
          <img :src="currentCover" />
        </div>

        <div class="thumbs">
          <img v-for="(img, index) in covers" :key="index" :src="img" @click="currentCover = img" />
        </div>

      </div>

      <!-- 右侧 -->
      <div class="right">

        <div class="title">
          {{ seckillDetail.product.title }}
        </div>

        <div class="price-box">
          <div class="seckill-price">￥{{ seckillDetail.seckill_price / 100 }}</div>
          <div class="original-price">￥{{ seckillDetail.product.price / 100 }}</div>
        </div>

        <div class="info">
          <div>开始时间：{{ seckillDetail.starts_at }}</div>
          <div>结束时间：{{ seckillDetail.ends_at }}</div>
          <div>剩余：{{ seckillDetail.stock }} 件</div>
          <div>限购：{{ seckillDetail.max_per_buyer }} 件</div>
        </div>

        <div class="detail">{{ seckillDetail.product.detail }}</div>

        <div class="buy-box">
          <el-button class="buy-btn" size="large" @click="dialogVisible = true">
            立即秒杀
          </el-button>
        </div>

      </div>

    </div>

    <!-- 购买弹窗 -->
    <el-dialog v-model="dialogVisible" width="520px" align-center :close-on-click-modal="false"
      :close-on-press-escape="false">

      <div class="dialog-product" v-if="seckillDetail">
        <img class="dialog-cover" :src="covers[0]" />
        <div class="dialog-info">
          <div class="dialog-title">{{ seckillDetail.product.title }}</div>
          <div class="dialog-price-box">
            <div class="dialog-seckill-price">￥{{ seckillDetail.seckill_price / 100 }}</div>
            <div class="dialog-original-price">￥{{ seckillDetail.product.price / 100 }}</div>
          </div>
        </div>
      </div>

      <!-- 地址选择 -->
      <div class="count-box">
        <div class="count-label">收货地址</div>
        <el-select v-model="selectedAddress" placeholder="请选择收货地址">
          <el-option v-for="addr in addresses" :key="addr.id"
            :label="`${addr.name} ${addr.tel} ${addr.region} ${addr.detail}`"
            :value="`${addr.name} ${addr.tel} ${addr.region} ${addr.detail}`" />
        </el-select>
      </div>

      <!-- 数量 -->
      <div class="count-box">
        <div class="count-label">购买数量</div>
        <el-input-number v-model="quantity" :min="1" :max="seckillDetail?.max_per_buyer || 1" />
      </div>

      <el-button class="dialog-buy-btn" @click="purchase">
        立即购买 ￥{{ totalPrice / 100}}
      </el-button>

    </el-dialog>

  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import seckillRequest from '@/api/seckillRequest'
  import userRequest from '@/api/userRequest'
  import { useRoute } from 'vue-router'

  const currentCover = ref(null)
  const seckillDetail = ref(null)
  const route = useRoute()
  const id = route.params.id
  const covers = ref([])

  const dialogVisible = ref(false)
  const quantity = ref(1)
  const addresses = ref([])
  const selectedAddress = ref('')

  const totalPrice = computed(() => {
    if (!seckillDetail.value) return 0
    return (seckillDetail.value.seckill_price * quantity.value).toFixed(2)
  })

  const purchase = async () => {
    await seckillRequest.createOrder(quantity.value, id, selectedAddress.value)
    const order_res = await seckillRequest.pollOrderStr(id)
    console.log(">>>>>", order_res)
    window.location.href = order_res
  }

  onMounted(async () => {
    const res = await seckillRequest.getSeckillDetail(id)
    seckillDetail.value = res
    covers.value = JSON.parse(seckillDetail.value.product.covers)
    currentCover.value = covers.value[0]

    const addressRes = await userRequest.getAddressList()
    addresses.value = addressRes.addresses
  })
</script>

<style scoped>
  .page {
    height: 90vh;
    background: linear-gradient(135deg, #fff7ed, #ffedd5, #fdba74);
    overflow: hidden;
  }

  .container {
    height: 100vh;
    display: flex;
    gap: 60px;
    padding: 50px 80px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .left {
    width: 520px;
  }

  .cover img {
    width: 100%;
    height: 460px;
    object-fit: cover;
    border-radius: 20px;
  }

  .thumbs {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 14px;
  }

  .thumbs img {
    width: 90px;
    height: 90px;
    border-radius: 12px;
    object-fit: cover;
    cursor: pointer;
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .title {
    font-size: 34px;
    font-weight: 800;
    color: #7c2d12;
  }

  .price-box {
    margin-top: 20px;
    display: flex;
    align-items: baseline;
    gap: 16px;
  }

  .seckill-price {
    font-size: 34px;
    font-weight: 800;
    color: #f97316;
  }

  .original-price {
    font-size: 18px;
    color: #9ca3af;
    text-decoration: line-through;
  }

  .info {
    margin-top: 24px;
    padding: 16px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.45);
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #7c2d12;
    font-size: 14px;
  }

  .detail {
    margin-top: 22px;
    font-size: 14px;
    color: #6b7280;
    line-height: 1.8;
    max-height: 30px;
  }

  .buy-box {
    margin-top: 170px;
  }

  .buy-btn {
    width: 100%;
    height: 52px;
    border: none;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 700;
    color: white;
    background: linear-gradient(90deg, #fb923c, #f97316, #ef4444);
  }

  .buy-btn:hover {
    opacity: 0.92;
  }

  .dialog-product {
    display: flex;
    gap: 16px;
  }

  .dialog-cover {
    width: 100px;
    height: 100px;
    border-radius: 14px;
    object-fit: cover;
  }

  .dialog-info {
    flex: 1;
  }

  .dialog-title {
    font-size: 20px;
    font-weight: 700;
    color: #7c2d12;
  }

  .dialog-price-box {
    margin-top: 12px;
    display: flex;
    gap: 10px;
    align-items: baseline;
  }

  .dialog-seckill-price {
    font-size: 22px;
    font-weight: 800;
    color: #f97316;
  }

  .dialog-original-price {
    font-size: 14px;
    color: #9ca3af;
    text-decoration: line-through;
  }

  .count-box {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .count-box :deep(.el-select) {
    width: 320px;
  }

  .count-label {
    font-size: 15px;
    font-weight: 600;
    color: #7c2d12;
  }

  .dialog-buy-btn {
    margin-top: 32px;
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 700;
    color: white;
    background: linear-gradient(90deg, #fb923c, #f97316, #ef4444);
  }

  :deep(.el-dialog) {
    border-radius: 14px;
    overflow: hidden;
  }
</style>
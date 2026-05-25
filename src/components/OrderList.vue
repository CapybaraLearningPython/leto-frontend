<template>
  <div class="page">

    <div class="container" v-if="orderList">

      <div class="header">
        <div class="title">订单列表</div>
        <div class="subtitle">秒杀订单记录</div>
      </div>

      <div class="list">

        <div class="card" v-for="(item, index) in orderList" :key="index">

          <span v-if="item.status == 1" class="status-pending">待支付</span>
          <span v-else class="status-done">已支付</span>

          <!-- 商品图 -->
          <img class="cover" :src="item.seckill.product.covers[0]" />

          <!-- 信息 -->
          <div class="info">

            <div class="row title">
              {{ item.seckill.product.title }}
            </div>

            <div class="row">
              <span>数量：{{ item.quantity }}</span>
              <span>单价：￥{{ item.seckill.seckill_price / 100 }}</span>
              <span v-if="item.status == 1">应付：￥{{ item.amount / 100 }}</span>
              <span v-else>实付：￥{{ item.amount / 100 }}</span>
            </div>

            <div class="row address">
              地址：{{ item.address }}
            </div>

            <div class="row time">
              {{ item.created_at }}
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import seckillRequest from '@/api/seckillRequest'

const orderList = ref([])

onMounted(async () => {
  const res = await seckillRequest.getOrderList()
  orderList.value = res.orders?.map(item => ({
    ...item,
    seckill: {
      ...item.seckill,
      product: {
        ...item.seckill.product,
        covers: JSON.parse(item.seckill.product.covers)
      }
    }
  }))
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

/* header */
.header {
  margin-bottom: 24px;
}

.title {
  font-size: 16px;
  font-weight: 800;
  color: #7c2d12;
}

.subtitle {
  margin-top: 6px;
  font-size: 14px;
  color: #9a3412;
}

/* list */
.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* card */
.card {
  display: flex;
  gap: 16px;
  padding: 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(249, 115, 22, 0.15);
  backdrop-filter: blur(8px);

  position: relative;
}

.cover {
  width: 110px;
  height: 110px;
  border-radius: 14px;
  object-fit: cover;
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* rows */
.row {
  font-size: 13px;
  color: #7c2d12;
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}

.title {
  font-size: 16px;
  font-weight: 700;
}

.address {
  color: #9a3412;
}

.time {
  color: #9ca3af;
  font-size: 12px;
}

/* status badge */
.status-pending,
.status-done {
  position: absolute;
  top: 12px;
  right: 12px;

  font-size: 15px;
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 500;
}

.status-pending {
  color: #ef4444;
  background: #fee2e2;
}

.status-done {
  color: #16a34a;
  background: #dcfce7;
}

</style>
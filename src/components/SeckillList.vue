<template>
  <div class="page">

    <div class="container">

      <div class="header">
        <div class="title">秒杀列表</div>
        <div class="subtitle">限时抢购商品</div>
      </div>

      <div class="list">

        <div class="item" v-for="(item, index) in seckillList" :key="index"
          @click="router.push(`/seckill_detail/${item.id}`)">

          <!-- 商品图 -->
          <img class="cover" :src="item.product.covers[0]" />

          <!-- 信息 -->
          <div class="info">

            <div class="title">
              {{ item.product.title }}
            </div>

            <!-- 价格区 -->
            <div class="price-box">

              <!-- 秒杀价 -->
              <div class="price">
                ￥{{ item.seckill_price / 100 }}
              </div>

              <!-- 原价 -->
              <div class="origin-price">
                ￥{{ item.product.price / 100 }}
              </div>

            </div>

            <div class="end">
              结束时间：{{ item.ends_at }}
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import seckillRequest from '@/api/seckillRequest'

  const router = useRouter()

  const seckillList = ref([])

  onMounted(async () => {
    const res = await seckillRequest.getSeckillList()
    seckillList.value = res.seckills.map(item => ({
        ...item,
        product: {
            ...item.product,
            covers: JSON.parse(item.product.covers)
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

  /* item */

  .item {
    display: flex;
    gap: 16px;

    padding: 18px;
    border-radius: 20px;

    background: rgba(255, 255, 255, 0.55);
    border: 1px solid rgba(249, 115, 22, 0.15);

    backdrop-filter: blur(8px);

    cursor: pointer;
    transition: all 0.2s ease;
  }

  .item:hover {
    transform: translateY(-2px);
    border-color: rgba(249, 115, 22, 0.35);
  }

  /* cover */

  .cover {
    width: 110px;
    height: 110px;
    border-radius: 14px;
    object-fit: cover;
  }

  /* info */

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: #7c2d12;
  }

  /* 价格区域 */
  .price-box {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  /* 秒杀价 */
  .price {
    font-size: 18px;
    font-weight: 800;
    color: #f97316;
  }

  /* 原价 */
  .origin-price {
    font-size: 13px;
    color: #9ca3af;
    text-decoration: line-through;
  }

  .end {
    font-size: 13px;
    color: #9a3412;
  }

</style>
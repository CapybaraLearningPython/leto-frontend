<template>
    <div class="page">

        <div class="top-bar">
            <div class="title">订单管理</div>
        </div>

        <div class="list">

            <div class="item" v-for="o in orderList" :key="o.id">

                <div class="main">

                    <div class="header">
                        <div class="product-title-wrap">
                            <span class="product-title">{{ o.seckill.product.title }}</span>
                            <span class="id">用户ID：{{ o.user_id }}</span>
                            <span class="id">秒杀ID：{{ o.seckill.id }}</span>
                        </div>
                    </div>

                    <div class="grid">

                        <div class="col">
                            <div class="row">
                                <span class="label">数量</span>
                                <span class="value">{{ o.quantity }}</span>
                            </div>

                            <div class="row">
                                <span class="label">金额</span>
                                <span class="value">￥{{ o.amount / 100 }}</span>
                            </div>

                            <div class="row">
                                <span class="label">状态</span>
                                <span class="value" v-if="o.status == 1">待支付</span>
                                <span class="value" v-else>已支付</span>
                            </div>
                        </div>

                        <div class="col">
                            <div class="row">
                                <span class="label">时间</span>
                                <span class="value">{{ o.created_at }}</span>
                            </div>

                            <div class="row">
                                <span class="label">地址</span>
                                <span class="value">{{ o.address }}</span>
                            </div>

                        </div>

                    </div>

                </div>

                <div class="actions">

                    <el-button class="view-btn" @click="openSeckill(o)">
                        秒杀信息
                    </el-button>

                    <el-button class="btn" @click="openAddress(o)">
                        修改地址
                    </el-button>

                </div>

            </div>

        </div>

        <!-- 秒杀弹窗 -->
        <el-dialog v-model="seckillVisible" width="520px">

            <div class="dialog-title">秒杀详情</div>

            <div class="bubble">

                <div class="row">
                    <span class="label">ID</span>
                    <span class="value">{{ seckillDetail.id }}</span>
                </div>

                <div class="row">
                    <span class="label">价格</span>
                    <span class="value">￥{{ seckillDetail.seckill_price / 100 }}/件</span>
                </div>

                <div class="row">
                    <span class="label">库存</span>
                    <span class="value">{{ seckillDetail.stock }}</span>
                </div>

                <div class="row">
                    <span class="label">限购</span>
                    <span class="value">{{ seckillDetail.max_per_buyer }}</span>
                </div>

                <div class="row">
                    <span class="label">开始</span>
                    <span class="value">{{ seckillDetail.starts_at }}</span>
                </div>

                <div class="row">
                    <span class="label">结束</span>
                    <span class="value">{{ seckillDetail.ends_at }}</span>
                </div>

                <el-button class="btn jump-btn" @click="onGoSeckillClick">前往秒杀详情页</el-button>

            </div>

        </el-dialog>

        <!-- 地址弹窗 -->
        <el-dialog v-model="addressVisible" width="520px">

            <div class="dialog-title">修改地址</div>

            <el-form :model="addressForm" label-width="90px">

                <el-form-item label="收货人姓名">
                    <el-input v-model="addressForm.name" />
                </el-form-item>

                <el-form-item label="收货人电话">
                    <el-input v-model="addressForm.tel" />
                </el-form-item>

                <el-form-item label="所在区域">
                    <el-input v-model="addressForm.region" />
                </el-form-item>

                <el-form-item label="详细地址">
                    <el-input v-model="addressForm.detail" />
                </el-form-item>

            </el-form>

            <el-button class="dialog-btn" @click="saveAddress">
                保存
            </el-button>

        </el-dialog>

    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import adminRequest from '@/api/adminRequest'

    const router = useRouter()

    const seckillVisible = ref(false)
    const addressVisible = ref(false)

    const seckillDetail = ref({})
    const currentId = ref(null)

    const orderList = ref([])

    const addressForm = ref({
        name: '',
        tel: '',
        region: '',
        detail: ''
    })

    const onGoSeckillClick = () => {
        addressVisible.value = false
        router.push({ name: 'seckill_admin' })
    }

    onMounted(async () => {
        orderList.value = (await adminRequest.getOrderList()).orders
    })

    const openSeckill = (o) => {
        seckillVisible.value = true
        seckillDetail.value = o.seckill
    }

    const openAddress = (o) => {
        currentId.value = o.id
        const address = o.address.split(' ')
        console.log('?>>?', address)
        addressForm.value.name = address[0]
        addressForm.value.tel = address[1]
        addressForm.value.region = address[2]
        addressForm.value.detail = address[3]
        addressVisible.value = true
    }

    const saveAddress = async () => {
        addressVisible.value = false
        const name = addressForm.value.name
        const tel = addressForm.value.tel
        const region = addressForm.value.region
        const detail = addressForm.value.detail
        const data = { address: `${name} ${tel} ${region} ${detail}` }
        await adminRequest.updateOrder(data, currentId.value)
        orderList.value = (await adminRequest.getOrderList()).orders
    }
</script>

<style scoped>
    .page {
        padding: 24px;
    }

    .top-bar {
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
        gap: 12px;
    }

    .item {
        display: flex;
        justify-content: space-between;
        padding: 14px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.55);
        border: 1px solid rgba(249, 115, 22, 0.15);
    }

    .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .product-title-wrap {
        display: flex;
        gap: 8px;
        align-items: baseline;
    }

    .product-title {
        font-size: 15px;
        font-weight: 800;
        color: #7c2d12;
    }

    .id {
        font-size: 12px;
        color: #9ca3af;
    }

    .grid {
        display: flex;
        gap: 40px;
    }

    .col {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .row {
        display: flex;
        gap: 10px;
    }

    .label {
        font-size: 12px;
        color: #9a3412;
        width: 60px;
    }

    .value {
        font-size: 12px;
        color: #7c2d12;
    }

    .actions {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .view-btn {
        background: linear-gradient(90deg, #60a5fa, #3b82f6);
        border: none;
        color: white;
        border-radius: 12px;
    }

    .btn {
        background: linear-gradient(90deg, #fb923c, #f97316);
        border: none;
        color: white;
        border-radius: 12px;
    }

    .jump-btn {
        margin-top: 12px;
        width: 100%;
    }

    .dialog-title {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 12px;
    }

    .dialog-btn {
        margin-top: 16px;
        width: 100%;
        height: 44px;
        border-radius: 14px;
        color: white;
        background: linear-gradient(90deg, #fb923c, #f97316, #ef4444);
        border: none;
    }
</style>
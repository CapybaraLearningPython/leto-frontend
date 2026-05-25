<template>
    <div class="page">

        <div class="top-bar">
            <div class="title">秒杀管理</div>

            <el-button class="add-btn" @click="openCreate">
                + 新增秒杀
            </el-button>
        </div>

        <div class="list">

            <div class="item" v-for="s in seckillList" :key="s.id">

                <div class="main">

                    <div class="header">
                        <div class="product-title-wrap">
                            <span class="product-title">{{ s.product.title }}</span>
                            <span class="product-id">#{{ s.product.id }}</span>
                        </div>
                    </div>

                    <div class="grid">

                        <div class="col">
                            <div class="row">
                                <span class="label">秒杀价</span>
                                <span class="value">￥{{ s.seckill_price / 100 }}</span>
                            </div>

                            <div class="row">
                                <span class="label">时间</span>
                                <span class="value">{{ s.starts_at }} ~ {{ s.ends_at }}</span>
                            </div>
                        </div>

                        <div class="col">
                            <div class="row">
                                <span class="label">库存</span>
                                <span class="value">{{ s.stock }}</span>
                            </div>

                            <div class="row">
                                <span class="label">限购</span>
                                <span class="value">{{ s.max_per_buyer }}</span>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="actions">

                    <el-button class="view-btn" @click="openProductBubble(s)">
                        查看商品
                    </el-button>

                    <el-button class="btn" @click="openEdit(s)">
                        修改秒杀
                    </el-button>

                    <el-button class="delete-btn" @click="openDelete(s)">
                        删除秒杀
                    </el-button>

                </div>

            </div>

        </div>

        <!-- 商品气泡 -->
        <el-dialog v-model="bubbleVisible" width="520px" :close-on-click-modal="false" :close-on-press-escape="false">

            <div class="dialog-title">商品详情</div>

            <div class="bubble">

                <div class="row">
                    <span class="label">ID</span>
                    <span class="value">{{ productDetail.id }}</span>
                </div>

                <div class="row">
                    <span class="label">标题</span>
                    <span class="value">{{ productDetail.title }}</span>
                </div>

                <div class="row">
                    <span class="label">价格</span>
                    <span class="value">￥{{ productDetail.price / 100 }}</span>
                </div>

                <div class="row">
                    <span class="label">详情</span>
                    <span class="value">{{ productDetail.detail }}</span>
                </div>

                <el-button class="btn jump-btn" @click="onGoProductClick">
                    前往商品管理
                </el-button>

            </div>

        </el-dialog>

        <!-- 新增 / 修改 -->
        <el-dialog v-model="formVisible" width="520px" :close-on-click-modal="false" :close-on-press-escape="false">

            <div class="dialog-title">
                {{ isEdit ? '修改秒杀' : '新增秒杀' }}
            </div>

            <el-form :model="form" label-width="100px">

                <el-form-item label="秒杀价">
                    <el-input v-model="form.seckill_price" />
                </el-form-item>

                <el-form-item label="库存">
                    <el-input v-model="form.stock" />
                </el-form-item>

                <el-form-item label="限购">
                    <el-input v-model="form.max_per_buyer" />
                </el-form-item>

                <el-form-item label="起止时间">
                    <el-date-picker size="small" v-model="timeRange" type="datetimerange" range-separator="至"
                        start-placeholder="开始时间" end-placeholder="结束时间" value-format="YYYY-MM-DDTHH:mm:ss"
                        style="width: 100%;" />
                </el-form-item>

                <el-form-item label="商品">

                    <el-select v-model="form.product_id" placeholder="请选择商品" style="width: 100%;">

                        <el-option v-for="p in productList" :key="p.id" :label="p.title" :value="p.id" />

                    </el-select>

                </el-form-item>

            </el-form>

            <el-button class="dialog-btn" @click="saveSeckill">
                保存
            </el-button>

        </el-dialog>

        <!-- 删除确认 -->
        <el-dialog v-model="deleteVisible" width="420px" :close-on-click-modal="false" :close-on-press-escape="false">

            <div class="dialog-title">删除秒杀</div>

            <div class="delete-text">
                确认删除该秒杀活动？
            </div>

            <div class="delete-actions">

                <el-button class="cancel-btn" @click="deleteVisible = false">
                    取消
                </el-button>

                <el-button class="confirm-delete-btn" @click="confirmDelete">
                    删除
                </el-button>

            </div>

        </el-dialog>

    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import adminRequest from '@/api/adminRequest'
    import { ElMessage } from 'element-plus'

    const router = useRouter()
    const timeRange = ref([])
    const seckillList = ref([])

    const bubbleVisible = ref(false)
    const productDetail = ref({})

    const formVisible = ref(false)
    const deleteVisible = ref(false)
    const isEdit = ref(false)

    const currentId = ref(null)

    const productList = ref([])

    const form = ref({
        seckill_price: '',
        stock: '',
        max_per_buyer: '',
        starts_at: '',
        ends_at: '',
        product_id: ''
    })

    const onGoProductClick = () => {
        bubbleVisible.value = false
        router.push({ name: 'product_admin' })
    }

    onMounted(async () => {
        seckillList.value = (await adminRequest.getSeckillList()).seckills
        productList.value = (await adminRequest.getProductList()).products
    })

    const openProductBubble = (s) => {
        bubbleVisible.value = true
        productDetail.value = {
            id: s.product.id,
            title: s.product.title,
            price: s.product.price,
            detail: s.product.detail
        }
    }

    const openCreate = () => {
        isEdit.value = false
        currentId.value = null
        form.value = {
            seckill_price: '',
            stock: '',
            max_per_buyer: '',
            starts_at: '',
            ends_at: '',
            product_id: ''
        }
        formVisible.value = true
    }

    const openEdit = (s) => {
        isEdit.value = true
        currentId.value = s.id
        form.value = {
            ...s,
            product_id: s.product.id,
            seckill_price: s.seckill_price / 100
        }
        timeRange.value = [s.starts_at, s.ends_at]
        formVisible.value = true
    }

    const saveSeckill = async () => {
        formVisible.value = false
        form.value.starts_at = timeRange.value[0]
        form.value.ends_at = timeRange.value[1]
        form.value.seckill_price = String(form.value.seckill_price * 100)
        if (isEdit.value) {
            await adminRequest.updateSeckill(form.value, currentId.value)
            timeRange.value = []
            ElMessage.success('秒杀信息修改成功！')
        } else {
            await adminRequest.createSeckill(form.value)
            timeRange.value = []
            ElMessage.success('秒杀信息添加成功！')
        }
        seckillList.value = (await adminRequest.getSeckillList()).seckills
    }

    const openDelete = (s) => {
        currentId.value = s.id
        deleteVisible.value = true
    }

    const confirmDelete = async () => {
        await adminRequest.deleteSeckill(currentId.value)
        ElMessage.success('秒杀信息删除成功！')
        deleteVisible.value = false
        seckillList.value = (await adminRequest.getSeckillList()).seckills
    }
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

    .add-btn {
        background: linear-gradient(90deg, #fb923c, #f97316, #ef4444);
        color: white;
        border: none;
        border-radius: 14px;
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

    .product-id {
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
        width: 50px;
    }

    .value {
        font-size: 12px;
        color: #7c2d12;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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

    .delete-btn {
        background: linear-gradient(90deg, #ec5454, #f43333);
        border: none;
        color: white;
        border-radius: 12px;
    }

    /* dialog */

    .dialog-title {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 12px;
    }

    .bubble .row {
        display: flex;
        gap: 10px;
        margin-bottom: 8px;
        align-items: flex-start;
    }

    .bubble .row .label {
        width: 40px;
        white-space: nowrap;
    }

    .bubble .row .value {
        flex: 1;
        white-space: normal;
        word-break: break-all;
    }

    .cancel-btn {
        flex: 1;
        height: 44px;
        border-radius: 14px;
        border: none;
        font-weight: 700;
        color: white;
        background: linear-gradient(90deg, #fb923c, #f97316);
    }

    .confirm-delete-btn {
        flex: 1;
        height: 44px;
        border-radius: 14px;
        border: none;
        font-weight: 700;
        color: white;
        background: linear-gradient(90deg, #6b7280, #4b5563);
    }

    .delete-actions {
        display: flex;
        gap: 12px;
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

    .delete-text {
        font-size: 14px;
        color: #7c2d12;
        margin: 10px 0 20px;
    }
</style>
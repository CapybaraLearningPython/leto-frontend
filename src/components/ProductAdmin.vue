<template>
    <div class="page">

        <!-- 顶部工具栏 -->
        <div class="top-bar">
            <div class="title">商品管理</div>

            <el-button class="add-btn" @click="openCreate">
                + 新增商品
            </el-button>
        </div>

        <!-- 商品列表 -->
        <div class="list">

            <div class="item" v-for="p in productList" :key="p.id">

                <div class="main">
                    <text class="title">{{ p.title }}</text>
                    <text class="price">￥{{ p.price / 100 }}</text>

                    <text class="detail">{{ p.detail }}</text>
                </div>

                <div class="actions">

                    <el-button class="btn" @click="openEdit(p)">
                        修改商品
                    </el-button>

                    <el-button class="btn" @click="openCover(p)">
                        修改封面
                    </el-button>

                    <el-button class="delete-btn" @click="removeProduct(p)">
                        删除商品
                    </el-button>

                </div>

            </div>

        </div>

        <!-- 修改 / 新增 共用 dialog -->
        <el-dialog v-model="formVisible" width="520px">

            <div class="dialog-title">
                {{ isEdit ? '修改商品' : '新增商品' }}
            </div>

            <el-form :model="form" label-width="80px">

                <el-form-item label="标题">
                    <el-input v-model="form.title" />
                </el-form-item>

                <el-form-item label="价格">
                    <el-input v-model="form.price" />
                </el-form-item>

                <el-form-item label="详情">
                    <el-input v-model="form.detail" type="textarea" />
                </el-form-item>

            </el-form>

            <el-button class="dialog-btn" @click="saveProduct">
                保存
            </el-button>

        </el-dialog>

        <!-- 修改封面 -->
        <el-dialog v-model="coverVisible" width="520px">

            <div class="dialog-title">修改封面</div>

            <div class="cover-list">

                <div class="cover-item" v-for="(c, i) in covers" :key="i">

                    <el-input v-model="covers[i]" class="cover-input" />

                    <img class="thumb" :src="c" />

                </div>

                <el-button class="add-cover" @click="covers.push('')">
                    + 添加封面
                </el-button>

            </div>

            <el-button class="dialog-btn" @click="saveCover">
                保存封面
            </el-button>

        </el-dialog>

        <!-- 删除确认 dialog（新增，不改原结构） -->
        <el-dialog v-model="deleteVisible" width="420px">

            <div class="dialog-title">删除商品</div>

            <div class="delete-text">
                确认删除该商品吗？
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
    import adminRequest from '@/api/adminRequest'
    import { ElMessage } from 'element-plus'

    const productList = ref([])

    const formVisible = ref(false)
    const coverVisible = ref(false)
    const deleteVisible = ref(false)

    const isEdit = ref(false)
    const currentId = ref(null)

    const form = ref({
        title: '',
        price: '',
        detail: ''
    })

    const covers = ref([])

    onMounted(async () => {
        productList.value = (await adminRequest.getProductList()).products
    })

    const openCreate = () => {
        isEdit.value = false
        currentId.value = null
        form.value = { title: '', price: '', detail: '' }
        formVisible.value = true
    }

    const openEdit = (p) => {
        isEdit.value = true
        currentId.value = p.id
        form.value = {
            ...p,
            price: p.price / 100
        }
        formVisible.value = true
    }

    const saveProduct = async () => {
        formVisible.value = false

        if (isEdit.value) {
            form.value.price = String(form.value.price * 100)
            await adminRequest.updateProduct(form.value, currentId.value)
            ElMessage.success('商品信息保存成功！')
        } else {
            form.value.covers = []
            form.value.price = String(form.value.price * 100)
            await adminRequest.createProduct(form.value)
            ElMessage.success('商品创建成功，可在列表页添加封面！')
        }

        productList.value = (await adminRequest.getProductList()).products
    }

    const openCover = (p) => {
        currentId.value = p.id
        covers.value = p.covers
        coverVisible.value = true
    }

    const saveCover = async () => {
        coverVisible.value = false
        await adminRequest.updateProduct({ covers: covers.value }, currentId.value)
        ElMessage.success('商品封面保存成功！')
    }

    /* 删除改为弹窗触发 */
    const removeProduct = (p) => {
        currentId.value = p.id
        deleteVisible.value = true
    }

    const confirmDelete = async () => {
        const res = await adminRequest.deleteProduct(currentId.value)
        console.log("res", res)
        ElMessage.success("商品删除成功！")
        productList.value = (await adminRequest.getProductList()).products
        deleteVisible.value = false
    }
</script>

<style scoped>
    .page {
        padding: 24px;
    }

    .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 18px;
    }

    .title {
        font-size: 15px;
        font-weight: 800;
        color: #7c2d12;
        margin-right: 10px;
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
        align-items: center;
        padding: 14px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.55);
        border: 1px solid rgba(249, 115, 22, 0.15);
    }

    .main {
        max-width: 60%;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .item .title {
        width: 250px;
        flex-shrink: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .price {
        color: #f97316;
        font-weight: 800;
        font-size: 16px;
        margin-right: 20px;
    }

    .detail {
        font-size: 12px;
        color: #6b7280;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 60%;
        display: inline-block;
    }

    .actions {
        display: flex;
        gap: 10px;
    }

    .btn {
        border-radius: 12px;
        background: linear-gradient(90deg, #fb923c, #f97316);
        color: white;
        border: none;
    }

    .delete-btn {
        border-radius: 12px;
        background: linear-gradient(90deg, #ec5454, #f43333);
        color: white;
        border: none;
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

    /* 删除弹窗 */
    .delete-text {
        font-size: 14px;
        color: #7c2d12;
        margin: 10px 0 20px;
    }

    .delete-actions {
        display: flex;
        gap: 10px;
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

    /* covers */

    .cover-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .cover-item {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .cover-input {
        flex: 1;
    }

    .cover-input :deep(input) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .thumb {
        width: 42px;
        height: 42px;
        border-radius: 10px;
        object-fit: cover;
    }

    .add-cover {
        background: #fff7ed;
        border: 1px dashed #f97316;
        color: #f97316;
        border-radius: 12px;
    }
</style>
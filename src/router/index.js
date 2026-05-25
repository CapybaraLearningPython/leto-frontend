import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/Login.vue'),
    },
    {
      path: '/frame',
      name: 'frame',
      redirect: 'seckill_list',
      component: () => import('@/components/Frame.vue'),
      children: [
        {
          path: '/seckill_list',
          name: 'seckill_list',
          component: () => import('@/components/SeckillList.vue'),
        },
        {
          path: '/seckill_detail/:id',
          name: 'seckill_detail',
          component: () => import('@/components/SeckillDetail.vue'),
        },
        {
          path: '/order_list',
          name: 'order_list',
          component: () => import('@/components/OrderList.vue'),
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/components/Profile.vue'),
        },
        {
          path: '/payment_result',
          name: 'payment_result',
          component: () => import('@/components/PaymentResult.vue'),
        },
        {
          path: '/edit_profile',
          name: 'edit_profile',
          component: () => import('@/components/EditProfile.vue'),
        },
        {
          path: '/login_required',
          name: 'login_required',
          component: () => import('@/components/LoginRequired.vue'),
        },
      ],
    },
    {
      path: '/admin_frame',
      name: 'admin_frame',
      component: () => import('@/components/AdminFrame.vue'),
      redirect: 'product_admin',
      children: [
        {
          path: '/product_admin',
          name: 'product_admin',
          component: () => import('@/components/ProductAdmin.vue'),
        },
        {
          path: '/seckill_admin',
          name: 'seckill_admin',
          component: () => import('@/components/SeckillAdmin.vue'),
        },
        {
          path: '/order_admin',
          name: 'order_admin',
          component: () => import('@/components/OrderAdmin.vue'),
        },
        {
          path: '/login_status_admin',
          name: 'login_status_admin',
          component: () => import('@/components/LoginStatusAdmin.vue'),
        },
        {
          path: '/seller_profile',
          name: 'seller_profile',
          component: () => import('@/components/Profile.vue'),
        },
        {
          path: '/edit_seller_profile',
          name: 'edit_seller_profile',
          component: () => import('@/components/EditProfile.vue'),
        },
      ],
    },
  ],
})

export default router

export default {
  path: 'result',
  name: 'result',
  component: () => import('@/views/result/index.vue'),
  meta: {
    locale: 'menu.result',
    icon: 'icon-check-circle',
    requiresAuth: true,
  },
  children: [
    {
      path: 'success',
      name: 'success',
      component: () => import('@/views/result/success/index.vue'),
      meta: {
        id: '12',
        locale: 'menu.result.title',
        requiresAuth: true,
        roles: [],
      },
    },
    {
      path: 'create-order',
      name: 'CreateOrder',
      component: () => import('@/views/result/create-order/index.vue'),
      meta: {
        id: '13',
        locale: 'menu.create-order.title',
        requiresAuth: true,
        roles: [],
      },
    },
    {
      path: 'anomalous-reminder',
      name: 'AnomalousReminder',
      component: () => import('@/views/result/anomalous-reminder/index.vue'),
      meta: {
        id: '14',
        locale: 'menu.anomalous-reminder.title',
        requiresAuth: true,
        roles: [],
      },
    },
    // complex-query
    {
      path: 'complex-query',
      name: 'ComplexQuery',
      component: () => import('@/views/result/complex-query/index.vue'),
      meta: {
        id: '15',
        locale: 'menu.complex-query.title',
        requiresAuth: true,
        roles: [],
      },
    },
    // order-checkout
    {
      path: 'order-checkout',
      name: 'OrderCheckout',
      component: () => import('@/views/result/order-checkout/index.vue'),
      meta: {
        id: '16',
        locale: 'menu.order-checkout.title',
        requiresAuth: true,
        roles: [],
      },
    },
    // {
    //   path: 'error',
    //   name: 'error',
    //   component: () => import('@/views/result/error/index.vue'),
    //   meta: {
    //     locale: 'menu.result.error',
    //     requiresAuth: true,
    //     roles: ['admin'],
    //   },
    // },
  ],
};

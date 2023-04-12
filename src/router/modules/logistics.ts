export default {
  path: 'logistics',
  name: 'logistics',
  component: () => import('@/views/logistics/index.vue'),
  meta: {
    locale: 'menu.logistics',
    icon: 'icon-code-sandbox',
    requiresAuth: true,
  },
  children: [
    {
      path: 'logistics-order',
      name: 'LogisticsOrder',
      component: () => import('@/views/logistics/logistics-order/index.vue'),
      meta: {
        id: '21',
        locale: 'menu.logistics-order.title',
        requiresAuth: true,
        roles: [],
      },
    },
    {
      path: 'logistic-assgin',
      name: 'LogisticsAssgin',
      component: () => import('@/views/logistics/logistics-assgin/index.vue'),
      meta: {
        id: '22',
        locale: 'menu.logistics-assgin.title',
        requiresAuth: true,
        roles: [],
      },
    },
    {
      path: 'logistic-result',
      name: 'LogisticsResult',
      component: () => import('@/views/logistics/logistics-result/index.vue'),
      meta: {
        id: '23',
        locale: 'menu.logistics-result.title',
        requiresAuth: true,
        roles: [],
      },
    },
  ],
};

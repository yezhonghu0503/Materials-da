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
      path: 'delivery',
      name: 'delivery',
      component: () => import('@/views/logistics/delivery/index.vue'),
      meta: {
        locale: 'design.delivery.title',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

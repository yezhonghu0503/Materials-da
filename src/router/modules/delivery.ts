export default {
  path: 'delivery',
  name: 'delivery',
  component: () => import('@/views/design/index.vue'),
  meta: {
    locale: 'menu.delivery',
    icon: 'icon-thumb-up',
    requiresAuth: true,
  },
  children: [],
};

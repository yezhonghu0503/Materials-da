export default {
  path: 'design',
  name: 'design',
  component: () => import('@/views/design/index.vue'),
  meta: {
    locale: 'menu.design',
    icon: 'icon-edit',
    requiresAuth: true,
  },
  children: [
    {
      path: 'measurement',
      name: 'measurement',
      component: () => import('@/views/design/measurement/index.vue'),
      meta: {
        locale: 'menu.measurement.title',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

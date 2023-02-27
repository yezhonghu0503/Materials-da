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
    // surveyo-order
    {
      path: 'surveyo-order',
      name: 'SurveyoOrder',
      component: () => import('@/views/design/surveyo-order/index.vue'),
      meta: {
        locale: 'menu.surveyo-order.title',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
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

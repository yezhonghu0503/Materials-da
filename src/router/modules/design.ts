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
        id: '19',
        locale: 'menu.surveyo-order.title',
        requiresAuth: true,
        roles: [],
      },
    },
    {
      path: 'measurement',
      name: 'measurement',
      component: () => import('@/views/design/measurement/index.vue'),
      meta: {
        id: '20',
        locale: 'menu.measurement.title',
        requiresAuth: true,
        roles: [],
      },
    },
  ],
};

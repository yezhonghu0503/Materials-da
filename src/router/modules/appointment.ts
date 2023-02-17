export default {
  path: 'appointment',
  name: 'appointment',
  component: () => import('@/views/appointment/index.vue'),
  meta: {
    locale: 'menu.appointment',
    icon: 'icon-history',
    requiresAuth: true,
  },
  children: [
    {
      path: 'measure',
      name: 'measure',
      component: () => import('@/views/appointment/measure/index.vue'),
      meta: {
        locale: 'appointment.measure.title',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    // distribution
    {
      path: 'distribution',
      name: 'distribution',
      component: () => import('@/views/appointment/distribution/index.vue'),
      meta: {
        locale: 'appointment.distribution.title',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    // appointment.fix.title
    {
      path: 'fix',
      name: 'fix',
      component: () => import('@/views/appointment/fix/index.vue'),
      meta: {
        locale: 'appointment.fix.title',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default {
  path: 'appointment',
  name: 'appointment',
  component: () => import('@/views/appointment/index.vue'),
  meta: {
    locale: 'menu.appointment',
    icon: 'icon-brush',
    requiresAuth: true,
  },
  children: [
    {
      path: 'measure',
      name: 'measure',
      component: () => import('@/views/appointment/measure/index.vue'),
      meta: {
        id: '24',
        locale: 'appointment.measure.title',
        requiresAuth: true,
        roles: [],
      },
    },
    // distribution
    {
      path: 'distribution',
      name: 'distribution',
      component: () => import('@/views/appointment/distribution/index.vue'),
      meta: {
        id: '25',
        locale: 'appointment.distribution.title',
        requiresAuth: true,
        roles: [],
      },
    },
    // appointment.fix.title
    {
      path: 'fix',
      name: 'fix',
      component: () => import('@/views/appointment/fix/index.vue'),
      meta: {
        id: '26',
        locale: 'appointment.fix.title',
        requiresAuth: true,
        roles: [],
      },
    },
  ],
};

export default {
  path: 'dashboard',
  name: 'dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'icon-dashboard',
  },
  children: [
    {
      path: 'workplace',
      name: 'workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        id: '9',
        locale: 'menu.dashboard.workplace',
        requiresAuth: true,
        roles: [],
      },
    },
    {
      path: 'multi-dimension-data-analysis',
      name: 'multiDimensionDataAnalysis',
      component: () =>
        import('@/views/dashboard/multi-dimension-data-analysis/index.vue'),
      meta: {
        id: '10',
        locale: 'menu.visualization.multiDimensionDataAnalysis',
        requiresAuth: true,
        roles: [],
      },
    },
    {
      path: 'screen-mode',
      name: 'ScreenMode',
      component: () => import('@/views/dashboard/screen-mode/index.vue'),
      meta: {
        id: '11',
        locale: 'menu.screen-mode.title',
        requiresAuth: true,
        roles: [],
      },
    },
    /** simple */
    // {
    //   path: 'monitor',
    //   name: 'monitor',
    //   component: () => import('@/views/dashboard/monitor/index.vue'),
    //   meta: {
    //     locale: 'menu.dashboard.monitor',
    //     requiresAuth: true,
    //     roles: ['admin'],
    //   },
    // },
    /** simple end */
  ],
};

export default {
  path: 'list',
  name: 'list',
  component: () => import('@/views/list/index.vue'),
  meta: {
    locale: 'menu.list',
    requiresAuth: true,
    icon: 'icon-list',
  },
  children: [
    {
      path: 'search-table', // The midline path complies with SEO specifications
      name: 'searchTable',
      component: () => import('@/views/list/search-table/index.vue'),
      meta: {
        locale: 'menu.list.searchTable',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'classify',
      name: 'classify',
      component: () => import('@/views/list/classify/index.vue'),
      meta: {
        locale: 'menu.list.classify',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'basic',
      name: 'basic',
      component: () => import('@/views/profile/basic/index.vue'),
      meta: {
        locale: 'menu.profile.basic',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'activity',
      name: 'activity',
      component: () => import('@/views/exception/403/index.vue'),
      meta: {
        locale: 'menu.exception.activity',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

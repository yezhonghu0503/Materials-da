export default {
  path: 'form',
  name: 'form',
  component: () => import('@/views/form/index.vue'),
  meta: {
    locale: 'menu.form',
    icon: 'icon-settings',
    requiresAuth: true,
  },
  children: [
    {
      path: 'group',
      name: 'group',
      component: () => import('@/views/form/group/index.vue'),
      meta: {
        locale: 'menu.form.group',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'roles',
      name: 'roles',
      component: () => import('@/views/form/roles/index.vue'),
      meta: {
        locale: 'menu.form.roles',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

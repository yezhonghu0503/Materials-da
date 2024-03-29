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
        id: '31',
        locale: 'menu.form.group',
        requiresAuth: true,
        roles: [],
      },
    },
    {
      path: 'roles',
      name: 'roles',
      component: () => import('@/views/form/roles/index.vue'),
      meta: {
        id: '32',
        locale: 'menu.form.roles',
        requiresAuth: true,
        roles: [],
      },
    },
    {
      path: 'supplier',
      name: 'supplier',
      component: () => import('@/views/form/supplier/index.vue'),
      meta: {
        id: '33',
        locale: 'menu.form.supplier',
        requiresAuth: true,
        roles: [],
      },
    },
  ],
};

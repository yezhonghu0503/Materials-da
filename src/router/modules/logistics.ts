export default {
  path: 'logistics',
  name: 'logistics',
  component: () => import('@/views/form/index.vue'),
  meta: {
    locale: 'menu.logistics',
    icon: 'icon-code-sandbox',
    requiresAuth: true,
  },
  children: [
    {
      path: 'step',
      name: 'step',
      component: () => import('@/views/form/step/index.vue'),
      meta: {
        locale: 'menu.form.step',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
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
    {
      path: 'user-management',
      name: 'userManagement',
      component: () => import('@/views/form/userManagement/index.vue'),
      meta: {
        locale: 'menu.form.user',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

// inventory-query
export default {
  path: 'warehouse',
  name: 'warehouse',
  component: () => import('@/views/warehouse/index.vue'),
  meta: {
    locale: 'menu.warehouse',
    icon: 'icon-home',
    requiresAuth: true,
  },
  children: [
    {
      path: 'inventory-query',
      name: 'InventoryQuery',
      component: () => import('@/views/warehouse/inventory-query/index.vue'),
      meta: {
        id: '17',
        locale: 'menu.inventory-query.title',
        requiresAuth: true,
        roles: [],
      },
    },
    // replenishment-query
    {
      path: 'replenishment-query',
      name: 'ReplenishmentQuery',
      component: () =>
        import('@/views/warehouse/replenishment-query/index.vue'),
      meta: {
        id: '18',
        locale: 'menu.replenishment-query.title',
        requiresAuth: true,
        roles: [],
      },
    },
  ],
};

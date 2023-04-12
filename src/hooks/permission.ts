import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store';
// const info = JSON.parse(window.localStorage.getItem('userInfo') as any);
// // userStore.roleList(info.role.id);
// console.log(info);
export default function usePermission() {
  const userStore = useUserStore();
  // console.log(userStore.role);
  // const info = JSON.parse(window.localStorage.getItem('userInfo') as any);
  // userStore.roleList(info.role.id);
  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      const info = JSON.parse(window.localStorage.getItem('userInfo') as any);
      // console.log(info.roleInfo.hasIds);
      // userStore.roleList(info.role.id);

      // route.meta?.roles = null;
      // console.log(route.meta);
      // if (route.meta?.roles) {
      // console.log(window.localStorage.getItem('userInfo'));
      // if (route.name === 'SurveyoOrder') {
      //   route.meta.roles[0] = 'none';
      // }
      // console.log(typeof route.meta.id);
      // const userStore = useUserStore();
      // if (localStorage.getItem('ht-token')) {
      info.roleInfo.hasIds.forEach((item: any) => {
        if (String(item) === route.meta?.id) {
          if (route.meta?.roles) {
            route.meta.roles[0] = '*';
          }
        }
      });
      // }

      // console.log(route.meta);
      // console.log(JSON.parse(window.localStorage.getItem('roleList') as any));
      // }
      // }
      return (
        !route.meta?.requiresAuth ||
        !route.meta?.roles ||
        route.meta?.roles?.includes('*') ||
        route.meta?.roles?.includes(userStore.role)
      );
    },
    findFirstPermissionRoute(_routers: any, role = 'admin') {
      const cloneRouters = [..._routers];
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift();
        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            return el.includes('*') || el.includes(role);
          })
        )
          return { name: firstElement.name };
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children);
        }
      }
      return null;
    },
    // You can add any rules you want
  };
}

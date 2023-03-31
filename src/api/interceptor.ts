// import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '@/utils/auth';

import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';

if (import.meta.env.VITE_APP_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;
}
axios.defaults.headers['ht-token'] = getToken();
export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // config.headers['ht-token'] = localStorage.getItem('ht-token');
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  // (response: AxiosResponse<HttpResponse>) => {
  (response: any) => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      Message.error({
        content: res.msg || 'Error',
        duration: 5 * 1000,
      });
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        [50008, 50012, 50014].includes(res.code) &&
        response.config.url !== '/admin/user/info'
      ) {
        Modal.error({
          title: 'Confirm logout',
          content:
            'You have been logged out, you can cancel to stay on this page, or log in again',
          okText: 'Re-Login',
          async onOk() {
            const userStore = useUserStore();

            await userStore.logout();
            window.location.reload();
          },
        });
      }
      console.log(res.msg);
      return Promise.reject(new Error(res.msg || 'Error'));
    }
    return res;
  },
  (error) => {
    Message.error({
      content: error.msg,
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

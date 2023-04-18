import axios from 'axios';

// 分类列表
// 测量设计预约列表
export function getMeasurementList(params: any) {
  return axios.get('/admin/appointment/list/measurement', params);
}

// 安装预约列表
export function getInstallList(params: any) {
  return axios.get('/admin/appointment/list/install', params);
}

// 配送预约列表
export function getDeliveryList(params: any) {
  return axios.get('/admin/appointment/list/delivery', params);
}

// 所有预约列表
export function getAllList(params: any) {
  return axios.get('/admin/appointment/list', params);
}

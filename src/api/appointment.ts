import axios from 'axios';

// 分类列表
// 测量设计预约列表
export function getMeasurementList(params: any) {
  return axios.get('/admin/appointment/list/measurement', params);
}
// 测量设计详情
export function getMeasurementDetails(params: any) {
  return axios.get('/admin/appointment/detail/measurement', { params });
}
// 配送详情
export function getDeliveryDetails(params: any) {
  return axios.get('/admin/appointment/detail/delivery', { params });
}
// 安装详情
export function getInstallDetails(params: any) {
  return axios.get('/admin/appointment/detail/install', { params });
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

// 编辑预约单
export function postEditList(params: any) {
  return axios.post('/admin/appointment/edit', params);
}

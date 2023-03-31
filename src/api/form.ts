import axios from 'axios';

export interface BaseInfoModel {
  activityName: string;
  channelType: string;
  promotionTime: string[];
  promoteLink: string;
}
export interface ChannelInfoModel {
  advertisingSource: string;
  advertisingMedia: string;
  keyword: string[];
  pushNotify: boolean;
  advertisingContent: string;
}

export type UnitChannelModel = BaseInfoModel & ChannelInfoModel;

// export function submitChannelForm(data: UnitChannelModel) {
//   return axios.post('/api/channel-form/submit', { data });
// }
export function getSupplier() {
  return axios.get('/admin/supplier/list');
}

export function addNewSupplier(data: any) {
  return axios.post('/admin/supplier/add', data);
}

export function getRoleList() {
  return axios.get('/admin/role/list');
}

export function getRoleRights() {
  return axios.get('/admin/role/rights');
}

// 新增角色
export function postAddRole(data: any) {
  return axios.post('/admin/role/add', data);
}

// 获取角色详情
export function getRoleDetailed(params: any) {
  return axios.get('/admin/role/info', { params });
}

// 删除角色
export function getDeleteRole(params: any) {
  return axios.get('/admin/role/del', { params });
}

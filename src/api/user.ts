import axios from 'axios';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/admin/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/admin/user/info');
}
export function getUserList(params: any) {
  return axios.get('/admin/user/list', { params });
}
export function roleList() {
  return axios.get<LoginRes>('/admin/role/rights');
}

export function postAddUser(data: any) {
  return axios.post('/admin/user/add', data);
}

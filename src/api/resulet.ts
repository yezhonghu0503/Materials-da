import axios from 'axios';

export function postAddCustomer(data: any) {
  return axios.post('/admin/customer/add', data);
}

export function getSupplierInfo(params: any) {
  return axios.get('/admin/supplier/info', { params });
}

export function getUserSupplier(params: any) {
  return axios.get('/admin/supplier/getByUserId', { params });
}

export function postAddappointment(data: any) {
  return axios.post('/admin/appointment/add', data);
}

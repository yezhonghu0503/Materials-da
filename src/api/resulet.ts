import axios from 'axios';

export function postAddCustomer(data: any) {
  return axios.post('/admin/customer/add', data);
}

export function getSupplierInfo(params: any) {
  return axios.get('/admin/supplier/info', { params });
}

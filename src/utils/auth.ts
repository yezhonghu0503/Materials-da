const isLogin = () => {
  return !!localStorage.getItem('ht-token');
};

const getToken = () => {
  return localStorage.getItem('ht-token');
};

const setToken = (token: string) => {
  localStorage.setItem('ht-token', token);
};

const clearToken = () => {
  localStorage.removeItem('ht-token');
};

const setuserInfo = (info: any) => {
  localStorage.setItem('userInfo', info);
};
const setRoleList = (roleList: any) => {
  localStorage.setItem('roleList', JSON.stringify(roleList));
};
export { isLogin, getToken, setToken, clearToken, setuserInfo, setRoleList };

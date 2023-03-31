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

export { isLogin, getToken, setToken, clearToken };

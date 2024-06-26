// tokenUtils.js

export const generateToken = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 9; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
};

let activeToken = null;

export const setActiveToken = (token) => {
  activeToken = token;
  localStorage.setItem('activeToken', token);
};

export const getActiveToken = () => {
  return activeToken || localStorage.getItem('activeToken');
};

export const clearActiveToken = () => {
  activeToken = null;
  localStorage.removeItem('activeToken');
};

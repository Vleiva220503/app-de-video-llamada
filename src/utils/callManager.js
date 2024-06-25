import { generateToken } from './tokenGenerator';

let activeToken = null;

export const createCall = () => {
  activeToken = generateToken();
  return activeToken;
};

export const joinCall = (token) => {
  if (token === activeToken) {
    return true;
  } else {
    return false;
  }
};

export const endCall = () => {
  activeToken = null;
};

export const getActiveToken = () => {
  return activeToken;
};

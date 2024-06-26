import { generateToken, setActiveToken, getActiveToken, clearActiveToken } from './tokenGenerator';

// Función para crear una nueva llamada y almacenar el token en localStorage
export const createCall = () => {
  const token = generateToken();
  setActiveToken(token);
  return token;
};

// Función para unirse a una llamada utilizando el token almacenado en localStorage
export const joinCall = (token) => {
  const storedToken = getActiveToken();
  return storedToken && token === storedToken;
};

// Función para finalizar la llamada y limpiar el token de localStorage
export const endCall = () => {
  clearActiveToken();
};

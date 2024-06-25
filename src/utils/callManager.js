// callManager.js

let activeToken = null;

// Función para generar un nuevo token
const generateToken = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 9; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
};

// Función para crear una nueva llamada y almacenar el token en localStorage
export const createCall = () => {
  activeToken = generateToken();
  localStorage.setItem('activeToken', activeToken); // Guardar el token en localStorage
  return activeToken;
};

// Función para unirse a una llamada utilizando el token almacenado en localStorage
export const joinCall = (token) => {
  const storedToken = localStorage.getItem('activeToken');
  if (storedToken && token === storedToken) {
    return true; // Permitir unirse si el token coincide con el almacenado en localStorage
  } else {
    return false; // Denegar el acceso si el token no coincide o no existe en localStorage
  }
};

// Función para finalizar la llamada y limpiar el token de localStorage
export const endCall = () => {
  activeToken = null;
  localStorage.removeItem('activeToken'); // Limpiar el token de localStorage al finalizar la llamada
};

// Función para obtener el token almacenado en localStorage
export const getActiveToken = () => {
  activeToken = localStorage.getItem('activeToken');
  return activeToken;
};

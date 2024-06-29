import axios from 'axios';

const API_KEY = 'Bearer e976051c3f8c3732f68caa7cc93d2633cdbd3023e480a8a1f9d4b31458aa4c8f';

export const createRoom = async () => {
  try {
    const response = await axios.post('https://api.daily.co/v1/rooms', {
      properties: { enable_chat: true }
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: API_KEY,
      }
    });

    console.log('Room creation response:', response);
    return response.data.url;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango de 2xx
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      // La solicitud se realizó pero no se recibió respuesta
      console.error('Error request:', error.request);
    } else {
      // Algo pasó al configurar la solicitud que desencadenó un error
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
    throw new Error(`Error creating room: ${error.response?.data?.error || error.message}`);
  }
};

export const createToken = async (roomName) => {
  try {
    const response = await axios.post('https://api.daily.co/v1/meeting-tokens', {
      properties: {
        room_name: roomName,
        is_owner: true,
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: API_KEY,
      }
    });

    console.log('Token creation response:', response);
    return response.data.token;
  } catch (error) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
    throw new Error(`Error creating token: ${error.response?.data?.error || error.message}`);
  }
};

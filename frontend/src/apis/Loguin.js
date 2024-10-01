import axios from 'axios';


const API_URL = `${import.meta.env.VITE_API_URL}/usuarios/registro`;

// Función para registrar un nuevo usuario
const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error de conexión';
  }
};

export default {
  registerUser,
};

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/usuarios/login';

function Login() {
  const [user, setUser] = useState({ nombre: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      console.log('Envio  info')
      const response = await axios.post(API_URL, user);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error de login:', error.response?.data || 'Error de conexión');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center">
        <header className="w-full fixed top-0 left-0 z-10 bg-blue-900 text-white py-4 shadow-lg flex justify-between items-center px-6">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white hover:text-yellow-500">EmprendeCont</Link>
        </div>
        <nav>
          <Link to="/" className="text-white hover:text-yellow-500 px-4">Inicio</Link>
        </nav>
      </header>
      <div className="mt-16 max-w-md bg-white shadow-md rounded-md p-8 w-full sm:w-96">
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Usuario"
          required
          onChange={e => setUser({ ...user, nombre: e.target.value })}
        />
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Contraseña"
          required
          onChange={e => setUser({ ...user, password: e.target.value })}
        />
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
  );
}

export default Login;

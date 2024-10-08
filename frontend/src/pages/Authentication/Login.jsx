import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import imageUrl from '../../assets/backdrop.webp'
import logo from '../../assets/logo_transparent_icon.ico'
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const API_URL = `${import.meta.env.VITE_API_URL}/usuarios/login`;

function Login() {
  const [user, setUser] = useState({ nombre: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const user = localStorage.getItem('user');
        if (user){navigate('/dashboard')}else{navigate('/login')}; 
  }, []);

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
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center" style={{ backgroundImage: `url(${imageUrl})` }}>
        <header className="w-full fixed top-0 left-0 z-10  bg-gray-900 text-white py-1 shadow-lg flex justify-between items-center px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="px-4 hover:bg-transparent"><img src={logo} alt="Mi logo" className="h-11 w-20" /></Link>
          <div className="text-2xl font-bold">
          <Link to="/" className="text-white hover:text-yellow-500">EmprendeCont</Link>
          </div>
          <nav>
          <Link to="/" className="text-white hover:text-yellow-500 px-4">Inicio</Link>
          </nav>
        </div>
      </header>
      <div className="mt-16 max-w-md bg-white shadow-md rounded-md p-8 w-11/12 md:w-1/3 lg:w-1/4">
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Usuario"
          required
          onChange={e => setUser({ ...user, nombre: e.target.value })}
        />
        <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Contraseña"
          required
          onChange={e => setUser({ ...user, password: e.target.value })}
        />
         <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)} // Cambia el estado al hacer clic
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          </div>
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

import { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../apis/Loguin'; 
import { toast } from 'react-toastify';
import imageUrl from '../../assets/backdrop.webp'
import logo from '../../assets/logo_transparent_icon.ico'
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'user', 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.registerUser(formData);
      setSuccessMessage('Usuario creado exitosamente');
      setError(null);
      toast.success('Usuario creado exitosamente'); 
    } catch (err) {
      const errorMessage = err.response?.data || 'Error al registrar';
      setError(errorMessage);
      setSuccessMessage('');
      toast.error(errorMessage); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center" style={{ backgroundImage: `url(${imageUrl})` }}>
      <header className="w-full fixed top-0 left-0 z-10 bg-gray-900 text-white shadow-lg flex justify-between items-center px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="px-4 py-1 hover:bg-transparent"><img src={logo} alt="Mi logo" className="h-11 w-20" /></Link>
          <div className="text-2xl font-bold">
            <Link to="/" className="text-white hover:text-yellow-500">EmprendeCont</Link>
          </div>
          <nav>
            <Link to="/" className="text-white hover:text-yellow-500 px-4">Inicio</Link>
          </nav>
        </div>
      </header>
      <div className="max-w-md bg-white shadow-md rounded-md p-8 w-11/12 md:w-1/3 lg:w-1/4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Usuario"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Correo"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'} // Cambia el tipo de input según el estado
              name="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
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
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

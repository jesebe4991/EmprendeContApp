import { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../apis/Loguin'; 
import { toast } from 'react-toastify';

function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'user', 
  });

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
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center">
      <header className="w-full fixed top-0 left-0 z-10 bg-blue-900 text-white py-4 shadow-lg flex justify-between items-center px-6">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white hover:text-yellow-500">EmprendeCont</Link>
        </div>
        <nav>
          <Link to="/" className="text-white hover:text-yellow-500 px-4">Inicio</Link>
        </nav>
      </header>
      <div className="max-w-md bg-white shadow-md rounded-md p-8">
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
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
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

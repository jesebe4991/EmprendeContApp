

import { Link } from 'react-router-dom';
import imageUrl from '../assets/backdrop.webp'
import logo from '../assets/logo_transparent_icon.ico'
import usuario from '../assets/personal.webp'
import empresa from '../assets/empresa.webp'
import mypymes from '../assets/negocio.webp'
import emprendimiento from '../assets/emprendimiento.webp'

const LandingPage = ({
  variant = 'default',
}) => {
//   const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`sticky top-0 before:absolute before:inset-0 before:backdrop-blur-md max-lg:before:bg-white/90 dark:max-lg:before:bg-gray-800/90 before:-z-10 z-30 ${variant === 'v2' || variant === 'v3' ? 'before:bg-white after:absolute after:h-px after:inset-x-0 after:top-full after:bg-gray-200 dark:after:bg-gray-700/60 after:-z-10' : 'max-lg:shadow-sm lg:before:bg-gray-100/90 dark:lg:before:bg-gray-900/90'} ${variant === 'v2' ? 'dark:before:bg-gray-800' : ''} ${variant === 'v3' ? 'dark:before:bg-gray-900' : ''}`}>
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="px-4 py-2 hover:bg-transparent"><img src={logo} alt="Mi logo" className="h-11 w-20" /></Link>
          <div className="text-2xl font-bold">
          <Link to="/" className="text-white hover:text-yellow-500">EmprendeCont</Link>
          </div>
          <nav>
            <Link to="/login" className="px-4 py-2 hover:text-yellow-500">Login</Link>
            <Link to="/register" className="px-4 py-2 hover:text-yellow-500">Registro</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto bg-cover bg-center text-white py-20 mt-16" style={{ backgroundImage: `url(${imageUrl})` }}>

        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">¡Bienvenido!</h2>
          <h3 className="text-2xl mb-8">¿Para qué utilizarme?</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <img src={usuario} alt="usuario" className="max-w-full h-auto" />
              <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base lg:text-lg"><Link to="usopersonal" className="px-4 py-2 hover:bg-gray-700">Uso personal</Link></button>
            </div>
            <div className="flex flex-col items-center">
              <img src={empresa} alt="empresa" className="max-w-full h-auto" />
              <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base lg:text-lg"><Link to="empresa" className="px-4 py-2 hover:bg-gray-700">Empresa</Link> </button>
            </div>
            <div className="flex flex-col items-center">
              <img src={mypymes} alt="Mypimes" className="max-w-full h-auto" />
              <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base lg:text-lg"><Link to="mypymes" className="px-4 py-2 hover:bg-gray-700">Mypimes</Link> </button>
            </div>
            <div className="flex flex-col items-center">
              <img src={emprendimiento} alt="Emprendimiento" className="max-w-full h-auto" />
              <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base lg:text-lg"><Link to="emprende" className="px-4 py-2 hover:bg-gray-700">Emprendimiento</Link></button>
            </div>
          </div>
        </div>
        <div className="container mx-auto text-center mt-5">
          <h2 className="text-4xl font-bold mb-4">Preguntas</h2>
          <h3 className="text-2xl mb-8">Envía un correo electrónico a emprendecontsas@gmail.com para obtener más</h3>

          <div className="col-start-3 row-start-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Pide informacion Aqui</button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-4">
        <div className="container mx-auto text-center">
          © 2024 emprendecontsas@gmail.com   |  @emprendecontsas Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;



import { Link } from 'react-router-dom';
import logo from '../assets/EmprendeCont__3_-removebg-preview.ico'
import negocio from '../assets//negocio.webp'

const MyPymes = ({
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

      <main className="flex-grow overflow-y-auto bg-cover bg-center text-white py-20 mt-16"  style={{ backgroundImage: `url(${negocio})` , backgroundSize: 'cover', opacity: 1  }}>
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">MyPimes</h2>

          <div className="col-start-3 row-start-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">¡Comencemos!</button>
          </div>
        </div>
        <div className="container mx-auto text-center mt-5 bg-slate-900 bg-opacity-85 p-4 rounded-lg">
            <p className="text-sm font-normal mb-4">Trabajar y vivir del día a día puede ser agotador y poco rentable a largo plazo. A pesar de todo el esfuerzo y dedicación que inviertes para que tu negocio crezca, puede parecer que sigues estancado en el mismo lugar. La clave para que un negocio prospere es llevar una buena contabilidad, y por eso estamos aquí para ayudarte.</p>
            <h3 className="text-2xl mb-8">¿Qué ofrecemos?</h3>
            <div className="text-justify">
            <p className="text-sm font-bold mb-4">* Gestión Contable Integral: Te asistimos en llevar todos los registros contables de tu negocio de manera precisa y organizada.</p>
            <p className="text-sm font-bold mb-4">* Progreso Garantizado: Con nuestra ayuda, podrás garantizar avances significativos a medida que pase el tiempo.</p>
            <p className="text-sm font-bold mb-4">* Eficiencia y Rentabilidad: Simplificamos la gestión financiera para que puedas enfocarte en hacer crecer tu negocio de manera rentable y sostenible.</p>
            <p className="text-sm font-bold mb-4">* Con EmprendeCont, optimizar tu futuro financiero y asegurar el crecimiento de tu negocio nunca ha sido tan accesible.</p>
            <p className="text-sm font-bold mb-4">Y muchas cosas más que podrás descubrir en esta experiencia!</p>
            </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          © 2024 emprendecontsas@gmail.com   |  @emprendecontsas Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

export default MyPymes;

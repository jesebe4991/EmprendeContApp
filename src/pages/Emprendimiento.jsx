

import { Link } from 'react-router-dom';
import emprendimiento from '../assets/emprendimiento.webp'
import logo from '../assets/EmprendeCont__3_-removebg-preview.ico'

const Emprendimiento = () => {
//   const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-950 text-white py-4 fixed top-0 left-0 right-0 z-10" >
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
 
      <main className="flex-grow overflow-y-auto bg-cover bg-center text-white py-20 mt-16"  style={{ backgroundImage: `url(${emprendimiento})` , backgroundSize: 'cover', opacity: 1  }}>
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Emprendimientos</h2>

          <div className="col-start-3 row-start-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">¡Comencemos!</button>
          </div>
        </div>
        <div className="container mx-auto text-center mt-5 bg-slate-900 bg-opacity-85 p-4 rounded-lg">
            <p className="text-sm font-normal mb-4 text-justify">Cuando decides ser un emprendedor, la parte de los números suele ser la más aburrida y difícil, pero también es la más importante si queremos asegurar que haya más ganancias que pérdidas. Por eso, en EmprendeCont, hacemos que todo sea más fácil y educativo para ti.</p>
            <h3 className="text-2xl mb-8">¿Qué ofrecemos?</h3>
            <div className="text-justify">
            <p className="text-sm font-bold mb-4">* Facilidad y Educación: Te ayudamos y enseñamos a administrar todo el capital que deseas destinar a tu emprendimiento de la mejor manera.</p>
            <p className="text-sm font-bold mb-4">* Gestión Eficiente: Simplificamos la gestión financiera para que puedas enfocarte en hacer crecer tu negocio.</p>
            <p className="text-sm font-bold mb-4">* Éxito Asegurado: Con nuestras herramientas y recursos, tu objetivo de emprender con éxito será más alcanzable.</p>
            <p className="text-sm font-bold mb-4">* Con EmpredeCont, transformar tus ideas en un negocio rentable y exitoso nunca ha sido tan sencillo.</p>
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

export default Emprendimiento;

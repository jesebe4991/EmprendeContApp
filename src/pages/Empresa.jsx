

import { Link } from 'react-router-dom';
import logo from '../assets/EmprendeCont__3_-removebg-preview.ico'
import emprendimiento from '../assets/empresa.webp'

const Empresa = () => {
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
          <h2 className="text-4xl font-bold mb-4">Empresa</h2>

          <div className="col-start-3 row-start-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">¡Comencemos!</button>
          </div>
        </div>
        <div className="container mx-auto text-center mt-5 bg-slate-900 bg-opacity-85 p-4 rounded-lg">
            <p className="text-sm font-normal mb-4">Para un empresario, ver su empresa crecer es un gran logro. Sin embargo, a medida que la empresa crece, la contabilidad se vuelve más exigente y, en ocasiones, los conocimientos básicos ya no son suficientes para llevarla adecuadamente. En estos casos, es necesario contratar a un tercero.</p>
            <h3 className="text-2xl mb-8">¿Qué ofrecemos?</h3>
            <p className="text-sm font-normal mb-4">EmprendeCont está aquí para ayudarte a llevar los registros de tu empresa y enseñarte en el proceso. Ofrecemos una gama completa de servicios contables, que incluyen:</p>
            <div className="text-justify">
            <p className="text-sm font-bold mb-4">* Registro de Transacciones: Nos encargamos de registrar todas las transacciones financieras de tu empresa de manera precisa y oportuna.</p>
            <p className="text-sm font-bold mb-4">* Elaboración de Informes Financieros: Preparamos informes financieros detallados que te proporcionan una visión clara del estado financiero de tu empresa.</p>
            <p className="text-sm font-bold mb-4">* Capacitación Continua: Te ofrecemos capacitación continua para que puedas entender y gestionar mejor los aspectos contables de tu empresa.</p>
            <p className="text-sm font-bold mb-4">* De esta manera, te beneficias de ambas formas: tu empresa seguirá creciendo de manera ordenada y tú aprenderás a manejarla en cada etapa.</p>
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

export default Empresa;

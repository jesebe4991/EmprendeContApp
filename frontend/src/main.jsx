import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import UsoPersonal from './pages/UsoPersonal';
import Empresa from './pages/Empresa';
import Emprendimiento from './pages/Emprendimiento';
import MyPymes from './pages/MyPymes';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import Profile from './pages/Profile';
import Estadisticas from './pages/Estadisticas';
import Registro from './pages/Registro';
import Asesoria from './pages/Asesoria';
import Metas from './pages/Metas';
import WelcomeDashboard from './pages/WelcomeDasboard';
import MediaAdmin from './pages/MediaAdmin';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "register",
    element: <Register/>,
  },
  {
    path: "usopersonal",
    element: <UsoPersonal/>,
  },
  {
    path: "empresa",
    element: <Empresa/>,
  },
  {
    path: "mypymes",
    element: <MyPymes/>,
  },
  {
    path: "emprende",
    element: <Emprendimiento/>,
  }, 
  {
    path: "dashboard",
    element: <Dashboard/>,
    // loader: () => {
    //   try {
    //     return checkAuth(); // Valida si el usuario está autenticado
    //   } catch (error) {
    //     return redirect('/login'); // Redirige al login si no está autenticado
    //   }
    // },
    children: [
      {
        path: "profile",
        element: <Profile />,  // Ruta hija para el perfil
      },
      {
        path: "registro",
        element: <Registro />,  // Ruta hija para el perfil
      },
      {
        path: "estadisticas",
        element: <Estadisticas />,  // Ruta hija para el perfil
      },
      {
        path: "asesoria",
        element: <Asesoria />,  // Ruta hija para el perfil
      },
      {
        path: "metas",
        element: <Metas />,  // Ruta hija para el perfil
      },
      
      {
        path: "adminmedia",
        element: <MediaAdmin />,  // Ruta hija para el perfil
      },
      {
        index: true,  // Ruta por defecto
        element: <WelcomeDashboard />,  // Componente que muestra algo por defecto
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
  </React.StrictMode>
);

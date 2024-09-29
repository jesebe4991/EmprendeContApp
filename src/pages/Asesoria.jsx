import { useState, useEffect } from 'react';
import axios from 'axios';

const Asesoria = () => {
  const [videos, setVideos] = useState([]);

  const API_URL = "http://localhost:3000/api/media";

  useEffect(() => {
    obtenerUrls();
  }, []);

  const obtenerUrls = async () => {
    try {
      const response = await axios.get(API_URL);

      // Verifica si la respuesta es un arreglo, de lo contrario, inicializa como un arreglo vacío
      const videosData = Array.isArray(response.data) ? response.data : [];
      
      setVideos(videosData);
    } catch (error) {
      console.error("Error al obtener Urls:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow text-white ">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Asesorias</h2>

          <div className="col-start-3 row-start-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              ¡Comencemos!
            </button>
          </div>
        </div>
        <div className="container mx-auto text-center mt-5">
          <p className="text-sm font-normal mb-4">
            Asesorias personalizadas
          </p>
          <h3 className="text-2xl mb-8">¿Qué ofrecemos?</h3>
          <div className="text-justify">                    
            <p className="text-sm font-bold mb-4">* Asesorías: Tengas o no un conocimiento previo, siempre estaremos ahí asesorando para que puedas adquirir conocimientos durante todo el proceso.</p>
            <p className="text-sm font-bold mb-4">Y muchas cosas más que podrás descubrir en esta experiencia!</p>
          </div>
        </div>

        {/* Grid de videos */}
        <div className="container mx-auto mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {videos.length > 0 ? (
              videos.map((url, index) => (
                <div key={index} className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${new URL(url).searchParams.get('v')}`}
                    title={`Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))
            ) : (
              <p>No se encontraron videos.</p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          © 2024 emprendecontsas@gmail.com | @emprendecontsas Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Asesoria;

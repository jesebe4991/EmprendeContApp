import { useState, useEffect } from "react";
import axios from "axios";

function MediaAdmin() {
  const [videos, setVideos] = useState([]);
  const [newUrl, setNewUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const API_URL = `${import.meta.env.VITE_API_URL}/media`;

  const parsedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    obtenerUrls();
  }, []);

  const obtenerUrls = async () => {
    try {
      const response = await axios.get(API_URL);
      setVideos(response.data);
    } catch (error) {
      console.error("Error al obtener URLs:", error);
    }
  };

  const registrarUrl = async () => {
    try {
      const response = await axios.post(API_URL, { url: newUrl }, {
        headers: {
          Authorization: `Bearer ${parsedUser.token}`,
        },
      });
      setVideos([...videos, response.data]);
      setIsModalOpen(false);
      setNewUrl("");
    } catch (error) {
      console.error("Error al registrar URL:", error);
    }
  };

  const eliminarUrl = async () => {
    try {
      await axios.delete(`${API_URL}/${selectedVideoId}`, {
        headers: {
          Authorization: `Bearer ${parsedUser.token}`,
        },
      });
      setVideos(videos.filter(video => video.id !== selectedVideoId));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar URL:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewUrl("");
  };

  const openDeleteModal = (id) => {
    setSelectedVideoId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedVideoId(null);
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={openModal}
      >
        Registrar URL
      </button>

      {/* Modal para registrar URL */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-6">Registrar nueva URL</h2>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Ingresa la URL del video"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
            <div className="mt-4 flex justify-between">
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={registrarUrl}>
                Registrar
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={closeModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabla de URLs */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">URL</th>
            <th className="py-2 px-4 border">Acción</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td className="py-2 px-4 border">{video.url}</td>
              <td className="py-2 px-4 border">
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => openDeleteModal(video.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmación de eliminación */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-6">¿Estás seguro de eliminar esta URL?</h2>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={eliminarUrl}
              >
                Eliminar
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={closeDeleteModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaAdmin;

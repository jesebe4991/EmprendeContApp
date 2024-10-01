import  { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import '../css/additional-styles/utility-patterns.css'
import { formatThousands } from '../utils/Utils.js';
import { formatNumber } from 'chart.js/helpers';

function Registro() {
  const [tipo, setTipo] = useState("ingreso");
  const [fecha, setFecha] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState(0);
  const [transacciones, setTransacciones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  const API_URL = "http://localhost:3000/api/transaction";

  useEffect(() => {
    obtenerTransacciones();
  }, []);

  const obtenerTransacciones = async () => {
    try {
      const user = localStorage.getItem("user");
      const parsedUser = JSON.parse(user);

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${parsedUser.token}`,
        },
      });
      setTransacciones(response.data);
    } catch (error) {
      console.error("Error al obtener transacciones:", error);
    }finally {
      setTimeout(() => {
        setIsLoading(false); // Finaliza la carga después de 1 segundo
      }, 500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetForm();
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);

    if (!fecha) {
      alert("Por favor, selecciona una fecha.");
      return;
    }

    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const dia = fecha.getDate().toString().padStart(2, "0");

    const fechaFormateada = `${año}-${mes}-${dia}`;

    const data = {
      monto: parseFloat(monto),
      tipo,
      fecha: fechaFormateada,
      descripcion,
    };

    try {
      if (selectedTransaction) {
        await axios.put(`${API_URL}/${selectedTransaction.id}`, data, {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        });
      } else {
        await axios.post(API_URL, data, {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        });
      }

      obtenerTransacciones();
      resetForm();
      closeModal();
    } catch (error) {
      console.error("Error al crear/actualizar el registro:", error);
    }
  };

  const resetForm = () => {
    setTipo("ingreso");
    setFecha(null);
    setDescripcion("");
    setMonto(0);
    setSelectedTransaction(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdate = (transaction) => {
    setSelectedTransaction(transaction);
    setTipo(transaction.tipo);
    setFecha(new Date(transaction.fecha));
    setDescripcion(transaction.descripcion);
    setMonto(transaction.monto);
    setIsModalOpen(true);
  };

  const handleDelete = async (transactionId) => {
    try {
      const user = localStorage.getItem("user");
      const parsedUser = JSON.parse(user);

      await axios.delete(`${API_URL}/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${parsedUser.token}`,
        },
      });
      obtenerTransacciones();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => openModal()}
      >
        Registrar Gasto o Ingreso
      </button>

      {/* Modal para registrar o actualizar */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className={`bg-white p-6 rounded shadow-lg w-1/3 ${isModalOpen ? 'transition-style-in-hesitate' : ''} ${isModalOpen === false ? 'circle-out-center' : ''}`}>
            <h2 className="text-xl font-bold mb-6">
              {selectedTransaction ? "Actualizar Transacción" : "Registrar Gasto o Ingreso"}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Campos del formulario */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipo">
                  Tipo
                </label>
                <select
                  className="shadow border rounded w-full py-2 px-3"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="ingreso">Ingreso</option>
                  <option value="gasto">Gasto</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Fecha</label>
                <DatePicker
                  selected={fecha}
                  onChange={(date) => setFecha(date)}
                  dateFormat="yyyy-MM-dd"
                  className="shadow border rounded w-full py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Monto</label>
                <input
                  type="number"
                  className="shadow border rounded w-full py-2 px-3"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                <textarea
                  className="shadow border rounded w-full py-2 px-3"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
                  {selectedTransaction ? "Actualizar" : "Registrar"}
                </button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={closeModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      

     {/* Pantalla de carga */}
     {isLoading ? ( // Si isLoading es true, muestra el spinner
       <div>
       <div
         className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-white"
         role="status">
         <span
           className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
         >Loading...</span>
       </div>
       <div
         className="inline-block h-12 w-12 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
         role="status">
         <span
           className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
         >Loading...</span>
       </div>
     </div>
      ) : ( // Si no está cargando, muestra el contenido
        <>
          {/* Tabla de transacciones */}
          <div className="min-w-full bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Fecha</th>
                  <th className="py-2 px-4 border">Tipo</th>
                  <th className="py-2 px-4 border">Descripción</th>
                  <th className="py-2 px-4 border">Monto</th>
                  <th className="py-2 px-4 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {transacciones.map((transaccion) => (
                  <tr key={transaccion.id}>
                    <td className="py-2 px-4 border">{new Date(transaccion.fecha).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border">{transaccion.tipo}</td>
                    <td className="py-2 px-4 border">{transaccion.descripcion}</td>
                    <td className="py-2 px-4 border">{formatNumber(transaccion.monto)}</td>
                    <td className="py-2 px-4 border">
                      <button
                        className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                        onClick={() => handleUpdate(transaccion)}
                      >
                        Actualizar
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => {
                          setSelectedTransaction(transaccion);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal de confirmación de eliminación */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-6">¿Estás seguro de eliminar esta transacción?</h2>
            <div className="flex items-center justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(selectedTransaction.id)}
              >
                Eliminar
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsDeleteModalOpen(false)}
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

export default Registro;

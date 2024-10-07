import React, { useState, useEffect } from "react";
import axios from "axios";
import Transition from "../utils/Transition";
import "../css/additional-styles/utility-patterns.css";
import { formatNumber } from "chart.js/helpers";


const Metas = () => {
  const [ahorroMensual, setAhorroMensual] = useState([]);
  const [objetivos, setObjetivos] = useState([]);
  const [nuevoObjetivo, setNuevoObjetivo] = useState({
    objetivo: "",
    valor: 0,
  });
  const [loading, setLoading] = useState(false);
  const [totalAhorro, setTotalAhorro] = useState(0);
  const [totalObjetivos, setTotalObjetivos] = useState(0);
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);
  const API_URL = `${import.meta.env.VITE_API_URL}`;
  const [estadisticas, setEstadisticas] = useState([]);
  const [periodo, setPeriodo] = useState("monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [objetivo, setObjetivo] = useState("");
  const [valor, setValor] = useState(0);
  const [timer, setTimer] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState(1);

  const [balances, setBalances] = useState(Array(12).fill(0));

  const mesesDelAnio = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const headersObj = [{ campo: "Objetivo" }, { campo: "Valor" }];
  useEffect(() => {
    obtenerAhorroAnual();
    obtenerEstadisticasMensuales();
    obtenerObjetivos();
  }, []);

  useEffect(() => {
    if (estadisticas.length > 0 && ahorroMensual.length > 0) {
      calcularBalances();
    }
  }, [estadisticas, ahorroMensual]);

  const obtenerAhorroAnual = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/ahorro`, {
        headers: {
          Authorization: `Bearer ${parsedUser.token}`,
        },
      });
      setAhorroMensual(response.data);
      calcularBalances(response.data);
      calcularTotalAhorro(response.data);
    } catch (error) {
      console.error("Error al obtener el ahorro anual:", error);
    } finally {
      setTimeout(() => {
        setLoading(false); // Finaliza la carga después de 1 segundo
      }, 500);
    }
  };

  const obtenerEstadisticasMensuales = async () => {
    try {
      const response = await axios.get(`${API_URL}/ahorro/estadisticas`, {
        headers: {
          Authorization: `Bearer ${parsedUser.token}`,
        },
      });
      setEstadisticas(response.data);
    } catch (error) {
      console.error("Error al obtener estadísticas mensuales:", error);
    }
  };

  const guardarObjetivo = async () => {
    const id = parsedUser.usuarioId;
    setNuevoObjetivo((prevState) => ({
      ...prevState,
      usuario_id: id,
    }));
    const data = {
      usuario_id: id,
      objetivo: nuevoObjetivo.objetivo,
      valor: nuevoObjetivo.valor,
    };
    

    try {
      if (selectedTransaction) {
        console.log("Data", selectedTransaction);
        await axios.put(
          `${API_URL}/ahorro/objetivo/${selectedTransaction.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${parsedUser.token}`,
            },
          }
        );
      } else {
        await axios.post(`${API_URL}/ahorro/objetivo`, data, {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        });
      }
      obtenerObjetivos();
      resetForm();
      closeModal();
      setSelectedTransaction(null);
    } catch (error) {
      console.error("Error al guardar el objetivo:", error);
    }
  };

  const handleDelete = async (Id) => {
    try {
      const user = localStorage.getItem("user");
      const parsedUser = JSON.parse(user);

      await axios.delete(`${API_URL}/ahorro/objetivo/${Id}`, {
        headers: {
          Authorization: `Bearer ${parsedUser.token}`,
        },
      });
      obtenerObjetivos();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };

  const handleUpdate = (obj) => {
    setSelectedTransaction(obj);
    setNuevoObjetivo({
      ...nuevoObjetivo,
      objetivo: obj.objetivo,
      valor: obj.valor,
    });
    // setObjetivo(obj.objetivo);
    // setValor(obj.valor);
    setIsModalOpen(true);
  };

  const obtenerObjetivos = async () => {
    try {
      const response = await axios.get(`${API_URL}/ahorro/objetivos`, {
        headers: {
          Authorization: `Bearer ${parsedUser.token}`,
        },
      });
      setObjetivos(response.data);
      calcularViabilidad(response.data);
    } catch (error) {
      console.error("Error al obtener los objetivos:", error);
    }
  };

  const calcularTotalAhorro = (ahorros) => {
    const total = ahorros.reduce(
      (acc, mes) => acc + Number(mes.valor_ahorro),
      0
    );
    setTotalAhorro(total);
  };
  const calcularViabilidad = (objetivos) => {
    const totalAhorro = ahorroMensual.reduce(
      (acc, mes) => acc + Number(mes.ahorro),
      0
    );
    const totalObjetivos = objetivos.reduce(
      (acc, obj) => acc + Number(obj.valor),
      0
    );
    // setTotalAhorro(totalAhorro);
    setTotalObjetivos(totalObjetivos);
  };

  const calcularBalances = () => {
    let nuevosBalances = [];
    let balanceAcumulado = 0; // Variable para mantener el balance acumulado

    nuevosBalances = mesesDelAnio.map((mes, index) => {
      const datos = getDatosPorMes(mes);
      const ingresoActual = Number(datos.ingresos) || 0;
      const gastoActual = Number(datos.gastos) || 0;

      if (index === 0) {
        // Para enero, solo ingreso - gasto.
        balanceAcumulado = ingresoActual - gastoActual;
      } else {
        const ahorroAnterior =
          Number(
            ahorroMensual.find((e) => e.mes === mesesDelAnio[index - 1])
              ?.valor_ahorro
          ) || 0;

        // Calcula el balance del mes actual utilizando el balance acumulado del mes anterior.
        balanceAcumulado =
          ingresoActual + balanceAcumulado - gastoActual - ahorroAnterior;
      }

      // Agrega el balance acumulado actual a la lista.
      return balanceAcumulado;
    });

    setBalances(nuevosBalances);
  };

  const guardarAhorro = async (mes) => {
    const id = parsedUser.usuarioId;
    const ahorroMes = ahorroMensual.find((e) => e.mes === mes);
    if (!ahorroMes) return; // Si no hay un ahorro para el mes, no hacer nada
    try {
      await axios.post(
        `${API_URL}/ahorro`,
        { usuario_id: id, mes: mes, valor_ahorro: ahorroMes.valor_ahorro },
        {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        }
      );
      obtenerAhorroAnual();
    } catch (error) {
      console.error("Error al guardar el ahorro:", error);
    }
  };

  const handleAhorroChange = (mes, value) => {
    const updatedAhorroMensual = ahorroMensual.map((ahorro) => {
      if (ahorro.mes === mes) {
        return { ...ahorro, valor_ahorro: parseFloat(value) || 0 }; // Actualiza el valor del ahorro
      }
      return ahorro;
    });

    // Si no existe el mes en ahorroMensual, lo agregamos con el valor proporcionado
    if (!ahorroMensual.find((e) => e.mes === mes)) {
      updatedAhorroMensual.push({ mes, valor_ahorro: parseFloat(value) || 0 });
    }

    setAhorroMensual(updatedAhorroMensual); // Actualizamos el estado

    // Limpiar el temporizador anterior si existe
    if (timer) {
      clearTimeout(timer);
    }

    // Configurar un nuevo temporizador para llamar a guardarAhorro después de 2 segundos
    const nuevoTimer = setTimeout(() => {
      guardarAhorro(mes);
    }, 2000);

    // Guardar el nuevo temporizador en el estado
    setTimer(nuevoTimer);
  };

  const getDatosPorMes = (mes) => {
    const estadisticaMes = estadisticas.find((e) => e.mes === mes);
    const ahorroMes = ahorroMensual.find((e) => e.mes === mes);
    return estadisticaMes
      ? { ...estadisticaMes, ahorro: ahorroMes ? ahorroMes.valor_ahorro : 0 }
      : {
          ingresos: 0,
          gastos: 0,
          ahorro: ahorroMes ? ahorroMes.valor_ahorro : 0,
        };
  };

  const resetForm = () => {
    setNuevoObjetivo({ objetivo: "", valor: 0 });
    setSelectedTransaction(null);
  };
  const openModal = () => {
    resetForm();
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const calcularAhorroSeleccionado = () => {
    const ahorroSeleccionado = ahorroMensual
      .filter((ahorro) => {
        const indexMes = mesesDelAnio.indexOf(ahorro.mes);
        return indexMes >= 0 && indexMes < selectedMonths;
      })
      .reduce((acc, mes) => acc + Number(mes.valor_ahorro), 0);

    return ahorroSeleccionado;
  };
  return (
    <div className="p-4 max-w-6xl mx-auto">
    <div className="mb-6 flex flex-col md:flex-row md:space-x-4">
    <div className="mb-4 md:mb-0 md:w-1/4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => openModal()}
      >
        Registrar Objetivo
      </button>
      </div>
      <div className="mb-4 md:mb-0 md:w-1/4  ">
          <label className="block text-white text-sm font-bold mb-2">
            Selecciona la cantidad de meses de ahorro:
          </label>
          <select
            value={selectedMonths}
            onChange={(e) => setSelectedMonths(Number(e.target.value))}
            className="p-2 border rounded"
          >
            {mesesDelAnio.map((mes, index) => (
              <option key={index} value={index + 1}>
                {mes}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div
      className={`bg-white p-6 rounded shadow-lg w-11/12 md:w-1/3 lg:w-1/4 ${
        isModalOpen ? "transition-style-in-hesitate" : ""
      } ${isModalOpen === false ? "circle-out-center" : ""}`}
    >
      <h2 className="text-xl font-bold mb-6">
        {selectedTransaction
          ? "Actualizar objetivos"
          : "Registro de objetivos"}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Objetivo de Ahorro
        </label>
        <input
          type="text"
          value={nuevoObjetivo.objetivo}
          onChange={(e) =>
            setNuevoObjetivo({
              ...nuevoObjetivo,
              objetivo: e.target.value,
            })
          }
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Introduce tu objetivo"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Valor de objetivo
        </label>
        <input
          type="number"
          value={nuevoObjetivo.valor}
          onChange={(e) =>
            setNuevoObjetivo({
              ...nuevoObjetivo,
              valor: parseFloat(e.target.value),
            })
          }
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Introduce el valor del objetivo"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={guardarObjetivo} // Llama a la función para guardar el objetivo
        >
          {selectedTransaction ? "Actualizar" : "Registrar"}
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={closeModal}
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}
      {loading ? ( // Si isLoading es true, muestra el spinner
        <div>
          <div
            className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <div
            className="inline-block h-12 w-12 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        // Si no está cargando, muestra el contenido
        <>
          <div className="grid grid-cols-2 gap-2">
            <div className="overflow-x-auto">
              <div className="mt-6  bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 overflow-x-auto">
                <table className="table-auto w-full dark:text-gray-300">
                  <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
                    <th className="p-2">Objetivo</th>
                    <th className="p-2">Valor</th>
                    <th className="p-2">Ahorro Acumulado</th>
                    <th className="p-2">Viabilidad</th>
                    <th className="p-2">Acciones</th>
                  </thead>
                  <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                    {objetivos.map((obj, index) => {
                      const ahorroAcumulado = calcularAhorroSeleccionado();
                      return (
                        <tr key={index}>
                          <td className="p-2">
                            <div className="text-center">{obj.objetivo}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {formatNumber(obj.valor)}
                            </div>
                          </td>
                          <td className="p-2 text-center">
                            {formatNumber(ahorroAcumulado)}
                          </td>
                          <td className="p-2 text-center">
                            {ahorroAcumulado >= obj.valor
                              ? "Cumple"
                              : "No Cumple"}
                          </td>
                          <td className="py-2 px-4">
                            <button
                              className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                              onClick={() => handleUpdate(obj)}
                            >
                              A
                            </button>
                            <button
                              className="bg-red-500 text-white px-4 py-1 rounded"
                              onClick={() => {
                                setSelectedTransaction(obj);
                                setIsDeleteModalOpen(true);
                              }}
                            >
                              D
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6  bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 overflow-x-auto">
              <table className="table-auto w-full dark:text-gray-300">
                <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
                  <th className="p-2">Total Ahorro</th>
                  <th className="p-2">Total Objetivos</th>
                  <th className="p-2">Viabilidad</th>
                </thead>
                <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                  <td className="p-2">
                    <div className="text-center">
                      {formatNumber(totalAhorro)}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">
                      {formatNumber(totalObjetivos)}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">
                      {totalAhorro >= totalObjetivos
                        ? "Tus ahorros cubren tus objetivos"
                        : "Tus ahorros NO cubren tus objetivos"}
                    </div>
                  </td>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-6  bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4">
            <div className="overflow-x-auto">
              <table className="table-auto w-full dark:text-gray-300">
                <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
                  <tr>
                    <th className="p-2">Mes</th>
                    <th className="p-2">Ingreso</th>
                    <th className="p-2">Gasto</th>
                    <th className="p-2">Balance</th>
                    <th className="p-2">Ahorro</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                  {mesesDelAnio.map((mes, index) => {
                    const datos = getDatosPorMes(mes);
                    const balance = balances[index] || 0;

                    return (
                      <tr key={index}>
                        <td className="p-2">{mes}</td>
                        <td className="p-2">
                          {formatNumber(Number(datos.ingresos) || 0)}
                        </td>
                        <td className="p-2">
                          {formatNumber(Number(datos.gastos) || 0)}
                        </td>
                        <td className="p-2">{formatNumber(balance)}</td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={
                              ahorroMensual.find((e) => e.mes === mes)
                                ?.valor_ahorro || ""
                            }
                            onChange={(e) =>
                              handleAhorroChange(mes, e.target.value)
                            }
                            className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Modal de confirmación de eliminación */}
      {isDeleteModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div
      className={`bg-white p-6 rounded shadow-lg w-11/12 md:w-1/3 lg:w-1/4 ${
        isDeleteModalOpen ? "transition-style-in-hesitate" : ""
      } ${isDeleteModalOpen === false ? "circle-out-center" : ""}`}
    >
      <h2 className="text-xl font-bold mb-4">Eliminar Objetivo</h2>
      <p>¿Estás seguro de que deseas eliminar este objetivo?</p>
      <div className="flex items-center justify-between mt-6">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => handleDelete(selectedTransaction.id)} // Llama a la función para eliminar el objetivo
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
};

export default Metas;

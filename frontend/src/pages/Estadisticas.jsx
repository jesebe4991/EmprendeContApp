import { useState, useEffect } from 'react';
import 'chart.js/auto'; // Para cargar Chart.js
import TablaData from '../partials/dashboard/TablaData';
import LineChart from '../charts/LineChart01';
import { Bar } from 'react-chartjs-2';
import { obtenerEstadisticas, procesarDatosParaGrafico } from '../apis/Estadisticas'

function Estadisticas() {
  const [periodo, setPeriodo] = useState('monthly'); // Valor por defecto: mensual
  const [estadisticas, setEstadisticas] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [chartData2, setChartData2] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const headersT =  [
      {"campo": "Fecha"},
      {"campo": "Ingresos"},
      {"campo": "Gastos"},
      {"campo": "Balance"}
    ]
  ;

  useEffect(() => {
    obtenerDatos();
  }, [periodo]);

  const obtenerDatos = async () => {
    try {
      const data = await obtenerEstadisticas(periodo);
      setEstadisticas(data);
      const { chartData, chartData2 } = procesarDatosParaGrafico(data);
      setChartData(chartData);
      setChartData2(chartData2);
    } catch (error) {
      console.error("Error al obtener o procesar datos:", error);
    }finally {
      setTimeout(() => {
        setIsLoading(false); // Finaliza la carga después de 1 segundo
      }, 500);
    }
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ingresos y Gastos Mensuales',
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Estadísticas de Transacciones</h1>
  
      {/* Selector de período */}
      <div className="mb-6">
        <label className="mr-2 block mb-2  text-white">Seleccionar periodo:</label>
        <select
          className="w-1/6 p-2 border rounded"
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
        >
          <option value="daily">Diario</option>
          <option value="weekly">Semanal</option>
          <option value="monthly">Mensual</option>
          <option value="yearly">Anual</option>
        </select>
      </div>

      {!isLoading ? (
        <>
          {/* Gráficos */}
          {chartData && chartData2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Tarjeta para el gráfico de líneas */}
            <div className=" rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800">
              <LineChart data={chartData} width={600} height={300} />
            </div>
    
            {/* Tarjeta para el gráfico de barras */}
            <div className=" rounded-lg shadow-lg p-6  bg-white dark:bg-gray-800">
              <Bar data={chartData2} options={options} />
            </div>
          </div>
          )}

          {/* Tabla de datos */}
          <div>
        <TablaData header={headersT} estadisticas={estadisticas} />
      </div>
        </>
      ) : (
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-white"></div>
          <div className="inline-block h-12 w-12 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"></div>
          Cargando...
        </div>
      )}
      
      {/* Gráficos */}
      {/* {chartData && chartData2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className=" rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800">
            <LineChart data={chartData} width={600} height={300} />
          </div>
          <div className=" rounded-lg shadow-lg p-6  bg-white dark:bg-gray-800">
            <Bar data={chartData2} options={options} />
          </div>
        </div>
      )} */}
  
      {/* Tabla de datos */}
      {/* <div>
        <TablaData header={headersT} estadisticas={estadisticas} />
      </div> */}
    </div>
  );
}

export default Estadisticas;

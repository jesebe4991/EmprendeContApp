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
      <h1 className="text-3xl font-bold mb-6 text-center">Estadísticas de Transacciones</h1>
  
      {/* Selector de período */}
      <div className="mb-6">
        <label className="mr-2 block mb-2">Seleccionar periodo:</label>
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
  
      {/* Gráficos */}
      {chartData && chartData2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Tarjeta para el gráfico de líneas */}
          <div className=" rounded-lg shadow-lg p-6">
            <LineChart data={chartData} width={600} height={300} />
          </div>
  
          {/* Tarjeta para el gráfico de barras */}
          <div className=" rounded-lg shadow-lg p-6">
            <Bar data={chartData2} options={options} />
          </div>
        </div>
      )}
  
      {/* Tabla de datos */}
      <div>
        <TablaData header={headersT} estadisticas={estadisticas} />
      </div>
    </div>
  );
}

export default Estadisticas;

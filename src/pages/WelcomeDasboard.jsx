import { obtenerEstadisticas, procesarDatosParaGrafico } from '../apis/Estadisticas'
import { useState, useEffect } from 'react';
import LineChart from '../charts/LineChart01';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function WelcomeDashboard() {
  const [periodo, setPeriodo] = useState('yearly'); // Valor por defecto: mensual
  const [estadisticas, setEstadisticas] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [chartData2, setChartData2] = useState(null);
  const [pieChartData, setPieChartData] = useState(null); 

  useEffect(() => {
    obtenerDatos();
  }, [periodo]);

  const obtenerDatos = async () => {
    try {
      const data = await obtenerEstadisticas(periodo);
      setEstadisticas(data);
      const { chartData, chartData2, pieChartData } = procesarDatosParaGrafico(data);
      setChartData(chartData);
      setChartData2(chartData2);
      setPieChartData(pieChartData);
      console.log(pieChartData)
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
    
      <main className="grow">
          <div>
        <h1>Bienvenido al Dashboard</h1>
        <p>Selecciona una opción del menú para continuar.</p>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

      {chartData && chartData2 && pieChartData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Tarjeta para el gráfico de líneas */}
            <div className="rounded-lg shadow-lg p-6">
              <LineChart data={chartData} width={600} height={300} />
            </div>

            {/* Tarjeta para el gráfico de barras */}
            <div className="rounded-lg shadow-lg p-6">
              <Bar data={chartData2} options={options} />
            </div>

            {/* Tarjeta para el gráfico de torta */}
            <div className="rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Proporción de Ingresos y Gastos Totales</h2>
              <Pie data={pieChartData} />
            </div>
          </div>
        )}

      </div>

    </main>
    );
  }
  
  export default WelcomeDashboard;
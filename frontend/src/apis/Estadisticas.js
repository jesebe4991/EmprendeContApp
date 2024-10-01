// estadisticas.js
import axios from 'axios';
import { chartAreaGradient } from '../charts/ChartjsConfig';
import { tailwindConfig, hexToRGB } from '../utils/Utils';

// URL de la API
const API_URL = "http://localhost:3000/api/transaction/estadisticas";

// Función para obtener estadísticas desde la API
export const obtenerEstadisticas = async (periodo) => {
  try {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const response = await axios.get(`${API_URL}/${periodo}`, {
      headers: {
        Authorization: `Bearer ${parsedUser.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    throw error;
  }
};

// Función para procesar los datos obtenidos para los gráficos
export const procesarDatosParaGrafico = (data) => {
    const labels = data.map(item => new Date(item.fecha).toLocaleDateString());
    const ingresos = data.map(item => parseFloat(item.ingresos));
    const gastos = data.map(item => parseFloat(item.gastos));
  
    // Datos para el gráfico de líneas (ya existente)
    const chartData = {
      labels,
      datasets: [
        {
          data: ingresos,
          fill: true,
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            return chartAreaGradient(ctx, chartArea, [
              { stop: 0, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0)` },
              { stop: 1, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0.2)` },
            ]);
          },
          borderColor: tailwindConfig().theme.colors.violet[500],
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.violet[500],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.violet[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
          tension: 0.2,
        },
        {
          data: gastos,
          borderColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.gray[500])}, 0.25)`,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.gray[500])}, 0.25)`,
          pointHoverBackgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.gray[500])}, 0.25)`,
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
          tension: 0.2,
        },
      ],
    };
  
    // Datos para el gráfico de barras (ya existente)
    const chartData2 = {
      labels,
      datasets: [
        {
          label: 'Ingresos',
          data: ingresos,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Gastos',
          data: gastos,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    };
  
    // Calcular ingresos y gastos totales para el gráfico de torta
    const totalIngresos = ingresos.reduce((acc, curr) => acc + curr, 0);
    const totalGastos = gastos.reduce((acc, curr) => acc + curr, 0);
  
    // Datos para el gráfico de torta
    const pieChartData = {
      labels: ['Ingresos Totales', 'Gastos Totales'],
      datasets: [
        {
          data: [totalIngresos, totalGastos],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
          hoverBackgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)'],
        },
      ],
    };
  
    return { chartData, chartData2, pieChartData };
  };

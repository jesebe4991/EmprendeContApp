// metas.js
import axios from 'axios';


const API_URL = `${import.meta.env.VITE_API_URL}`;

// Obtener el usuario desde el almacenamiento local
const obtenerUsuario = () => {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
};

// Función para obtener el ahorro anual
export const obtenerAhorroAnual = async (setLoading, setAhorroMensual, calcularBalance, calcularTotalAhorro) => {
    const parsedUser = obtenerUsuario();
    setLoading(true);
    try {
        const response = await axios.get(`${API_URL}/ahorro`, {
            headers: {
                Authorization: `Bearer ${parsedUser.token}`,
            },
        });
        setAhorroMensual(response.data);
        calcularBalance(response.data);
        calcularTotalAhorro(response.data);
    } catch (error) {
        console.error('Error al obtener el ahorro anual:', error);
    } finally {
        setLoading(false);
    }
};

// Función para obtener estadísticas mensuales
export const obtenerEstadisticasMensuales = async (setEstadisticas) => {
    const parsedUser = obtenerUsuario();
    try {
        const response = await axios.get(`${API_URL}/ahorro/estadisticas`, {
            headers: {
                Authorization: `Bearer ${parsedUser.token}`,
            },
        });
        setEstadisticas(response.data);
    } catch (error) {
        console.error('Error al obtener estadísticas mensuales:', error);
    }
};

// Función para guardar un nuevo objetivo
export const guardarObjetivo = async (e, nuevoObjetivo, setNuevoObjetivo, obtenerObjetivos) => {
    e.preventDefault();
    const parsedUser = obtenerUsuario();
    setNuevoObjetivo(prevState => ({
        ...prevState,
        usuario_id: parsedUser.usuarioId,
    }));

    try {
        await axios.post(`${API_URL}/ahorro/objetivo`, nuevoObjetivo, {
            headers: {
                Authorization: `Bearer ${parsedUser.token}`,
            },
        });
        obtenerObjetivos();
    } catch (error) {
        console.error('Error al guardar el objetivo:', error);
    }
};

// Función para obtener objetivos
export const obtenerObjetivos = async (setObjetivos, calcularViabilidad) => {
    const parsedUser = obtenerUsuario();
    try {
        const response = await axios.get(`${API_URL}/ahorro/objetivos`, {
            headers: {
                Authorization: `Bearer ${parsedUser.token}`,
            },
        });
        setObjetivos(response.data);
        calcularViabilidad(response.data);
    } catch (error) {
        console.error('Error al obtener los objetivos:', error);
    }
};

// Función para guardar el ahorro
export const guardarAhorro = async (mes, ahorroMensual, setAhorroMensual) => {
    const parsedUser = obtenerUsuario();
    const ahorroMes = ahorroMensual.find(e => e.mes === mes);
    if (!ahorroMes) return; // Si no hay un ahorro para el mes, no hacer nada
    try {
        await axios.post(`${API_URL}/ahorro`, { usuario_id: parsedUser.usuarioId, mes: mes, valor_ahorro: ahorroMes.valor_ahorro }, {
            headers: {
                Authorization: `Bearer ${parsedUser.token}`,
            },
        });
    } catch (error) {
        console.error('Error al guardar el ahorro:', error);
    }
};

// Funciones de cálculo
export const calcularTotalAhorro = (ahorros, setTotalAhorro) => {
    const total = ahorros.reduce((acc, mes) => acc + Number(mes.valor_ahorro), 0);
    setTotalAhorro(total);
};

export const calcularViabilidad = (objetivos, ahorroMensual, setTotalObjetivos) => {
    const totalAhorro = ahorroMensual.reduce((acc, mes) => acc + Number(mes.ahorro), 0);
    const totalObjetivos = objetivos.reduce((acc, obj) => acc + Number(obj.valor), 0);
    setTotalObjetivos(totalObjetivos);
};

export const calcularBalance = (meses, setAhorroMensual) => {
    let balanceAnterior = 0;
    const actualizados = meses.map((mes, index) => {
        const balance = balanceAnterior + mes.ingresos - mes.gastos - (mes.ahorro || 0);
        balanceAnterior = balance;
        return { ...mes, balance };
    });
    setAhorroMensual(actualizados);
};

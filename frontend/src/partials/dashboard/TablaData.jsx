import React from 'react';
import { formatThousands } from '../../utils/Utils';
import { formatNumber } from 'chart.js/helpers';

function TablaData({header, estadisticas}) {

  let headerArray;

  if (Array.isArray(header)) {
    headerArray = header;
  } else if (typeof header === 'object' && Array.isArray(header.headersT)) {
    headerArray = header.headersT;
  } else {
    console.error('La prop "header" debe ser un array o un objeto con una propiedad "headersT" que sea un array');
    return null;
  }
  console.log(headerArray)
  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Estadisticas</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                  {headerArray.map((headerItem, index) => (
                <th key={index} className="p-2">
                  <div className="font-semibold text-left">{headerItem.campo}</div>
                </th>
              ))}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {/* Row */}
              {estadisticas.map((transaccion) => (
            <tr key={transaccion.fecha}>
              <td className="py-2 px-4">{new Date(transaccion.fecha).toLocaleDateString()}</td>
              <td className="py-2 px-4">{formatNumber(transaccion.ingresos)}</td>
              <td className="py-2 px-4">{formatNumber(transaccion.gastos)}</td>
              <td className="py-2 px-4">
              {formatNumber((Number(transaccion.ingresos) - Number(transaccion.gastos)))}
              </td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TablaData;

import { useEffect, type JSX } from "react";
import type { Cronograma } from "@/types/cronograma";

import { useFilterPro } from "@/hooks/InformeFilter";
import { exportarInformeExcel } from "../Exportar/exportarInformeExcel";
interface PropsFooter {
  datos: Cronograma[];
  fechaInicio: string;
  fechaFin: string;
  setFechaInicio: (fecha: string) => void;
  setFechaFin: (fecha: string) => void;
}

const TableInforme = ({
  datos,
  fechaInicio,
  fechaFin,
  setFechaInicio,
  setFechaFin,
}: PropsFooter): JSX.Element => {
  const {
    filteredPDV,
    fechaInicioInform,
    fechaFinInform,
    setFechaInicioInform,
    setFechaFinInform,
  } = useFilterPro(datos);

  // 👉 estos ya vienen filtrados por el mes actual
  const totalEnEspera = filteredPDV.filter(
    (pdv) => pdv.estado === "En Espera"
  ).length;

  const totalEjecutados = filteredPDV.filter(
    (pdv) => pdv.estado === "Realizado"
  ).length;

  const Retiro = filteredPDV.filter(
    (pdv) => pdv.nota === "ARQUEO DE RETIRO"
  ).length;

  const NoSErealizo = filteredPDV.filter(
    (pdv) => pdv.estado === "No Se Pudo Realizar"
  ).length;

  const Cerrados = filteredPDV.filter((pdv) => pdv.estado === "Cerrado").length;

  useEffect(() => {
    setFechaInicio(fechaInicioInform);
    setFechaFin(fechaFinInform);
  }, [fechaInicioInform, fechaFinInform]);

  return (
    <>
      <div className="flex flex-col mt-6  border-indigo-200 shadow-lg shadow-blue-300/50">
        <section className="container px-4 mt-5 ">
          <div className="filter-card mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Bsucar por un rango de fechas
            </h3>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha Inicio
                  <input
                    type="date"
                    value={fechaInicioInform}
                    onChange={(e) => setFechaInicioInform(e.target.value)}
                    className="filter-input-date"
                  />
                </label>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha Fin
                  <input
                    type="date"
                    value={fechaFinInform}
                    onChange={(e) => setFechaFinInform(e.target.value)}
                    className="filter-input-date"
                  />
                </label>
              </div>

              <button
                onClick={() => exportarInformeExcel(filteredPDV)}
                className="btn-success mt-6"
              >
                Exportar Excel
              </button>
            </div>
          </div>
        </section>

        <h1 className="text-center font-bold mt-5">
          informe de puntos de venta
        </h1>
        <div className="mt-4 mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="table-shell">
              <table className="table-pro">
                <thead className="table-head">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-semibold text-left text-gray-900">
                      Programados
                    </th>
                    <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                      No Ejecutados
                    </th>
                    <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                      Ejecutados
                    </th>
                    <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                      Arqueo de Retiros
                    </th>
                    <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                      Cerrados
                    </th>
                    <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                      No Se Pudo Realizar
                    </th>
                  </tr>
                </thead>
                <tbody className="table-body table-body-clickable">
                  {
                    <tr className="table-row">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {filteredPDV.length}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {totalEnEspera}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {totalEjecutados}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {Retiro}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {Cerrados}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {NoSErealizo}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableInforme;

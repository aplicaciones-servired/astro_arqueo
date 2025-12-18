import { useEffect, type JSX } from "react";
import type { Cronograma } from "@/types/cronograma";

import { useFilterPro } from "@/hooks/InformeFilter";
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

  const Cerrados = filteredPDV.filter((pdv) => pdv.estado === "Cerrado").length;

  useEffect(() => {
    setFechaInicio(fechaInicioInform);
    setFechaFin(fechaFinInform);
  }, [fechaInicioInform, fechaFinInform]);

  return (
    <>
      <div className="flex flex-col mt-6  border-indigo-200 shadow-lg shadow-blue-300/50">
        <section className="container px-4 mt-5 ">
          <div className="mb-6 p-4 bg-white border border-indigo-200 rounded-lg shadow-lg shadow-blue-300/50">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>
          </div>
        </section>

        <h1 className="text-center font-bold mt-5">
          informe de puntos de venta
        </h1>
        <div className="mt-4 mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y shadow-lg shadow-blue-300/50 divide-gray-200">
                <thead className="bg-gray-50">
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
                  </tr>
                </thead>
                <tbody className="cursor-pointer bg-white divide-y divide-gray-200 hover:border-gray-300 hover:shadow-sm w-52">
                  {
                    <tr className=" transition-colors hover:bg-blue-100">
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

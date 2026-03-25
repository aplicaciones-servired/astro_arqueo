import { useEffect, type JSX } from "react";
import getFormattedDate from "../ui/getFormattedDate";

import type { Arqueos } from "@/types/arqueo";
import { useFilterPro } from "@/hooks/SeguiminetoFilters";
import { useEmpresa } from "../ui/useEmpresa";
import { exportarAExcel } from "../Exportar/Export";
interface PropsFooter {
  datos: Arqueos[];
  fecha: string;
  setFecha: (value: string) => void;
}

const TableSeguimiento = ({
  datos,
  fecha,
  setFecha,
}: PropsFooter): JSX.Element => {
  const { filteredPDV, setSearchFecha, searchFecha } = useFilterPro(datos);
  const { empresa } = useEmpresa();
  useEffect(() => {
    setFecha(searchFecha);
  }, [setFecha, searchFecha, setFecha]);

  return (
    <>
      <div className="flex flex-col mt-6  border-indigo-200 shadow-lg shadow-blue-300/50">
        <h1 className="text-center font-bold mt-5">Arqueo realizados Hoy</h1>
        <h1 className="text-center font-bold">buscar por fecha</h1>
        <div className="flex justify-center items-center gap-3  mt-4 md:mt-0">
          <input
            type="date"
            className="filter-input-date mb-2 w-full md:w-80"
            onChange={(e) => setSearchFecha(e.target.value)}
            value={searchFecha}
          />
          <button
            className="btn-primary mt-1 min-w-[180px]"
            onClick={() =>
              exportarAExcel({
                registros: filteredPDV as Arqueos[],
                nombreArchivo: "arqueos",
                empresa: empresa,
              })
            }
          >
            Exportar arqueos
          </button>
        </div>
        <div className="mt-4 mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="table-shell">
              <table className="table-pro">
                <thead className="table-head">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-semibold text-left text-gray-900">
                      Realizado por
                    </th>
                    <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                      Realizado a
                    </th>
                    <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                      Punto de Venta
                    </th>
                    <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                      Fecha Visita
                    </th>
                    <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                      Fecha hora
                    </th>
                  </tr>
                </thead>
                <tbody className="table-body table-body-clickable">
                  {filteredPDV.map((pdv, index) => (
                    <tr
                      key={index}
                      className="table-row"
                    >
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {pdv.nombreSupervisor}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {pdv.nombres}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {pdv.puntodeventa}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {getFormattedDate(pdv.fechavisita)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {pdv.horavisita}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableSeguimiento;

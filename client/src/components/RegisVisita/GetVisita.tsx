import { useEffect, type JSX } from "react";
import getFormattedDate from "../ui/getFormattedDate";
import type { Visitas } from "@/types/visita";
import { useFilterPro } from "@/hooks/Visitas.Filters";

interface PropsFooter {
  datos: Visitas[];
  fecha_visita: string;
  setFecha_visita: (value: string) => void;
}

const TableVista = ({
  datos,
  fecha_visita,
  setFecha_visita,
}: PropsFooter): JSX.Element => {
  const { searchFecha, setSearchFecha, filteredPDV } = useFilterPro(datos);

  useEffect(() => {
    setFecha_visita(searchFecha);
  }, [setFecha_visita, searchFecha]);

  return (
    <>
      <div className="flex flex-col mt-6  border-indigo-200 shadow-lg shadow-blue-300/50">
        <h1 className="text-center font-bold">Visitas realizados Hoy</h1>
        <h1 className="text-center font-bold">buscar por fecha</h1>
        <div className="flex justify-center items-center mt-4 md:mt-0">
          <input
            type="date"
            className="text-center w-full md:w-80 py-1.5 border-indigo-200 shadow-lg shadow-blue-300/50 text-gray-700 bg-white border rounded-lg placeholder-gray-400 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={(e) => setSearchFecha(e.target.value)}
            value={searchFecha}
          />
        </div>

        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y shadow-lg shadow-blue-300/50 divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-semibold text-left text-gray-900">
                      Realizado por
                    </th>
                    <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                      Nombre Completo
                    </th>
                    <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                      Sucursal
                    </th>
                    <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                      Fecha Visita
                    </th>
                    <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                      Fecha hora
                    </th>
                  </tr>
                </thead>
                <tbody className="cursor-pointer bg-white divide-y divide-gray-200 hover:border-gray-300 hover:shadow-sm w-52">
                  {filteredPDV.map((pdv, index) => (
                    <tr
                      key={index}
                      className=" transition-colors hover:bg-blue-100"
                    >
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {pdv.supervisor}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {pdv.nombres}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {pdv.sucursal}
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

export default TableVista;

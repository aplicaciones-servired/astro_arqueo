import { useEffect, type JSX } from "react";
import type { Cronograma } from "@/types/cronograma";

import { useFilterPro } from "@/hooks/InformeFilter";
interface PropsFooter {
  datos: Cronograma[];
}

const Cerrados = ({ datos }: PropsFooter): JSX.Element => {
  const { searchPDS, setSearchPDS, filteredPDV } = useFilterPro(datos);

  return (
    <>
      <div className="flex flex-wrap gap-2 ">
        <div className="mt-4 mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <h1 className="text-center font-bold mt-5">Puntos Cerrados</h1>
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y shadow-lg shadow-blue-300/50 divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-semibold text-left text-gray-900">
                      Punto de Venta
                    </th>
                    <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                      Estado del Arqueo
                    </th>
                    <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody className="cursor-pointer bg-white divide-y divide-gray-200 hover:border-gray-300 hover:shadow-sm w-52">
                  {filteredPDV.map(
                    (pdv, index) =>
                      pdv.estado === "Cerrado" && (
                        <tr
                          key={index}
                          className=" transition-colors hover:bg-blue-100"
                        >
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">
                            {pdv.puntodeventa}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">
                            {pdv.estado}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700">
                            {pdv.dia}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cerrados;

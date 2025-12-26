import { useEffect, type JSX } from "react";
import type { Cronograma } from "@/types/cronograma";

import { useFilterPro } from "@/hooks/InformeFilter";

interface PropsFooter {
  datos: Cronograma[];
  fechaInicio: string;
  fechaFin: string;
}

const Cerrados = ({
  datos,
  fechaInicio,
  fechaFin,
}: PropsFooter): JSX.Element => {
  const { filteredPDV, setFechaInicioInform, setFechaFinInform } =
    useFilterPro(datos);

  useEffect(() => {
    setFechaInicioInform(fechaInicio);
    setFechaFinInform(fechaFin);
  }, [fechaInicio, fechaFin]);

  // Agrupar puntos cerrados para no repetir filas y contar cantidad
  const resumenPuntos = filteredPDV.reduce((acc, pdv) => {
    if (pdv.estado === "Cerrado") {
      // 👈 solo consideramos puntos cerrados
      const punto = pdv.puntodeventa; // 👈 obtenemos el punto de venta
      if (!acc[punto]) {
        // 👈 si no existe el punto en el acumulador
        acc[punto] = {
          // 👈 agregamos el punto al acumulador
          cantidad: 0, // 👈 inicializamos la cantidad
          fecha: pdv.dia, // 👈 guardamos la fecha (la primera que encuentra o la última según el orden)
          estado: pdv.estado, // 👈 guardamos el estado
        };
      }
      acc[punto].cantidad += 1; // 👈 incrementamos la cantidad
    }
    return acc;
  }, {} as Record<string, { cantidad: number; fecha: string; estado: string }>);

  const listaUnica = Object.entries(resumenPuntos);

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
                    <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                      Cantidad
                    </th>
                  </tr>
                </thead>
                <tbody className="cursor-pointer bg-white divide-y divide-gray-200 hover:border-gray-300 hover:shadow-sm w-52">
                  {listaUnica.map(([punto, info], index) => (
                    <tr
                      key={index}
                      className=" transition-colors hover:bg-blue-100"
                    >
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {punto}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {info.estado}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {info.fecha}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {info.cantidad}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-semibold text-left text-gray-900">
                      Total de Puntos Cerrados
                    </th>
                    <tr className="">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {
                          filteredPDV.filter((pdv) => pdv.estado === "Cerrado")
                            .length
                        }
                      </td>
                    </tr>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cerrados;

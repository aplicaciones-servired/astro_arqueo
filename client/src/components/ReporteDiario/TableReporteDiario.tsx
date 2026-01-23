import { useState } from "react";
import type { ReporteDiario } from "@/types/reporteDiario";
import { updateObservacionDiaria } from "@/Services/ReporteDiario";
import { toast } from "sonner";
import { Pencil, Check, X } from "lucide-react";

interface Props {
  datos: ReporteDiario[];
  zona: string;
  onObservacionUpdate?: () => void;
}

export const TableReporteDiario = ({ datos, zona, onObservacionUpdate }: Props) => {
  const [editandoDia, setEditandoDia] = useState<string | null>(null);
  const [observacionTemp, setObservacionTemp] = useState<string>("");

  const handleEditarObservacion = (dia: string, observacionActual: string) => {
    setEditandoDia(dia);
    setObservacionTemp(observacionActual);
  };

  const handleGuardarObservacion = async (dia: string) => {
    try {
      await updateObservacionDiaria(dia, observacionTemp, zona);
      toast.success("Observación actualizada correctamente");
      setEditandoDia(null);
      if (onObservacionUpdate) {
        onObservacionUpdate();
      }
    } catch (error) {
      toast.error("Error al actualizar la observación");
    }
  };

  const handleCancelarEdicion = () => {
    setEditandoDia(null);
    setObservacionTemp("");
  };

  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calcularPorcentaje = (realizados: number, total: number): string => {
    if (total === 0) return "0";
    return ((realizados / total) * 100).toFixed(1);
  };

  return (
    <div className="flex flex-col mt-6 border-indigo-200 shadow-lg shadow-blue-300/50">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y shadow-lg shadow-blue-300/50 divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-600">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-bold text-left text-white"
                  >
                    Fecha
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-bold text-center text-white"
                  >
                    Total Cronogramas
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-bold text-center text-white"
                  >
                    Realizados
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-bold text-center text-white"
                  >
                    Pendientes
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-bold text-center text-white"
                  >
                    % Completado
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-bold text-left text-white"
                  >
                    Observación
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-bold text-center text-white"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {datos.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No hay datos para mostrar
                    </td>
                  </tr>
                ) : (
                  datos.map((item) => {
                    const porcentaje = calcularPorcentaje(item.realizados, item.totalCronogramas);
                    const colorPorcentaje = 
                      parseFloat(porcentaje) >= 80 ? "text-green-600 font-semibold" :
                      parseFloat(porcentaje) >= 50 ? "text-yellow-600 font-semibold" :
                      "text-red-600 font-semibold";

                    return (
                      <tr key={item.dia} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          {formatearFecha(item.dia)}
                        </td>
                        <td className="px-4 py-4 text-sm text-center text-gray-700 font-semibold">
                          {item.totalCronogramas}
                        </td>
                        <td className="px-4 py-4 text-sm text-center">
                          <span className="px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                            {item.realizados}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-center">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            item.pendientes > 0 
                              ? "text-red-800 bg-red-100" 
                              : "text-gray-600 bg-gray-100"
                          }`}>
                            {item.pendientes}
                          </span>
                        </td>
                        <td className={`px-4 py-4 text-sm text-center ${colorPorcentaje}`}>
                          {porcentaje}%
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700">
                          {editandoDia === item.dia ? (
                            <textarea
                              value={observacionTemp}
                              onChange={(e) => setObservacionTemp(e.target.value)}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              rows={2}
                              placeholder="Escriba la observación del día..."
                            />
                          ) : (
                            <span className={item.observacion ? "" : "text-gray-400 italic"}>
                              {item.observacion || "Sin observaciones"}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-center">
                          {editandoDia === item.dia ? (
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleGuardarObservacion(item.dia)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Guardar"
                              >
                                <Check size={18} />
                              </button>
                              <button
                                onClick={handleCancelarEdicion}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Cancelar"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEditarObservacion(item.dia, item.observacion)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Editar observación"
                            >
                              <Pencil size={18} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {datos.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Resumen del período:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Total de días:</span>
              <span className="ml-2 font-semibold text-gray-900">{datos.length}</span>
            </div>
            <div>
              <span className="text-gray-600">Total cronogramas:</span>
              <span className="ml-2 font-semibold text-gray-900">
                {datos.reduce((sum, item) => sum + item.totalCronogramas, 0)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Total realizados:</span>
              <span className="ml-2 font-semibold text-green-600">
                {datos.reduce((sum, item) => sum + item.realizados, 0)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Total pendientes:</span>
              <span className="ml-2 font-semibold text-red-600">
                {datos.reduce((sum, item) => sum + item.pendientes, 0)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

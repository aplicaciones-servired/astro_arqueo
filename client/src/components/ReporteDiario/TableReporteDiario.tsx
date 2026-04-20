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
    // Parsear la fecha manualmente para evitar problemas de zona horaria
    const [year, month, day] = fecha.split('-').map(Number);
    const date = new Date(year, month - 1, day);
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
          <div className="table-shell">
            <table className="table-pro">
              <thead className="bg-linear-to-r from-blue-500 to-indigo-600">
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
                    No se pudo realizar
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-bold text-center text-white"
                  >
                    Cerrados
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
              <tbody className="table-body">
                {datos.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
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
                      <tr key={item.dia} className="table-row">
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
                          <span className="px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                            {item.No_Se_Pudo_Realizar}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-center">
                          <span className="px-3 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                            {item.cerrados}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-center">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${item.pendientes > 0
                              ? "text-yellow-800 bg-yellow-100"
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
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <h3 className="mb-3 text-sm font-semibold text-slate-800">Resumen del período</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <div className="rounded-md border border-slate-200 bg-white px-3 py-2">
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Total de días</p>
              <p className="mt-1 text-lg font-bold text-slate-900">{datos.length}</p>
            </div>

            <div className="rounded-md border border-slate-200 bg-white px-3 py-2">
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Total cronogramas</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {datos.reduce((sum, item) => sum + item.totalCronogramas, 0)}
              </p>
            </div>

            <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2">
              <p className="text-[11px] font-medium uppercase tracking-wide text-green-700">Realizados</p>
              <p className="mt-1 text-lg font-bold text-green-800">
                {datos.reduce((sum, item) => sum + item.realizados, 0)}
              </p>
            </div>

            <div className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2">
              <p className="text-[11px] font-medium uppercase tracking-wide text-blue-700">No se pudo realizar</p>
              <p className="mt-1 text-lg font-bold text-blue-800">
                {datos.reduce((sum, item) => sum + (item.No_Se_Pudo_Realizar ?? 0), 0)}
              </p>
            </div>

            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2">
              <p className="text-[11px] font-medium uppercase tracking-wide text-red-700">Cerrados</p>
              <p className="mt-1 text-lg font-bold text-red-800">
                {datos.reduce((sum, item) => sum + item.cerrados, 0)}
              </p>
            </div>

            <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2">
              <p className="text-[11px] font-medium uppercase tracking-wide text-amber-700">Pendientes</p>
              <p className="mt-1 text-lg font-bold text-amber-800">
                {datos.reduce((sum, item) => sum + item.pendientes, 0)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

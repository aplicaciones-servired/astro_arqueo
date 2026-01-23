import { useState, useEffect } from "react";
import type { ReporteDiario } from "@/types/reporteDiario";
import { getReporteDiario } from "@/Services/ReporteDiario";
import { TableReporteDiario } from "./TableReporteDiario";
import { toast } from "sonner";
import { exportarReporteDiarioExcel } from "../Exportar/ExportReporteDiario";
import { FileDown } from "lucide-react";
import { useEmpresa } from "../ui/useEmpresa";



export const GetReporteDiario = () => {
  const [datos, setDatos] = useState<ReporteDiario[]>([]);
  const [loading, setLoading] = useState(true);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const { empresa } = useEmpresa();

  const zona = empresa;

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const response = await getReporteDiario(zona, fechaInicio, fechaFin);
      setDatos(response.datos);
    } catch (error) {
      toast.error("Error al cargar el reporte diario");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [zona]);

  const handleFiltrar = () => {
    if (fechaInicio && fechaFin) {
      if (fechaInicio > fechaFin) {
        toast.warning("La fecha de inicio no puede ser mayor a la fecha fin");
        return;
      }
    }
    cargarDatos();
  };

  const handleLimpiarFiltros = () => {
    setFechaInicio("");
    setFechaFin("");
    cargarDatos();
  };

  const handleExportarExcel = async () => {
    if (datos.length === 0) {
      toast.warning("No hay datos para exportar");
      return;
    }

    try {
      await exportarReporteDiarioExcel({
        registros: datos,
        nombreArchivo: "Reporte_Diario_Cronogramas",
        empresa: zona
      });
      toast.success("Reporte exportado correctamente");
    } catch (error) {
      toast.error("Error al exportar el reporte");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Reporte Diario de Cronogramas
        </h1>
        <p className="text-gray-600">
          Visualiza el resumen diario de cronogramas realizados y pendientes
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Filtros</h2>
          <button
            onClick={handleExportarExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            disabled={datos.length === 0}
          >
            <FileDown size={20} />
            Exportar a Excel
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Inicio
            </label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Fin
            </label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end gap-2">
            <button
              onClick={handleFiltrar}
              className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Filtrar
            </button>
            <button
              onClick={handleLimpiarFiltros}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <TableReporteDiario 
          datos={datos} 
          zona={zona} 
          onObservacionUpdate={cargarDatos}
        />
      )}
    </div>
  );
};

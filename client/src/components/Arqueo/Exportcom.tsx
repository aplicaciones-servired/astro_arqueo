import { useState } from "react";
import { toast } from "sonner";
import type { Arqueos } from "@/types/arqueo";
import { exportarAExcel } from "../ui/Export";
import type { Cronograma } from "@/types/cronograma";
import Button from "../ui/Button";
import { API_URL } from "@/utils/constans";
import { useEmpresa } from "../ui/useEmpresa";
import axios from "axios";

interface PropsExport {
  data: Arqueos[] | Cronograma[];
  tipo: "arqueo" | "cronograma";
}

export const Exportcom = ({ data, tipo }: PropsExport) => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // changed code: obtener empresa desde context/hook
  const { empresa } = useEmpresa();

  const exportarRegistros = async (): Promise<void> => {
    if (!fechaInicio || !fechaFin) {
      toast.warning("Fechas de inicio y fin deben ser seleccionadas", {
        duration: 1000,
      });
      return;
    }

    if (!empresa) {
      toast.error("Empresa no seleccionada", { duration: 1500 });
      return;
    }

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (inicio > fin) {
      toast.error("La fecha de inicio no puede ser mayor a la fecha fin");
      return;
    }

    try {
      // Traer todos los registros desde el backend (sin paginar)
      const base =
        typeof API_URL === "string" ? API_URL.replace(/\/+$/, "") : API_URL;
      if (!base) {
        toast.error("API_URL inválida en frontend", { duration: 2000 });
        return;
      }

      const url =
        tipo === "arqueo"
          ? `${base}/arqueo?zona=${empresa}&page=1&pageSize=1000000`
          : `${base}/getcronograma?zona=${empresa}&page=1&pageSize=1000000`;

      const response = await axios.get(url);
      const todos: any[] = response.data?.datos ?? response.data ?? [];

      // Filtrar por rango de fechas (campo distinto según tipo)
      const registrosFiltrados = todos.filter((item: any) => {
        const fecha =
          tipo === "arqueo" ? new Date(item.fechavisita) : new Date(item.dia);
        return fecha >= inicio && fecha <= fin;
      });

      if (registrosFiltrados.length > 0) {
        toast.success(`Se exportarán ${registrosFiltrados.length} registros`);
        if (tipo === "arqueo") {
          exportarAExcel({
            registros: registrosFiltrados as Arqueos[],
            nombreArchivo: "Arqueos",
            empresa: empresa,
          });
        } else {
          exportarAExcel({
            registros: registrosFiltrados as Cronograma[],
            nombreArchivo: "Cronogramas",
            empresa: empresa,
          });
        }
      } else {
        toast.info(
          "No hay registros para exportar en el rango de fechas seleccionado"
        );
      }
    } catch (err) {
      toast.error("Error al obtener registros para exportar", {
        duration: 2000,
      });
    }
  };

  return (
    <section className="container px-4 mt-5 ">
      <div className="mb-6 p-4 bg-white border border-indigo-200 rounded-lg shadow-lg shadow-blue-300/50">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Exportar {tipo === "arqueo" ? "Arqueos" : "Cronogramas"}
        </h3>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Inicio
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Fin
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          <div className="flex items-end">
            <Button onClick={exportarRegistros}>Exportar</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

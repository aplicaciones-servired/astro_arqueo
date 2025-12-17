import { useState } from "react";
import { toast } from "sonner";
import type { Arqueos } from "@/types/arqueo";
import { exportarAExcel } from "./Exportar/Export";
import type { Cronograma } from "@/types/cronograma";
import Button from "./ui/Button";
import { API_URL } from "@/utils/constans";
import { useEmpresa } from "./ui/useEmpresa";
import axios from "axios";
import { Visitas } from "@/types/visita";
import { exportarAExcelGlob } from "./Exportar/ExporGlob";
import { exportarVisitasAExcel } from "./Exportar/ExportVisita";
import { ArqueoManual } from "@/types/arqueomanual";

interface PropsExport {
  data: Arqueos[] | Cronograma[] | Visitas[] | ArqueoManual[];
  tipo: "arqueo" | "cronograma" | "visita" | "ArqueosInfo" | "ArqueoManual";
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
    const promesa = (async () => {
      const base =
        typeof API_URL === "string" ? API_URL.replace(/\/+$/, "") : API_URL;
      if (!base) {
        throw new Error("API_URL inválida en frontend");
      }

      const url =
        tipo === "arqueo"
          ? `${base}/arqueo?zona=${empresa}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&pageSize=1000000`
          : tipo === "visita"
            ? `${base}/visita?zona=${empresa}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&pageSize=1000000`
            : tipo === "ArqueosInfo"
              ? `${base}/arqueo?zona=${empresa}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&pageSize=1000000`
              : tipo === "ArqueoManual"
                ? `${base}/getarqueomanual?zona=${empresa}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&pageSize=1000000`
                : `${base}/getcronograma?zona=${empresa}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&pageSize=1000000`;

      const response = await axios.get(url);
      const todos: any[] = response.data?.datos ?? response.data ?? [];

      const registrosFiltrados = todos.filter((item: any) => {
        let itemFecha: string;

        if (tipo === "arqueo" || tipo === "visita" || tipo === "ArqueosInfo") {
          itemFecha = new Date(item.fechavisita).toISOString().split("T")[0];
        } else if (tipo === "ArqueoManual") {
          itemFecha = new Date(item.fecha).toISOString().split("T")[0];
        } else {
          itemFecha = new Date(item.dia).toISOString().split("T")[0];
        }

        return itemFecha >= fechaInicio && itemFecha <= fechaFin;
      });

      if (registrosFiltrados.length === 0) {
        throw new Error("No hay registros para exportar en el rango seleccionado");
      }

      if (tipo === "arqueo") {
        exportarAExcel({
          registros: registrosFiltrados as Arqueos[],
          nombreArchivo: "Arqueos",
          empresa: empresa,
        });
      } if (tipo === "ArqueosInfo") {
        exportarAExcelGlob({
          registros: registrosFiltrados as Arqueos[],
          nombreArchivo: "ArqueosInfo",
          empresa: empresa,
        });
      } else if (tipo === "visita") {
        exportarVisitasAExcel({
          registros: registrosFiltrados as Visitas[],
          nombreArchivo: "Visitas",
          empresa: empresa,
        });
      } else if (tipo === "ArqueoManual") {
        exportarAExcel({
          registros: registrosFiltrados as ArqueoManual[],
          nombreArchivo: "ArqueoManual",
          empresa: empresa,
        });
      } else {
        exportarAExcel({
          registros: registrosFiltrados as Cronograma[],
          nombreArchivo: "Cronogramas",
          empresa: empresa,
        });
      }

      return registrosFiltrados.length;
    })();

    toast.promise(promesa, {
      loading: "Consultando registros...",
      success: (count) => `Se exportaron ${count} registros`,
      error: (err) => err.message || "Error al obtener registros",
      duration: 9000,
    });
  };

  return (
    <section className="container px-4 mt-5 ">
      <div className="mb-6 p-4 bg-white border border-indigo-200 rounded-lg shadow-lg shadow-blue-300/50">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Exportar {tipo === "arqueo" ? "Arqueos" : tipo === "visita" ? "Visitas" : tipo === "ArqueosInfo" ? "Arqueo Informacion" : tipo === "ArqueoManual" ? "Arqueo Manual" : "Cronogramas "}
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

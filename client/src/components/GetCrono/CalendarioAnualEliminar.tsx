import { useState, useMemo } from "react";
import { useCalendarioCronogramas } from "@/Services/CalendarioCrono";
import { DeletCromBatch } from "@/Services/DeletCrom";
import { useEmpresa } from "../ui/useEmpresa";
import { meses } from "@/utils/constans";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import type { Cronograma } from "@/types/cronograma";

const DIAS_CORTOS = ["L", "M", "X", "J", "V", "S", "D"];

const getColorEstado = (estado: string | null): string => {
  if (!estado) return "#f3f4f6";
  const e = estado.toLowerCase().trim();
  if (e === "cerrado" || e === "cerrada" || e.includes("cerrado")) return "#dc2626";
  if (e === "realizado" || e.includes("realizado")) return "#16a34a";
  if (e === "no se pudo realizar" || e.includes("no se pudo realizar")) return "#6b7280";
  return "#3b82f6";
};

interface DiaInfo {
  numero: number;
  diaSemanaIdx: number;
  fecha: string;
}

const getDiasDelMes = (año: number, mes: number): DiaInfo[] => {
  const totalDias = new Date(año, mes, 0).getDate();
  return Array.from({ length: totalDias }, (_, i) => {
    const fecha = new Date(año, mes - 1, i + 1);
    const dayIdx = fecha.getDay();
    const diaSemanaIdx = dayIdx === 0 ? 6 : dayIdx - 1;
    const fechaStr = `${año}-${String(mes).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
    return { numero: i + 1, diaSemanaIdx, fecha: fechaStr };
  });
};

const MINI_CELL = "w-5 h-5 flex items-center justify-center text-[9px] rounded cursor-pointer select-none transition-all duration-150";

export const CalendarioAnualEliminar = () => {
  const año = new Date().getFullYear();
  const { data: cronogramas, loading, refetch } = useCalendarioCronogramas();
  const { empresa } = useEmpresa();

  const [seleccionados, setSeleccionados] = useState<Set<number>>(new Set());
  const [diaAbierto, setDiaAbierto] = useState<string | null>(null);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const cronogramasPorFecha = useMemo(() => {
    const map = new Map<string, Cronograma[]>();
    for (const c of cronogramas) {
      const fechaStr = c.dia.split("T")[0];
      if (!map.has(fechaStr)) map.set(fechaStr, []);
      map.get(fechaStr)!.push(c);
    }
    return map;
  }, [cronogramas]);

  const toggleCronograma = (id: number) => {
    setSeleccionados((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleTodosDelDia = (fecha: string) => {
    const cronos = cronogramasPorFecha.get(fecha) || [];
    if (cronos.length === 0) return;

    const todosSeleccionados = cronos.every((c) => seleccionados.has(c.id));

    setSeleccionados((prev) => {
      const next = new Set(prev);
      for (const c of cronos) {
        if (todosSeleccionados) next.delete(c.id);
        else next.add(c.id);
      }
      return next;
    });
  };

  const seleccionarTodos = () => {
    setSeleccionados(new Set(cronogramas.map((c) => c.id)));
  };

  const deseleccionarTodos = () => setSeleccionados(new Set());

  const handleEliminar = async () => {
    if (seleccionados.size === 0 || !empresa) return;
    setEliminando(true);

    const items: { id: string | number; sourceTable?: string }[] = [];
    for (const c of cronogramas) {
      if (seleccionados.has(c.id)) {
        items.push({ id: c.id, sourceTable: c.source_table });
      }
    }

    try {
      const deleted = await DeletCromBatch(items, empresa);
      toast.success(`${deleted} cronograma(s) eliminado(s)`, { duration: 3000 });
      setSeleccionados(new Set());
      setModalConfirmar(false);
      await refetch();
    } catch {
      toast.error("Error al eliminar cronogramas", { duration: 3000 });
    } finally {
      setEliminando(false);
    }
  };

  const cronosDelDiaAbierto = diaAbierto ? cronogramasPorFecha.get(diaAbierto) || [] : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      {/* Modal de cronogramas del día */}
      {diaAbierto && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setDiaAbierto(null)}
        >
          <div
            className="bg-white rounded-lg p-5 max-w-lg w-full mx-4 shadow-2xl max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-base font-bold text-gray-800">
                  Cronogramas del {diaAbierto.split("-")[2]}/{diaAbierto.split("-")[1]}/{diaAbierto.split("-")[0]}
                </h3>
                <p className="text-xs text-gray-500">{cronosDelDiaAbierto.length} cronograma(s)</p>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => toggleTodosDelDia(diaAbierto)}
                  className="cursor-pointer text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  {cronosDelDiaAbierto.every((c) => seleccionados.has(c.id)) ? "Deseleccionar día" : "Seleccionar día"}
                </button>
                <button
                  onClick={() => setDiaAbierto(null)}
                  className="cursor-pointer text-gray-400 hover:text-gray-600 text-xl font-bold px-2"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="space-y-1.5 overflow-y-auto flex-1">
              {cronosDelDiaAbierto.map((c) => {
                const marcado = seleccionados.has(c.id);
                return (
                  <label
                    key={c.id}
                    className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${
                      marcado ? "bg-red-50 ring-1 ring-red-300" : "hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={marcado}
                      onChange={() => toggleCronograma(c.id)}
                      className="cursor-pointer w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getColorEstado(c.estado) }}
                    />
                    <span className="text-sm font-medium text-gray-800 flex-1">{c.puntodeventa}</span>
                    <span className="text-xs text-gray-500">{c.estado}</span>
                    <span className="text-[10px] text-gray-400 font-mono">ID: {c.id}</span>
                  </label>
                );
              })}
              {cronosDelDiaAbierto.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">No hay cronogramas para este día</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Barra de acciones */}
      <div className="mb-4 flex flex-wrap gap-3 items-center bg-white p-3 rounded-lg shadow-md">
        <div className="text-sm text-gray-700">
          <strong>{año}</strong> — {cronogramas.length} cronograma(s) en total
        </div>

        <div className="ml-auto flex gap-2 items-center">
          {seleccionados.size > 0 && (
            <span className="text-sm font-semibold text-red-700 bg-red-50 px-3 py-1 rounded-full">
              {seleccionados.size} seleccionado(s)
            </span>
          )}

          <button
            onClick={seleccionarTodos}
            className="cursor-pointer text-xs px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
          >
            Seleccionar todos
          </button>
          <button
            onClick={deseleccionarTodos}
            className="cursor-pointer text-xs px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
          >
            Deseleccionar
          </button>
          <button
            onClick={() => setModalConfirmar(true)}
            disabled={seleccionados.size === 0}
            className="cursor-pointer flex items-center gap-1.5 text-xs px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Trash size={14} />
            Eliminar ({seleccionados.size})
          </button>
        </div>
      </div>

      {/* Leyenda */}
      <div className="mb-3 bg-white p-3 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4 text-xs items-center">
          <span className="font-semibold text-gray-600">Leyenda:</span>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#3b82f6" }} />
            <span>En Espera</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#16a34a" }} />
            <span>Realizado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#dc2626" }} />
            <span>Cerrado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#6b7280" }} />
            <span>No Se Pudo Realizar</span>
          </div>
        </div>
      </div>

      {/* Grid anual 4 columnas × 3 filas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {meses.map((m) => {
          const dias = getDiasDelMes(año, m.valor);

          return (
            <div key={m.valor} className="bg-white rounded-lg shadow-md p-3">
              <h3 className="text-xs font-bold text-gray-800 mb-2 text-center">{m.nombre}</h3>

              {/* Encabezados de día */}
              <div className="grid grid-cols-7 gap-0.5 mb-1">
                {DIAS_CORTOS.map((d, i) => (
                  <div key={i} className="text-center text-[9px] font-bold text-gray-500 py-0.5">
                    {d}
                  </div>
                ))}
              </div>

              {/* Días */}
              <div className="grid grid-cols-7 gap-0.5">
                {Array.from({ length: dias[0]?.diaSemanaIdx || 0 }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {dias.map((dia) => {
                  const cronos = cronogramasPorFecha.get(dia.fecha);
                  const tieneCrono = !!cronos && cronos.length > 0;
                  const algunoSeleccionado = tieneCrono && cronos!.some((c) => seleccionados.has(c.id));

                  const bgColor = tieneCrono
                    ? algunoSeleccionado
                      ? "#fee2e2"
                      : getColorEstado(cronos![0].estado)
                    : undefined;

                  return (
                    <div
                      key={dia.fecha}
                      className={`${MINI_CELL} ${tieneCrono ? "" : "text-gray-400"} ${
                        diaAbierto === dia.fecha ? "ring-2 ring-blue-500" : ""
                      }`}
                      style={
                        tieneCrono
                          ? {
                              backgroundColor: bgColor,
                              color: algunoSeleccionado ? "#991b1b" : "#ffffff",
                              fontWeight: 900,
                            }
                          : undefined
                      }
                      onClick={() => tieneCrono && setDiaAbierto(diaAbierto === dia.fecha ? null : dia.fecha)}
                      title={
                        tieneCrono
                          ? `${cronos!.length} cronograma(s) — Click para ver detalles`
                          : "Sin cronograma"
                      }
                    >
                      {dia.numero}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de confirmación */}
      {modalConfirmar && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => !eliminando && setModalConfirmar(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                ¿Eliminar {seleccionados.size} cronograma(s)?
              </h3>
              <p className="text-xs text-red-500 mb-4">Esta acción no se puede deshacer.</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setModalConfirmar(false)}
                disabled={eliminando}
                className="cursor-pointer flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleEliminar}
                disabled={eliminando}
                className="cursor-pointer flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {eliminando ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Eliminando...
                  </>
                ) : (
                  "Sí, eliminar"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

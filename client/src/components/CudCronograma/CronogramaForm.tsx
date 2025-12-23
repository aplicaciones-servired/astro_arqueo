import { useState } from "react";
import { empresas, tipos } from "@/utils/constans";
import { CronogramaSer } from "@/Services/CronogramaSer";
import { toast } from "sonner";
import { useSucursales } from "@/Services/Sucursales";
import { useEmpresa } from "../ui/useEmpresa";

export default function CronogramaForm() {
    const [puntoSeleccionado, setPuntoSeleccionado] = useState<string>("");
    const { empresa, setEmpresa } = useEmpresa();
    const [nota, setNota] = useState<string>("");
    const [mesActual, setMesActual] = useState(new Date());
    const [diasPorPunto, setDiasPorPunto] = useState<Record<string, string[]>>({});
    const [searchPunto, setSearchPunto] = useState("");
    const { data: sucursales } = useSucursales();
    const seleccionarPunto = (punto: string) => {
        setPuntoSeleccionado(punto);
    };

    // Obtener días del punto actual
    const diasSeleccionados = diasPorPunto[puntoSeleccionado] || [];

    // Obtener TODOS los días seleccionados de TODOS los puntos
    const todosLosDiasSeleccionados = Object.values(diasPorPunto).flat();

    const puntosFiltrados = sucursales.filter(sucursal =>
        sucursal.NOMBRE?.toLowerCase().includes(searchPunto.toLowerCase())
    );



    const obtenerDiasDelMes = (fecha: Date) => {
        const año = fecha.getFullYear();
        const mes = fecha.getMonth();
        const primerDia = new Date(año, mes, 1);
        const ultimoDia = new Date(año, mes + 1, 0);

        const dias: Date[] = [];
        for (let d = new Date(primerDia); d <= ultimoDia; d.setDate(d.getDate() + 1)) {
            dias.push(new Date(d));
        }

        return { dias, primerDia };
    };

    const toggleDia = (fecha: string) => {
        if (!puntoSeleccionado) {
            toast.warning("Selecciona un punto de venta primero");
            return;
        }

        setDiasPorPunto(prev => {
            const diasActuales = prev[puntoSeleccionado] || [];
            const nuevoDias = diasActuales.includes(fecha)
                ? diasActuales.filter(d => d !== fecha)
                : [...diasActuales, fecha].sort();

            return {
                ...prev,
                [puntoSeleccionado]: nuevoDias
            };
        });
    };

    const cambiarMes = (direccion: number) => {
        setMesActual(prev => {
            const nuevo = new Date(prev);
            nuevo.setMonth(nuevo.getMonth() + direccion);
            return nuevo;
        });
    };


    const handleSubmitTodos = async () => {
        if (!empresa || !nota) {
            toast.warning("Complete: Empresa y Motivo");
            return;
        }

        const puntosConDias = Object.keys(diasPorPunto).filter(punto => diasPorPunto[punto].length > 0);

        if (puntosConDias.length === 0) {
            toast.warning("No hay días seleccionados para ningún punto");
            return;
        }

        const totalDias = Object.values(diasPorPunto).flat().length;
        toast.info(`Creando ${totalDias} cronogramas para ${puntosConDias.length} puntos...`);

        let exitososTotal = 0;
        for (const punto of puntosConDias) {
            const dias = diasPorPunto[punto];
            for (const fecha of dias) {
                const ok = await CronogramaSer({
                    puntovdt: punto,
                    empresa,
                    nota,
                    fecha,
                });
                if (ok) exitososTotal++;
            }
        }

        if (exitososTotal > 0) {
            toast.success(`✅ ${exitososTotal} cronogramas creados para ${puntosConDias.length} puntos`);
            // Limpiamos todos los campos después de guardar
            setDiasPorPunto({});
            setPuntoSeleccionado("");
            setEmpresa("");
            setNota("");
        }
    };

    const { dias, primerDia } = obtenerDiasDelMes(mesActual);
    const nombreMes = mesActual.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const espaciosVacios = primerDia.getDay();

    return (
        <div className="flex flex-col gap-4 p-4 w-full max-w-[1800px] mx-auto">
            {/* Selectores superiores */}
            <div className="flex flex-wrap gap-4 justify-center bg-linear-to-r from-blue-50 to-indigo-50 p-4 rounded-xl shadow-md border border-blue-200">
                <div className="flex-1 min-w-[250px] max-w-[320px]">
                    <label className="block text-center mb-2 uppercase font-bold text-sm text-blue-900">🏢 Empresa:</label>
                    <select
                        id="empresa"
                        name="empresa"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        className="w-full px-4 py-2.5 text-center rounded-lg border-2 border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium shadow-sm"
                    >
                        <option value="">Cambiar de empresa</option>
                        {empresas.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex-1 min-w-[250px] max-w-[320px]">
                    <label className="block text-center mb-2 uppercase font-bold text-sm text-blue-900">📋 Motivo:</label>
                    <select
                        value={nota}
                        onChange={(e) => setNota(e.target.value)}
                        className="w-full px-4 py-2.5 text-center rounded-lg border-2 border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium shadow-sm"
                    >
                        <option value="">Seleccione un motivo</option>
                        {tipos.map((n) => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Layout principal: Lista de puntos + Calendario */}
            <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-4">

                {/* Lista de Puntos de Venta */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden">
                    <div className="bg-linear-to-r from-indigo-600 to-blue-600 p-4">
                        <h3 className="text-lg font-bold text-white text-center flex items-center justify-center gap-2">
                            <span className="text-xl">📍</span>
                            Puntos de Venta
                        </h3>
                    </div>

                    {/* Buscador */}
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                        <input
                            type="text"
                            placeholder="🔍 Buscar punto..."
                            value={searchPunto}
                            onChange={(e) => setSearchPunto(e.target.value)}
                            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    </div>

                    {/* Lista scrollable */}
                    <div className="max-h-[calc(100vh-340px)] min-h-[500px] overflow-y-auto space-y-1.5 p-3">
                        {puntosFiltrados.map((sucursal) => {
                            const tieneDias = (diasPorPunto[sucursal.NOMBRE ?? ''] ?? []).length > 0;
                            return (
                                <button
                                    key={sucursal.CODIGO}
                                    type="button"
                                    onClick={() => sucursal.NOMBRE && seleccionarPunto(sucursal.NOMBRE)}
                                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${puntoSeleccionado === sucursal.NOMBRE
                                        ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md transform scale-[1.02]'
                                        : tieneDias
                                            ? 'bg-linear-to-r from-green-50 to-emerald-50 text-green-800 border-l-4 border-green-500 hover:bg-green-100 shadow-sm'
                                            : 'bg-white text-gray-700 hover:bg-blue-50 border-l-4 border-transparent hover:border-blue-400 shadow-sm'
                                        }`}
                                >
                                    <span className="flex items-center justify-between">
                                        <span className="truncate">{sucursal.NOMBRE}</span>
                                        {tieneDias && sucursal.NOMBRE && (
                                            <span className="ml-2 px-2 py-0.5 bg-green-600 text-white text-xs rounded-full font-bold shrink-0">
                                                {diasPorPunto[sucursal.NOMBRE].length}
                                            </span>
                                        )}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Calendario */}
                <div className="w-full bg-white p-6 rounded-xl shadow-lg border border-gray-300">
                    {/* Título del punto seleccionado */}
                    {puntoSeleccionado ? (
                        <div className="mb-4 p-4 bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-white text-center flex items-center justify-center gap-2">
                                <span className="text-2xl">📍</span>
                                {puntoSeleccionado}
                            </h3>
                        </div>
                    ) : (
                        <div className="mb-4 p-4 bg-linear-to-r from-gray-500 to-gray-600 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-white text-center flex items-center justify-center gap-2">
                                <span className="text-2xl">📅</span>
                                Selecciona un punto de venta
                            </h3>
                        </div>
                    )}

                    <div className="flex items-center justify-between mb-4 bg-linear-to-r from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200">
                        <button
                            type="button"
                            onClick={() => cambiarMes(-1)}
                            className="px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                        >
                            ← Anterior
                        </button>
                        <h3 className="text-xl font-bold capitalize text-gray-800">
                            {nombreMes}
                        </h3>
                        <button
                            type="button"
                            onClick={() => cambiarMes(1)}
                            className="px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                        >
                            Siguiente →
                        </button>
                    </div>

                    {/* Días de la semana */}
                    <div className="grid grid-cols-7 gap-2 mb-2">
                        {diasSemana.map(dia => (
                            <div key={dia} className="text-center font-bold text-gray-700 text-sm py-2 bg-linear-to-b from-gray-100 to-gray-50 rounded-md border border-gray-200">
                                {dia}
                            </div>
                        ))}
                    </div>

                    {/* Días del mes */}
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: espaciosVacios }).map((_, i) => (
                            <div key={`empty-${i}`} className="h-12"></div>
                        ))}
                        {dias.map(dia => {
                            const fechaStr = dia.toISOString().split('T')[0];
                            const seleccionadoEnPuntoActual = diasSeleccionados.includes(fechaStr);
                            const seleccionadoEnOtroPunto = todosLosDiasSeleccionados.includes(fechaStr) && !seleccionadoEnPuntoActual;
                            const esHoy = new Date().toISOString().split('T')[0] === fechaStr;
                            return (
                                <button
                                    key={fechaStr}
                                    type="button"
                                    onClick={() => toggleDia(fechaStr)}
                                    className={`h-12 rounded-md font-bold text-base transition-all duration-150 ${seleccionadoEnPuntoActual
                                        ? 'bg-linear-to-br from-green-500 to-green-600 text-white shadow-lg scale-105 border-2 border-green-700 hover:from-green-600 hover:to-green-700'
                                        : seleccionadoEnOtroPunto
                                            ? 'bg-linear-to-br from-purple-400 to-purple-500 text-white shadow-md border-2 border-purple-600 hover:from-purple-500 hover:to-purple-600'
                                            : esHoy
                                                ? 'bg-linear-to-br from-blue-200 to-blue-300 text-blue-900 border-2 border-blue-500 shadow-md hover:from-blue-300 hover:to-blue-400 hover:scale-105'
                                                : 'bg-white text-gray-700 border border-gray-300 shadow-sm hover:bg-blue-50 hover:border-blue-400 hover:scale-105 hover:shadow-md'
                                        }`}
                                >
                                    {dia.getDate()}
                                </button>
                            );
                        })}
                    </div>

                    {/* Leyenda de colores */}
                    <div className="mt-4 p-3 bg-linear-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-300">
                        <p className="font-bold text-gray-700 mb-2 text-sm">📌 Leyenda:</p>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded bg-linear-to-br from-green-500 to-green-600 border-2 border-green-700 shadow-sm"></div>
                                <span className="text-xs font-medium">Punto actual</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded bg-linear-to-br from-purple-400 to-purple-500 border-2 border-purple-600 shadow-sm"></div>
                                <span className="text-xs font-medium">Otros puntos</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded bg-linear-to-br from-blue-200 to-blue-300 border-2 border-blue-500 shadow-sm"></div>
                                <span className="text-xs font-medium">Hoy</span>
                            </div>
                        </div>
                    </div>

                    {/* Días seleccionados del punto actual */}
                    {diasSeleccionados.length > 0 && (
                        <div className="mt-4 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-500 shadow-md">
                            <p className="font-bold text-green-800 mb-2 text-sm flex items-center gap-2">
                                <span className="text-lg">✓</span>
                                Días seleccionados para {puntoSeleccionado} ({diasSeleccionados.length})
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {diasSeleccionados.map(fecha => (
                                    <span key={fecha} className="px-3 py-1.5 bg-linear-to-r from-green-600 to-green-700 text-white rounded-full text-sm font-bold shadow-md hover:scale-110 transition-transform cursor-default">
                                        {new Date(fecha + 'T00:00:00').getDate()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Botón de guardar */}
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleSubmitTodos}
                            disabled={Object.keys(diasPorPunto).length === 0}
                            className={`px-8 py-3 rounded-lg font-bold text-base shadow-xl transition-all transform ${Object.keys(diasPorPunto).length > 0
                                ? 'bg-linear-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:scale-105 hover:shadow-2xl cursor-pointer'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                                }`}
                        >
                            ✅ Guardar Todos los Puntos ({Object.keys(diasPorPunto).length})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

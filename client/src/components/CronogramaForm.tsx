import { useState } from "react";
import { empresas, tipos } from "@/utils/constans";
import { CronogramaSer } from "@/Services/CronogramaSer";
import Button from "./ui/Button";
import { toast } from "sonner";

const puntosDeVenta = [
    "GALERIA 1", "GALERIA NUEVO", "SONOCO", "CASTILLO", "COUNTRY MALL", "CASA VERDI",
    "ESPAÑA", "FLORENCIA", "HACIENDA", "MONTEBELLO", "PARQUE DEL AMOR", "CIRCUNVALAR",
    "PASO LA BOLSA", "BONANZA 1", "BONANZA 2", "BONANZA 3", "BONANZA PPAL", "POTRERITO",
    "CARIBE FARALLONES", "CIUDADELA LAS FLORES 1", "CIUDADELA LAS FLORES 2", "MARBELLA 1",
    "MARBELLA 2", "VILLEGAS", "PINOS", "ADRIANITA", "CAÑAVERAL", "CARBONERO", "CARIBE",
    "CENTENARIO", "CONFANDI NUEVO", "PILOTO 1", "ESMERALDA", "14 ALFAGUARA", "CONDADOS",
    "GRAN COLOMBIA", "GYM MODERNO", "HOSPITAL", "PANGOS", "PLAZA AIRONE", "SACHAMATE 1",
    "SACHAMATE 2", "PARQUEADERO", "SIMON BOLIVAR", "ESTACIONES 2 TERRANOVA", "PAISAJE LAS FLORES",
    "TERRANOVA 1", "TERRANOVA 2", "TERRANOVA 3", "TERRANOVA 5", "TERRANOVA 6",
    "PRINCIPAL (MESON)", "CAJERAS OFIC PPAL", "CONTAB OFIC PPAL", "TESOSERIA OFIC PPAL", "MONSERRATE"
];

export default function CronogramaForm() {
    const [puntoSeleccionado, setPuntoSeleccionado] = useState<string>("");
    const [empresa, setEmpresa] = useState<string>("");
    const [nota, setNota] = useState<string>("");
    const [mesActual, setMesActual] = useState(new Date());
    const [diasPorPunto, setDiasPorPunto] = useState<Record<string, string[]>>({});
    const [searchPunto, setSearchPunto] = useState("");

    const seleccionarPunto = (punto: string) => {
        setPuntoSeleccionado(punto);
    };

    // Obtener días del punto actual
    const diasSeleccionados = diasPorPunto[puntoSeleccionado] || [];

    // Obtener TODOS los días seleccionados de TODOS los puntos
    const todosLosDiasSeleccionados = Object.values(diasPorPunto).flat();

    const puntosFiltrados = puntosDeVenta.filter(punto =>
        punto.toLowerCase().includes(searchPunto.toLowerCase())
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

    const handleSubmit = async () => {
        if (!puntoSeleccionado || !empresa || !nota) {
            toast.warning("Complete: Punto de venta, Empresa y Motivo");
            return;
        }

        if (diasSeleccionados.length === 0) {
            toast.warning("Seleccione al menos un día en el calendario");
            return;
        }

        toast.info(`Creando ${diasSeleccionados.length} cronogramas para ${puntoSeleccionado}...`);

        let exitosos = 0;
        for (const fecha of diasSeleccionados) {
            const ok = await CronogramaSer({
                puntovdt: puntoSeleccionado,
                empresa,
                nota,
                fecha,
            });
            if (ok) exitosos++;
        }

        if (exitosos > 0) {
            toast.success(`✅ ${exitosos} cronogramas creados para ${puntoSeleccionado}`);
            // Limpiamos solo los días del punto actual después de guardar
            setDiasPorPunto(prev => {
                const nuevo = { ...prev };
                delete nuevo[puntoSeleccionado];
                return nuevo;
            });
        }
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
            // Limpiamos todos los días después de guardar
            setDiasPorPunto({});
            setPuntoSeleccionado("");
        }
    };

    const { dias, primerDia } = obtenerDiasDelMes(mesActual);
    const nombreMes = mesActual.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const espaciosVacios = primerDia.getDay();

    return (
        <div className="flex flex-col gap-6 p-6 w-full">
            {/* Selectores superiores */}
            <div className="flex gap-6 justify-center mb-4">
                <div>
                    <label className="block text-center mb-2 uppercase font-semibold text-sm">Empresa:</label>
                    <select
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        className="w-64 px-3 py-2 text-center rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Seleccione una empresa</option>
                        {empresas.map((e) => (
                            <option key={e} value={e}>{e}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-center mb-2 uppercase font-semibold text-sm">Motivo:</label>
                    <select
                        value={nota}
                        onChange={(e) => setNota(e.target.value)}
                        className="w-64 px-3 py-2 text-center rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Seleccione un motivo</option>
                        {tipos.map((n) => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Layout principal: Lista de puntos + Calendario */}
            <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8">
                
                {/* Lista de Puntos de Venta */}
                <div className="bg-white rounded-xl shadow-2xl border-2 border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Puntos de Venta</h3>
                    
                    {/* Buscador */}
                    <input
                        type="text"
                        placeholder="🔍 Buscar punto..."
                        value={searchPunto}
                        onChange={(e) => setSearchPunto(e.target.value)}
                        className="w-full px-4 py-3 mb-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-base"
                    />

                    {/* Lista scrollable */}
                    <div className="max-h-[700px] overflow-y-auto space-y-2 pr-2">
                        {puntosFiltrados.map((punto) => {
                            const tieneDias = diasPorPunto[punto]?.length > 0;
                            return (
                                <button
                                    key={punto}
                                    type="button"
                                    onClick={() => seleccionarPunto(punto)}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all relative ${
                                        puntoSeleccionado === punto
                                            ? 'bg-blue-600 text-white shadow-lg scale-105'
                                            : tieneDias
                                            ? 'bg-green-50 text-green-800 border-2 border-green-300 hover:bg-green-100'
                                            : 'bg-gray-50 text-gray-700 hover:bg-blue-100 border border-gray-200'
                                    }`}
                                >
                                    <span className="flex items-center justify-between">
                                        {punto}
                                        {tieneDias && (
                                            <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full font-bold">
                                                {diasPorPunto[punto].length}
                                            </span>
                                        )}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Calendario */}
                <div className="w-full bg-gradient-to-br from-white to-gray-50 p-10 rounded-2xl shadow-2xl border-2 border-gray-200">
                    {/* Título del punto seleccionado */}
                    {puntoSeleccionado ? (
                        <div className="mb-6 p-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-extrabold text-white text-center flex items-center justify-center gap-3">
                                <span className="text-3xl">📍</span>
                                {puntoSeleccionado}
                            </h3>
                        </div>
                    ) : (
                        <div className="mb-6 p-5 bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-extrabold text-white text-center flex items-center justify-center gap-3">
                                <span className="text-3xl">📅</span>
                                Selecciona un punto de venta
                            </h3>
                        </div>
                    )}

                        <div className="flex items-center justify-between mb-6">
                            <button
                                type="button"
                                onClick={() => cambiarMes(-1)}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                            >
                                ← Anterior
                            </button>
                            <h3 className="text-2xl font-extrabold capitalize text-gray-800 tracking-wide">
                                {nombreMes}
                            </h3>
                            <button
                                type="button"
                                onClick={() => cambiarMes(1)}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                            >
                                Siguiente →
                            </button>
                        </div>

                {/* Días de la semana */}
                <div className="grid grid-cols-7 gap-3 mb-3">
                    {diasSemana.map(dia => (
                        <div key={dia} className="text-center font-extrabold text-gray-700 text-base py-3 bg-gradient-to-b from-gray-100 to-gray-50 rounded-lg shadow-sm">
                            {dia}
                        </div>
                    ))}
                </div>

                {/* Días del mes */}
                <div className="grid grid-cols-7 gap-3">
                    {Array.from({ length: espaciosVacios }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-14"></div>
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
                                className={`h-14 rounded-lg font-bold text-lg transition-all duration-200 transform ${
                                    seleccionadoEnPuntoActual
                                        ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-xl scale-110 border-2 border-green-700 hover:from-green-500 hover:to-green-700'
                                        : seleccionadoEnOtroPunto
                                        ? 'bg-gradient-to-br from-purple-300 to-purple-400 text-white shadow-lg border-2 border-purple-500 hover:from-purple-400 hover:to-purple-500'
                                        : esHoy
                                        ? 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-900 border-2 border-blue-400 shadow-md hover:from-blue-200 hover:to-blue-300 hover:scale-105'
                                        : 'bg-gradient-to-br from-white to-gray-50 text-gray-800 border-2 border-gray-200 shadow-sm hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 hover:scale-105 hover:shadow-md'
                                }`}
                            >
                                {dia.getDate()}
                            </button>
                        );
                    })}
                </div>

                        {/* Leyenda de colores */}
                        <div className="mt-6 p-5 bg-gray-50 rounded-xl border-2 border-gray-200">
                            <p className="font-bold text-gray-700 mb-3 text-base">Leyenda:</p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-green-400 to-green-600 border-2 border-green-700"></div>
                                    <span className="text-sm">Punto actual</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-300 to-purple-400 border-2 border-purple-500"></div>
                                    <span className="text-sm">Otros puntos</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-400"></div>
                                    <span className="text-sm">Hoy</span>
                                </div>
                            </div>
                        </div>

                        {/* Días seleccionados del punto actual */}
                        {diasSeleccionados.length > 0 && (
                            <div className="mt-4 p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300 shadow-md">
                                <p className="font-extrabold text-green-800 mb-3 text-lg flex items-center gap-2">
                                    <span className="text-2xl">✓</span>
                                    Días seleccionados para {puntoSeleccionado} ({diasSeleccionados.length})
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {diasSeleccionados.map(fecha => (
                                        <span key={fecha} className="px-4 py-2 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full text-base font-bold shadow-lg hover:scale-110 transition-transform">
                                            {new Date(fecha + 'T00:00:00').getDate()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    {/* Botones de guardar */}
                    <div className="mt-8 flex justify-center gap-4">
                        <button
                            onClick={handleSubmit}
                            disabled={!puntoSeleccionado || diasSeleccionados.length === 0}
                            className={`px-6 py-3 rounded-xl font-bold text-base shadow-xl transition-all transform ${
                                puntoSeleccionado && diasSeleccionados.length > 0
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:scale-105 hover:shadow-2xl cursor-pointer'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            💾 Guardar Punto Actual ({diasSeleccionados.length})
                        </button>

                        <button
                            onClick={handleSubmitTodos}
                            disabled={Object.keys(diasPorPunto).length === 0}
                            className={`px-6 py-3 rounded-xl font-bold text-base shadow-xl transition-all transform ${
                                Object.keys(diasPorPunto).length > 0
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:scale-105 hover:shadow-2xl cursor-pointer'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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

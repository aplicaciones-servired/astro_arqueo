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
    const [diasSeleccionados, setDiasSeleccionados] = useState<string[]>([]);
    const [searchPunto, setSearchPunto] = useState("");

    const seleccionarPunto = (punto: string) => {
        setPuntoSeleccionado(punto);
        setDiasSeleccionados([]);
    };

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
        setDiasSeleccionados(prev => 
            prev.includes(fecha) 
                ? prev.filter(d => d !== fecha)
                : [...prev, fecha].sort()
        );
    };

    const cambiarMes = (direccion: number) => {
        setMesActual(prev => {
            const nuevo = new Date(prev);
            nuevo.setMonth(nuevo.getMonth() + direccion);
            return nuevo;
        });
        setDiasSeleccionados([]);
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
            setPuntoSeleccionado("");
            setDiasSeleccionados([]);
        }
    };

    const { dias, primerDia } = obtenerDiasDelMes(mesActual);
    const nombreMes = mesActual.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const espaciosVacios = primerDia.getDay();

    return (
        <div className="flex flex-col gap-4 p-4">
            {/* Selectores superiores */}
            <div className="flex gap-4 justify-center mb-4">
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
            <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
                
                {/* Lista de Puntos de Venta */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Puntos de Venta</h3>
                    
                    {/* Buscador */}
                    <input
                        type="text"
                        placeholder="Buscar punto..."
                        value={searchPunto}
                        onChange={(e) => setSearchPunto(e.target.value)}
                        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Lista scrollable */}
                    <div className="max-h-[600px] overflow-y-auto space-y-1">
                        {puntosFiltrados.map((punto) => (
                            <button
                                key={punto}
                                type="button"
                                onClick={() => seleccionarPunto(punto)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                    puntoSeleccionado === punto
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-50 text-gray-700 hover:bg-blue-100'
                                }`}
                            >
                                {punto}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Calendario */}
                {puntoSeleccionado ? (
                    <div className="w-full bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-2xl border-2 border-gray-200">
                        {/* Título del punto seleccionado */}
                        <div className="mb-6 p-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-extrabold text-white text-center flex items-center justify-center gap-3">
                                <span className="text-3xl">📍</span>
                                {puntoSeleccionado}
                            </h3>
                        </div>

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
                        <div key={`empty-${i}`} className="h-16"></div>
                    ))}
                    {dias.map(dia => {
                        const fechaStr = dia.toISOString().split('T')[0];
                        const seleccionado = diasSeleccionados.includes(fechaStr);
                        const esHoy = new Date().toISOString().split('T')[0] === fechaStr;
                        return (
                            <button
                                key={fechaStr}
                                type="button"
                                onClick={() => toggleDia(fechaStr)}
                                className={`h-16 rounded-xl font-bold text-lg transition-all duration-200 transform ${
                                    seleccionado
                                        ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-xl scale-110 border-2 border-green-700 hover:from-green-500 hover:to-green-700'
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

                        {/* Días seleccionados */}
                        {diasSeleccionados.length > 0 && (
                            <div className="mt-6 p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300 shadow-md">
                                <p className="font-extrabold text-green-800 mb-3 text-lg flex items-center gap-2">
                                    <span className="text-2xl">✓</span>
                                    Días seleccionados ({diasSeleccionados.length})
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

                        {/* Botón de guardar */}
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={handleSubmit}
                                disabled={diasSeleccionados.length === 0}
                                className={`px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all transform ${
                                    diasSeleccionados.length > 0
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:scale-105 hover:shadow-2xl cursor-pointer'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                💾 Guardar Cronogramas ({diasSeleccionados.length})
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 shadow-inner">
                        <div className="text-center p-8">
                            <p className="text-gray-400 text-6xl mb-4">📅</p>
                            <p className="text-gray-600 text-xl font-semibold">
                                Selecciona un punto de venta
                            </p>
                            <p className="text-gray-500 text-base mt-2">
                                ← Usa la lista de la izquierda
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

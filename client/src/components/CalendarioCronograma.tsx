import { useState } from "react";
import { useSucursales } from "@/Services/Sucursales";
import { useCalendarioCronogramas } from "@/Services/CalendarioCrono";
import { updateCronograma } from "@/Services/UpdateCronograma";
import { useEmpresa } from "./ui/useEmpresa";
import type { Cronograma } from "@/types/cronograma";
import { meses } from "@/utils/constans";

export const CalendarioCronograma = () => {
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [año, setAño] = useState(new Date().getFullYear());
  const { data: sucursales } = useSucursales();
  const { data: cronogramas, loading } = useCalendarioCronogramas();
  const { empresa } = useEmpresa();
  
  // Estado para el modal de edición
  const [modalAbierto, setModalAbierto] = useState(false);
  const [cronogramaSeleccionado, setCronogramaSeleccionado] = useState<Cronograma | null>(null);
  const [nuevoEstado, setNuevoEstado] = useState<string>("");
  const [nuevaFecha, setNuevaFecha] = useState<string>("");
  const [guardando, setGuardando] = useState(false);

  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const diasEnMes = new Date(año, mes, 0).getDate();

  // Crear array de días con información
  const dias = Array.from({ length: diasEnMes }, (_, i) => {
    const fecha = new Date(año, mes - 1, i + 1);
    const diaSemana = diasSemana[fecha.getDay()];
    return {
      numero: i + 1,
      diaSemana,
      fecha
    };
  });

  // Filtrar cronogramas por mes y año
  const cronogramasFiltrados = cronogramas.filter(c => {
    const fechaStr = c.dia.split('T')[0];
    const [añoStr, mesStr] = fechaStr.split('-');
    const añoRegistro = parseInt(añoStr);
    const mesRegistro = parseInt(mesStr);
    return mesRegistro === mes && añoRegistro === año;
  });

  // Obtener cronograma de un día específico para un punto
  const getCronogramaDia = (nombrePunto: string, numeroDia: number): Cronograma | null => {
    const fechaBuscada = `${año}-${String(mes).padStart(2, '0')}-${String(numeroDia).padStart(2, '0')}`;
    
    const cronograma = cronogramasFiltrados.find(c => {
      const fechaCrono = c.dia.split('T')[0];
      const nombreCrono = c.puntodeventa?.toUpperCase().trim();
      const nombreSucursal = nombrePunto?.toUpperCase().trim();
      
      return fechaCrono === fechaBuscada && nombreCrono === nombreSucursal;
    });

    return cronograma || null;
  };

  // Abrir modal de edición
  const handleClickCelda = (cronograma: Cronograma | null) => {
    if (cronograma) {
      setCronogramaSeleccionado(cronograma);
      setNuevoEstado(cronograma.estado || "En Espera");
      // Formatear fecha para input type="date" (YYYY-MM-DD)
      const fechaFormateada = cronograma.dia.split('T')[0];
      setNuevaFecha(fechaFormateada);
      setModalAbierto(true);
    }
  };

  // Guardar cambios del cronograma
  const handleGuardar = async () => {
    if (!cronogramaSeleccionado || !empresa) return;

    setGuardando(true);
    const success = await updateCronograma({
      id: String(cronogramaSeleccionado.id),
      estado: nuevoEstado,
      fecha: nuevaFecha,
      nota: cronogramaSeleccionado.nota,
      zona: empresa,
    });

    setGuardando(false);
    if (success) {
      setModalAbierto(false);
      // Recargar página para actualizar datos
      window.location.reload();
    }
  };

  // Obtener color según estado (usando estilos inline para garantizar aplicación)
  const getColorEstado = (estado: string | null) => {
    if (!estado) return null;
    
    const estadoLower = estado.toLowerCase().trim();
    
    // Rojo - Cerrado
    if (estadoLower === 'cerrado' || estadoLower === 'cerrada' || estadoLower.includes('cerrado')) {
      return { backgroundColor: '#dc2626', color: '#ffffff' }; // red-600
    }
    
    // Verde - Realizado
    if (estadoLower === 'realizado' || estadoLower.includes('realizado')) {
      return { backgroundColor: '#16a34a', color: '#ffffff' }; // green-600
    }
    
    // Azul - En Espera (por defecto)
    return { backgroundColor: '#3b82f6', color: '#ffffff' }; // blue-500
  };


  const años = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

  return (
    <div className="w-full mx-auto">
      {/* Controles de mes y año */}
      <div className="mb-4 flex gap-3 items-center bg-white p-3 rounded-lg shadow-md">
        <div>
          <label className="block text-xs font-semibold mb-1 text-gray-700">Mes:</label>
          <select
            value={mes}
            onChange={(e) => setMes(Number(e.target.value))}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {meses.map((m) => (
              <option key={m.valor} value={m.valor}>
                {m.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-gray-700">Año:</label>
          <select
            value={año}
            onChange={(e) => setAño(Number(e.target.value))}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {años.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto">
          <div className="text-xs text-gray-600">
            <strong>Total cronogramas:</strong> {cronogramasFiltrados.length}
          </div>
        </div>
      </div>

      {/* Leyenda */}
      <div className="mb-3 bg-white p-3 rounded-lg shadow-md">
        <h3 className="font-bold text-xs mb-2 text-gray-700">Leyenda:</h3>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-500 rounded border border-gray-300"></div>
            <span>En Espera</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-600 rounded border border-gray-300"></div>
            <span>Realizado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-600 rounded border border-gray-300"></div>
            <span>Cerrado</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto overflow-y-auto" style={{ maxHeight: '75vh' }}>
          <table className="w-full border-collapse" style={{ fontSize: '12px' }}>
            <thead className="sticky top-0 z-30">
              {/* Fila de días de la semana */}
              <tr style={{ backgroundColor: '#1e3a8a' }}>
                <th className="sticky left-0 z-40 px-2 py-2 text-left font-bold border whitespace-nowrap" style={{ minWidth: '180px', maxWidth: '180px', fontSize: '12px', backgroundColor: '#1e3a8a', color: '#ffffff', borderColor: '#1e40af' }}>
                  PUNTO DE VENTA
                </th>
                <th className="px-2 py-2 text-center font-bold border whitespace-nowrap" style={{ minWidth: '60px', maxWidth: '60px', fontSize: '12px', backgroundColor: '#1e3a8a', color: '#ffffff', borderColor: '#1e40af' }}>
                  TOTAL
                </th>
                {dias.map((dia) => (
                  <th
                    key={`semana-${dia.numero}`}
                    className="px-1 py-2 text-center font-bold border"
                    style={{ minWidth: '35px', maxWidth: '35px', fontSize: '12px', backgroundColor: '#1e3a8a', color: '#ffffff', borderColor: '#1e40af' }}
                  >
                    {dia.diaSemana[0]}
                  </th>
                ))}
              </tr>
              {/* Fila de números de día */}
              <tr style={{ backgroundColor: '#1e3a8a' }}>
                <th className="sticky left-0 z-40 border" style={{ backgroundColor: '#1e3a8a', borderColor: '#1e40af' }}></th>
                <th className="border" style={{ backgroundColor: '#1e3a8a', borderColor: '#1e40af' }}></th>
                {dias.map((dia) => (
                  <th
                    key={`num-${dia.numero}`}
                    className="px-1 py-2 text-center font-bold border"
                    style={{ minWidth: '35px', maxWidth: '35px', fontSize: '13px', backgroundColor: '#1e3a8a', color: '#ffffff', borderColor: '#1e40af' }}
                  >
                    {dia.numero}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sucursales.length === 0 ? (
                <tr>
                  <td colSpan={diasEnMes + 2} className="text-center py-8 text-gray-500">
                    No hay sucursales disponibles
                  </td>
                </tr>
              ) : (
                sucursales.map((sucursal) => {
                  const cronogramasSucursal = cronogramasFiltrados.filter(
                    c => c.puntodeventa?.toUpperCase().trim() === sucursal.NOMBRE?.toUpperCase().trim()
                  );
                  const totalArqueos = cronogramasSucursal.length;

                  return (
                    <tr key={sucursal.CODIGO} className="hover:bg-gray-50 transition-colors">
                      <td className="sticky left-0 z-20 bg-white px-2 py-2 border border-gray-300 font-medium text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis" style={{ minWidth: '180px', maxWidth: '180px', fontSize: '11px' }}>
                        {sucursal.NOMBRE}
                      </td>
                      <td className="px-2 py-2 text-center border border-gray-300 font-bold text-blue-700" style={{ minWidth: '60px', maxWidth: '60px', fontSize: '12px' }}>
                        {totalArqueos}
                      </td>
                      {dias.map((dia) => {
                        const cronograma = getCronogramaDia(sucursal.NOMBRE ?? '', dia.numero);
                        const colorStyle = getColorEstado(cronograma?.estado || null);
                        
                        return (
                          <td
                            key={`${sucursal.CODIGO}-${dia.numero}`}
                            className="border border-gray-300 text-center p-0 cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ 
                              minWidth: '35px', 
                              maxWidth: '35px', 
                              height: '34px',
                              ...(colorStyle || { backgroundColor: '#f3f4f6' })
                            }}
                            onClick={() => handleClickCelda(cronograma)}
                            title={cronograma ? `${cronograma.estado} - Click para editar` : 'Sin cronograma'}
                          >
                            {cronograma && (
                              <div className="flex items-center justify-center w-full h-full">
                                <span style={{ fontSize: '14px', fontWeight: '900' }}>1</span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de edición */}
      {modalAbierto && cronogramaSeleccionado && (
        <div className="fixed inset-0 bg-sky-50 flex items-center justify-center z-50" onClick={() => setModalAbierto(false)}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Editar Cronograma</h2>
              <button 
                onClick={() => setModalAbierto(false)}
                className="cursor-pointer text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Punto de Venta:</label>
                <p className="text-gray-900 bg-gray-100 px-3 py-2 rounded">{cronogramaSeleccionado.puntodeventa}</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha:</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={nuevaFecha}
                  onChange={(e) => setNuevaFecha(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Estado Actual:</label>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded"
                    style={getColorEstado(cronogramaSeleccionado.estado) || { backgroundColor: '#f3f4f6' }}
                  ></div>
                  <p className="text-gray-900 font-medium">{cronogramaSeleccionado.estado}</p>
                </div>
              </div>
              
              {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Cambiar Estado:</label>
                <select 
                  className="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
                >
                  <option value="En Espera">En Espera</option>
                  <option value="Realizado">Realizado</option>
                  <option value="Cerrado">Cerrado</option>
                </select>
              </div> */}
            </div>
            
            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => setModalAbierto(false)}
                disabled={guardando}
                className="cursor-pointer flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold disabled:opacity-50"
              >
                Cancelar
              </button>
              <button 
                onClick={handleGuardar}
                disabled={guardando}
                className="cursor-pointer flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {guardando ? (
                  <>
                    <div className="cursor-pointer animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Guardando...
                  </>
                ) : (
                  'Guardar'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

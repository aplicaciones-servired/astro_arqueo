import { useState } from "react";
import { useSucursales } from "@/Services/Sucursales";
import { useCalendarioCronogramas } from "@/Services/CalendarioCrono";

export const CalendarioCronograma = () => {
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [año, setAño] = useState(new Date().getFullYear());
  const { data: sucursales } = useSucursales();
  const { data: cronogramas, loading } = useCalendarioCronogramas();

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

  // Obtener estado de un día específico para un punto
  const getEstadoDia = (nombrePunto: string, numeroDia: number) => {
    const fechaBuscada = `${año}-${String(mes).padStart(2, '0')}-${String(numeroDia).padStart(2, '0')}`;
    
    const cronograma = cronogramasFiltrados.find(c => {
      const fechaCrono = c.dia.split('T')[0];
      const nombreCrono = c.puntodeventa?.toUpperCase().trim();
      const nombreSucursal = nombrePunto?.toUpperCase().trim();
      
      return fechaCrono === fechaBuscada && nombreCrono === nombreSucursal;
    });

    return cronograma?.estado || null;
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

  const meses = [
    { valor: 1, nombre: "Enero" },
    { valor: 2, nombre: "Febrero" },
    { valor: 3, nombre: "Marzo" },
    { valor: 4, nombre: "Abril" },
    { valor: 5, nombre: "Mayo" },
    { valor: 6, nombre: "Junio" },
    { valor: 7, nombre: "Julio" },
    { valor: 8, nombre: "Agosto" },
    { valor: 9, nombre: "Septiembre" },
    { valor: 10, nombre: "Octubre" },
    { valor: 11, nombre: "Noviembre" },
    { valor: 12, nombre: "Diciembre" },
  ];

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
                        const estado = getEstadoDia(sucursal.NOMBRE ?? '', dia.numero);
                        const colorStyle = getColorEstado(estado);
                        
                        return (
                          <td
                            key={`${sucursal.CODIGO}-${dia.numero}`}
                            className="border border-gray-300 text-center p-0"
                            style={{ 
                              minWidth: '35px', 
                              maxWidth: '35px', 
                              height: '34px',
                              ...(colorStyle || { backgroundColor: '#f3f4f6' }) // gray-100 por defecto
                            }}
                          >
                            {estado && (
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
    </div>
  );
};

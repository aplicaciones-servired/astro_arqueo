import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { toast } from 'sonner';
import { exportarAExcel } from '../ui/Export';
import Button from '../ui/Button';
export const Exportcom = ({ data, tipo }) => {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const exportarRegistros = () => {
        if (!fechaInicio || !fechaFin) {
            toast.warning('Fechas de inicio y fin deben ser seleccionadas', { duration: 1000 });
            return;
        }
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        if (inicio > fin) {
            toast.error('La fecha de inicio no puede ser mayor a la fecha fin');
            return;
        }
        // 🧠 Aquí diferenciamos el campo de fecha según el tipo
        const registrosFiltrados = data.filter((item) => {
            const fecha = tipo === 'arqueo'
                ? new Date(item.fechavisita)
                : new Date(item.dia); // si Cronograma usa 'dia'
            return fecha >= inicio && fecha <= fin;
        });
        if (registrosFiltrados.length > 0) {
            toast.success(`Se exportarán ${registrosFiltrados.length} registros`);
            if (tipo === 'arqueo') {
                exportarAExcel({
                    registros: registrosFiltrados,
                    nombreArchivo: 'Arqueos',
                });
            }
            else {
                exportarAExcel({
                    registros: registrosFiltrados,
                    nombreArchivo: 'Cronogramas',
                });
            }
        }
        else {
            toast.info('No hay registros para exportar en el rango de fechas seleccionado');
        }
    };
    return (_jsx("section", { className: "container px-4", children: _jsxs("div", { className: "mb-6 p-4 bg-white border border-indigo-200 rounded-lg shadow-lg shadow-blue-300/50", children: [_jsxs("h3", { className: "text-lg font-medium text-gray-700 mb-4", children: ["Exportar ", tipo === 'arqueo' ? 'Arqueos' : 'Cronogramas'] }), _jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [_jsx("div", { className: "flex-1", children: _jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["Fecha Inicio", _jsx("input", { type: "date", value: fechaInicio, onChange: (e) => setFechaInicio(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" })] }) }), _jsx("div", { className: "flex-1", children: _jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["Fecha Fin", _jsx("input", { type: "date", value: fechaFin, onChange: (e) => setFechaFin(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" })] }) }), _jsx("div", { className: "flex items-end", children: _jsx(Button, { onClick: exportarRegistros, children: "Exportar" }) })] })] }) }));
};

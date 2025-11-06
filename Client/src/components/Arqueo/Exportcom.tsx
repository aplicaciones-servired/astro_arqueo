import * as XLSX from 'xlsx';

import { useState } from 'react';
import { toast } from 'sonner';
import type { Arqueos } from '@/types/arqueo';
import { exportarAExcel } from '../ui/Export';


interface PropsExport {
    data: Arqueos[];
}

export const Exportcom = ({ data }: PropsExport) => {

    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')

    const exportarRegistros = (): void => {
        if (!fechaInicio || !fechaFin) {
            toast.warning('Fechas de inicio y fin deben ser seleccionadas', { duration: 1000 })
            return
        }

        const inicio = new Date(fechaInicio)
        const fin = new Date(fechaFin)

        if (inicio > fin) {
            toast.error('La fecha de inicio no puede ser mayor a la fecha fin')
            return
        }

        const registrosFiltrados = data.filter(item => {

            const fechaArqueo = new Date(item.fechavisita)
            return fechaArqueo >= inicio && fechaArqueo <= fin
        })

        if (registrosFiltrados.length > 0) {
            toast.success(`Se exportarán ${registrosFiltrados.length} registros`)
            exportarAExcel({ registros: registrosFiltrados })
        } else {
            toast.info('No hay registros para exportar en el rango de fechas seleccionado')
        }
    }

    return (
        <section className="container px-4">
            <div className="mb-6 p-4 bg-white border border-indigo-200 rounded-lg shadow-lg shadow-blue-300/50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Exportar Registros</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Inicio
                            <input
                                type="date"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </label>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Fin
                            <input
                                type="date"
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </label>
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={exportarRegistros}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Exportar
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )

};

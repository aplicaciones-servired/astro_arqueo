import { type JSX } from 'react'
import getFormattedDate from '../ui/getFormattedDate'

import type { Arqueos } from '@/types/arqueo';
import { useFilterPro } from '@/hooks/SeguiminetoFilters';

interface PropsFooter {
    datos: Arqueos[];
}

const TableSeguimiento = ({ datos }: PropsFooter): JSX.Element => {
    const { filteredPDV } = useFilterPro(datos)
    return (
        <>
            <div className="flex flex-col mt-6  border-indigo-200 shadow-lg shadow-blue-300/50">
                <h1 className='text-center font-bold'>Arqueo realizados Hoy</h1>
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 rounded-lg">
                            <table className="min-w-full divide-y shadow-lg shadow-blue-300/50 divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3.5 px-4 text-sm font-semibold text-left text-gray-900">Realizado por</th>
                                        <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">Nombres</th>
                                        <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">Punto de Venta</th>
                                        <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">Fecha Visita</th>
                                        <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">Fecha hora</th>
                                    </tr>
                                </thead>
                                <tbody className="cursor-pointer bg-white divide-y divide-gray-200 hover:border-gray-300 hover:shadow-sm w-52">
                                    {filteredPDV.map((pdv, index) => (
                                        <tr key={index} className=" transition-colors hover:bg-blue-100">
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{pdv.supervisor}</td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{pdv.nombres}</td>
                                            <td className="px-4 py-4 text-sm text-gray-700">{pdv.puntodeventa}</td>
                                            <td className="px-4 py-4 text-sm text-gray-700">{getFormattedDate(pdv.fechavisita)}</td>
                                            <td className="px-4 py-4 text-sm text-gray-700">{pdv.horavisita}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableSeguimiento

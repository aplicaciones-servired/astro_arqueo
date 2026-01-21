import { useEffect, useState } from "react";
import getFormattedDate from "../ui/getFormattedDate";
import type { Cronograma } from "@/types/cronograma";
import CronoDialogs from "./DalogCrono";
import { useFilterCron } from "@/hooks/filtersCron";
import { toast } from "sonner";

interface PropsFooter {
    datos: Cronograma[];
    searchFecha: string;
    searchPDV: string;
    onSearchFechaChange: (fecha: string) => void;
    onSearchPDVChange: (pdv: string) => void;
}

export const TableCronograma = ({ datos, searchFecha, searchPDV, onSearchFechaChange, onSearchPDVChange }: PropsFooter) => {

    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Cronograma | null>(null);

    useEffect(() => {
        if (datos.length === 0 && (searchFecha || searchPDV)) {
            if (searchFecha && searchPDV) {
                toast.warning("No se encontraron arqueos para la fecha y punto de venta seleccionados", { duration: 2000 });
            } else if (searchFecha) {
                toast.warning("No se encontraron arqueos para la fecha seleccionada", { duration: 2000 });
            } else if (searchPDV) {
                toast.warning("No se encontraron arqueos para el punto de venta seleccionado", { duration: 2000 });
            }
        }
    }, [searchFecha, searchPDV, datos.length]);

    
    return (
        <div>
            <div className="mt-6 md:flex md:items-center md:justify-between">
                <div className="relative flex items-center mt-4 md:mt-0">
                    <input
                        type="date"
                        placeholder="Buscar punto de venta"
                        className="block text-center w-full py-1.5 pr-5 border-indigo-200 shadow-lg shadow-blue-300/50  text-gray-700 bg-white border rounded-lg md:w-80 placeholder-gray-400 pl-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={(e) => onSearchFechaChange(e.target.value)}
                        value={searchFecha}
                    />
                    {searchFecha && (
                        <button
                            onClick={() => onSearchFechaChange('')}
                            className="px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Limpiar filtro de fecha"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className="relative flex items-center mt-4 md:mt-0">
                    <span className="absolute">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 mx-3 text-gray-400"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar punto de venta"
                        className="block text-center w-full py-1.5 pr-5 border border-indigo-200 rounded-md shadow-lg shadow-blue-300/50  text-gray-700 bg-white borderounded-lg md:w-80 placeholder-gray-400 pl-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={(e) => onSearchPDVChange(e.target.value)}
                        value={searchPDV}
                    />
                    {searchPDV && (
                        <button
                            onClick={() => onSearchPDVChange('')}
                            className="px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Limpiar filtro de punto de venta"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>
            {/* Tabla */}
            <div className="flex flex-col mt-6  border-indigo-200 shadow-lg shadow-blue-300/50">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 rounded-lg">
                            <table className="min-w-full divide-y shadow-lg shadow-blue-300/50 divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3.5 px-4 text-sm font-semibold text-left text-gray-900">Punto De Venta</th>
                                        <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">Empresa</th>
                                        <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">Tipo</th>
                                        <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">Estado</th>
                                        <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">Fecha Visita</th>
                                    </tr>
                                </thead>
                                <tbody className="cursor-pointer bg-white divide-y divide-gray-200 hover:border-gray-300 hover:shadow-sm w-52">
                                    {datos.map((pdv, index) => (
                                        <tr key={index} className=" transition-colors hover:bg-blue-100" onClick={() => {
                                            setOpen(true);
                                            setSelectedItem(pdv)
                                        }}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{pdv.puntodeventa}</td>
                                            <td className="px-4 py-4 text-sm text-gray-700">{pdv.empresa}</td>
                                            <td className="px-4 py-4 text-sm text-gray-700">{pdv.nota}</td>
                                            <td
                                                className={`px-4 py-4 text-sm ${pdv.estado === "Cerrado"
                                                    ? "text-red-500"
                                                    : pdv.estado === "En Espera"
                                                        ? "text-blue-700"
                                                        : pdv.estado === "Realizado"
                                                            ? "text-green-500"
                                                            : "text-gray-500"
                                                    }`}
                                            >
                                                {pdv.estado}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-700">{getFormattedDate(pdv.dia)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {open && (
                <CronoDialogs open={open} handleClose={() => setOpen(false)} id={selectedItem?.id} />
            )}
        </div>
    )
}
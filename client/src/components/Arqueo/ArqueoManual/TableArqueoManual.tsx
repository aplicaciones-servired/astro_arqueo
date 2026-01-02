import { useEffect, useState } from "react";
import getFormattedDate from "../../ui/getFormattedDate";
import { ArqueoManual } from "@/types/arqueomanual";
import { useFiltersManual } from "@/hooks/useFiltersManual";

interface PropsFooter {
    datos: ArqueoManual[];
    fecha: string;
    setFecha: (value: string) => void;
    PDV: string;
    setPDV: (value: string) => void;
}

const TableArqueoManual = ({
    datos,
    fecha,
    setFecha,
    PDV,
    setPDV,
}: PropsFooter) => {
    const { filteredPDV, searchPDV, setSearchPDV, searchfecha, setSearchFecha } =
        useFiltersManual(datos);

    useEffect(() => {
        setFecha(searchfecha);
        setPDV(searchPDV);
    }, [searchfecha, searchPDV, setFecha, setPDV, filteredPDV]);

    return (
        <div>
            {/* Buscador */}
            <div className="mt-6 md:flex md:items-center md:justify-between">
                <div className="relative flex items-center mt-4 md:mt-0">
                    <input
                        type="date"
                        placeholder="Buscar punto de venta"
                        className="block text-center w-full py-1.5 pr-5 border-indigo-200 shadow-lg shadow-blue-300/50  text-gray-700 bg-white border rounded-lg md:w-80 placeholder-gray-400 pl-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={(e) => setSearchFecha(e.target.value)}
                        value={searchfecha}
                    />
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
                        onChange={(e) => setSearchPDV(e.target.value)}
                        value={searchPDV}
                    />{" "}
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
                                        <th className="py-3.5 px-4 text-sm font-semibold text-left text-gray-900">
                                            Punto de Venta
                                        </th>
                                        <th className="py-3.5 px-4 text-sm font-semibold text-left text-gray-900">
                                            Nombre Responsable
                                        </th>
                                        <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                                            Documento Resposable
                                        </th>
                                        <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                                            Fecha
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="cursor-pointer bg-white divide-y divide-gray-200 hover:border-gray-300 hover:shadow-sm w-52">
                                    {filteredPDV.map((pdv, index) => (
                                        <tr
                                            key={index}
                                            className=" transition-colors hover:bg-blue-100"
                                        >
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900">
                                                {pdv.puntodeventa}
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900">
                                                {pdv.nombre}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-900">
                                                {pdv.documento}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-900">
                                                {getFormattedDate(pdv.fecha)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { TableArqueoManual };

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
    
    const [selectedArqueo, setSelectedArqueo] = useState<ArqueoManual | null>(null);

    useEffect(() => {
        setFecha(searchfecha);
        setPDV(searchPDV);
    }, [searchfecha, searchPDV, setFecha, setPDV, filteredPDV]);

    return (
        <div>
            {/* Modal de detalles */}
            {selectedArqueo && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-conic-330 from-gray-100 via-white to-gray-100 bg-opacity-50 p-4"
                    onClick={() => setSelectedArqueo(null)}
                >
                    <div 
                        className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center rounded-t-lg">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Detalles del Arqueo Manual
                            </h3>
                            <button
                                onClick={() => setSelectedArqueo(null)}
                                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="p-6 bg-gray-50">
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Punto de Venta</label>
                                    <p className="text-base text-gray-900 font-semibold">{selectedArqueo.puntodeventa}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Nombre</label>
                                    <p className="text-base text-gray-900 font-semibold">{selectedArqueo.nombre}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Documento</label>
                                    <p className="text-base text-gray-900 font-semibold">{selectedArqueo.documento}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Base</label>
                                    <p className="text-base text-gray-900 font-semibold">{selectedArqueo.base}</p>
                                </div>
                                
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Fecha</label>
                                    <p className="text-base text-gray-900 font-semibold">{getFormattedDate(selectedArqueo.fecha)}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Venta Bruta</label>
                                    <p className="text-base text-green-600 font-semibold">${parseFloat(selectedArqueo.ventabruta).toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Total Ingreso</label>
                                    <p className="text-base text-green-600 font-semibold">${parseFloat(selectedArqueo.totalingreso).toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Efectivo</label>
                                    <p className="text-base text-blue-600 font-semibold">${parseFloat(selectedArqueo.efectivocajafuerte).toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Sobrante/Faltante</label>
                                    <p className="text-base text-orange-600 font-semibold">${parseFloat(selectedArqueo.sobrantefaltante).toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Valor</label>
                                    <p className="text-base text-gray-900 font-semibold">${parseFloat(selectedArqueo.valor).toLocaleString()}</p>
                                </div>
                            </div>
                            
                            {selectedArqueo.url_imagen ? (
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <label className="block text-sm font-medium text-gray-600 mb-4">
                                        {selectedArqueo.url_imagen.toLowerCase().endsWith('.pdf') ? 'Documento PDF' : 'Imagen del Arqueo'}
                                    </label>
                                    <div className="flex justify-center">
                                        {selectedArqueo.url_imagen.toLowerCase().endsWith('.pdf') ? (
                                            <div className="w-full">
                                                <div className="bg-gray-100 p-6 rounded-lg border-2 border-gray-300 mb-4">
                                                    <div className="flex items-center justify-center space-x-4">
                                                        <svg className="w-16 h-16 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M4 18h12V6h-4V2H4v16zm-2 1V0h12l4 4v16H2v-1z"/>
                                                            <text x="5" y="13" fontSize="6" fill="white" fontWeight="bold">PDF</text>
                                                        </svg>
                                                        <div>
                                                            <p className="text-lg font-semibold text-gray-900">Documento PDF</p>
                                                            <p className="text-sm text-gray-600">Haz clic en los botones para ver o descargar</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4 justify-center">
                                                    <a
                                                        href={selectedArqueo.url_imagen}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                                                    >
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                        Ver PDF
                                                    </a>
                                                    <a
                                                        href={selectedArqueo.url_imagen}
                                                        download
                                                        className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md"
                                                    >
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                        </svg>
                                                        Descargar
                                                    </a>
                                                </div>
                                                {/* Preview del PDF en iframe */}
                                                <div className="mt-6 border-2 border-gray-300 rounded-lg overflow-hidden">
                                                    <iframe
                                                        src={selectedArqueo.url_imagen}
                                                        className="w-full h-[600px]"
                                                        title="Vista previa PDF"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <img
                                                src={selectedArqueo.url_imagen}
                                                alt="Arqueo"
                                                className="max-w-full h-auto rounded-lg border-2 border-gray-300 shadow-lg"
                                                onError={(e) => {
                                                    console.error('Error cargando imagen:', selectedArqueo.url_imagen);
                                                    e.currentTarget.parentElement!.innerHTML = '<div class="text-red-500 text-center p-4 bg-red-50 rounded-lg">Error al cargar la imagen</div>';
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <div className="text-gray-400 text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                                        <svg className="w-16 h-16 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Sin imagen o documento adjunto
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
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
                                            Nombre
                                        </th>
                                        <th className="px-4 py-3.5 text-sm font-semibold text-left text-gray-900">
                                            Documento
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
                                            className="transition-colors hover:bg-blue-100"
                                            onClick={() => setSelectedArqueo(pdv)}
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

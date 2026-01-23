
import { useState } from "react";
import { useEmpresa } from "../ui/useEmpresa";
import { API_URL } from "@/utils/constans";
import { toast } from "sonner";
import axios from "axios";
import { Trash } from "lucide-react";

interface DeletCronogramaProps {
    id?: number;
    puntodeventa?: string;
    estado?: string;
    dia?: string;
}

export function DeletCronograma({ id, puntodeventa, estado, dia }: DeletCronogramaProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { empresa } = useEmpresa();

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${API_URL}/deletecronograma?id=${id}&zona=${empresa}`);
            toast.success(response.data.message, { duration: 2000 });
            if (response.status === 200) {
                window.location.reload();
                setIsOpen(false);
            }
        } catch (error) {
            error instanceof Error
                ? toast.error(error.message, { duration: 2000 })
                : toast.error("Error al eliminar el cronograma", { duration: 2000 });
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="flex text-white cursor-pointer rounded-2xl bg-red-600 box-border border border-transparent hover:bg-red-400 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                type="button"
            >
                <Trash size={20} strokeWidth={1.75} />
                Eliminar
            </button>
        );
    }

    return (
        <>

            <div className="fixed inset-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center w-full h-full bg-conic-330 from-gray-100 via-white to-gray-100 bg-clip-border bg-fixed bg-center bg-cover">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white border border-gray-200 rounded-lg shadow-lg p-4 md:p-6">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className=" cursor-pointer absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-9 h-9 inline-flex justify-center items-center"
                        >
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                            <span className="sr-only">Cerrar modal</span>
                        </button>
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3 className="mb-2 text-center text-lg font-bold text-gray-500">¿Estás seguro de que quieres eliminar este cronograma?</h3>
                        <div className="p-4 md:p-5 text-center">
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Punto de Venta</label>
                                    <p className="text-base text-gray-900 font-semibold">{puntodeventa}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Empresa</label>
                                    <p className="text-base text-gray-900 font-semibold">{empresa}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Estado</label>
                                    <p className="text-base text-gray-900 font-semibold">{estado}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Fecha</label>
                                    <p className="text-base text-gray-900 font-semibold">{dia}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 justify-center">
                                <button
                                    onClick={handleDelete}
                                    type="button"
                                    className="cursor-pointer text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                                >
                                    Sí, eliminar
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    type="button"
                                    className="cursor-pointer text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                                >
                                    No, cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
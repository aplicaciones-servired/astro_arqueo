import { useState } from "react";
import Button from "@/components/ui/Button";
import { ArqueoManualForm } from "@/Services/InsertArqueoMa";
import { useEmpresa } from "@/components/ui/useEmpresa";

export const InserArqueoManual = () => {
    const { empresa } = useEmpresa();
    const [form, setForm] = useState({
        puntodeventa: "",
        nombre: "",
        documento: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { puntodeventa, nombre, documento } = form;
        const ok = await ArqueoManualForm({
            puntodeventa,
            nombre,
            documento,
            empresa,
        });
        if (ok) {
            setForm({
                puntodeventa: "",
                nombre: "",
                documento: "",
            });
        };
    }

    return (
        <section className="container px-4 mt-5 ">
            <form onSubmit={handleSubmit}>
                <div className="mb-6 p-4 bg-white border border-indigo-200 rounded-lg shadow-lg shadow-blue-300/50">
                    <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">
                        Insertar Arqueo Manual
                    </h3>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Punto de Venta
                                <input
                                    name="puntodeventa"
                                    type="text"
                                    placeholder="Punto de Venta"
                                    value={form.puntodeventa}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </label>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre del Responsable
                                <input
                                    name="nombre"
                                    type="text"
                                    placeholder="Nombre del que realizo el arqueo"
                                    value={form.nombre}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </label>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Documento del Responsable
                                <input
                                    name="documento"
                                    type="text"
                                    placeholder="Documento del que realizo el arqueo"
                                    value={form.documento}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </label>
                        </div>

                        <div className="flex items-end">
                            <Button >Insertar Arqueo</Button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};

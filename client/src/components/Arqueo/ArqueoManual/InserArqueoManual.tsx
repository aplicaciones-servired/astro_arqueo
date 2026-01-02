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
        <section className=" flex items-center justify-center px-4 text-center">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-4 p-6 w-full max-w-md bg-white border border-indigo-200 rounded-lg shadow-lg shadow-blue-300/50"
            >
                <h3 className="text-lg font-medium text-gray-700 text-center">
                    Insertar Arqueo Manual
                </h3>

                <div className="w-full flex flex-col gap-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Punto de Venta
                        <input
                            name="puntodeventa"
                            type="text"
                            placeholder="ingresar punto de venta"
                            value={form.puntodeventa}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-700">
                        Nombre del Responsable
                        <input
                            name="nombre"
                            type="text"
                            placeholder="ingresar nombre del responsable"
                            value={form.nombre}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-700">
                        Documento del Responsable
                        <input
                            name="documento"
                            type="text"
                            placeholder="ingresar documento del responsable"
                            value={form.documento}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                </div>

                <Button>Insertar Arqueo</Button>
            </form>
        </section>
    );

};

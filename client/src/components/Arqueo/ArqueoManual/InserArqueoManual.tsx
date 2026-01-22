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
        ventabruta: "",
        totalingreso: "",
        efectivocajafuerte: "",
        sobrantefaltante: "",
        valor: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { puntodeventa, nombre, documento, ventabruta, totalingreso, efectivocajafuerte, sobrantefaltante, valor } = form;
        const ok = await ArqueoManualForm({
            puntodeventa,
            nombre,
            documento,
            ventabruta,
            totalingreso,
            efectivocajafuerte,
            sobrantefaltante,
            valor,
            empresa
        });
        if (ok) {
            setForm({
                puntodeventa: "",
                nombre: "",
                documento: "",
                ventabruta: "",
                totalingreso: "",
                efectivocajafuerte: "",
                sobrantefaltante: "",
                valor: ""
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

                    <label className="block text-sm font-medium text-gray-700">
                        Venta Bruta
                        <input
                            name="ventabruta"
                            type="number"
                            placeholder="ingresar venta bruta"
                            value={form.ventabruta}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-700">
                        Total Ingreso
                        <input
                            name="totalingreso"
                            type="number"
                            placeholder="ingresar total ingreso"
                            value={form.totalingreso}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-700">
                        Efectivo Caja Fuerte
                        <input
                            name="efectivocajafuerte"
                            type="number"
                            placeholder="ingresar efectivo caja fuerte"
                            value={form.efectivocajafuerte}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-700">
                        Sobrante/Faltante
                        <input
                            name="sobrantefaltante"
                            type="number"
                            placeholder="ingresar sobrante/faltante"
                            value={form.sobrantefaltante}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-700">
                        Valor
                        <input
                            name="valor"
                            type="number"
                            placeholder="ingresar valor"
                            value={form.valor}
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

import { useState } from "react";
import { empresas, tipos } from "@/utils/constans";
import { CronogramaSer } from "@/Services/CronogramaSer";

export default function CronogramaForm() {
    const [form, setForm] = useState({
        puntovdt: "",
        empresa: "",
        nota: "",
        fecha: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { puntovdt, empresa, nota, fecha } = form;
        const ok = await CronogramaSer({
            puntovdt,
            empresa,
            nota,
            fecha,
        });
        if (ok) {
            setForm({
                puntovdt: "",
                empresa: "",
                nota: "",
                fecha: "",
            });
        };
    }

        return (
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-6 gap-4">
                <div>
                    <label className="block text-center mt-2 uppercase">Punto de Venta:</label>
                    <input
                        name="puntovdt"
                        value={form.puntovdt}
                        onChange={handleChange}
                        className="px-2 py-1 w-64 h-12 text-center mt-2 rounded-lg border"
                        placeholder="Ingrese el punto de venta"
                    />
                </div>

                <div>
                    <label className="block text-center mt-2 uppercase">Elije una Empresa:</label>
                    <select
                        name="empresa"
                        value={form.empresa}
                        onChange={handleChange}
                        className="mt-2 w-64 h-12 text-center rounded-lg border"
                    >
                        <option value="">Seleccione una empresa</option>
                        {empresas.map((e) => (
                            <option key={e} value={e}>{e}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-center mt-2 uppercase">Motivo del Arqueo:</label>
                    <select
                        name="nota"
                        value={form.nota}
                        onChange={handleChange}
                        className="mt-2 w-64 h-12 text-center rounded-lg border"
                    >
                        <option value="">Seleccione un motivo</option>
                        {tipos.map((n) => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col items-center">
                    <label className="block text-center mt-2 uppercase">Fecha del Arqueo:</label>
                    <input
                        type="date"
                        name="fecha"
                        value={form.fecha}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>



                <button
                    type="submit"
                    className="cursor-pointer middle none center mr-3 rounded-lg bg-linear-to-tr from-blue-600 to-pink-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    Guardar Arqueo
                </button>
            </form>
        );
    }

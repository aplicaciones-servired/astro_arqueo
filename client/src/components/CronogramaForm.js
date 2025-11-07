import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { empresas, tipos } from "@/utils/constans";
import { CronogramaSer } from "@/Services/CronogramaSer";
import Button from "./ui/Button";
export default function CronogramaForm() {
    const [form, setForm] = useState({
        puntovdt: "",
        empresa: "",
        nota: "",
        fecha: "",
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
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
        }
        ;
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col items-center mt-6 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-center mt-2 uppercase", children: "Punto de Venta:" }), _jsx("input", { name: "puntovdt", value: form.puntovdt, onChange: handleChange, className: "px-2 py-1 w-64 h-12 text-center mt-2 rounded-lg border", placeholder: "Ingrese el punto de venta" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-center mt-2 uppercase", children: "Elije una Empresa:" }), _jsxs("select", { name: "empresa", value: form.empresa, onChange: handleChange, className: "mt-2 w-64 h-12 text-center rounded-lg border", children: [_jsx("option", { value: "", children: "Seleccione una empresa" }), empresas.map((e) => (_jsx("option", { value: e, children: e }, e)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-center mt-2 uppercase", children: "Motivo del Arqueo:" }), _jsxs("select", { name: "nota", value: form.nota, onChange: handleChange, className: "mt-2 w-64 h-12 text-center rounded-lg border", children: [_jsx("option", { value: "", children: "Seleccione un motivo" }), tipos.map((n) => (_jsx("option", { value: n, children: n }, n)))] })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("label", { className: "block text-center mt-2 uppercase", children: "Fecha del Arqueo:" }), _jsx("input", { type: "date", name: "fecha", value: form.fecha, onChange: handleChange, className: "block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" })] }), _jsx(Button, { children: "Guardar Arqueo" })] }));
}

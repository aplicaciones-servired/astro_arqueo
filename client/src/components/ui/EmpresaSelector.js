import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { empresas } from "../../utils/constans";
import { useEmpresa } from "./useEmpresa";
export default function EmpresaSelector() {
    const { empresa, setEmpresa } = useEmpresa();
    return (_jsxs("select", { id: "empresa", name: "empresa", value: empresa, onChange: (e) => setEmpresa(e.target.value), className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5", children: [_jsx("option", { value: "", children: "Cambiar de empresa" }), empresas.map((item) => (_jsx("option", { value: item, children: item }, item)))] }));
}

import { empresas } from "../../utils/constans";
import { useEmpresa } from "./useEmpresa";

export default function EmpresaSelector() {
  const { empresa, setEmpresa } = useEmpresa();

  return (
    <select
      id="empresa"
      name="empresa"
      value={empresa}
      onChange={(e) => setEmpresa(e.target.value)}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      <option value="">Cambiar de empresa</option>
      {empresas.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

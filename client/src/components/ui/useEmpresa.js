import { create } from "zustand";
import { empresas } from "../../utils/constans";
export const useEmpresa = create((set) => ({
    // 🔹 Inicia con el primer valor o vacío
    empresa: empresas[0] || "",
    setEmpresa: (empresa) => set({ empresa }),
}));

import { create } from "zustand";
import { empresas } from "../../utils/constans";

interface EmpresaState {
  empresa: string;
  setEmpresa: (empresa: string) => void;
}

export const useEmpresa = create<EmpresaState>((set) => ({
  // 🔹 Inicia con el primer valor o vacío
  empresa: "",
  setEmpresa: (empresa) => set({ empresa }),
}));

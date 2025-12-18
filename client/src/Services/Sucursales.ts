import { useEffect, useState } from "react";

import { toast } from "sonner";
import { useEmpresa } from "../components/ui/useEmpresa";
import axios from "axios";
import { API_URL } from "@/utils/constans";
import { Sucursal } from "@/types/sucursales";

export function useSucursales() {
  const [data, setData] = useState<Sucursal[]>([]);
  const { empresa } = useEmpresa();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.get(`${API_URL}/getsucursales/${empresa}`);
        setData(response.data.datos);
      } catch {
        toast.error("Error al cargar los datos", { duration: 1000 });
      }
    };

    void fetchData();
    const intervalId = setInterval(fetchData, 300000);
    return () => clearInterval(intervalId);
  }, [empresa]);

  return {
    data,
  };
}

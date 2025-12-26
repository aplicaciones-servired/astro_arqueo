import { useEffect, useState } from "react";

import { toast } from "sonner";
import { useEmpresa } from "../components/ui/useEmpresa";
import axios from "axios";
import { API_URL } from "@/utils/constans";
import { Sucursal } from "@/types/sucursales";

export function useSucursales(tipo ?: string) {
  const [data, setData] = useState<Sucursal[]>([]);
  const { empresa } = useEmpresa();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
        let url = `${API_URL}/getsucursales/${empresa}`;
        if (tipo) {
            url += `?tipo=${tipo}`;
        }
        const response = await axios.get(url);
        setData(response.data.datos);
    };

    void fetchData();
    const intervalId = setInterval(fetchData, 300000);
    return () => clearInterval(intervalId);
  }, [empresa, setData, tipo]);

  return {
    data,
  };
}

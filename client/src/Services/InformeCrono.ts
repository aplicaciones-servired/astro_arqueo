import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useEmpresa } from "../components/ui/useEmpresa";
import axios from "axios";
import type { Cronograma } from "@/types/cronograma";
import { API_URL } from "@/utils/constans";

interface CronoResponse {
  datos: Cronograma[];
  count: any;
  totalClients: number;
}

export function useCronoInforme(fechaInicio?: string, fechaFin?: string) {
  const [data, setData] = useState<Cronograma[]>([]);
  const [totalClients, setTotalClients] = useState();
  const { empresa } = useEmpresa();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        let url_cerrados = `${API_URL}/cronogramainforme?zona=${empresa}`;
        if (fechaInicio) {
          url_cerrados += `&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
        }

        const response = await axios.get<CronoResponse>(url_cerrados);

        if (response.status === 200) {
          setData(response.data.datos);
          console.log(response.data.datos);
          setTotalClients(response.data.count);
        }
      } catch {
        toast.error("Error al cargar los datos", { duration: 1000 });
      }
    };

    void fetchData();
    const intervalId = setInterval(fetchData, 300000);
    return () => clearInterval(intervalId);
  }, [empresa, fechaInicio, fechaFin]);

  return {
    data,
    totalClients,
  };
}

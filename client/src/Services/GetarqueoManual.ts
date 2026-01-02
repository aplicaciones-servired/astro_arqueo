import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useEmpresa } from "../components/ui/useEmpresa";
import axios from "axios";

import { API_URL } from "@/utils/constans";
import { ArqueoManual } from "@/types/arqueomanual";

interface ArqueoManualResponse {
  datos: ArqueoManual[];
  count: any;
  totalClients: number;
}

interface ArqueoManualPagi {
  totalClients: number;
}

export function useArqueoManual(fecha?: string, PDV?: string) {
  const [data, setData] = useState<ArqueoManual[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [state, setState] = useState<ArqueoManualPagi>({
    totalClients: 0,
  });
  const [totalClients, setTotalClients] = useState();
  const { empresa } = useEmpresa();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        let url = `${API_URL}/getarqueomanual?zona=${empresa}&page=${page}&pageSize=${pageSize}` ;
        if (fecha) {
          url += `&fecha=${fecha}`;
        }
        if (PDV) {
          url += `&puntodeventa=${PDV}`;
        }

        const response = await axios.get<ArqueoManualResponse>(url);

        if (response.status === 200) {
          setData(response.data.datos);
          setTotalClients(response.data.count);
          setState((prev) => ({
            ...prev,
            totalClients: response.data.count,
          }));
        }
      } catch {
        toast.error("Error al cargar los datos", { duration: 1000 });
      }
    };

    void fetchData();
    const intervalId = setInterval(fetchData, 300000);
    return () => clearInterval(intervalId);
  }, [page, pageSize, empresa, fecha, PDV, data]);

  const total = Math.ceil(state.totalClients / pageSize);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return {
    data,
    page,
    totalClients,
    handlePageChange,
    total,
  };
}

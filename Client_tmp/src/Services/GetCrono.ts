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

interface CronoPagi {
  totalClients: number;
}

export function useCrono() {
  const [data, setData] = useState<Cronograma[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [state, setState] = useState<CronoPagi>({
    totalClients: 0,
  });
  const [totalClients, setTotalClients] = useState();
  const { empresa } = useEmpresa();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        //const response = await axios.get<CronoResponse>(`http://localhost:3000/getcronograma?zona=${empresa}&page=${page}&pageSize=${pageSize}`);
        const response = await axios.get<CronoResponse>(`${API_URL}/getcronograma?zona=${empresa}&page=${page}&pageSize=${pageSize}`);

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
  }, [page, pageSize, empresa]);

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

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
  const [totalClients, setTotalClients] = useState<number>(0);
  const { empresa } = useEmpresa();

  // DEBUG
  useEffect(() => {
    console.log('API_URL from env:', import.meta.env.PUBLIC_URL_API);
    console.log('Full URL:', `${import.meta.env.PUBLIC_URL_API}/getcronograma?zona=${empresa}&page=${page}&pageSize=${pageSize}`);
  }, []);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const url = `${import.meta.env.PUBLIC_URL_API}/getcronograma?zona=${empresa}&page=${page}&pageSize=${pageSize}`;
        console.log('Making request to:', url);
        
        const response = await axios.get<CronoResponse>(url);

        if (response.status === 200) {
          setData(response.data.datos);
          setTotalClients(response.data.count);
          setState((prev) => ({
            ...prev,
            totalClients: response.data.count,
          }));
        }
      } catch (error) {
        console.error('Error details:', error);
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

  // Asegúrate de retornar todas estas propiedades
  return {
    data,
    page,
    totalClients,
    handlePageChange,
    total,
  };
}
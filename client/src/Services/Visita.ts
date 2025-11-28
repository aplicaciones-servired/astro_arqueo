import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useEmpresa } from "../components/ui/useEmpresa";
import axios from "axios";
import type { Visitas } from "@/types/visita";
import { API_URL } from "@/utils/constans";

interface CronoResponse {
  datos: Visitas[];
  count: any;
  totalClients: number;
}

interface VisitaPagi {
  totalClients: number;
}

export function useVisita(fecha_visita?: string) {
  const [data, setData] = useState<Visitas[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [state, setState] = useState<VisitaPagi>({
    totalClients: 0,
  });
  const [totalClients, setTotalClients] = useState();
  const { empresa } = useEmpresa();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        //const response = await axios.get<CronoResponse>(`http://localhost:3000/visita?zona=${empresa}&page=${page}&pageSize=${pageSize}`);
        let url_visita = `${API_URL}/visita?zona=${empresa}&page=${page}&pageSize=${pageSize}`;
        if (fecha_visita) {
          url_visita += `&fechavisita=${fecha_visita}`;
        }

        const response = await axios.get<CronoResponse>(url_visita);

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
  }, [page, pageSize, empresa, fecha_visita]);

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

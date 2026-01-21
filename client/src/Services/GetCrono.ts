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
  const [searchFecha, setSearchFecha] = useState("");
  const [searchPDV, setSearchPDV] = useState("");
  const { empresa } = useEmpresa();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        let url = `${API_URL}/getcronograma?zona=${empresa}&page=${page}&pageSize=${pageSize}`;
        
        // Agregar filtros a la URL si existen
        if (searchFecha) {
          url += `&fecha=${searchFecha}`;
        }
        if (searchPDV) {
          url += `&pdv=${encodeURIComponent(searchPDV)}`;
        }
        
        const response = await axios.get<CronoResponse>(url);

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
  }, [page, pageSize, empresa, searchFecha, searchPDV]);

  const total = Math.ceil(state.totalClients / pageSize);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleSearchFecha = useCallback((fecha: string) => {
    setSearchFecha(fecha);
    setPage(1); // Resetear a página 1 cuando se filtra
  }, []);

  const handleSearchPDV = useCallback((pdv: string) => {
    setSearchPDV(pdv);
    setPage(1); // Resetear a página 1 cuando se filtra
  }, []);

  return {
    data,
    page,
    totalClients,
    handlePageChange,
    total,
    searchFecha,
    searchPDV,
    handleSearchFecha,
    handleSearchPDV,
  };
}

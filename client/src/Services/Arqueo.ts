import { useCallback, useEffect, useState } from "react";
import type { Arqueos } from "../types/arqueo";
import { toast } from "sonner";
import { useEmpresa } from "../components/ui/useEmpresa";
import axios from "axios";
import { API_URL } from "@/utils/constans";

interface ArqueoResponse {
  datos: Arqueos[];
  count: any;
  totalClients: number;
}

interface ArqueoPagi {
  totalClients: number;
}

export function useArqueo() {
  const [data, setData] = useState<Arqueos[]>([]);
  const [dataSegui, setDataSegui] = useState<Arqueos[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [state, setState] = useState<ArqueoPagi>({
    totalClients: 0,
  });
  const [totalClients, setTotalClients] = useState();
  const { empresa } = useEmpresa();
  console.log("API_URL", API_URL);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const url = `${API_URL}/arqueo?zona=${empresa}&page=${page}&pageSize=${pageSize}`;
        console.log("🔍 Fetching from:", url); // 👈 AÑADE ESTO

        const response = await axios.get<ArqueoResponse>(url);
        console.log("✅ Response status:", response.status); // 👈 Y ESTO

        if (response.status === 200) {
          setData(response.data.datos);
          setDataSegui(response.data.datos);
          setTotalClients(response.data.count);
          setState((prev) => ({
            ...prev,
            totalClients: response.data.count,
          }));
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error); // 👈 Y ESTO
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
    dataSegui,
  };
}

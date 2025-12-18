import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useEmpresa } from "../components/ui/useEmpresa";
import axios from "axios";
import { API_URL } from "@/utils/constans";
import type { Cronograma } from "@/types/cronograma";

export function useCalendarioCronogramas() {
  const [data, setData] = useState<Cronograma[]>([]);
  const [loading, setLoading] = useState(false);
  const { empresa } = useEmpresa();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (!empresa) {
        setData([]);
        return;
      }
      
      setLoading(true);
      setData([]); // Limpiar datos anteriores antes de cargar nuevos
      
      try {
        const response = await axios.get(`${API_URL}/getcronograma`, {
          params: { 
            zona: empresa,
            page: 1,
            pageSize: 10000
          },
        });
        setData(response.data.datos || []);
      } catch (error) {
        console.error('Error al cargar cronogramas:', error);
        toast.error("Error al cargar cronogramas", { duration: 2000 });
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [empresa]);

  return {
    data,
    loading,
  };
}

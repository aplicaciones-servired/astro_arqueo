import { useEffect, useState } from "react";
import type { Arqueos } from "../types/arqueo";
import { toast } from "sonner";
import { useEmpresa } from "../components/ui/useEmpresa";
import axios from "axios";
import { API_URL } from "@/utils/constans";

export function useArqueoId(id: number | undefined, source?: string) {
  const [data, setData] = useState<Arqueos[]>([]);
  const { empresa } = useEmpresa();

  useEffect(() => {
    // Si falta algo, no ejecutamos la petición
    if (!id || !empresa) {
      return;
    }

    // Normaliza API_URL (quita slash final si existe)
    const base = typeof API_URL === "string" ? API_URL.replace(/\/+$/, "") : API_URL;
    if (!base) {
      toast.error("API_URL inválida en frontend", { duration: 2000 });
      return;
    }

    const fullUrl = `${base}/arqueos/${empresa}/${source ?? 'principal'}/${id}`;

    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.post(fullUrl);
        setData(response.data.datos);
      } catch (err: any) {
        toast.error("Error al cargar los datos (ver consola)", { duration: 2000 });
      }
    };

    void fetchData();
    const intervalId = setInterval(fetchData, 300000);
    return () => clearInterval(intervalId);
  }, [id, empresa, source]);

  return { data };
}

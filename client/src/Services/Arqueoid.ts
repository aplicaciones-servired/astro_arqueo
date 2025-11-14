import { useEffect, useState } from "react";
import type { Arqueos } from "../types/arqueo";
import { toast } from "sonner";
import { useEmpresa } from "../components/ui/useEmpresa";
import axios from "axios";
import { API_URL } from "@/utils/constans";

export function useArqueoId(id: number | undefined) {
  const [data, setData] = useState<Arqueos[]>([]);
  const { empresa } = useEmpresa();

  useEffect(() => {
    // Si falta algo, no ejecutamos la petición
    if (!id || !empresa) {
      console.log("useArqueoId: esperando id/empresa", { id, empresa, API_URL });
      return;
    }

    // Normaliza API_URL (quita slash final si existe)
    const base = typeof API_URL === "string" ? API_URL.replace(/\/+$/, "") : API_URL;
    if (!base) {
      console.error("useArqueoId: API_URL inválida:", API_URL);
      toast.error("API_URL inválida en frontend", { duration: 2000 });
      return;
    }

    const fullUrl = `${base}/arqueos/${empresa}/${id}`;
    console.log("useArqueoId -> preparándo petición POST", { API_URL: base, empresa, id, fullUrl });

    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.post(fullUrl);
        console.log("useArqueoId -> respuesta", { status: response.status, data: response.data });
        setData(response.data.datos);
      } catch (err: any) {
        console.error("useArqueoId -> error petición", err?.response ?? err);
        toast.error("Error al cargar los datos (ver consola)", { duration: 2000 });
      }
    };

    void fetchData();
    const intervalId = setInterval(fetchData, 300000);
    return () => clearInterval(intervalId);
  }, [id, empresa]);

  return { data };
}

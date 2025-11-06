import { useEffect, useState } from "react";

import { toast } from "sonner";
import { useEmpresa } from "../components/ui/useEmpresa";
import axios from "axios";
import type { Cronograma } from "@/types/cronograma";

export function Cronoid(id: number | undefined) {
  const [data, setData] = useState<Cronograma[]>([]);
  const { empresa } = useEmpresa();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.post(
          `http://localhost:3000/cronogramaid/${empresa}/${id}`
        );
        setData(response.data.datos);
      } catch {
        toast.error("Error al cargar los datos", { duration: 1000 });
      }
    };

    void fetchData();
    const intervalId = setInterval(fetchData, 300000);
    return () => clearInterval(intervalId);
  }, []);


  return {
    data,
  };
}

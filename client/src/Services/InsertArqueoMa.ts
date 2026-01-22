import { API_URL } from "@/utils/constans";
import axios from "axios";
import { toast } from "sonner";

interface ArqueoManual {
  puntodeventa: string;
  nombre: string;
  documento: string;
  ventabruta: string;
  totalingreso: string;
  efectivocajafuerte: string;
  sobrantefaltante: string;
  valor: string;
  empresa: string;
}

export async function ArqueoManualForm({
  puntodeventa,
  nombre,
  documento,
  ventabruta,
  totalingreso,
  efectivocajafuerte,
  sobrantefaltante,
  valor,
  empresa,
}: ArqueoManual) {
  
  if (!puntodeventa || !nombre || !documento) {
    toast.warning("Todos los campos son obligatorios");
    return;
  }

  try {
    toast.promise(
          axios.post(`${API_URL}/arqueomanual/${empresa}`, {
              puntodeventa,
              nombre,
              documento,
          }),

          {
              loading: "Insertando arqueo manual...",
              success: "Se registró correctamente el arqueo manual",
              error: (err: any) => "Error al registrar: " + String(err.message || err),
              duration: 3000,
          }
      );
    return true;
  } catch (error) {
    console.error("Error en ArqueoManualForm:", error);
    return false;
  }
}

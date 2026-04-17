import { API_URL } from "@/utils/constans";
import axios from "axios";
import { toast } from "sonner";

interface ArqueoManual {
  puntodeventa: string;
  nombre: string;
  documento: string;
  base: string;
  ventabruta: string;
  totalingreso: string;
  efectivocajafuerte: string;
  sobrantefaltante: string;
  valor: string;
  empresa: string;
  imagen?: File | null;
}

export async function ArqueoManualForm({
  puntodeventa,
  nombre,
  documento,
  base,
  ventabruta,
  totalingreso,
  efectivocajafuerte,
  sobrantefaltante,
  valor,
  empresa,
  imagen,
}: ArqueoManual) {
 
  if (!puntodeventa || !nombre || !documento || !base || !ventabruta || !totalingreso || !efectivocajafuerte || !sobrantefaltante || !valor || !imagen) {
    toast.warning("Todos los campos son obligatorios");
    return false;
  }

  try {
    // Crear FormData para enviar datos y archivo
    const formData = new FormData();
    formData.append('puntodeventa', puntodeventa);
    formData.append('nombre', nombre);
    formData.append('documento', documento);
    formData.append('base', base);
    formData.append('ventabruta', ventabruta);
    formData.append('totalingreso', totalingreso);
    formData.append('efectivocajafuerte', efectivocajafuerte);
    formData.append('sobrantefaltante', sobrantefaltante);
    formData.append('valor', valor);
    
    // Agregar imagen si existe
    if (imagen) {
      formData.append('imagen', imagen);
    }

    const request = axios.post(`${API_URL}/arqueomanual/${empresa}`, formData);

    await toast.promise(request, {
      loading: "Insertando arqueo manual...",
      success: "Se registró correctamente el arqueo manual",
      error: (err: any) => "Error al registrar: " + String(err.message || err),
      duration: 3000,
    });

    return true;
  } catch (error) {
    console.error("Error en ArqueoManualForm:", error);
    return false;
  }
}

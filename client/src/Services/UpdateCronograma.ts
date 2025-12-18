import axios from "axios";
import { API_URL } from "@/utils/constans";
import { toast } from "sonner";

interface UpdateCronogramaParams {
  id: string;
  estado: string;
  fecha: string;
  nota?: string;
  zona: string;
}

export const updateCronograma = async (params: UpdateCronogramaParams): Promise<boolean> => {
  try {
    const response = await axios.put(`${API_URL}/updatecronograma/${params.id}`, {
      estado: params.estado,
      fecha: params.fecha,
      nota: params.nota,
      zona: params.zona,
    });

    if (response.status === 200) {
      toast.success("Cronograma actualizado exitosamente", { duration: 2000 });
      return true;
    }
    return false;
  } catch (error) {
    toast.error("Error al actualizar el cronograma", { duration: 2000 });
    return false;
  }
};

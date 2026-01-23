import { API_URL } from "@/utils/constans";
import type { ReporteDiario } from "@/types/reporteDiario";

export async function getReporteDiario(
  zona: string,
  fechaInicio?: string,
  fechaFin?: string
): Promise<{ count: number; datos: ReporteDiario[] }> {
  try {
    let url = `${API_URL}/reportediario?zona=${zona}`;
    
    if (fechaInicio && fechaFin) {
      url += `&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Error al obtener el reporte diario");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function updateObservacionDiaria(
  dia: string,
  observacion: string,
  zona: string
): Promise<{ message: string; dia: string; observacion: string }> {
  try {
    const response = await fetch(`${API_URL}/observaciondiaria`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dia,
        observacion,
        zona,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la observación");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

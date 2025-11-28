import { useMemo, useState } from "react";
import { type Cronograma } from "../types/cronograma";

import {
  format,
  parse,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";

interface FilterPDV {
  filteredPDV: Cronograma[];
  searchPDV: string;
  searchPDS: string;
  fechaInicioInform: string;
  fechaFinInform: string;
  setSearchPDV: React.Dispatch<React.SetStateAction<string>>;
  setSearchPDS: React.Dispatch<React.SetStateAction<string>>;
  setFechaInicioInform: React.Dispatch<React.SetStateAction<string>>;
  setFechaFinInform: React.Dispatch<React.SetStateAction<string>>;
}

function filterByPDV(pdv: Cronograma[], searchPDV: string): Cronograma[] {
  // Fecha de hoy normalizada (yyyy-MM-dd)
  const hoy = format(new Date(), "yyyy-MM-dd");

  return pdv.filter(({ dia }) => {
    if (dia.length === 0) return false;

    const parsedDate = parse(dia, "yyyy-MM-dd", new Date());
    const fecha = format(parsedDate, "yyyy-MM-dd");

    // Si no hay búsqueda -> mostrar SOLO los de hoy
    if (searchPDV.length === 0 || searchPDV.trim() === "") {
      return fecha === hoy;
    }

    // Si hay búsqueda -> mostrar los que coinciden con esa fecha
    return fecha.includes(searchPDV);
  });
}

// 🔥 Filtro para mostrar los registros del mes actual
function filterByCurrentMonth(pdv: Cronograma[]): Cronograma[] {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  return pdv.filter(({ dia }) => {
    if (dia.length === 0) return false;

    const parsedDate = parse(dia, "yyyy-MM-dd", new Date());
    return isWithinInterval(parsedDate, { start, end });
  });
}

function filterByPDS(pdv: Cronograma[], searchPDS: string): Cronograma[] {
  return pdv.filter(({ empresa }) =>
    empresa.length > 0
      ? empresa.toLowerCase().includes(searchPDS.toLowerCase())
      : false
  );
}

function filterByFecha(
  pdv: Cronograma[],
  fechaInicioInform: string,
  fechaFinInform: string
): Cronograma[] {
  return pdv.filter(({ dia }) => {
    if (dia.length === 0) return false;

    const parsedDate = parse(dia, "yyyy-MM-dd", new Date());
    const fecha = format(parsedDate, "yyyy-MM-dd");

    return fecha >= fechaInicioInform && fecha <= fechaFinInform;
  });
}

export function useFilterPro(pdv: Cronograma[]): FilterPDV {
  const [searchPDV, setSearchPDV] = useState("");
  const [searchPDS, setSearchPDS] = useState("");
  const [searchPVDS, setSearchPVDS] = useState("");
  const [fechaInicioInform, setFechaInicioInform] = useState("");
  const [fechaFinInform, setFechaFinInform] = useState("");

  const filteredPDV = useMemo(() => {
    let filtered = pdv;

    // 👇 Si hay un rango de fechas personalizado, úsalo en lugar del filtro del mes actual
    if (fechaInicioInform.length > 0 && fechaFinInform.length > 0) {
      filtered = filterByFecha(filtered, fechaInicioInform, fechaFinInform);
    } else {
      // Solo filtra por mes actual si NO hay un rango de fechas personalizado
      filtered = filterByCurrentMonth(filtered);
    }

    // Si el usuario busca fecha manualmente, sobreescribe el filtro de mes
    if (searchPDV.length > 0) {
      filtered = filterByPDV(filtered, searchPDV);
    }

    if (searchPDS.length > 0) {
      filtered = filterByPDS(filtered, searchPDS);
    }

    return filtered;
  }, [pdv, searchPDV, searchPDS, fechaInicioInform, fechaFinInform]);

  return {
    searchPDV,
    searchPDS,
    setSearchPDV,
    setSearchPDS,
    fechaInicioInform,
    fechaFinInform,
    setFechaInicioInform,
    setFechaFinInform,
    filteredPDV,
  };
}

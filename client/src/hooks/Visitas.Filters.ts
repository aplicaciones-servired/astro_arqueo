import { useMemo, useState } from "react";
import { format, parse } from "date-fns";
import type { Visitas } from "@/types/visita";

interface FilterPDV {
  filteredPDV: Visitas[];
  searchPDV: string;
  searchFecha: string;
  setSearchFecha: React.Dispatch<React.SetStateAction<string>>;
  setSearchPDV: React.Dispatch<React.SetStateAction<string>>;
}

// 🔥 Filtra por el día actual localmente SOLO si no hay búsqueda por fecha
function filterByToday(pdv: Visitas[]): Visitas[] {
  const hoy = format(new Date(), "yyyy-MM-dd");

  return pdv.filter(({ fechavisita }) => {
    if (!fechavisita) return false;
    const parsedDate = parse(fechavisita, "yyyy-MM-dd", new Date());
    return format(parsedDate, "yyyy-MM-dd") === hoy;
  });
}

export function useFilterPro(pdv: Visitas[]): FilterPDV {
  const [searchPDV, setSearchPDV] = useState("");
  const [searchFecha, setSearchFecha] = useState("");

  const filteredPDV = useMemo(() => {
    let filtered = pdv;

    // ❗ Si NO hay fecha seleccionada → filtrar por hoy
    if (!searchFecha) {
      filtered = filterByToday(filtered);
    }

    // Si hay búsqueda por PDV (opcional)
    if (searchPDV.length > 0) {
      filtered = filtered.filter((item) =>
        item.nombres.toLowerCase().includes(searchPDV.toLowerCase())
      );
    }

    return filtered;
  }, [pdv, searchPDV, searchFecha]);

  return {
    searchPDV,
    setSearchPDV,
    filteredPDV,
    searchFecha,
    setSearchFecha,
  };
}

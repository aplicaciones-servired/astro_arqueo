import { useMemo, useState } from "react";
import { format, parse } from "date-fns";
import { Arqueos } from "@/types/arqueo";

interface FilterPDV {
  filteredPDV: Arqueos[];
  searchFecha: string;
  setSearchFecha: React.Dispatch<React.SetStateAction<string>>;
}

// 🔥 Filtra por el día actual localmente SOLO si no hay búsqueda por fecha
function filterByToday(pdv: Arqueos[]): Arqueos[] {
  const hoy = format(new Date(), "yyyy-MM-dd");

  return pdv.filter(({ fechavisita }) => {
    if (!fechavisita) return false;
    const parsedDate = parse(fechavisita, "yyyy-MM-dd", new Date());
    return format(parsedDate, "yyyy-MM-dd") === hoy;
  });
}

export function useFilterPro(pdv: Arqueos[]): FilterPDV {
  const [searchFecha, setSearchFecha] = useState("");

  const filteredPDV = useMemo(() => {
    let filtered = pdv;

    // ❗ Si NO hay fecha seleccionada → filtrar por hoy
    if (!searchFecha) {
      filtered = filterByToday(filtered);
    }

    return filtered;
  }, [pdv, searchFecha]);

  return {
    filteredPDV,
    searchFecha,
    setSearchFecha,
  };
}

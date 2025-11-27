import { useMemo, useState } from "react";
import { format, parse } from "date-fns";
import type { Arqueos } from "@/types/arqueo";

interface FilterPDV {
  filteredPDV: Arqueos[];
  searchPDV: string;
  searchPDS: string;
  searchPVDS: string;
  setSearchPDV: React.Dispatch<React.SetStateAction<string>>;
  setSearchPDS: React.Dispatch<React.SetStateAction<string>>;
  setSearchPVDS: React.Dispatch<React.SetStateAction<string>>;
}

function filterByToday(pdv: Arqueos[]): Arqueos[] {
  const hoy = format(new Date(), "yyyy-MM-dd");
  return pdv.filter(({ fechavisita }) => {
    if (!fechavisita) return false;
    const parsedDate = parse(fechavisita, "yyyy-MM-dd", new Date());
    return format(parsedDate, "yyyy-MM-dd") === hoy;
  });
}

function filterByFecha(pdv: Arqueos[], searchFecha: string): Arqueos[] {
  return pdv.filter(
    ({ fechavisita }) =>
      fechavisita?.toLowerCase().includes(searchFecha.toLowerCase()) ?? false
  );
}

export function useFilterPro(pdv: Arqueos[]): FilterPDV {
  const [searchPDV, setSearchPDV] = useState("");
  const [searchPDS, setSearchPDS] = useState("");
  const [searchPVDS, setSearchPVDS] = useState("");

  const safePDV = Array.isArray(pdv) ? pdv : []; // ✅ evita crash si pdv no es array

  const filteredPDV = useMemo(() => {
    let filtered = filterByToday(safePDV);
    if (searchPDV) filtered = filterByFecha(filtered, searchPDV);
    return filtered;
  }, [safePDV, searchPDS, searchPDV]);

  return {
    searchPDV,
    searchPDS,
    searchPVDS,
    setSearchPDV,
    setSearchPDS,
    setSearchPVDS,
    filteredPDV,
  };
}

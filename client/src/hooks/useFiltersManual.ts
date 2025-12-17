import { ArqueoManual } from "@/types/arqueomanual";
import { useMemo, useState } from "react";

interface FilterPDV {
  filteredPDV: ArqueoManual[];
  searchfecha: string;
  searchPDV: string;
  setSearchFecha: React.Dispatch<React.SetStateAction<string>>;
  setSearchPDV: React.Dispatch<React.SetStateAction<string>>;
}

function filterByFecha(
  pdv: ArqueoManual[],
  searchFecha: string
): ArqueoManual[] {
  return pdv.filter(
    ({ fecha }) =>
      fecha?.toLowerCase().includes(searchFecha.toLowerCase()) ?? false
  );
}

function filterByPDV(pdv: ArqueoManual[], searchPDV: string): ArqueoManual[] {
  return pdv.filter(
    ({ puntodeventa }) =>
      puntodeventa
        ?.toString()
        .toLowerCase()
        .includes(searchPDV.toLowerCase()) ?? false
  );
}

export function useFiltersManual(pdv: ArqueoManual[]): FilterPDV {
  const [searchfecha, setSearchFecha] = useState("");
  const [searchPDV, setSearchPDV] = useState("");

  const filteredPDV = useMemo(() => {
    let filtered = pdv;
    if (searchfecha) filtered = filterByFecha(filtered, searchfecha);
    if (searchPDV) filtered = filterByPDV(filtered, searchPDV);
    return filtered;
  }, [pdv, searchPDV, searchfecha]);

  return { searchfecha, searchPDV, setSearchFecha, setSearchPDV, filteredPDV };
}

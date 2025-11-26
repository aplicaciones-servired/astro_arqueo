
import { useMemo, useState } from 'react'
import type { Arqueos } from '../types/arqueo'

interface FilterPDV {
  filteredPDV: Arqueos[]
  searchfecha: string
  searchPDV: string
  setSearchFecha: React.Dispatch<React.SetStateAction<string>>
  setSearchPDV: React.Dispatch<React.SetStateAction<string>>
}

function filterByFecha (pdv: Arqueos[], searchFecha: string): Arqueos[] {
  return pdv.filter(({ fechavisita }) =>
    fechavisita?.toLowerCase().includes(searchFecha.toLowerCase()) ?? false
  )
}

function filterByPDV (pdv: Arqueos[], searchPDV: string): Arqueos[] {
  return pdv.filter(({ puntodeventa }) =>
    puntodeventa?.toString().toLowerCase().includes(searchPDV.toLowerCase()) ?? false
  )
}

export function useFilter (pdv: Arqueos[]): FilterPDV {
  const [searchfecha, setSearchFecha] = useState('')
  const [searchPDV, setSearchPDV] = useState('')

  const filteredPDV = useMemo(() => {
    let filtered = pdv
    if (searchfecha) filtered = filterByFecha(filtered, searchfecha)
    if (searchPDV) filtered = filterByPDV(filtered, searchPDV)
    return filtered
  }, [pdv, searchPDV, searchfecha])

  return { searchfecha, searchPDV, setSearchFecha, setSearchPDV, filteredPDV }
}

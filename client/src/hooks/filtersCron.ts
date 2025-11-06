
import { useMemo, useState } from 'react'
import type { Cronograma } from '../types/cronograma'

interface FilterPDV {
  filteredPDV: Cronograma[]
  searchfecha: string
  searchPDV: string
  setSearchFecha: React.Dispatch<React.SetStateAction<string>>
  setSearchPDV: React.Dispatch<React.SetStateAction<string>>
}

function filterByFecha (pdv: Cronograma[], searchFecha: string): Cronograma[] {
  return pdv.filter(({ dia }) =>
    dia?.toLowerCase().includes(searchFecha.toLowerCase()) ?? false
  )
}

function filterByPDV (pdv: Cronograma[], searchPDV: string): Cronograma[] {
  return pdv.filter(({ puntodeventa }) =>
    puntodeventa?.toString().includes(searchPDV.toLowerCase()) ?? false
  )
}

export function useFilterCron (pdv: Cronograma[]): FilterPDV {
  const [searchfecha, setSearchFecha] = useState('')
  const [searchPDV, setSearchPDV] = useState('')

  const filteredPDV = useMemo(() => {
    let filtered = pdv
    if (searchfecha.length > 0) filtered = filterByFecha(filtered, searchfecha)
    if (searchPDV.length > 0) filtered = filterByPDV(filtered, searchPDV)
    return filtered
  }, [pdv, searchPDV, searchfecha])

  return { searchfecha, searchPDV, setSearchFecha, setSearchPDV, filteredPDV }
}

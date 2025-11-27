import { useMemo, useState } from 'react'
import { format, parse } from 'date-fns'
import type { Visitas } from '@/types/visita'


interface FilterPDV {
  filteredPDV: Visitas[]
  searchPDV: string
  searchPDS: string
  searchPVDS: string
  searchFecha: string
  setSearchFecha: React.Dispatch<React.SetStateAction<string>>
  setSearchPDV: React.Dispatch<React.SetStateAction<string>>
  setSearchPDS: React.Dispatch<React.SetStateAction<string>>
  setSearchPVDS: React.Dispatch<React.SetStateAction<string>>
}

// 🔥 Filtro por el día actual
function filterByToday (pdv: Visitas[]): Visitas[] {
  const hoy = format(new Date(), 'yyyy-MM-dd')

  return pdv.filter(({ fechavisita }) => {
    if (fechavisita.length === 0) return false
    const parsedDate = parse(fechavisita, 'yyyy-MM-dd', new Date())
    return format(parsedDate, 'yyyy-MM-dd') === hoy
  })
}

function filterByPDV (pdv: Visitas[], searchPDV: string): Visitas[] {
  return pdv.filter(({ fechavisita }) => {
    if (fechavisita.length === 0) return false
    const parsedDate = parse(fechavisita, 'yyyy-MM-dd', new Date())
    const fecha = format(parsedDate, 'yyyy-MM-dd')
    return fecha.includes(searchPDV)
  })
}

function filterByFecha (pdv: Visitas[], searchFecha: string): Visitas[] {
  return pdv.filter(({ fechavisita }) =>
    fechavisita?.toLowerCase().includes(searchFecha.toLowerCase()) ?? false
  )
}


export function useFilterPro (pdv: Visitas[]): FilterPDV {
  const [searchPDV, setSearchPDV] = useState('')
  const [searchPDS, setSearchPDS] = useState('')
  const [searchPVDS, setSearchPVDS] = useState('')
  const [searchFecha, setSearchFecha] = useState('')

  const filteredPDV = useMemo(() => {
    let filtered = pdv

    // 👇 Siempre filtra por el día actual en lugar del mes
    filtered = filterByToday(filtered)

    // Si el usuario busca manualmente, sobreescribe el filtro de hoy
    if (searchPDV.length > 0) {
      filtered = filterByPDV(filtered, searchPDV)
    }
    if (searchFecha) filtered = filterByFecha(filtered, searchFecha)
    return filtered
  }, [pdv, searchPDV, searchPDS, searchPVDS, searchFecha])

  return {
    searchPDV,
    searchPDS,
    searchPVDS,
    setSearchPDV,
    setSearchPDS,
    setSearchPVDS,
    filteredPDV,
    searchFecha,
    setSearchFecha
  }
}

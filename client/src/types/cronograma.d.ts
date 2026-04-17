export interface Cronograma {
  id: number
  puntodeventa: string
  dia: string
  empresa: string
  nota: string
  estado: string
  imagen: string | null
  observacion: string
  source_table?: "cronograma" | "cronograma_servired" | "cronograma_multired"
}

import * as XLSX from 'xlsx';
import type { Arqueos } from '../../types/arqueo';
import type { Cronograma } from '@/types/cronograma';

interface PropsExport {
  registros: Arqueos[] | Cronograma[];
  nombreArchivo?: string;
}

export const exportarAExcel = ({ registros, nombreArchivo = 'Reporte' }: PropsExport): void => {
  const data = Array.isArray(registros) ? registros : [registros];
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, 'Registros');
  XLSX.writeFile(wb, `${nombreArchivo.toUpperCase()} POR FECHA.xlsx`);
};

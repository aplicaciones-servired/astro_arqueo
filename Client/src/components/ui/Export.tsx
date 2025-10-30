import * as XLSX from 'xlsx';
import type { Arqueos } from '../../types/arqueo';

interface PropsExport {
  registros: Arqueos | Arqueos[];
}

export const exportarAExcel = ({ registros }: PropsExport): void => {
  const data = Array.isArray(registros) ? registros : [registros]; // 🔒 garantiza array
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, 'Registros');
  XLSX.writeFile(wb, 'REPORTE POR FECHA.xlsx');
};

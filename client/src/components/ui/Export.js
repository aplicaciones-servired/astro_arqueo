import { Workbook } from 'exceljs';
export const exportarAExcel = async ({ registros, nombreArchivo = 'Reporte' }) => {
    const wb = new Workbook();
    const ws = wb.addWorksheet('Registros');
    // Establecer encabezados
    const headers = Object.keys(registros[0]);
    ws.addRow(headers);
    // Agregar los registros
    registros.forEach((registro) => {
        ws.addRow(Object.values(registro));
    });
    // Guardar el archivo
    await wb.xlsx.writeFile(`${nombreArchivo.toUpperCase()} POR FECHA.xlsx`);
};

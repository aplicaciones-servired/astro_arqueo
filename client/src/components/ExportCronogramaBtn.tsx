import { useState } from "react";
import type { Cronograma } from "@/types/cronograma";
import { exportarCronogramaCalendario } from "./Exportar/ExportCronogramaCalendario";
import Button from "./ui/Button";
import { toast } from "sonner";
import { API_URL } from "@/utils/constans";
import { useEmpresa } from "./ui/useEmpresa";
import { useSucursales } from "@/Services/Sucursales";

interface Props {
    data: Cronograma[];
    searchFecha?: string;
    searchPDV?: string;
}

export const ExportCronogramaBtn = ({ data, searchFecha, searchPDV }: Props) => {
    const [mes, setMes] = useState(new Date().getMonth() + 1); // 1-12
    const [año, setAño] = useState(new Date().getFullYear());
    const { empresa } = useEmpresa();
    const { data: sucursales } = useSucursales();
    
    const handleExport = async () => {
        try {
            toast.info("Obteniendo todos los cronogramas...");

            // Obtener la empresa del localStorage
            const empresaStorage = empresa;
            if (!empresaStorage) {
                toast.error("No se ha seleccionado una empresa");
                return;
            }

            // Hacer petición para obtener TODOS los datos sin paginación
            let url = `${API_URL}/getcronograma?zona=${empresaStorage}&page=1&pageSize=10000`;
            if (searchFecha) {
                url += `&fecha=${searchFecha}`;
            }
            if (searchPDV) {
                url += `&pdv=${encodeURIComponent(searchPDV)}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Error al obtener los datos");
            }

            const responseData = await response.json();
            const todosLosDatos = responseData.datos || [];

            if (todosLosDatos.length === 0) {
                toast.error("No hay datos para exportar");
                return;
            }

            await exportarCronogramaCalendario({
                registros: todosLosDatos,
                sucursales,
                nombreArchivo: `Cronograma Calendario ${empresaStorage}`,
                mes,
                año,
            });

            toast.success("Cronograma exportado exitosamente");
        } catch (error) {
            toast.error("Error al exportar cronograma");
            console.error(error);
        }
    };

    const meses = [
        { valor: 1, nombre: "Enero" },
        { valor: 2, nombre: "Febrero" },
        { valor: 3, nombre: "Marzo" },
        { valor: 4, nombre: "Abril" },
        { valor: 5, nombre: "Mayo" },
        { valor: 6, nombre: "Junio" },
        { valor: 7, nombre: "Julio" },
        { valor: 8, nombre: "Agosto" },
        { valor: 9, nombre: "Septiembre" },
        { valor: 10, nombre: "Octubre" },
        { valor: 11, nombre: "Noviembre" },
        { valor: 12, nombre: "Diciembre" },
    ];

    const años = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

    return (
        <div className="mb-4 mt-4">
            <div className="filter-card flex flex-wrap gap-4 items-end">
                <div>
                    <label className="block text-sm font-semibold mb-2">Mes:</label>
                    <select
                        value={mes}
                        onChange={(e) => setMes(Number(e.target.value))}
                        className="filter-select"
                    >
                        {meses.map((m) => (
                            <option key={m.valor} value={m.valor}>
                                {m.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Año:</label>
                    <select
                        value={año}
                        onChange={(e) => setAño(Number(e.target.value))}
                        className="filter-select"
                    >
                        {años.map((a) => (
                            <option key={a} value={a}>
                                {a}
                            </option>
                        ))}
                    </select>
                </div>

                <Button onClick={handleExport} className="min-w-[220px]">
                    📅 Descargar Calendario
                </Button>
            </div>
        </div>
    );
};

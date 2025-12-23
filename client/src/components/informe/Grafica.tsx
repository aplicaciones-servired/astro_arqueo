import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Cronograma } from "@/types/cronograma";
import { useFilterPro } from "@/hooks/InformeFilter";
import { useEffect } from "react";

export default function SimpleCharts({
  datos,
  fechaInicio,
  fechaFin,
}: {
  datos: Cronograma[];
  fechaInicio: string;
  fechaFin: string;
}): React.JSX.Element {
  const { filteredPDV, setFechaInicioInform, setFechaFinInform } =
    useFilterPro(datos);

  useEffect(() => {
    setFechaInicioInform(fechaInicio);
    setFechaFinInform(fechaFin);
  }, [fechaInicio, fechaFin]);

  const totalEnEspera = filteredPDV.filter(
    (pdv) => pdv.estado === "En Espera"
  ).length;

  const totalEjecutados = filteredPDV.filter(
    (pdv) => pdv.estado === "Realizado"
  ).length;

  const NoseRealizo = filteredPDV.filter(
    (pdv) => pdv.estado === "No Se Pudo Realizar"
  ).length;

  const Retiro = filteredPDV.filter(
    (pdv) => pdv.nota === "ARQUEO DE RETIRO"
  ).length;

  const Cerrados = filteredPDV.filter((pdv) => pdv.estado === "Cerrado").length;

  const resumenCerrados: Record<string, { cantidad: number; estado: string }> =
    {};

  filteredPDV.forEach((pdv) => {
    if (pdv.estado === "Cerrado") {
      resumenCerrados[pdv.puntodeventa] = {
        cantidad: (resumenCerrados[pdv.puntodeventa]?.cantidad ?? 0) + 1,
        estado: pdv.estado, // siempre "Cerrado"
      };
    }
  });

  function calcularPorcentaje(valor: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((valor / total) * 100);
  }

  const porcentajeEspera = calcularPorcentaje(totalEnEspera, filteredPDV.length);
  const porcentajeEjecutados = calcularPorcentaje(totalEjecutados, filteredPDV.length);
  const porcentajeCerrados = calcularPorcentaje(Cerrados, filteredPDV.length);
  const porcentajeRetiro = calcularPorcentaje(Retiro, filteredPDV.length);
  const porcentajeNoseRealizo = calcularPorcentaje(NoseRealizo, filteredPDV.length);

  const cantidades = [
    filteredPDV.length, // Programados
    totalEnEspera,
    totalEjecutados,
    Retiro,
    Cerrados,
    NoseRealizo
  ];

  const porcentajes = [
    null,
    porcentajeEspera,
    porcentajeEjecutados,
    porcentajeRetiro,
    porcentajeCerrados,
    porcentajeNoseRealizo
  ];

  return (
    <section className="flex justify-start">
      <BarChart
        xAxis={[
          {
            data: [
              "Programados",
              "Sin Ejecutar",
              "Ejecutados",
              "Por Retiro",
              "Cerrados",
              "No Se Pudo Realizar",
            ],
            scaleType: "band",
          },
        ]}
        series={[
          {
            label: "Cantidad",
            data: cantidades,
          },
          {
            label: "Porcentaje",
            data: porcentajes,
            valueFormatter: (value) => `${value}%`,
          },
        ]}
        yAxis={[
          {
            min: 0,
            max: 100,
          },
        ]}
        height={400}
        width={600}
        borderRadius={23}
      />
    </section>
  );
}

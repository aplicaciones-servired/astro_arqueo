import { useState, type JSX } from "react";
import { useCronoInforme } from "@/Services/InformeCrono";
import TableInforme from "./informe/TableInforme";
import Cerrados from "./informe/Cerrados";
import Grafica from "./informe/Grafica";

const InformeComponent = (): JSX.Element => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const { data } = useCronoInforme(fechaInicio, fechaFin);

  return (
    <div className="container px-4 mx-auto">
      <TableInforme
        datos={data}
        fechaInicio={fechaInicio}
        fechaFin={fechaFin}
        setFechaInicio={setFechaInicio}
        setFechaFin={setFechaFin}
      />
      <div className="flex w-full p-4 justify-between items-start gap-3">
        <Cerrados datos={data} fechaInicio={fechaInicio} fechaFin={fechaFin} />

        <Grafica datos={data} fechaInicio={fechaInicio} fechaFin={fechaFin} />
      </div>
    </div>
  );
};

export default InformeComponent;

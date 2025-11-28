import { useVisita } from "@/Services/Visita";
import { useState, type JSX } from "react";
import TableVista from "./RegisVisita/GetVisita";
import TableSeguimiento from "./RegisVisita/GetSeguimientoAr";
import { useArqueo } from "@/Services/Arqueo";

function GetRegistro(): JSX.Element {
  const [fecha_visita, setFecha_visita] = useState("");
  const [fecha, setFecha] = useState("");
  const { data } = useVisita(fecha_visita);

  const { dataSegui } = useArqueo(fecha);
  return (
    <>
      <div className="flex w-full p-4 justify-between items-start gap-3">
        <TableVista
          datos={data}
          fecha_visita={fecha_visita}
          setFecha_visita={setFecha_visita}
        />

        <TableSeguimiento datos={dataSegui} fecha={fecha} setFecha={setFecha} />
      </div>
    </>
  );
}

export default GetRegistro;

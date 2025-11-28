import { useArqueo } from "@/Services/Arqueo";
import { useState, type JSX } from "react";
import { Exportcom } from "./Arqueo/Exportcom";
import { TableArqueo } from "./Arqueo/tableArqueo";
import { RenderFooterClients } from "./Arqueo/paginationArq";

const Arqueo = (): JSX.Element => {
  const [fecha, setFecha] = useState("");
  const [PDV, setPDV] = useState("");

  const { data, page, handlePageChange, total } = useArqueo(fecha, PDV);

  return (
    <div className="container px-4 mx-auto">
      <Exportcom data={data} tipo="arqueo" />

      <TableArqueo
        datos={data}
        fecha={fecha}
        PDV={PDV}
        setPDV={setPDV}
        setFecha={setFecha}
      />

      <RenderFooterClients
        page={page}
        total={total}
        setPage={handlePageChange}
      />
    </div>
  );
};

export default Arqueo;

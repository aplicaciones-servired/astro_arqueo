import { useArqueo } from "@/Services/Arqueo";
import { useState, type JSX } from "react";
import { Exportcom } from "./Exportcom";
import { RenderFooterClients } from "./paginationArq";
import { TableArqueoInfo } from "./Arqueo/infopdv/TableInformacion";

const Arqueo = (): JSX.Element => {
  const [fecha, setFecha] = useState("");
  const [PDV, setPDV] = useState("");

  const { data, page, handlePageChange, total } = useArqueo(fecha, PDV);

  return (
    <div className="container px-4 mx-auto">
      <Exportcom data={data} tipo="ArqueosInfo" />

      <TableArqueoInfo
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

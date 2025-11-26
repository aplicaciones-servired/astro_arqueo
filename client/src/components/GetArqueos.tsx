import { useArqueo } from "@/Services/Arqueo";
import { type JSX } from "react";
import { Exportcom } from "./Arqueo/Exportcom";
import { TableArqueo } from "./Arqueo/tableArqueo";
import { RenderFooterClients } from "./Arqueo/paginationArq";

const Arqueo = (): JSX.Element => {
  const { data, page, handlePageChange, total } = useArqueo();

  return (
    <div className="container px-4 mx-auto">
      <Exportcom data={data} tipo="arqueo" />

      <TableArqueo datos={data} />

      <RenderFooterClients
        page={page}
        total={total}
        setPage={handlePageChange}
      />
    </div>
  );
};

export default Arqueo;

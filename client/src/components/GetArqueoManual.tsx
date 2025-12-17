import { useArqueo } from "@/Services/Arqueo";
import { useState, type JSX } from "react";
import { Exportcom } from "./Exportcom";
import { RenderFooterClients } from "./paginationArq";
import { TableArqueoManual } from "./Arqueo/ArqueoManual/TableArqueoManual";
import { InserArqueoManual } from "./Arqueo/ArqueoManual/InserArqueoManual";
import { useArqueoManual } from "@/Services/GetarqueoManual";

const GetarqueoManualComponent = (): JSX.Element => {
    const [fecha, setFecha] = useState("");
    const [PDV, setPDV] = useState("");

    const { data, page, handlePageChange, total } = useArqueoManual(fecha, PDV);

    return (
        <div className="container px-4 mx-auto">
            <Exportcom data={data} tipo="ArqueoManual" />

            <InserArqueoManual />

            <TableArqueoManual
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

export default GetarqueoManualComponent;

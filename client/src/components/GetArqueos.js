import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useArqueo } from '@/Services/Arqueo';
import { Exportcom } from './Arqueo/Exportcom';
import { TableArqueo } from './Arqueo/tableArqueo';
import { RenderFooterClients } from './Arqueo/paginationArq';
const Arqueo = () => {
    const { data, page, handlePageChange, total } = useArqueo();
    return (_jsxs("div", { className: "container px-4 mx-auto", children: [_jsx(Exportcom, { data: data, tipo: "arqueo" }), _jsx(TableArqueo, { datos: data }), _jsx(RenderFooterClients, { page: page, total: total, setPage: handlePageChange })] }));
};
export default Arqueo;

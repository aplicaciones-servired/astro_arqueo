import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RenderFooterClients } from './Arqueo/paginationArq';
import { useCrono } from '@/Services/GetCrono';
import { TableCronograma } from './GetCrono/TableCronograma';
import { Exportcom } from './Arqueo/Exportcom';
const GetCronograma = () => {
    const { data, page, handlePageChange, total } = useCrono();
    return (_jsxs("div", { className: "container px-4 mx-auto", children: [_jsx(Exportcom, { data: data, tipo: "cronograma" }), _jsx(TableCronograma, { datos: data }), _jsx(RenderFooterClients, { page: page, total: total, setPage: handlePageChange })] }));
};
export default GetCronograma;

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useVisita } from '@/Services/Visita';
import TableVista from './RegisVisita/GetVisita';
import TableSeguimiento from './RegisVisita/GetSeguimientoAr';
import { useArqueo } from '@/Services/Arqueo';
function GetRegistro() {
    const { data, page, handlePageChange, total } = useVisita();
    const { dataSegui } = useArqueo();
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "flex  gap-72 w-full p-4 ", children: [_jsx("div", { className: "flex", children: _jsx(TableVista, { datos: data }) }), _jsx("div", { className: "flex", children: _jsx(TableSeguimiento, { datos: dataSegui }) })] }) }));
}
export default GetRegistro;

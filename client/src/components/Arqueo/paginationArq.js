import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const RenderFooterClients = ({ page, total, setPage }) => {
    return (_jsxs("footer", { className: 'flex items-center justify-between py-4 bg-white border-t border-gray-200 shadow-sm', children: [_jsx("button", { disabled: page === 1, onClick: () => setPage(page - 1), className: `
          flex items-center w-52 gap-2 px-4 py-2 text-sm   font-medium rounded-lg transition-all duration-200 mx-2 cursor-pointer border border-gray-500 
          ${page === 1
                    ? 'text-gray-400 bg-gray-50 cursor-not-allowed w-52 shadow-blue-400'
                    : 'text-gray-700 bg-white border border-gray-200 hover:bg-blue-100 hover:border-gray-300 hover:shadow-sm w-52 shadow-blue-400'}
        `, children: _jsx("span", { children: "Anterior" }) }), _jsx("div", { className: 'flex items-center gap-2', children: _jsx("div", { className: 'flex items-center gap-1 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg', children: _jsxs("span", { className: 'text-sm font-medium text-blue-700', children: ["P\u00E1gina ", page, " de ", total] }) }) }), _jsx("button", { disabled: page === total, onClick: () => setPage(page + 1), className: `
          flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 mx-2 cursor-pointer border border-gray-500 
          ${page === total
                    ? 'text-gray-400 bg-gray-50 cursor-not-allowed w-52 shadow-blue-400'
                    : 'text-gray-700 bg-white border border-gray-200 hover:bg-blue-100 hover:border-gray-300 hover:shadow-sm w-52 shadow-blue-400'}
        `, children: _jsx("span", { children: "Siguiente" }) })] }));
};

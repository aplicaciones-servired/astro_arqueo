import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { X } from 'lucide-react';
import Typography from '@mui/material/Typography';
import { Cronoid } from '@/Services/Cronoid';
export default function CronoDialogs({ open, handleClose, id }) {
    const { data } = Cronoid(id);
    return (_jsxs(Dialog, { onClose: handleClose, "aria-labelledby": "customized-dialog-title", open: open, fullWidth: true, maxWidth: "xl", children: [_jsxs(DialogTitle, { sx: { m: 0, p: 2, textAlign: 'center' }, id: "customized-dialog-title", children: [_jsx(X, { "aria-label": "close", onClick: handleClose, className: 'cursor-pointer flex' }), "Detalle Cronograma"] }), _jsx(IconButton, { "aria-label": "close", onClick: handleClose, sx: (theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                }) }), data.map((items, index) => (_jsx(DialogContent, { dividers: true, children: _jsxs(Typography, { gutterBottom: true, children: [_jsxs("label", { className: "block text-center mt-1 uppercase", children: ["Punto De Venta", _jsx("input", { className: "px-2 py-1 w-full text-center mt-2 bg-slate-300 rounded-full border cursor-not-allowed", type: "text", disabled: true, defaultValue: items.puntodeventa })] }), _jsxs("label", { className: "block text-center mt-5 uppercase", children: ["Empresa", _jsx("input", { className: "px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed", type: "text", disabled: true, defaultValue: items.empresa })] }), _jsxs("label", { className: "block text-center mt-5 uppercase", children: ["Tipo", _jsx("input", { className: "px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed", type: "text", disabled: true, defaultValue: items.nota })] }), _jsxs("label", { className: "block text-center mt-5 uppercase", children: ["Estado", _jsx("input", { className: "px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed", type: "text", disabled: true, defaultValue: items.estado })] }), _jsxs("label", { className: "block text-center mt-5 uppercase", children: ["Fecha Visita", _jsx("input", { className: "px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed", type: "text", disabled: true, defaultValue: items.id })] }), _jsx("div", { className: "flex justify-center ...", children: _jsx("div", { children: items.imagen && (_jsxs("label", { className: "block text-center mt-5 uppercase", children: ["Imagen del punto cerrado", _jsx("img", { src: items.imagen, alt: "Imagen", className: 'w-full rotate-0 mt-10' })] })) }) })] }) }, index))), _jsx(DialogActions, { children: _jsx(Button, { autoFocus: true, onClick: handleClose, children: "cerrar" }) })] }));
}

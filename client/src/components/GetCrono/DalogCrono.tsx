import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { X } from "lucide-react";
import Typography from "@mui/material/Typography";
import { Cronoid } from "@/Services/Cronoid";

export default function CronoDialogs({
  open,
  handleClose,
  id,
}: {
  open: boolean;
  handleClose: () => void;
  id: number | undefined;
}) {
  const { data } = Cronoid(id);
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle
        sx={{ m: 0, p: 2, textAlign: "center" }}
        id="customized-dialog-title"
      >
        <X
          aria-label="close"
          onClick={handleClose}
          className="cursor-pointer flex"
        />
        Detalle Cronograma
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      ></IconButton>
      {data.map((items, index) => (
        <DialogContent dividers key={index}>
          <Typography gutterBottom>
            <label className="block text-center mt-1 uppercase">
              Punto De Venta
              <input
                className="px-2 py-1 w-full text-center mt-2 bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                disabled
                defaultValue={items.puntodeventa}
              />
            </label>

            <label className="block text-center mt-5 uppercase">
              Empresa
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                disabled
                defaultValue={items.empresa}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              Tipo
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                disabled
                defaultValue={items.nota}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              Estado
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                disabled
                defaultValue={items.estado}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              Fecha Visita
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                disabled
                defaultValue={items.dia}
              />
            </label>

             <label className="block text-center mt-5 uppercase">
              Observacion
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                disabled
                defaultValue={items.observacion}
              />
            </label>

            <div className="flex justify-center ...">
              <div>
                {items.imagen && (
                  <label className="block text-center mt-5 uppercase">
                    Imagen del punto cerrado
                    <img
                      src={items.imagen}
                      alt="Imagen"
                      className="w-full rotate-0 mt-10"
                    />
                  </label>
                )}
              </div>
            </div>
          </Typography>
        </DialogContent>
      ))}
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

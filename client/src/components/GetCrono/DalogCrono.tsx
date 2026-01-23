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
          className="cursor-pointer flex-8 justify-end absolute right-4 top-4 text-gray-400 hover:text-gray-900"
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
      {data.map((items, index) => {
        return (
          <DialogContent dividers key={index}>
            <Typography gutterBottom>
              <div className="p-6 bg-gray-50">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Punto de Venta</label>
                    <p className="text-base text-gray-900 font-semibold">{items.puntodeventa}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Empresa</label>
                    <p className="text-base text-gray-900 font-semibold">{items.empresa}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Tipo</label>
                    <p className="text-base text-gray-900 font-semibold">{items.nota}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Estado</label>
                    <p className="text-base text-gray-900 font-semibold">{items.estado}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Fecha</label>
                    <p className="text-base text-gray-900 font-semibold">{items.dia}</p>
                  </div>
                  {items.observacion ? (
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Observacion</label>
                      <p className="text-base text-gray-900 font-semibold">{items.observacion}</p>
                    </div>
                  ) : (
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="text-gray-400 text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                        sin observacion adjunta
                      </div>
                    </div>
                  )}
                </div>

                {items.imagen ? (
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <label className="block text-sm font-medium text-gray-600 mb-4">Imagen del Cronograma</label>
                    <div className="flex justify-center">
                      <img
                        src={items.imagen}
                        alt="Cronograma"
                        className="max-w-full h-auto rounded-lg border-2 border-gray-300 shadow-lg"
                        onError={(e) => {
                          console.error('Error cargando imagen:', items.imagen);
                          e.currentTarget.parentElement!.innerHTML = '<div class="text-red-500 text-center p-4 bg-red-50 rounded-lg">Error al cargar la imagen</div>';
                        }} />
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="text-gray-400 text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <svg className="w-16 h-16 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Sin imagen adjunta
                    </div>
                  </div>
                )}
              </div>

            </Typography>
          </DialogContent>
        );
      })}
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

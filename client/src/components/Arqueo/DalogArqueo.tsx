import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { X } from "lucide-react";
import Typography from "@mui/material/Typography";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";
import { useArqueoId } from "@/Services/Arqueoid";
import Button from "../ui/Button";
import generatePDF from "./PdfArqueo";

export default function CustomizedDialogs({
  open,
  handleClose,
  id,
}: {
  open: boolean;
  handleClose: () => void;
  id: number | undefined;
}) {
  const { data } = useArqueoId(id);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
        }}
        id="customized-dialog-title"
      >
        <X
          aria-label="close"
          onClick={handleClose}
          className="cursor-pointer flex"
        />
        <span style={{ flex: 1, textAlign: "center" }}>Detalle Arqueo</span>
        <button
          className="flex items-center gap-2 px-4 py-2 text-white rounded flex items-center 
        cursor-pointer middle none center mr-3 rounded-lg bg-linear-to-tr from-red-600 to-blue-400 
        py-4 px-8 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 
        transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none
         disabled:opacity-50 disabled:shadow-none"
          onClick={() => generatePDF(data)}
        >
          <PictureAsPdfSharpIcon />
          Generar PDF
        </button>
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
              Realizado por
              <input
                className="px-2 py-1 w-full text-center mt-2 bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="supervisor"
                disabled
                defaultValue={items.nombreSupervisor}
              />
            </label>

            <label className="block text-center mt-1 uppercase">
              cedula
              <input
                className="px-2 py-1 w-full text-center mt-2 bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="supervisor"
                disabled
                defaultValue={items.supervisor}
              />
            </label>

            <label className="block text-center mt-5 uppercase">
              documento
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="documento"
                disabled
                defaultValue={items.documento}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              nombres
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="nombres"
                disabled
                defaultValue={items.nombres}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              sucursal
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="sucursal "
                disabled
                defaultValue={items.sucursal}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              punto de venta
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="puntodeventa"
                disabled
                defaultValue={items.puntodeventa}
              />
            </label>

            <label className="block text-center mt-5 uppercase">
              venta bruta
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="ventabruta"
                disabled
                defaultValue={items.ventabruta}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              basee fectivo
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="baseefectivo"
                disabled
                defaultValue={items.baseefectivo}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              total ingreso
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="totalingreso"
                disabled
                defaultValue={items.totalingreso}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              chances abonados
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="chancesabonados"
                disabled
                defaultValue={items.chancesabonados}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              chances preimpresos
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="chancespreimpresos "
                disabled
                defaultValue={items.chancespreimpresos}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              premios pagados
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="premiospagados"
                disabled
                defaultValue={items.premiospagados}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              efectivo caja fuerte
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="efectivocajafuerte"
                disabled
                defaultValue={items.efectivocajafuerte}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              tirill arecaudo
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="tirillarecaudo"
                disabled
                defaultValue={items.tirillarecaudo}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              total egresos
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="totalegresos"
                disabled
                defaultValue={items.totalegresos}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              total billetes
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="totalbilletes"
                disabled
                defaultValue={items.totalbilletes}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              total monedas
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="totalmonedas"
                disabled
                defaultValue={items.totalmonedas}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              total items
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="totalarqueo"
                disabled
                defaultValue={items.totalarqueo}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              sobran tefaltante
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="sobrantefaltante"
                disabled
                defaultValue={items.sobrantefaltante}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              total billetes caja
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="totalbilletescaja"
                disabled
                defaultValue={items.totalbilletescaja}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              total monedas caja
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="totalmonedascaja"
                disabled
                defaultValue={items.totalmonedascaja}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              total premios caja
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                name="totalpremioscaja"
                disabled
                defaultValue={items.totalpremioscaja}
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              total
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                disabled
                defaultValue={items.total}
                name="total"
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              rollos bnet
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                disabled
                defaultValue={items.rollos_bnet}
                name="rollos_bnet"
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              rollos fisicos
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                disabled
                defaultValue={items.rollos_fisicos}
                name="rollos_fisicos"
              />
            </label>

            <label className="block text-center mt-5 uppercase">
              diferencia
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                disabled
                defaultValue={items.diferencia}
                name="diferencia"
              />
            </label>
            {items.nombre_juego !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  nombre del juego1{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.nombre_juego}
                    name="nombre_juego"
                  />
                </label>
              </>
            )}

            {items.cantidad_bnet !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en bnet1{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_bnet}
                    name="cantidad_bnet"
                  />
                </label>
              </>
            )}

            {items.cantidad_fisicos !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en fisicos1{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_fisicos}
                    name="cantidad_fisicos"
                  />
                </label>
              </>
            )}

            {items.cantidad_faltante !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad faltante a descargar1{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_faltante}
                    name="cantidad_faltante"
                  />
                </label>
              </>
            )}

            {items.cantidad_tiquete !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  {" "}
                  valor del tiquete1{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_tiquete}
                    name="cantidad_tiquete"
                  />
                </label>
              </>
            )}

            {items.descargado != null && (
              <>
                <label className="block text-center mt-5 uppercase">
                  valor descargado por juego1{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.descargado}
                    name="descargado"
                  />
                </label>
              </>
            )}

            {items.nombre_juego2 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  nombre del juego2{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.nombre_juego2}
                    name="nombre_juego2"
                  />
                </label>
              </>
            )}

            {items.cantidad_bnet2 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en bnet2{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_bnet2}
                    name="cantidad_bnet"
                  />
                </label>
              </>
            )}

            {items.cantidad_fisicos2 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en fisicos2{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_fisicos2}
                    name="cantidad_fisicos"
                  />
                </label>
              </>
            )}

            {items.cantidad_faltante2 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad faltante a descargar2{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_faltante2}
                    name="cantidad_faltante"
                  />
                </label>
              </>
            )}

            {items.cantidad_tiquete2 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  {" "}
                  valor del tiquete2{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_tiquete2}
                    name="cantidad_tiquete"
                  />
                </label>
              </>
            )}

            {items.descargado2 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  valor descargado por juego2{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.descargado2}
                    name="descargado"
                  />
                </label>
              </>
            )}

            {items.nombre_juego3 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  nombre del juego3{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.nombre_juego3}
                    name="nombre_juego2"
                  />
                </label>
              </>
            )}

            {items.cantidad_bnet3 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en bnet3{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_bnet3}
                    name="cantidad_bnet"
                  />
                </label>
              </>
            )}

            {items.cantidad_fisicos3 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en fisicos3{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_fisicos3}
                    name="cantidad_fisicos"
                  />
                </label>
              </>
            )}

            {items.cantidad_faltante3 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad faltante a descargar3{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_faltante3}
                    name="cantidad_faltante"
                  />
                </label>
              </>
            )}

            {items.cantidad_tiquete3 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  {" "}
                  valor del tiquete3{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_tiquete3}
                    name="cantidad_tiquete"
                  />
                </label>
              </>
            )}

            {items.descargado3 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  valor descargado por juego3{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.descargado3}
                    name="descargado"
                  />
                </label>
              </>
            )}

            {items.nombre_juego4 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  nombre del juego4{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.nombre_juego4}
                    name="nombre_juego2"
                  />
                </label>
              </>
            )}

            {items.cantidad_bnet4 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en bnet4{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_bnet4}
                    name="cantidad_bnet"
                  />
                </label>
              </>
            )}

            {items.cantidad_fisicos4 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en fisicos4{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_fisicos4}
                    name="cantidad_fisicos"
                  />
                </label>
              </>
            )}

            {items.cantidad_faltante4 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad faltante a descargar4{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_faltante4}
                    name="cantidad_faltante"
                  />
                </label>
              </>
            )}

            {items.cantidad_tiquete4 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  {" "}
                  valor del tiquete4{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_tiquete4}
                    name="cantidad_tiquete"
                  />
                </label>
              </>
            )}

            {items.descargado4 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  valor descargado por juego4{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.descargado4}
                    name="descargado"
                  />
                </label>
              </>
            )}

            {items.nombre_juego5 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  nombre del juego5{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.nombre_juego5}
                    name="nombre_juego2"
                  />
                </label>
              </>
            )}

            {items.cantidad_bnet5 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en bnet5{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_bnet5}
                    name="cantidad_bnet"
                  />
                </label>
              </>
            )}

            {items.cantidad_fisicos5 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en fisicos5{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_fisicos5}
                    name="cantidad_fisicos"
                  />
                </label>
              </>
            )}

            {items.cantidad_faltante5 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad faltante a descargar5{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_faltante5}
                    name="cantidad_faltante"
                  />
                </label>
              </>
            )}

            {items.cantidad_tiquete5 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  {" "}
                  valor del tiquete5{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_tiquete5}
                    name="cantidad_tiquete"
                  />
                </label>
              </>
            )}

            {items.descargado5 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  valor descargado por juego5{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.descargado5}
                    name="descargado"
                  />
                </label>
              </>
            )}

            {items.nombre_juego6 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  nombre del juego6{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.nombre_juego6}
                    name="nombre_juego2"
                  />
                </label>
              </>
            )}

            {items.cantidad_bnet6 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en bnet6{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_bnet6}
                    name="cantidad_bnet"
                  />
                </label>
              </>
            )}

            {items.cantidad_fisicos6 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en fisicos6{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_fisicos6}
                    name="cantidad_fisicos"
                  />
                </label>
              </>
            )}

            {items.cantidad_faltante6 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad faltante a descargar6{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_faltante6}
                    name="cantidad_faltante"
                  />
                </label>
              </>
            )}

            {items.cantidad_tiquete6 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  {" "}
                  valor del tiquete6{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_tiquete6}
                    name="cantidad_tiquete"
                  />
                </label>
              </>
            )}

            {items.descargado6 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  valor descargado por juego6{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.descargado6}
                    name="descargado"
                  />
                </label>
              </>
            )}

            {items.nombre_juego7 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  nombre del juego7{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.nombre_juego7}
                    name="nombre_juego2"
                  />
                </label>
              </>
            )}

            {items.cantidad_bnet7 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en bnet7{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_bnet7}
                    name="cantidad_bnet"
                  />
                </label>
              </>
            )}

            {items.cantidad_fisicos7 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en fisicos7{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_fisicos7}
                    name="cantidad_fisicos"
                  />
                </label>
              </>
            )}

            {items.cantidad_faltante7 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad faltante a descargar7{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_faltante7}
                    name="cantidad_faltante"
                  />
                </label>
              </>
            )}

            {items.cantidad_tiquete7 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  {" "}
                  valor del tiquete4{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.cantidad_tiquete7}
                    name="cantidad_tiquete"
                  />
                </label>
              </>
            )}

            {items.descargado7 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  valor descargado por juego7{" "}
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.descargado7}
                    name="descargado"
                  />
                </label>
              </>
            )}

            <label className="block text-center mt-5 uppercase">
              {" "}
              total cantidad descargados{" "}
            </label>
            <input
              className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={items.totaldescargados}
              name="totaldescargados"
            />

            <label className="block text-center mt-5 uppercase">
              valor total descargado{" "}
            </label>
            <input
              className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={items.totalvalor}
              name="totalvalor"
            />

            <label className="block text-center mt-8 uppercase font-black">
              Verificacion del PDV{" "}
            </label>

            {items.requisito1.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene la puerta asegurada?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito1}
                    name="requisito1"
                  />
                </label>
              </>
            )}

            {items.observacion1.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion1}
                    name="observacion1"
                  />
                </label>
              </>
            )}

            {items.requisito2.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Elementos de aseo, sillas, computador, iluminación en buen
                  estado?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito2}
                    name="requisito2"
                  />
                </label>
              </>
            )}

            {items.observacion2.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion2}
                    name="observacion2"
                  />
                </label>
              </>
            )}

            {items.requisito3.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Aviso de videovigilancia y cámaras?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito3}
                    name="requisito3"
                  />
                </label>
              </>
            )}

            {items.observacion3.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion3}
                    name="observacion3"
                  />
                </label>
              </>
            )}

            {items.requisito4.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Utiliza Superflex?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito4}
                    name="requisito4"
                  />
                </label>
              </>
            )}

            {items.observacion4.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion4}
                    name="observacion4"
                  />
                </label>
              </>
            )}

            {items.requisito5.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene caja fuerte?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito5}
                    name="requisito5"
                  />
                </label>
              </>
            )}

            {items.observacion5.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion5}
                    name="observacion5"
                  />
                </label>
              </>
            )}

            {items.requisito6.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene caja digital auxiliar? ¿Conoce las bases de efectivo
                  asignadas para caja digital y principal?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito6}
                    name="requisito6"
                  />
                </label>
              </>
            )}

            {items.observacion6.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion6}
                    name="observacion6"
                  />
                </label>
              </>
            )}

            {items.requisito7.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Las recargas se hacen a través la Red propia de la Cia?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito7}
                    name="requisito7"
                  />
                </label>
              </>
            )}

            {items.observacion7.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion7}
                    name="observacion7"
                  />
                </label>
              </>
            )}

            {items.requisito8.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Cumple con los topes de efectivo establecidos en caja digital
                  y principal?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito8}
                    name="requisito8"
                  />
                </label>
              </>
            )}

            {items.observacion8.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion8}
                    name="observacion8"
                  />
                </label>
              </>
            )}

            {items.requisito9.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene los premios descargados? ¿Conoce los requisitos y
                  montos máximos para pago de premios?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito9}
                    name="requisito9"
                  />
                </label>
              </>
            )}

            {items.observacion9.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion9}
                    name="observacion9"
                  />
                </label>
              </>
            )}

            {items.requisito10.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿La lotería física tiene impreso el nombre de la Cia o de
                  Servicios Transaccionales?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito10}
                    name="requisito10"
                  />
                </label>
              </>
            )}

            {items.observacion10.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion10}
                    name="observacion10"
                  />
                </label>
              </>
            )}

            {items.requisito11.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Publicidad exhibida actualizada?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito11}
                    name="requisito11"
                  />
                </label>
              </>
            )}

            {items.observacion11.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion11}
                    name="observacion11"
                  />
                </label>
              </>
            )}

            {items.requisito12.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Aviso externo de "Vigilado y Controlado Mintic" y
                  "Colaborador Autorizado"?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito12}
                    name="requisito12"
                  />
                </label>
              </>
            )}

            {items.observacion12.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion12}
                    name="observacion12"
                  />
                </label>
              </>
            )}

            {items.requisito13.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Afiche MINTIC SUPERGIROS (contiene aviso de canales de
                  comunicación, o tarifario condiciones del servicio, sticker
                  tirilla electrónica CRC)?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito13}
                    name="requisito13"
                  />
                </label>
              </>
            )}

            {items.observacion13.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion13}
                    name="observacion13"
                  />
                </label>
              </>
            )}

            {items.requisito14.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Calendario resultados Superastro diligenciado (tiene que
                  tener los resultados)?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito14}
                    name="requisito14"
                  />
                </label>
              </>
            )}

            {items.observacion14.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion14}
                    name="observacion14"
                  />
                </label>
              </>
            )}

            {items.requisito15.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Presta servicio de Western Union (es obligatorio para cajeros
                  digitales)?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito15}
                    name="requisito15"
                  />
                </label>
              </>
            )}

            {items.observacion15.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion15}
                    name="observacion15"
                  />
                </label>
              </>
            )}

            {items.requisito16.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Calendarios de acumulados (Baloto - Miloto - Colorloto)?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito16}
                    name="requisito16"
                  />
                </label>
              </>
            )}

            {items.observacion16.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion16}
                    name="observacion16"
                  />
                </label>
              </>
            )}

            {items.requisito17.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Tablero de resultados y acumulados actualizados?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito17}
                    name="requisito17"
                  />
                </label>
              </>
            )}

            {items.observacion17.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion17}
                    name="observacion17"
                  />
                </label>
              </>
            )}

            {items.requisito18.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Licencia de funcionamiento de Beneficencia del Valle con año
                  actualizado?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito18}
                    name="requisito18"
                  />
                </label>
              </>
            )}

            {items.observacion18.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion18}
                    name="observacion18"
                  />
                </label>
              </>
            )}

            {items.requisito19.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene equipos de Betplay y/o máquinas de ruta? Si los tiene
                  debe tener el aviso "Autoriza Coljuegos"
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito19}
                    name="requisito19"
                  />
                </label>
              </>
            )}

            {items.observacion19.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion19}
                    name="observacion19"
                  />
                </label>
              </>
            )}

            {items.requisito20.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene aviso código QR para PQR?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito20}
                    name="requisito20"
                  />
                </label>
              </>
            )}

            {items.observacion20.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion20}
                    name="observacion20"
                  />
                </label>
              </>
            )}

            {items.requisito21.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Verificar el cableado?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito21}
                    name="requisito21"
                  />
                </label>
              </>
            )}

            {items.observacion21.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion21}
                    name="observacion21"
                  />
                </label>
              </>
            )}

            <label className="block text-center mt-8 uppercase font-black">
              Cajero y/o Colocador I:{" "}
            </label>

            {items.requisito22.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene prendas emblemáticas y presentación adecuada?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito22}
                    name="requisito22"
                  />
                </label>
              </>
            )}

            {items.observacion22.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion22}
                    name="observacion22"
                  />
                </label>
              </>
            )}

            {items.requisito23.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿El usuario corresponde a la cédula del mismo?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito23}
                    name="requisito23"
                  />
                </label>
              </>
            )}

            {items.observacion23.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion23}
                    name="observacion23"
                  />
                </label>
              </>
            )}

            {items.requisito24.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene usuario de giros? ¿Presta el servicio?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito24}
                    name="requisito24"
                  />
                </label>
              </>
            )}

            {items.observacion24.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion24}
                    name="observacion24"
                  />
                </label>
              </>
            )}

            {items.requisito25.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene usuario de la ONJ (para Baloto, Miloto, Colorloto)?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito25}
                    name="requisito25"
                  />
                </label>
              </>
            )}

            {items.observacion25.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion25}
                    name="observacion25"
                  />
                </label>
              </>
            )}

            {items.requisito26.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene usuario de SUPERFLEX?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito26}
                    name="requisito26"
                  />
                </label>
              </>
            )}

            {items.observacion26.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion26}
                    name="observacion26"
                  />
                </label>
              </>
            )}

            {items.requisito27.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene usuario de CORREDOR EMPRESARIAL (astro, chance
                  millonario, Betplay)?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito27}
                    name="requisito27"
                  />
                </label>
              </>
            )}

            {items.observacion27.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion27}
                    name="observacion27"
                  />
                </label>
              </>
            )}

            {items.requisito28.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Está realizando recaudo en tesorería BNET a la compañera?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito28}
                    name="requisito28"
                  />
                </label>
              </>
            )}

            {items.observacion28.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion28}
                    name="observacion28"
                  />
                </label>
              </>
            )}

            {items.requisito29.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Está comercializando el portafolio completo?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito29}
                    name="requisito29"
                  />
                </label>
              </>
            )}

            {items.observacion29.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion29}
                    name="observacion29"
                  />
                </label>
              </>
            )}

            {items.requisito30.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Solicita el documento de identificación al cliente?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito30}
                    name="requisito30"
                  />
                </label>
              </>
            )}

            {items.observacion30.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion30}
                    name="observacion30"
                  />
                </label>
              </>
            )}

            {items.requisito31.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Conoce Supervoucher, funciona?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito31}
                    name="requisito31"
                  />
                </label>
              </>
            )}

            {items.observacion31.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion31}
                    name="observacion31"
                  />
                </label>
              </>
            )}

            {items.requisito32.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Conoce el procedimiento para remitentes y destinatarios
                  menores de edad?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito32}
                    name="requisito32"
                  />
                </label>
              </>
            )}

            {items.observacion32.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion32}
                    name="observacion32"
                  />
                </label>
              </>
            )}

            {items.requisito33.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Conoce los reportes de operaciones en efectivo (R.O.E)
                  firmas, huellas? (Transacciones {">"}= $10.000.000)
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito33}
                    name="requisito33"
                  />
                </label>
              </>
            )}

            {items.observacion33.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion33}
                    name="observacion33"
                  />
                </label>
              </>
            )}

            {items.requisito34.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿El Supervisor Cial realiza las visitas?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito34}
                    name="requisito34"
                  />
                </label>
              </>
            )}

            {items.observacion34.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion34}
                    name="observacion34"
                  />
                </label>
              </>
            )}

            {items.requisito35.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Conoce los términos SARL, SARLAFT, SARO, operación inusual y
                  operación sospechosa?
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.requisito35}
                    name="requisito35"
                  />
                </label>
              </>
            )}

            {items.observacion35.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                  <input
                    className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                    type="text"
                    disabled
                    defaultValue={items.observacion35}
                    name="observacion35"
                  />
                </label>
              </>
            )}

            <label className="block text-center mt-5 uppercase">
              longitud
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                disabled
                defaultValue={items.longitud}
                name="longitud"
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              fecha visita
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                disabled
                defaultValue={items.fechavisita}
                name="fechavisita"
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              hora visita
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                disabled
                defaultValue={items.horavisita}
                name="horavisita"
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              latitud
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                disabled
                defaultValue={items.latitud}
                name="latitud"
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              longitud
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                disabled
                defaultValue={items.longitud}
                name="longitud"
              />
            </label>
            <label className="block text-center mt-5 uppercase">
              nombre observacion
              <input
                className="px-2 py-1 w-full text-center mt- bg-slate-300 rounded-full border cursor-not-allowed"
                type="text"
                disabled
                defaultValue={items.nombre_observacion}
                name="nombre observacion"
              />
            </label>

            <div className="flex justify-center ...">
              <div>
                <label className="block text-center mt-5 uppercase">
                  Imagen Observacion
                  {items.imagen_observacion && (
                    <img
                      src={items.imagen_observacion}
                      alt="Imagen de observación"
                      className="w-full rotate-0 mt-10"
                    />
                  )}
                </label>
              </div>
              <div>
                <label className="block text-center mt-5 uppercase">
                  Imagen auditoria
                  {items.firma_auditoria && (
                    <img
                      src={items.firma_auditoria}
                      alt="Imagen de auditoria"
                      className="w-96 mt-30"
                    />
                  )}
                </label>
              </div>
              <div>
                <label className="block text-center mt-5 uppercase">
                  Imagen colocadora
                  {items.firma_colocadora && (
                    <img
                      src={items.firma_colocadora}
                      alt="Imagen de firma colocadora"
                      className="w-96 mt-30 "
                    />
                  )}
                </label>
              </div>
            </div>
          </Typography>
        </DialogContent>
      ))}
      <DialogActions>
        <Button onClick={handleClose}>cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

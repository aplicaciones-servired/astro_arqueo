import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { X, FileText } from "lucide-react";
import { useArqueoId } from "@/Services/Arqueoid";
import Button from "../ui/Button";
import generatePDF from "./PdfArqueo";
import MapaUbicacion from "./MapaUbicacion";

// ─── Helpers de UI ────────────────────────────────────────────────────────────

const Field = ({ label, value }: { label: string; value: any }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
      {label}
    </span>
    <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium min-h-9 flex items-center">
      {value !== null && value !== undefined && value !== 0 && value !== ""
        ? String(value)
        : <span className="text-slate-300 italic text-xs">—</span>}
    </div>
  </div>
);

const SectionCard = ({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) => (
  <div className={`rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6`}>
    <div className={`px-4 py-2.5 ${accent} flex items-center gap-2`}>
      <span className="text-xs font-black uppercase tracking-widest text-white">
        {title}
      </span>
    </div>
    <div className="p-4 bg-white">{children}</div>
  </div>
);

const ReqRow = ({
  question,
  answer,
  observation,
}: {
  question: string;
  answer: string;
  observation?: string;
}) => {
  const isSi =
    answer?.toLowerCase() === "si" || answer?.toLowerCase() === "s\u00ed";
  const isNo = answer?.toLowerCase() === "no";
  return (
    <div className="py-2.5 border-b border-slate-100 last:border-0">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs text-slate-600 flex-1 leading-relaxed">{question}</p>
        <span
          className={`shrink-0 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
            isSi
              ? "bg-emerald-100 text-emerald-700"
              : isNo
              ? "bg-red-100 text-red-600"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {answer}
        </span>
      </div>
      {observation && (
        <p className="mt-1 text-[11px] text-amber-700 bg-amber-50 rounded px-2 py-1 border-l-2 border-amber-300">
          Obs: {observation}
        </p>
      )}
    </div>
  );
};

// ─── Componente principal ─────────────────────────────────────────────────────

export default function CustomizedDialogs({
  open,
  handleClose,
  id,
  source,
}: {
  open: boolean;
  handleClose: () => void;
  id: number | undefined;
  source?: string;
}) {
  const { data } = useArqueoId(id, source);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth="xl"
      PaperProps={{ sx: { borderRadius: "16px", overflow: "hidden" } }}
    >
      {/* ── Header ── */}
      <div className="bg-linear-to-r from-slate-800 to-slate-700 px-5 py-4 flex items-center justify-between">
        <button
          onClick={handleClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>
        <h2 className="text-white font-black uppercase tracking-widest text-sm">
          Detalle Arqueo
        </h2>
        <button
          onClick={() => generatePDF(data)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-900/30 transition-all"
        >
          <FileText size={15} />
          Generar PDF
        </button>
      </div>

      {data.slice(0, 1).map((items, index) => (
        <DialogContent key={index} sx={{ p: 3, bgcolor: "#f8fafc" }}>
          <div className="max-w-5xl mx-auto">

            {/* ── 1. Supervisor ── */}
            <SectionCard title="Realizado por" accent="bg-indigo-600">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Nombre Supervisor" value={items.nombreSupervisor} />
                <Field label="Cédula" value={items.supervisor} />
              </div>
            </SectionCard>

            {/* ── 2. Datos del PDV ── */}
            <SectionCard title="Datos del Punto de Venta" accent="bg-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Documento" value={items.documento} />
                <Field label="Nombres" value={items.nombres} />
                <Field label="Sucursal" value={items.sucursal} />
                <Field label="Punto de Venta" value={items.puntodeventa} />
              </div>
            </SectionCard>

            {/* ── 3. Información Financiera ── */}
            <SectionCard title="Información Financiera" accent="bg-rose-600">
              <div className="grid grid-cols-3 gap-4">
                <Field label="Venta Bruta" value={items.ventabruta} />
                <Field label="Base Efectivo" value={items.baseefectivo} />
                <Field label="Total Ingreso" value={items.totalingreso} />
                <Field label="Chances Abonados" value={items.chancesabonados} />
                <Field label="Chances Preimpresos" value={items.chancespreimpresos} />
                <Field label="Premios Pagados" value={items.premiospagados} />
                <Field label="Efectivo Caja Fuerte" value={items.efectivocajafuerte} />
                <Field label="Tirilla Recaudo" value={items.tirillarecaudo} />
                <Field label="Total Egresos" value={items.totalegresos} />
              </div>
            </SectionCard>

            {/* ── 4. Totales ── */}
            <SectionCard title="Totales" accent="bg-violet-600">
              <div className="grid grid-cols-3 gap-4">
                <Field label="Total Billetes" value={items.totalbilletes} />
                <Field label="Total Monedas" value={items.totalmonedas} />
                <Field label="Total Items" value={items.totalarqueo} />
                <Field label="Sobrante / Faltante" value={items.sobrantefaltante} />
                <Field label="Total Billetes Caja" value={items.totalbilletescaja} />
                <Field label="Total Monedas Caja" value={items.totalmonedascaja} />
                <Field label="Total Premios Caja" value={items.totalpremioscaja} />
                <Field label="Total" value={items.total} />
              </div>
            </SectionCard>

            {/* ── 5. Rollos ── */}
            <SectionCard title="Rollos" accent="bg-teal-600">
              <div className="grid grid-cols-3 gap-4">
                <Field label="Rollos BNET" value={items.rollos_bnet} />
                <Field label="Rollos Físicos" value={items.rollos_fisicos} />
                <Field label="Diferencia" value={items.diferencia} />
              </div>
            </SectionCard>

            {/* ── 6. Juegos ── */}
            {[1, 2, 3, 4, 5, 6, 7].some((n) => {
              const key = n === 1 ? "nombre_juego" : `nombre_juego${n}`;
              return (items as any)[key] && (items as any)[key] !== 0;
            }) && (
              <SectionCard title="Información de Juegos" accent="bg-amber-600">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7].map((n) => {
                    const nombreKey = n === 1 ? "nombre_juego" : `nombre_juego${n}`;
                    const bnetKey   = n === 1 ? "cantidad_bnet" : `cantidad_bnet${n}`;
                    const fisicosKey   = n === 1 ? "cantidad_fisicos" : `cantidad_fisicos${n}`;
                    const faltanteKey  = n === 1 ? "cantidad_faltante" : `cantidad_faltante${n}`;
                    const tiqueteKey   = n === 1 ? "cantidad_tiquete" : `cantidad_tiquete${n}`;
                    const descargadoKey = n === 1 ? "descargado" : `descargado${n}`;
                    const nombre = (items as any)[nombreKey];
                    if (!nombre || nombre === 0) return null;
                    return (
                      <div key={n} className="rounded-lg border border-amber-200 bg-amber-50 overflow-hidden">
                        <div className="bg-amber-200 px-3 py-1.5">
                          <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                            Juego {n}: {nombre}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 p-3">
                          <Field label="Cant. BNET"      value={(items as any)[bnetKey]} />
                          <Field label="Cant. Físicos"   value={(items as any)[fisicosKey]} />
                          <Field label="Cant. Faltante"  value={(items as any)[faltanteKey]} />
                          <Field label="Valor Tiquete"   value={(items as any)[tiqueteKey]} />
                          <div className="col-span-2">
                            <Field label="Valor Descargado" value={(items as any)[descargadoKey]} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-amber-200">
                  <Field label="Total Cantidad Descargados" value={items.totaldescargados} />
                  <Field label="Valor Total Descargado"     value={items.totalvalor} />
                </div>
              </SectionCard>
            )}

            {/* Totales descargados cuando no hay juegos */}
            {![1, 2, 3, 4, 5, 6, 7].some((n) => {
              const key = n === 1 ? "nombre_juego" : `nombre_juego${n}`;
              return (items as any)[key] && (items as any)[key] !== 0;
            }) && (items.totaldescargados || items.totalvalor) && (
              <SectionCard title="Totales Descargados" accent="bg-amber-600">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Total Cantidad Descargados" value={items.totaldescargados} />
                  <Field label="Valor Total Descargado"     value={items.totalvalor} />
                </div>
              </SectionCard>
            )}

            {/* ── 7. Verificación del PDV (requisitos 1–21) ── */}
            {([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21] as const).some(
              (n) => (items as any)[`requisito${n}`]?.length > 0
            ) && (
              <SectionCard title="Verificación del PDV" accent="bg-blue-700">
                <div className="divide-y divide-slate-100">
                  {(
                    [
                      { n: 1,  q: "¿Tiene la puerta asegurada?" },
                      { n: 2,  q: "¿Elementos de aseo, sillas, computador, iluminación en buen estado?" },
                      { n: 3,  q: "¿Aviso de videovigilancia y cámaras?" },
                      { n: 4,  q: "¿Utiliza Superflex?" },
                      { n: 5,  q: "¿Tiene caja fuerte?" },
                      { n: 6,  q: "¿Tiene caja digital auxiliar? ¿Conoce las bases de efectivo asignadas para caja digital y principal?" },
                      { n: 7,  q: "¿Las recargas se hacen a través la Red propia de la Cia?" },
                      { n: 8,  q: "¿Cumple con los topes de efectivo establecidos en caja digital y principal?" },
                      { n: 9,  q: "¿Tiene los premios descargados? ¿Conoce los requisitos y montos máximos para pago de premios?" },
                      { n: 10, q: "¿La lotería física tiene impreso el nombre de la Cia o de Servicios Transaccionales?" },
                      { n: 11, q: "¿Publicidad exhibida actualizada?" },
                      { n: 12, q: "¿Aviso externo de \"Vigilado y Controlado Mintic\" y \"Colaborador Autorizado\"?" },
                      { n: 13, q: "¿Afiche MINTIC SUPERGIROS (contiene aviso de canales de comunicación, o tarifario condiciones del servicio, sticker tirilla electrónica CRC)?" },
                      { n: 14, q: "¿Calendario resultados Superastro diligenciado (tiene que tener los resultados)?" },
                      { n: 15, q: "¿Presta servicio de Western Union (es obligatorio para cajeros digitales)?" },
                      { n: 16, q: "¿Calendarios de acumulados (Baloto - Miloto - Colorloto)?" },
                      { n: 17, q: "¿Tablero de resultados y acumulados actualizados?" },
                      { n: 18, q: "¿Licencia de funcionamiento de Beneficencia del Valle con año actualizado?" },
                      { n: 19, q: "¿Tiene equipos de Betplay y/o máquinas de ruta? Si los tiene debe tener el aviso \"Autoriza Coljuegos\"" },
                      { n: 20, q: "¿Tiene aviso código QR para PQR?" },
                      { n: 21, q: "¿Verificar el cableado?" },
                    ] as { n: number; q: string }[]
                  ).map(({ n, q }) => {
                    const resp = (items as any)[`requisito${n}`];
                    const obs  = (items as any)[`observacion${n}`];
                    if (!resp?.length) return null;
                    return <ReqRow key={n} question={q} answer={resp} observation={obs} />;
                  })}
                </div>
              </SectionCard>
            )}

            {/* ── 8. Cajero / Colocador (requisitos 22–35) ── */}
            {([22,23,24,25,26,27,28,29,30,31,32,33,34,35] as const).some(
              (n) => (items as any)[`requisito${n}`]?.length > 0
            ) && (
              <SectionCard title="Cajero y/o Colocador" accent="bg-emerald-700">
                <div className="divide-y divide-slate-100">
                  {(
                    [
                      { n: 22, q: "¿Tiene prendas emblemáticas y presentación adecuada?" },
                      { n: 23, q: "¿El usuario corresponde a la cédula del mismo?" },
                      { n: 24, q: "¿Tiene usuario de giros? ¿Presta el servicio?" },
                      { n: 25, q: "¿Tiene usuario de la ONJ (para Baloto, Miloto, Colorloto)?" },
                      { n: 26, q: "¿Tiene usuario de SUPERFLEX?" },
                      { n: 27, q: "¿Tiene usuario de CORREDOR EMPRESARIAL (astro, chance millonario, Betplay)?" },
                      { n: 28, q: "¿Está realizando recaudo en tesorería BNET a la compañera?" },
                      { n: 29, q: "¿Está comercializando el portafolio completo?" },
                      { n: 30, q: "¿Solicita el documento de identificación al cliente?" },
                      { n: 31, q: "¿Conoce Supervoucher, funciona?" },
                      { n: 32, q: "¿Conoce el procedimiento para remitentes y destinatarios menores de edad?" },
                      { n: 33, q: "¿Conoce los reportes de operaciones en efectivo (R.O.E) firmas, huellas? (Transacciones >= $10.000.000)" },
                      { n: 34, q: "¿El Supervisor Cial realiza las visitas?" },
                      { n: 35, q: "¿Conoce los términos SARL, SARLAFT, SARO, operación inusual y operación sospechosa?" },
                    ] as { n: number; q: string }[]
                  ).map(({ n, q }) => {
                    const resp = (items as any)[`requisito${n}`];
                    const obs  = (items as any)[`observacion${n}`];
                    if (!resp?.length) return null;
                    return <ReqRow key={n} question={q} answer={resp} observation={obs} />;
                  })}
                </div>
              </SectionCard>
            )}

            {/* ── 9. Información Adicional ── */}
            <SectionCard title="Información Adicional" accent="bg-slate-600">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Field label="Fecha Visita" value={items.fechavisita} />
                <Field label="Hora Visita"  value={items.horavisita} />
                <Field label="Latitud"      value={items.latitud} />
                <Field label="Longitud"     value={items.longitud} />
              </div>
              {items.nombre_observacion && (
                <div className="mt-4">
                  <Field label="Nombre Observación" value={items.nombre_observacion} />
                </div>
              )}
              {items.latitud && items.longitud && (
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <div className="bg-slate-500 py-2 px-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-white">
                      Ubicación en el mapa
                    </p>
                  </div>
                  <MapaUbicacion
                    lat={Number(items.latitud)}
                    lng={Number(items.longitud)}
                    nombre={items.puntodeventa}
                  />
                </div>
              )}
            </SectionCard>

            {/* ── 10. Imágenes y Firmas ── */}
            {(items.imagen_observacion || items.firma_auditoria || items.firma_colocadora) && (
              <SectionCard title="Imágenes y Firmas" accent="bg-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {items.imagen_observacion && (
                    <div className="flex flex-col rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                      <div className="bg-slate-700 py-2 px-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-white text-center">
                          Imagen Observación
                        </p>
                      </div>
                      <div className="p-3 w-full flex justify-center items-center bg-slate-50" style={{ minHeight: "220px" }}>
                        <img src={items.imagen_observacion} alt="Imagen de observación" className="max-h-64 w-full object-contain rounded-lg" />
                      </div>
                    </div>
                  )}
                  {items.firma_auditoria && (
                    <div className="flex flex-col rounded-xl border border-blue-200 overflow-hidden shadow-sm">
                      <div className="bg-blue-700 py-2 px-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-white text-center">
                          Firma Auditoría
                        </p>
                      </div>
                      <div className="p-3 w-full flex justify-center items-center bg-blue-50" style={{ minHeight: "220px" }}>
                        <img src={items.firma_auditoria} alt="Firma de auditoría" className="max-h-64 w-full object-contain rounded-lg" />
                      </div>
                    </div>
                  )}
                  {items.firma_colocadora && (
                    <div className="flex flex-col rounded-xl border border-emerald-200 overflow-hidden shadow-sm">
                      <div className="bg-emerald-700 py-2 px-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-white text-center">
                          Firma Colocadora
                        </p>
                      </div>
                      <div className="p-3 w-full flex justify-center items-center bg-emerald-50" style={{ minHeight: "220px" }}>
                        <img src={items.firma_colocadora} alt="Firma colocadora" className="max-h-64 w-full object-contain rounded-lg" />
                      </div>
                    </div>
                  )}
                </div>
              </SectionCard>
            )}

          </div>
        </DialogContent>
      ))}

      <DialogActions sx={{ px: 3, py: 2, bgcolor: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
        <Button onClick={handleClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

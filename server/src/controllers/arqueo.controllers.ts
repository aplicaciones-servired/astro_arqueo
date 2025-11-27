import { Request, Response } from "express";
import { arqueo, initChatBoxModel } from "../models/arqueo.model";

export const getArqueo = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const offset = (page - 1) * pageSize;
  const zona = req.query.zona as string;

  if (zona === undefined) {
    res.status(400).json("Zona no válida");
    return;
  }

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initChatBoxModel(empresa);

  try {
    const { count, rows } = await arqueo.findAndCountAll({
      attributes: [
        "supervisor",
        "id",
        "ip",
        "nombres",
        "documento",
        "sucursal",
        "puntodeventa",
        "ventabruta",
        "baseefectivo",
        "cartera",
        "totalingreso",
        "chancesabonados",
        "chancespreimpresos",
        "premiospagados",
        "efectivocajafuerte",
        "tirillarecaudo",
        "totalegresos",
        "totalbilletes",
        "totalmonedas",
        "totalarqueo",
        "sobrantefaltante",
        "totalbilletescaja",
        "totalmonedascaja",
        "totalpremioscaja",
        "total",
        "rollos_bnet",
        "rollos_fisicos",
        "diferencia",
        "nombre_juego",
        "cantidad_bnet",
        "cantidad_fisicos",
        "cantidad_faltante",
        "cantidad_tiquete",
        "descargado",
        "nombre_juego2",
        "cantidad_bnet2",
        "cantidad_fisicos2",
        "cantidad_faltante2",
        "cantidad_tiquete2",
        "descargado2",
        "nombre_juego3",
        "cantidad_bnet3",
        "cantidad_fisicos3",
        "cantidad_faltante3",
        "cantidad_tiquete3",
        "descargado3",
        "nombre_juego4",
        "cantidad_bnet4",
        "cantidad_fisicos4",
        "cantidad_faltante4",
        "cantidad_tiquete4",
        "descargado4",
        "nombre_juego5",
        "cantidad_bnet5",
        "cantidad_fisicos5",
        "cantidad_faltante5",
        "cantidad_tiquete5",
        "descargado5",
        "nombre_juego6",
        "cantidad_bnet6",
        "cantidad_fisicos6",
        "cantidad_faltante6",
        "cantidad_tiquete6",
        "descargado6",
        "nombre_juego7",
        "cantidad_bnet7",
        "cantidad_fisicos7",
        "cantidad_faltante7",
        "cantidad_tiquete7",
        "descargado7",
        "totaldescargados",
        "totalvalor",
        "requisito1",
        "observacion1",
        "requisito2",
        "observacion2",
        "requisito3",
        "observacion3",
        "requisito4",
        "observacion4",
        "requisito5",
        "observacion5",
        "requisito6",
        "observacion6",
        "requisito7",
        "observacion7",
        "requisito8",
        "observacion8",
        "requisito9",
        "observacion9",
        "requisito10",
        "observacion10",
        "requisito11",
        "observacion11",
        "requisito12",
        "observacion12",
        "requisito13",
        "observacion13",
        "requisito14",
        "observacion14",
        "requisito15",
        "observacion15",
        "requisito16",
        "observacion16",
        "requisito17",
        "observacion17",
        "requisito18",
        "observacion18",
        "requisito19",
        "observacion19",
        "requisito20",
        "observacion20",
        "requisito21",
        "observacion21",
        "requisito22",
        "observacion22",
        "requisito23",
        "observacion23",
        "requisito24",
        "observacion24",
        "requisito25",
        "observacion25",
        "requisito26",
        "observacion26",
        "requisito27",
        "observacion27",
        "requisito28",
        "observacion28",
        "requisito29",
        "observacion29",
        "requisito30",
        "observacion30",
        "requisito31",
        "observacion31",
        "requisito32",
        "observacion32",
        "requisito33",
        "observacion33",
        "requisito34",
        "observacion34",
        "requisito35",
        "observacion35",
        "nombre_observacion",
        "fechavisita",
        "horavisita",
        "latitud",
        "longitud",
      ],
      limit: pageSize,
      offset: offset,
      order: [["fechavisita", "DESC"]],
    });
    res.status(200).json({ count, datos: rows, page, pageSize });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getArqueos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.params;
  const { zona, id } = data;

  if (zona === undefined) {
    res.status(400).json("Zona no válida");
    return;
  }

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initChatBoxModel(empresa);

  try {
    const Chat = await arqueo.findAll({
      attributes: [
        "supervisor",
        "id",
        "ip",
        "nombres",
        "documento",
        "sucursal",
        "puntodeventa",
        "ventabruta",
        "baseefectivo",
        "cartera",
        "totalingreso",
        "chancesabonados",
        "chancespreimpresos",
        "premiospagados",
        "efectivocajafuerte",
        "tirillarecaudo",
        "totalegresos",
        "totalbilletes",
        "totalmonedas",
        "totalarqueo",
        "sobrantefaltante",
        "totalbilletescaja",
        "totalmonedascaja",
        "totalpremioscaja",
        "total",
        "rollos_bnet",
        "rollos_fisicos",
        "diferencia",
        "nombre_juego",
        "cantidad_bnet",
        "cantidad_fisicos",
        "cantidad_faltante",
        "cantidad_tiquete",
        "descargado",
        "nombre_juego2",
        "cantidad_bnet2",
        "cantidad_fisicos2",
        "cantidad_faltante2",
        "cantidad_tiquete2",
        "descargado2",
        "nombre_juego3",
        "cantidad_bnet3",
        "cantidad_fisicos3",
        "cantidad_faltante3",
        "cantidad_tiquete3",
        "descargado3",
        "nombre_juego4",
        "cantidad_bnet4",
        "cantidad_fisicos4",
        "cantidad_faltante4",
        "cantidad_tiquete4",
        "descargado4",
        "nombre_juego5",
        "cantidad_bnet5",
        "cantidad_fisicos5",
        "cantidad_faltante5",
        "cantidad_tiquete5",
        "descargado5",
        "nombre_juego6",
        "cantidad_bnet6",
        "cantidad_fisicos6",
        "cantidad_faltante6",
        "cantidad_tiquete6",
        "descargado6",
        "nombre_juego7",
        "cantidad_bnet7",
        "cantidad_fisicos7",
        "cantidad_faltante7",
        "cantidad_tiquete7",
        "descargado7",
        "totaldescargados",
        "totalvalor",
        "requisito1",
        "observacion1",
        "requisito2",
        "observacion2",
        "requisito3",
        "observacion3",
        "requisito4",
        "observacion4",
        "requisito5",
        "observacion5",
        "requisito6",
        "observacion6",
        "requisito7",
        "observacion7",
        "requisito8",
        "observacion8",
        "requisito9",
        "observacion9",
        "requisito10",
        "observacion10",
        "requisito11",
        "observacion11",
        "requisito12",
        "observacion12",
        "requisito13",
        "observacion13",
        "requisito14",
        "observacion14",
        "requisito15",
        "observacion15",
        "requisito16",
        "observacion16",
        "requisito17",
        "observacion17",
        "requisito18",
        "observacion18",
        "requisito19",
        "observacion19",
        "requisito20",
        "observacion20",
        "requisito21",
        "observacion21",
        "requisito22",
        "observacion22",
        "requisito23",
        "observacion23",
        "requisito24",
        "observacion24",
        "requisito25",
        "observacion25",
        "requisito26",
        "observacion26",
        "requisito27",
        "observacion27",
        "requisito28",
        "observacion28",
        "requisito29",
        "observacion29",
        "requisito30",
        "observacion30",
        "requisito31",
        "observacion31",
        "requisito32",
        "observacion32",
        "requisito33",
        "observacion33",
        "requisito34",
        "observacion34",
        "requisito35",
        "observacion35",
        "imagen_observacion",
        "nombre_observacion",
        "firma_auditoria",
        "firma_colocadora",
        "fechavisita",
        "horavisita",
        "latitud",
        "longitud",
      ],
      where: {
        id: id,
      },
      order: [["fechavisita", "DESC"]],
    });

    const detectMimeType = (buffer: Buffer): string => {
      if (!buffer || buffer.length < 4) return "image/jpeg";

      const header = buffer.slice(0, 4).toString("hex").toUpperCase();

      if (header.startsWith("89504E47")) return "image/png"; // PNG
      if (header.startsWith("FFD8FF")) return "image/jpeg"; // JPG
      return "image/jpeg";
    };

    const originalString = Chat.map((item: any) => {
      let imagePath_observacion: any = item.imagen_observacion;

      const convertToBase64 = (image: any): string | null => {
        if (!image) return null;

        if (Buffer.isBuffer(image)) {
          const mime = detectMimeType(image);
          return `data:${mime};base64,${image.toString("base64")}`;
        }

        if (typeof image === "object" && image !== null && "data" in image) {
          const buffer = Buffer.from((image as { data: number[] }).data);
          const mime = detectMimeType(buffer);
          return `data:${mime};base64,${buffer.toString("base64")}`;
        }

        if (typeof image === "string") {
          return image.startsWith("data:image")
            ? image
            : `data:image/jpeg;base64,${image}`;
        }

        return null;
      };

      // Si viene como objeto tipo { type: 'Buffer', data: [...] }
      if (
        imagePath_observacion &&
        typeof imagePath_observacion === "object" &&
        "data" in imagePath_observacion
      ) {
        imagePath_observacion = Buffer.from(
          (imagePath_observacion as { data: number[] }).data
        ).toString("base64");
      }

      const base64Image = imagePath_observacion
        ? `data:image/jpeg;base64,${imagePath_observacion}`
        : null;

      return {
        ...item.toJSON(),
        imagen_observacion: base64Image,
        firma_auditoria: convertToBase64(item.firma_auditoria),
        firma_colocadora: convertToBase64(item.firma_colocadora),
      };
    });

    res.status(200).json({
      datos: originalString,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
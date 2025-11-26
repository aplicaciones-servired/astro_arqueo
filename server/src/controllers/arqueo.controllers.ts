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
  const data = req.body;
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

export const PostArqueoinsert = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.body;
  const zona = data.perfil;

  const ip = data.ip;
  const nombres = data.nombre;
  const documento = data.cedula;
  const sucursal = data.sucursal;
  const supervisor = data.Supervisor;
  const puntodeventa = data.punto_venta;
  const latitud = data.latitude;
  const longitud = data.longitude;
  const ventabruta = data.Venta_bruta;
  const baseefectivo = data.Base_efectivo;
  const cartera = data.Cartera;
  const totalingreso = data.Total_ingreso;
  const chancesabonados = data.Chance_abonados;
  const chancespreimpresos = data.Chance_impresos;
  const premiospagados = data.Premios_pagados;
  const efectivocajafuerte = data.Efectivo_cajafuerte;
  const tirillarecaudo = data.Tirilla_recaudo;
  const totalegresos = data.Total_egresos;
  const totalbilletes = data.Total_billetes;
  const totalmonedas = data.Total_monedas;
  const totalarqueo = data.Total_arqueo;
  const sobrantefaltante = data.Sobrante_Faltante;
  const totalbilletescaja = data.Total_billetesCaja;
  const totalmonedascaja = data.Total_monedasCaja;
  const totalpremioscaja = data.Total_premiosCaja;
  const total = data.Total_Caja;
  const rollos_bnet = data.Rollos_bnet;
  const rollos_fisicos = data.Rollos_fisicos;
  const diferencia = data.Total_Rollos;
  const nombre_juego = data.nombre_juego;
  const cantidad_bnet = data.cantidad_bnet;
  const cantidad_fisicos = data.cantidad_fisicos;
  const cantidad_faltante = data.cantidad_faltante;
  const cantidad_tiquete = data.cantidad_tiquete;
  const descargado = data.descargado;
  const nombre_juego2 = data.nombre_juego2;
  const cantidad_bnet2 = data.cantidad_bnet2;
  const cantidad_fisicos2 = data.cantidad_fisicos2;
  const cantidad_faltante2 = data.cantidad_faltante2;
  const cantidad_tiquete2 = data.cantidad_tiquete2;
  const descargado2 = data.descargado2;
  const nombre_juego3 = data.nombre_juego3;
  const cantidad_bnet3 = data.cantidad_bnet3;
  const cantidad_fisicos3 = data.cantidad_fisicos3;
  const cantidad_faltante3 = data.cantidad_faltante3;
  const cantidad_tiquete3 = data.cantidad_tiquete3;
  const descargado3 = data.descargado3;
  const nombre_juego4 = data.nombre_juego4;
  const cantidad_bnet4 = data.cantidad_bnet4;
  const cantidad_fisicos4 = data.cantidad_fisicos4;
  const cantidad_faltante4 = data.cantidad_faltante4;
  const cantidad_tiquete4 = data.cantidad_tiquete4;
  const descargado4 = data.descargado4;
  const nombre_juego5 = data.nombre_juego5;
  const cantidad_bnet5 = data.cantidad_bnet5;
  const cantidad_fisicos5 = data.cantidad_fisicos5;
  const cantidad_faltante5 = data.cantidad_faltante5;
  const cantidad_tiquete5 = data.cantidad_tiquete5;
  const descargado5 = data.descargado5;
  const nombre_juego6 = data.nombre_juego6;
  const cantidad_bnet6 = data.cantidad_bnet6;
  const cantidad_fisicos6 = data.cantidad_fisicos6;
  const cantidad_faltante6 = data.cantidad_faltante6;
  const cantidad_tiquete6 = data.cantidad_tiquete6;
  const descargado6 = data.descargado6;
  const nombre_juego7 = data.nombre_juego7;
  const cantidad_bnet7 = data.cantidad_bnet7;
  const cantidad_fisicos7 = data.cantidad_fisicos7;
  const cantidad_faltante7 = data.cantidad_faltante7;
  const cantidad_tiquete7 = data.cantidad_tiquete7;
  const descargado7 = data.descargado7;
  const totaldescargados = data.Cantidad_descargados;
  const totalvalor = data.Total_descargados;
  const requisito1 = data.requisito1;
  const requisito2 = data.requisito2;
  const requisito3 = data.requisito3;
  const requisito4 = data.requisito4;
  const requisito5 = data.requisito5;
  const requisito6 = data.requisito6;
  const requisito7 = data.requisito7;
  const requisito8 = data.requisito8;
  const requisito9 = data.requisito9;
  const requisito10 = data.requisito10;
  const requisito11 = data.requisito11;
  const requisito12 = data.requisito12;
  const requisito13 = data.requisito13;
  const requisito14 = data.requisito14;
  const requisito15 = data.requisito15;
  const requisito16 = data.requisito16;
  const requisito17 = data.requisito17;
  const requisito18 = data.requisito18;
  const requisito19 = data.requisito19;
  const requisito20 = data.requisito20;
  const requisito21 = data.requisito21;
  const requisito22 = data.requisito22;
  const requisito23 = data.requisito23;
  const requisito24 = data.requisito24;
  const requisito25 = data.requisito25;
  const requisito26 = data.requisito26;
  const requisito27 = data.requisito27;
  const requisito28 = data.requisito28;
  const requisito29 = data.requisito29;
  const requisito30 = data.requisito30;
  const requisito31 = data.requisito31;
  const requisito32 = data.requisito32;
  const requisito33 = data.requisito33;
  const requisito34 = data.requisito34;
  const requisito35 = data.requisito35;
  const imagen_observacion = data.imageBase64;
  const nombre_observacion = data.nombre_observacion;
  const firma_auditoria = data.firmaAuditoria;
  const firma_colocadora = data.firmaColocadora;

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initChatBoxModel(empresa);

  try {
    const programacion = await arqueo.create({
      puntodeventa: puntodeventa,
      ip: ip,
      nombres: nombres,
      documento: documento,
      sucursal: sucursal,
      supervisor: supervisor,
      latitud: latitud,
      longitud: longitud,
      ventabruta: ventabruta,
      baseefectivo: baseefectivo,
      cartera: cartera,
      totalingreso: totalingreso,
      chancesabonados: chancesabonados,
      chancespreimpresos: chancespreimpresos,
      premiospagados: premiospagados,
      efectivocajafuerte: efectivocajafuerte,
      tirillarecaudo: tirillarecaudo,
      totalegresos: totalegresos,
      totalbilletes: totalbilletes,
      totalmonedas: totalmonedas,
      totalarqueo: totalarqueo,
      sobrantefaltante: sobrantefaltante,
      totalbilletescaja: totalbilletescaja,
      totalmonedascaja: totalmonedascaja,
      totalpremioscaja: totalpremioscaja,
      total: total,
      rollos_bnet: rollos_bnet,
      rollos_fisicos: rollos_fisicos,
      diferencia: diferencia,
      nombre_juego: nombre_juego,
      cantidad_bnet: cantidad_bnet,
      cantidad_fisicos: cantidad_fisicos,
      cantidad_faltante: cantidad_faltante,
      cantidad_tiquete: cantidad_tiquete,
      descargado: descargado,
      nombre_juego2: nombre_juego2,
      cantidad_bnet2: cantidad_bnet2,
      cantidad_fisicos2: cantidad_fisicos2,
      cantidad_faltante2: cantidad_faltante2,
      cantidad_tiquete2: cantidad_tiquete2,
      descargado2: descargado2,
      nombre_juego3: nombre_juego3,
      cantidad_bnet3: cantidad_bnet3,
      cantidad_fisicos3: cantidad_fisicos3,
      cantidad_faltante3: cantidad_faltante3,
      cantidad_tiquete3: cantidad_tiquete3,
      descargado3: descargado3,
      nombre_juego4: nombre_juego4,
      cantidad_bnet4: cantidad_bnet4,
      cantidad_fisicos4: cantidad_fisicos4,
      cantidad_faltante4: cantidad_faltante4,
      cantidad_tiquete4: cantidad_tiquete4,
      descargado4: descargado4,
      nombre_juego5: nombre_juego5,
      cantidad_bnet5: cantidad_bnet5,
      cantidad_fisicos5: cantidad_fisicos5,
      cantidad_faltante5: cantidad_faltante5,
      cantidad_tiquete5: cantidad_tiquete5,
      descargado5: descargado5,
      nombre_juego6: nombre_juego6,
      cantidad_bnet6: cantidad_bnet6,
      cantidad_fisicos6: cantidad_fisicos6,
      cantidad_faltante6: cantidad_faltante6,
      cantidad_tiquete6: cantidad_tiquete6,
      descargado6: descargado6,
      nombre_juego7: nombre_juego7,
      cantidad_bnet7: cantidad_bnet7,
      cantidad_fisicos7: cantidad_fisicos7,
      cantidad_faltante7: cantidad_faltante7,
      cantidad_tiquete7: cantidad_tiquete7,
      descargado7: descargado7,
      totaldescargados: totaldescargados,
      totalvalor: totalvalor,
      requisito1: requisito1,
      requisito2: requisito2,
      requisito3: requisito3,
      requisito4: requisito4,
      requisito5: requisito5,
      requisito6: requisito6,
      requisito7: requisito7,
      requisito8: requisito8,
      requisito9: requisito9,
      requisito10: requisito10,
      requisito11: requisito11,
      requisito12: requisito12,
      requisito13: requisito13,
      requisito14: requisito14,
      requisito15: requisito15,
      requisito16: requisito16,
      requisito17: requisito17,
      requisito18: requisito18,
      requisito19: requisito19,
      requisito20: requisito20,
      requisito21: requisito21,
      requisito22: requisito22,
      requisito23: requisito23,
      requisito24: requisito24,
      requisito25: requisito25,
      requisito26: requisito26,
      requisito27: requisito27,
      requisito28: requisito28,
      requisito29: requisito29,
      requisito30: requisito30,
      requisito31: requisito31,
      requisito32: requisito32,
      requisito33: requisito33,
      requisito34: requisito34,
      requisito35: requisito35,
      imagen_observacion: imagen_observacion,
      nombre_observacion: nombre_observacion,
      firma_auditoria: firma_auditoria,
      firma_colocadora: firma_colocadora,
    });
    res.status(200).json({ message: "Programacion creada", programacion });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la programacion", error });
  }
};

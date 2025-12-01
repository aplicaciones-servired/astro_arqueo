import { getPoolArqueo } from "../connections/dbArqueo";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import { Usuarios } from "./Usuario.models";
import { Personas } from "./personas.models";
import { TBUsuarios } from "./Tbusuario.model";

class arqueo extends Model<
  InferAttributes<arqueo>,
  InferCreationAttributes<arqueo>
> {
  static map(arg0: (a: any) => any) {
    throw new Error("Method not implemented.");
  }
  declare id?: number;
  declare ip: string;
  declare nombres: string;
  declare documento: string;
  declare sucursal: string;
  declare puntodeventa: string;
  declare supervisor: string;
  declare ventabruta: string;
  declare baseefectivo: string;
  declare cartera: string;
  declare totalingreso: string;
  declare chancesabonados: string;
  declare chancespreimpresos: string;
  declare premiospagados: string;
  declare efectivocajafuerte: string;
  declare tirillarecaudo: string;
  declare totalegresos: string;
  declare totalbilletes: string;
  declare totalmonedas: string;
  declare totalarqueo: string;
  declare sobrantefaltante: string;
  declare totalbilletescaja: string;
  declare totalmonedascaja: string;
  declare totalpremioscaja: string;
  declare total: string;
  declare rollos_bnet: string;
  declare rollos_fisicos: string;
  declare diferencia: string;
  declare nombre_juego: string;
  declare cantidad_bnet: string;
  declare cantidad_fisicos: string;
  declare cantidad_faltante: string;
  declare cantidad_tiquete: string;
  declare descargado: string;
  declare nombre_juego2: string;
  declare cantidad_bnet2: string;
  declare cantidad_fisicos2: string;
  declare cantidad_faltante2: string;
  declare cantidad_tiquete2: string;
  declare descargado2: string;
  declare nombre_juego3: string;
  declare cantidad_bnet3: string;
  declare cantidad_fisicos3: string;
  declare cantidad_faltante3: string;
  declare cantidad_tiquete3: string;
  declare descargado3: string;
  declare nombre_juego4: string;
  declare cantidad_bnet4: string;
  declare cantidad_fisicos4: string;
  declare cantidad_faltante4: string;
  declare cantidad_tiquete4: string;
  declare descargado4: string;
  declare nombre_juego5: string;
  declare cantidad_bnet5: string;
  declare cantidad_fisicos5: string;
  declare cantidad_faltante5: string;
  declare cantidad_tiquete5: string;
  declare descargado5: string;
  declare nombre_juego6: string;
  declare cantidad_bnet6: string;
  declare cantidad_fisicos6: string;
  declare cantidad_faltante6: string;
  declare cantidad_tiquete6: string;
  declare descargado6: string;
  declare nombre_juego7: string;
  declare cantidad_bnet7: string;
  declare cantidad_fisicos7: string;
  declare cantidad_faltante7: string;
  declare cantidad_tiquete7: string;
  declare descargado7: string;
  declare totaldescargados: string;
  declare totalvalor: string;
  declare requisito1: string;
  declare observacion1?: string;
  declare requisito2: string;
  declare observacion2?: string;
  declare requisito3: string;
  declare observacion3?: string;
  declare requisito4: string;
  declare observacion4?: string;
  declare requisito5: string;
  declare observacion5?: string;
  declare requisito6: string;
  declare observacion6?: string;
  declare requisito7: string;
  declare observacion7?: string;
  declare requisito8: string;
  declare observacion8?: string;
  declare requisito9: string;
  declare observacion9?: string;
  declare requisito10: string;
  declare observacion10?: string;
  declare requisito11: string;
  declare observacion11?: string;
  declare requisito12: string;
  declare observacion12?: string;
  declare requisito13: string;
  declare observacion13?: string;
  declare requisito14: string;
  declare observacion14?: string;
  declare requisito15: string;
  declare observacion15?: string;
  declare requisito16: string;
  declare observacion16?: string;
  declare requisito17: string;
  declare observacion17?: string;
  declare requisito18: string;
  declare observacion18?: string;
  declare requisito19: string;
  declare observacion19?: string;
  declare requisito20: string;
  declare observacion20?: string;
  declare requisito21: string;
  declare observacion21?: string;
  declare requisito22: string;
  declare observacion22?: string;
  declare requisito23: string;
  declare observacion23?: string;
  declare requisito24: string;
  declare observacion24?: string;
  declare requisito25: string;
  declare observacion25?: string;
  declare requisito26: string;
  declare observacion26?: string;
  declare requisito27: string;
  declare observacion27?: string;
  declare requisito28: string;
  declare observacion28?: string;
  declare requisito29: string;
  declare requisito30: string;
  declare requisito31: string;
  declare requisito32: string;
  declare requisito33: string;
  declare requisito34: string;
  declare requisito35: string;
  declare imagen_observacion: string;
  declare nombre_observacion: string;
  declare firma_auditoria: string;
  declare firma_colocadora: string;
  declare fechavisita?: string;
  declare horavisita?: string;
  declare latitud: string;
  declare longitud: string;
}

const initChatBoxModel = (zona: string) => {
  const empresa =
    zona === "Multired"
      ? "registro_arqueo_multired"
      : "registro_arqueo_servired";
  arqueo.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      ip: { type: DataTypes.STRING },
      nombres: { type: DataTypes.STRING },
      documento: { type: DataTypes.STRING },
      sucursal: { type: DataTypes.STRING },
      puntodeventa: { type: DataTypes.STRING },
      supervisor: { type: DataTypes.STRING },
      ventabruta: { type: DataTypes.STRING },
      baseefectivo: { type: DataTypes.STRING },
      cartera: { type: DataTypes.STRING },
      totalingreso: { type: DataTypes.STRING },
      chancesabonados: { type: DataTypes.STRING },
      chancespreimpresos: { type: DataTypes.STRING },
      premiospagados: { type: DataTypes.STRING },
      efectivocajafuerte: { type: DataTypes.STRING },
      tirillarecaudo: { type: DataTypes.STRING },
      totalegresos: { type: DataTypes.STRING },
      totalbilletes: { type: DataTypes.STRING },
      totalmonedas: { type: DataTypes.STRING },
      totalarqueo: { type: DataTypes.STRING },
      sobrantefaltante: { type: DataTypes.STRING },
      totalbilletescaja: { type: DataTypes.STRING },
      totalmonedascaja: { type: DataTypes.STRING },
      totalpremioscaja: { type: DataTypes.STRING },
      total: { type: DataTypes.STRING },
      rollos_bnet: { type: DataTypes.STRING },
      rollos_fisicos: { type: DataTypes.STRING },
      diferencia: { type: DataTypes.STRING },
      nombre_juego: { type: DataTypes.STRING },
      cantidad_bnet: { type: DataTypes.STRING },
      cantidad_fisicos: { type: DataTypes.STRING },
      cantidad_faltante: { type: DataTypes.STRING },
      cantidad_tiquete: { type: DataTypes.STRING },
      descargado: { type: DataTypes.STRING },
      nombre_juego2: { type: DataTypes.STRING },
      cantidad_bnet2: { type: DataTypes.STRING },
      cantidad_fisicos2: { type: DataTypes.STRING },
      cantidad_faltante2: { type: DataTypes.STRING },
      cantidad_tiquete2: { type: DataTypes.STRING },
      descargado2: { type: DataTypes.STRING },
      nombre_juego3: { type: DataTypes.STRING },
      cantidad_bnet3: { type: DataTypes.STRING },
      cantidad_fisicos3: { type: DataTypes.STRING },
      cantidad_faltante3: { type: DataTypes.STRING },
      cantidad_tiquete3: { type: DataTypes.STRING },
      descargado3: { type: DataTypes.STRING },
      nombre_juego4: { type: DataTypes.STRING },
      cantidad_bnet4: { type: DataTypes.STRING },
      cantidad_fisicos4: { type: DataTypes.STRING },
      cantidad_faltante4: { type: DataTypes.STRING },
      cantidad_tiquete4: { type: DataTypes.STRING },
      descargado4: { type: DataTypes.STRING },
      nombre_juego5: { type: DataTypes.STRING },
      cantidad_bnet5: { type: DataTypes.STRING },
      cantidad_fisicos5: { type: DataTypes.STRING },
      cantidad_faltante5: { type: DataTypes.STRING },
      cantidad_tiquete5: { type: DataTypes.STRING },
      descargado5: { type: DataTypes.STRING },
      nombre_juego6: { type: DataTypes.STRING },
      cantidad_bnet6: { type: DataTypes.STRING },
      cantidad_fisicos6: { type: DataTypes.STRING },
      cantidad_faltante6: { type: DataTypes.STRING },
      cantidad_tiquete6: { type: DataTypes.STRING },
      descargado6: { type: DataTypes.STRING },
      nombre_juego7: { type: DataTypes.STRING },
      cantidad_bnet7: { type: DataTypes.STRING },
      cantidad_fisicos7: { type: DataTypes.STRING },
      cantidad_faltante7: { type: DataTypes.STRING },
      cantidad_tiquete7: { type: DataTypes.STRING },
      descargado7: { type: DataTypes.STRING },
      totaldescargados: { type: DataTypes.STRING },
      totalvalor: { type: DataTypes.STRING },
      requisito1: { type: DataTypes.STRING },
      observacion1: { type: DataTypes.STRING },
      requisito2: { type: DataTypes.STRING },
      observacion2: { type: DataTypes.STRING },
      requisito3: { type: DataTypes.STRING },
      observacion3: { type: DataTypes.STRING },
      requisito4: { type: DataTypes.STRING },
      observacion4: { type: DataTypes.STRING },
      requisito5: { type: DataTypes.STRING },
      observacion5: { type: DataTypes.STRING },
      requisito6: { type: DataTypes.STRING },
      observacion6: { type: DataTypes.STRING },
      requisito7: { type: DataTypes.STRING },
      observacion7: { type: DataTypes.STRING },
      requisito8: { type: DataTypes.STRING },
      observacion8: { type: DataTypes.STRING },
      requisito9: { type: DataTypes.STRING },
      observacion9: { type: DataTypes.STRING },
      requisito10: { type: DataTypes.STRING },
      observacion10: { type: DataTypes.STRING },
      requisito11: { type: DataTypes.STRING },
      observacion11: { type: DataTypes.STRING },
      requisito12: { type: DataTypes.STRING },
      observacion12: { type: DataTypes.STRING },
      requisito13: { type: DataTypes.STRING },
      observacion13: { type: DataTypes.STRING },
      requisito14: { type: DataTypes.STRING },
      observacion14: { type: DataTypes.STRING },
      requisito15: { type: DataTypes.STRING },
      observacion15: { type: DataTypes.STRING },
      requisito16: { type: DataTypes.STRING },
      observacion16: { type: DataTypes.STRING },
      requisito17: { type: DataTypes.STRING },
      observacion17: { type: DataTypes.STRING },
      requisito18: { type: DataTypes.STRING },
      observacion18: { type: DataTypes.STRING },
      requisito19: { type: DataTypes.STRING },
      observacion19: { type: DataTypes.STRING },
      requisito20: { type: DataTypes.STRING },
      observacion20: { type: DataTypes.STRING },
      requisito21: { type: DataTypes.STRING },
      observacion21: { type: DataTypes.STRING },
      requisito22: { type: DataTypes.STRING },
      observacion22: { type: DataTypes.STRING },
      requisito23: { type: DataTypes.STRING },
      observacion23: { type: DataTypes.STRING },
      requisito24: { type: DataTypes.STRING },
      observacion24: { type: DataTypes.STRING },
      requisito25: { type: DataTypes.STRING },
      observacion25: { type: DataTypes.STRING },
      requisito26: { type: DataTypes.STRING },
      observacion26: { type: DataTypes.STRING },
      requisito27: { type: DataTypes.STRING },
      observacion27: { type: DataTypes.STRING },
      requisito28: { type: DataTypes.STRING },
      observacion28: { type: DataTypes.STRING },
      requisito29: { type: DataTypes.STRING },
      requisito30: { type: DataTypes.STRING },
      requisito31: { type: DataTypes.STRING },
      requisito32: { type: DataTypes.STRING },
      requisito33: { type: DataTypes.STRING },
      requisito34: { type: DataTypes.STRING },
      requisito35: { type: DataTypes.STRING },
      imagen_observacion: { type: DataTypes.STRING },
      nombre_observacion: { type: DataTypes.STRING },
      firma_auditoria: { type: DataTypes.STRING },
      firma_colocadora: { type: DataTypes.STRING },
      fechavisita: { type: DataTypes.STRING },
      horavisita: { type: DataTypes.STRING },
      latitud: { type: DataTypes.STRING },
      longitud: { type: DataTypes.STRING },
    },
    {
      sequelize: getPoolArqueo,
      modelName: "arqueo",
      tableName: empresa,
      timestamps: false,
    }
  );
};

export { arqueo, initChatBoxModel };

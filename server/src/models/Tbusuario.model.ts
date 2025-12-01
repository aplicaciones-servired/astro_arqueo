import { getPoolTBUsuario } from "../connections/dbtbusert";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";

class TBUsuarios extends Model<
  InferAttributes<TBUsuarios>,
  InferCreationAttributes<TBUsuarios>
> {
  declare id: number;
  declare login: string;
  declare pass: string;
  declare nombre: string;
  declare perfil: string;
  declare activo: boolean;
  declare imei: string;
}

TBUsuarios.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    login: { type: DataTypes.STRING },
    pass: { type: DataTypes.STRING },
    nombre: { type: DataTypes.STRING },
    perfil: { type: DataTypes.STRING },
    activo: { type: DataTypes.BOOLEAN },
    imei: { type: DataTypes.STRING },
  },
  {
    sequelize: getPoolTBUsuario,
    modelName: "TBUsuarios",
    tableName: "tbusuario",
    timestamps: false,
  }
);

export { TBUsuarios };

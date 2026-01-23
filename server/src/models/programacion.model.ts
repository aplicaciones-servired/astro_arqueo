import { getPoolArqueo } from "../connections/dbArqueo";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";

class Programacion extends Model<
  InferAttributes<Programacion>,
  InferCreationAttributes<Programacion>
> {
  declare id?: number;
  declare puntodeventa: string;
  declare dia: Date;
  declare empresa: string;
  declare nota: string;
  declare estado?: string;
  declare imagen?: string | null;
  declare observacion?: string | null;
}
const initCRONOGRAMA = (zona: string) => {
  const empresa = zona === "Multired" ? "cronograma_multired" : "cronograma";
  Programacion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      puntodeventa: { type: DataTypes.STRING },
      dia: { type: DataTypes.STRING },
      empresa: { type: DataTypes.STRING },
      nota: { type: DataTypes.STRING },
      estado: { type: DataTypes.STRING, allowNull: false, defaultValue: "En Espera" },
      imagen: { type: DataTypes.STRING, allowNull: true },
      observacion: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize: getPoolArqueo,
      modelName: "Programacion",
      tableName: empresa,
      timestamps: false,
    }
  );
};

class getProgramacion extends Model<
  InferAttributes<getProgramacion>,
  InferCreationAttributes<getProgramacion>
> {
  declare id: number;
  declare puntodeventa: string;
  declare dia: Date;
  declare empresa: string;
  declare nota: string;
  declare estado?: string;
  declare imagen: string;
  declare observacion?: string | null;
}
const initCronograma = (zona: string) => {
  const empresa = zona === "Multired" ? "cronograma_multired" : "cronograma";
  getProgramacion.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      puntodeventa: { type: DataTypes.STRING },
      dia: { type: DataTypes.STRING },
      empresa: { type: DataTypes.STRING },
      nota: { type: DataTypes.STRING },
      estado: { type: DataTypes.STRING },
      imagen: { type: DataTypes.STRING },
      observacion: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize: getPoolArqueo,
      modelName: "Programacion",
      tableName: empresa,
      timestamps: false,
    }
  );
};

export { Programacion, initCRONOGRAMA, initCronograma, getProgramacion };

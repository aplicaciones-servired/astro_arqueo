import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { getPoolArqueo } from "../connections/dbArqueo";
import { string } from "zod/v4";

class ArqueoManualModel extends Model<
  InferAttributes<ArqueoManualModel>,
  InferCreationAttributes<ArqueoManualModel>
> {
  declare id?: number;
  declare puntodeventa: string;
  declare nombre: string;
  declare documento: string;
  declare fecha?: Date;
}

export const initArqueoManualModel = (zona: string) => {
  const empresa = zona === "Multired" ? "Arqueo_manual_multired" : "Arqueo_manual_servired";

  ArqueoManualModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      puntodeventa: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      documento: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize: getPoolArqueo,
      tableName: empresa,
      timestamps: false,
    }
  );
};
export { ArqueoManualModel };

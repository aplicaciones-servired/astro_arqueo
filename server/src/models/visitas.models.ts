import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
} from "sequelize";
import { getPoolArqueo } from "../connections/dbArqueo";

class Visita extends Model<
  InferAttributes<Visita>,
  InferCreationAttributes<Visita>
> {
  declare nombres: string;
  declare documento: string;
  declare sucursal: string;
  declare supervisor: string;
  declare fecha_visita: string;
  declare hora_visita: string;
}
const initChatBoxModel = (zona: string) => {
  const empresa =
    zona === "Multired"
      ? "registrovisitasservired"
      : "registrovisitas";
  Visita.init(
    {
      nombres: { type: DataTypes.STRING },
      documento: { type: DataTypes.STRING },
      sucursal: { type: DataTypes.STRING },
      supervisor: { type: DataTypes.STRING },
      fecha_visita: { type: DataTypes.BOOLEAN },
      hora_visita: { type: DataTypes.STRING },
    },
    {
      sequelize: getPoolArqueo,
      modelName: "Visita",
      tableName: empresa,
      timestamps: false,
    }
  );
};

export { Visita, initChatBoxModel };
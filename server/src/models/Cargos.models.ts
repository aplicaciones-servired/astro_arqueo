import { getPoolLogin } from '../connections/dbLogin';
import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';


class Cargos extends Model<InferAttributes<Cargos>, InferCreationAttributes<Cargos>> {
    declare id_cargo: number;
    declare nombre_cargo: string;

}

Cargos.init({
    id_cargo: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    nombre_cargo: { type: DataTypes.STRING },

}, {
    sequelize: getPoolLogin,
    tableName: 'Cargos',
    timestamps: false
});

export { Cargos };
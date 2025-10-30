import { getPoolLogin } from '../connections/dbLogin';
import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';


class Procesos extends Model<InferAttributes<Procesos>, InferCreationAttributes<Procesos>> {
    declare id_proceso: number;
    declare nombre_proceso: string;

}

Procesos.init({
    id_proceso: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    nombre_proceso: { type: DataTypes.STRING },

}, {
    sequelize: getPoolLogin,
    tableName: 'Procesos',
    timestamps: false
});

export { Procesos };
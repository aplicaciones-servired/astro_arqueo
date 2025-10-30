import { getPoolLogin } from '../connections/dbLogin';
import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { Personas } from './personas.models';

class empresa extends Model<InferAttributes<empresa>, InferCreationAttributes<empresa>> {
    declare id_empresa: number;
    declare nombre_empresa: string;
}

empresa.init({
    id_empresa: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    nombre_empresa: { type: DataTypes.STRING },
}, {
    sequelize: getPoolLogin,
    tableName: 'empresa',
    timestamps: false
});

// Exportar el modelo sin definir asociaciones aún
export { empresa };
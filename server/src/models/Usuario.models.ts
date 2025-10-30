import { getPoolUsuario } from '../connections/dbUsuario';
import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';

class Usuarios extends Model<InferAttributes<Usuarios>, InferCreationAttributes<Usuarios>> {
    declare id: number;
    declare login: string;
    declare pass: string;
    declare nombre: string;
    declare perfil: string;
    declare activo: boolean;
    declare imei: string;

}


Usuarios.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    login: { type: DataTypes.STRING },
    pass: { type: DataTypes.STRING },
    nombre: { type: DataTypes.STRING },
    perfil: { type: DataTypes.STRING },
    activo: { type: DataTypes.BOOLEAN },
    imei: { type: DataTypes.STRING }


}, {
    sequelize:getPoolUsuario,
    modelName: 'Usuarios',
    tableName: 'tbusuario',
    timestamps: false
});


export { Usuarios };
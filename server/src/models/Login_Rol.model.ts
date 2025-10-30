import { getPoolLogin } from '../connections/dbLogin';
import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';


class Login_Rol extends Model<InferAttributes<Login_Rol>, InferCreationAttributes<Login_Rol>> {
    declare id_rol: number;
    declare nombre_rol: string;

}

Login_Rol.init({
    id_rol: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    nombre_rol: { type: DataTypes.STRING },

}, {
    sequelize: getPoolLogin,
    tableName: 'Login_Rol',
    timestamps: false
});

export { Login_Rol };
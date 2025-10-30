import { getPoolLogin } from '../connections/dbLogin';
import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { empresa } from './empresa.models';
import { Login_Rol } from './Login_Rol.model';
import { Cargos } from './Cargos.models';
import { Procesos } from './Procesos.models';


class Personas extends Model<InferAttributes<Personas>, InferCreationAttributes<Personas>> {
    declare cc_persona: string;
    declare nombre_persona: string;
    declare apellido_persona: string;
    declare id_empresa: string;
    declare id_cargo: string;
    declare id_proceso: string;
    declare id_rol: string;
    declare username: string;
    declare password: string;
    declare id_estado: string;
}


Personas.init({
    cc_persona: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    nombre_persona: { type: DataTypes.STRING },
    apellido_persona: { type: DataTypes.STRING },
    id_empresa: { type: DataTypes.STRING },
    id_cargo: { type: DataTypes.STRING },
    id_proceso: { type: DataTypes.STRING },
    id_rol: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    id_estado: { type: DataTypes.STRING }

}, {
    sequelize: getPoolLogin,
    tableName: 'Personas',
    timestamps: false
});

Personas.belongsTo(empresa, {foreignKey: 'id_empresa' });
Personas.belongsTo(Login_Rol, { as: 'rol', foreignKey: 'id_rol' });
Personas.belongsTo(Cargos, { as: 'cargo', foreignKey: 'id_cargo' });
Personas.belongsTo(Procesos, { as: 'proceso', foreignKey: 'id_proceso' });



export { Personas };
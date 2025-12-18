import { getPoolGamble } from '../connections/dbGamble';
import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';

class Gamble extends Model<InferAttributes<Gamble>, InferCreationAttributes<Gamble>> {
    declare ZONA: number;
    declare CODIGO: number;
    declare NOMBRE: string | null;
    declare ESTADO: string | null;
}

Gamble.init({
    ZONA: { type: DataTypes.INTEGER, allowNull: false },
    CODIGO: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    NOMBRE: { type: DataTypes.STRING(40), allowNull: true },
    ESTADO: { type: DataTypes.STRING(15), allowNull: true },
}, {
    sequelize: getPoolGamble,
    tableName: 'SUCURSALES',
    timestamps: false
});


export { Gamble };
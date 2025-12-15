import { getPoolGamble } from '../connections/dbGamble';
import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';

class Gamble extends Model<InferAttributes<Gamble>, InferCreationAttributes<Gamble>> {
    declare ZONA: number;
    declare CCOSTO: number;
    declare CODIGO: number;
    declare NOMBRE: string | null;
    declare DIRECCION: string | null;
    declare BARRIO: string | null;
    declare LATITUD: string | null;
    declare LONGITUD: string | null;
    declare TIPO: string | null;
    declare DISPOSITIVO: string | null;
    declare CATEGORIA: string | null;
    declare SUPERVISOR: string | null;
    declare ARRENDATARIO: string | null;
    declare ESTADO: string | null;
    declare FECHASYS: Date;
    declare FECHA_ACCESO: Date;
    declare LOGIN: string | null;
    declare VERSION: string | null;
}

Gamble.init({
    ZONA: { type: DataTypes.INTEGER, allowNull: false },
    CCOSTO: { type: DataTypes.INTEGER, allowNull: false },  
    CODIGO: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    NOMBRE: { type: DataTypes.STRING(40), allowNull: true },
    DIRECCION: { type: DataTypes.STRING(40), allowNull: true },
    BARRIO: { type: DataTypes.STRING(25), allowNull: true },
    LATITUD: { type: DataTypes.STRING(12), allowNull: true },
    LONGITUD: { type: DataTypes.STRING(12), allowNull: true },
    TIPO: { type: DataTypes.STRING(15), allowNull: true },
    DISPOSITIVO: { type: DataTypes.STRING(15), allowNull: true },
    CATEGORIA: { type: DataTypes.STRING(15), allowNull: true },
    SUPERVISOR: { type: DataTypes.STRING(20), allowNull: true },
    ARRENDATARIO: { type: DataTypes.STRING(20), allowNull: true },
    ESTADO: { type: DataTypes.STRING(5), allowNull: true },
    FECHASYS: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    FECHA_ACCESO: { type: DataTypes.DATE, allowNull: false },
    LOGIN: { type: DataTypes.STRING(20), allowNull: true },
    VERSION: { type: DataTypes.STRING(25), allowNull: true },
}, {
    sequelize: getPoolGamble,
    tableName: 'INFORMACION_PUNTOSVENTA',
    timestamps: false
});


export { Gamble };
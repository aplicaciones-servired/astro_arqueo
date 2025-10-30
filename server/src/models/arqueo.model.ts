import { getPoolArqueo } from '../connections/dbArqueo';
import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';

class arqueo extends Model<InferAttributes<arqueo>, InferCreationAttributes<arqueo>> {
    static map(arg0: (a: any) => any) {
        throw new Error('Method not implemented.');
    }
    declare id: number;
    declare ip: string;
    declare nombres: string;
    declare documento: string;
    declare sucursal: string;
    declare puntodeventa: string;
    declare supervisor: string;
    declare ventabruta: string;
    declare baseefectivo: string;
    declare cartera: string;
    declare totalingreso: string;
    declare chancesabonados: string;
    declare chancespreimpresos: string;
    declare premiospagados: string;
    declare efectivocajafuerte: string;
    declare tirillarecaudo: string;
    declare totalegresos: string;
    declare totalbilletes: string;
    declare totalmonedas: string;
    declare totalarqueo: string;
    declare sobrantefaltante: string;
    declare canti_billete_cienmil: string;
    declare total_billete_cienmil: string;
    declare canti_billete_cincuentamil: string;
    declare total_billete_cincuentamil: string;
    declare canti_billete_veintemil: string;
    declare total_billete_veintemil: string;
    declare canti_billete_diezmil: string;
    declare total_billete_diezmil: string;
    declare canti_billete_cincomil: string;
    declare total_billete_cincomil: string;
    declare canti_billete_dosmil: string;
    declare total_billete_dosmil: string;
    declare canti_billete_mil: string;
    declare total_billete_mil: string;
    declare canti_moneda_mil: string;
    declare total_moneda_mil: string;
    declare canti_moneda_quinientos: string;
    declare total_moneda_quinientos: string;
    declare canti_moneda_docientos: string;
    declare total_moneda_docientos: string;
    declare canti_moneda_cien: string;
    declare total_moneda_cien: string;
    declare canti_moneda_cincuenta: string;
    declare total_moneda_ciencuenta: string;
    declare total_efectivo: string;
    declare canti_billete_cienmil1: string;
    declare canti_billete_cincuentamil1: string;
    declare canti_billete_veintemil1: string;
    declare canti_billete_diezmil1: string;
    declare canti_billete_cincomil1: string;
    declare canti_billete_dosmil1: string;
    declare canti_billete_mil1: string;
    declare total_billete_cienmil1: string;
    declare total_billete_cincuentamil1: string;
    declare total_billete_veintemil1: string;
    declare total_billete_diezmil1: string;
    declare total_billete_cincomil1: string;
    declare total_billete_dosmil1: string;
    declare total_billete_mil1: string;
    declare canti_moneda_mil1: string;
    declare canti_moneda_quinientos1: string;
    declare canti_moneda_docientos1: string;
    declare canti_moneda_cien1: string;
    declare canti_moneda_cincuenta1: string;
    declare total_moneda_mil1: string;
    declare total_moneda_quinientos1: string;
    declare total_moneda_docientos1: string;
    declare total_moneda_cien1: string;
    declare total_moneda_ciencuenta1: string;
    declare total_efectivo1: string;
    declare total_premios_pagados1: string;
    declare total: string;
    declare total_premios_pagados: string;
    declare base_efectivos: string;
    declare tirilla_recaudos: string;
    declare entrega_colocador: string;
    declare sobrantefaltante_caja: string;
    declare colocador_cajafuerte: string;
    declare rollos_bnet: string;
    declare rollos_fisicos: string;
    declare diferencia: string;
    declare nombre_juego: string;
    declare cantidad_bnet: string;
    declare cantidad_fisicos: string;
    declare cantidad_faltante: string;
    declare cantidad_tiquete: string;
    declare descargado: string;
    declare nombre_juego2: string;
    declare cantidad_bnet2: string;
    declare cantidad_fisicos2: string;
    declare cantidad_faltante2: string;
    declare cantidad_tiquete2: string;
    declare descargado2: string;
    declare nombre_juego3: string;
    declare cantidad_bnet3: string;
    declare cantidad_fisicos3: string;
    declare cantidad_faltante3: string;
    declare cantidad_tiquete3: string;
    declare descargado3: string;
    declare nombre_juego4: string;
    declare cantidad_bnet4: string;
    declare cantidad_fisicos4: string;
    declare cantidad_faltante4: string;
    declare cantidad_tiquete4: string;
    declare descargado4: string;
    declare totaldescargados: string;
    declare totalvalor: string;
    declare requisito1: string;
    declare observacion1: string;
    declare requisito2: string;
    declare observacion2: string;
    declare requisito3: string;
    declare observacion3: string;
    declare requisito4: string;
    declare observacion4: string;
    declare requisito5: string;
    declare observacion5: string;
    declare requisito6: string;
    declare observacion6: string;
    declare requisito7: string;
    declare observacion7: string;
    declare requisito8: string;
    declare observacion8: string;
    declare requisito9: string;
    declare observacion9: string;
    declare requisito10: string;
    declare observacion10: string;
    declare requisito11: string;
    declare observacion11: string;
    declare requisito12: string;
    declare observacion12: string;
    declare requisito13: string;
    declare observacion13: string;
    declare requisito14: string;
    declare observacion14: string;
    declare requisito15: string;
    declare observacion15: string;
    declare requisito16: string;
    declare observacion16: string;
    declare requisito17: string;
    declare observacion17: string;
    declare requisito18: string;
    declare observacion18: string;
    declare requisito19: string;
    declare observacion19: string;
    declare requisito20: string;
    declare observacion20: string;
    declare requisito21: string;
    declare observacion21: string;
    declare requisito22: string;
    declare observacion22: string;
    declare requisito23: string;
    declare observacion23: string;
    declare requisito24: string;
    declare observacion24: string;
    declare requisito25: string;
    declare observacion25: string;
    declare requisito26: string;
    declare observacion26: string;
    declare requisito27: string;
    declare observacion27: string;
    declare requisito28: string;
    declare observacion28: string;
    declare requisito29: string;
    declare requisito30: string;
    declare imagen_observacion: string;
    declare nombre_observacion: string;
    declare firma_auditoria: string;
    declare firma_colocadora: string;
    declare fechavisita: string;
    declare horavisita: string;
    declare latitud: string;
    declare longitud: string;

}

const initChatBoxModel = (zona: string) => {
    const empresa = zona === 'Multired' ? 'registro_arqueo_multired' : 'registro_arqueo_servired';
    arqueo.init({
        id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        ip: { type: DataTypes.STRING },
        nombres: { type: DataTypes.STRING },
        documento: { type: DataTypes.STRING },
        sucursal: { type: DataTypes.STRING },
        puntodeventa: { type: DataTypes.STRING },
        supervisor: { type: DataTypes.STRING },
        ventabruta: { type: DataTypes.STRING },
        baseefectivo: { type: DataTypes.STRING },
        cartera: { type: DataTypes.STRING },
        totalingreso: { type: DataTypes.STRING },
        chancesabonados: { type: DataTypes.STRING },
        chancespreimpresos: { type: DataTypes.STRING },
        premiospagados: { type: DataTypes.STRING },
        efectivocajafuerte: { type: DataTypes.STRING },
        tirillarecaudo: { type: DataTypes.STRING },
        totalegresos: { type: DataTypes.STRING },
        totalbilletes: { type: DataTypes.STRING },
        totalmonedas: { type: DataTypes.STRING },
        totalarqueo: { type: DataTypes.STRING },
        sobrantefaltante: { type: DataTypes.STRING },
        canti_billete_cienmil: { type: DataTypes.STRING },
        total_billete_cienmil: { type: DataTypes.STRING },
        canti_billete_cincuentamil: { type: DataTypes.STRING },
        total_billete_cincuentamil: { type: DataTypes.STRING },
        canti_billete_veintemil: { type: DataTypes.STRING },
        total_billete_veintemil: { type: DataTypes.STRING },
        canti_billete_diezmil: { type: DataTypes.STRING },
        total_billete_diezmil: { type: DataTypes.STRING },
        canti_billete_cincomil: { type: DataTypes.STRING },
        total_billete_cincomil: { type: DataTypes.STRING },
        canti_billete_dosmil: { type: DataTypes.STRING },
        total_billete_dosmil: { type: DataTypes.STRING },
        canti_billete_mil: { type: DataTypes.STRING },
        total_billete_mil: { type: DataTypes.STRING },
        canti_moneda_mil: { type: DataTypes.STRING },
        total_moneda_mil: { type: DataTypes.STRING },
        canti_moneda_quinientos: { type: DataTypes.STRING },
        total_moneda_quinientos: { type: DataTypes.STRING },
        canti_moneda_docientos: { type: DataTypes.STRING },
        total_moneda_docientos: { type: DataTypes.STRING },
        canti_moneda_cien: { type: DataTypes.STRING },
        total_moneda_cien: { type: DataTypes.STRING },
        canti_moneda_cincuenta: { type: DataTypes.STRING },
        total_moneda_ciencuenta: { type: DataTypes.STRING },
        total_efectivo: { type: DataTypes.STRING },
        canti_billete_cienmil1: { type: DataTypes.STRING },
        canti_billete_cincuentamil1: { type: DataTypes.STRING },
        canti_billete_veintemil1: { type: DataTypes.STRING },
        canti_billete_diezmil1: { type: DataTypes.STRING },
        canti_billete_cincomil1: { type: DataTypes.STRING },
        canti_billete_dosmil1: { type: DataTypes.STRING },
        canti_billete_mil1: { type: DataTypes.STRING },
        total_billete_cienmil1: { type: DataTypes.STRING },
        total_billete_cincuentamil1: { type: DataTypes.STRING },
        total_billete_veintemil1: { type: DataTypes.STRING },
        total_billete_diezmil1: { type: DataTypes.STRING },
        total_billete_cincomil1: { type: DataTypes.STRING },
        total_billete_dosmil1: { type: DataTypes.STRING },
        total_billete_mil1: { type: DataTypes.STRING },
        canti_moneda_mil1: { type: DataTypes.STRING },
        canti_moneda_quinientos1: { type: DataTypes.STRING },
        canti_moneda_docientos1: { type: DataTypes.STRING },
        canti_moneda_cien1: { type: DataTypes.STRING },
        canti_moneda_cincuenta1: { type: DataTypes.STRING },
        total_moneda_mil1: { type: DataTypes.STRING },
        total_moneda_quinientos1: { type: DataTypes.STRING },
        total_moneda_docientos1: { type: DataTypes.STRING },
        total_moneda_cien1: { type: DataTypes.STRING },
        total_moneda_ciencuenta1: { type: DataTypes.STRING },
        total_efectivo1: { type: DataTypes.STRING },
        total_premios_pagados1: { type: DataTypes.STRING },
        total: { type: DataTypes.STRING },
        total_premios_pagados: { type: DataTypes.STRING },
        base_efectivos: { type: DataTypes.STRING },
        tirilla_recaudos: { type: DataTypes.STRING },
        entrega_colocador: { type: DataTypes.STRING },
        sobrantefaltante_caja: { type: DataTypes.STRING },
        colocador_cajafuerte: { type: DataTypes.STRING },
        rollos_bnet: { type: DataTypes.STRING },
        rollos_fisicos: { type: DataTypes.STRING },
        diferencia: { type: DataTypes.STRING },
        nombre_juego: { type: DataTypes.STRING },
        cantidad_bnet: { type: DataTypes.STRING },
        cantidad_fisicos: { type: DataTypes.STRING },
        cantidad_faltante: { type: DataTypes.STRING },
        cantidad_tiquete: { type: DataTypes.STRING },
        descargado: { type: DataTypes.STRING },
        nombre_juego2: { type: DataTypes.STRING },
        cantidad_bnet2: { type: DataTypes.STRING },
        cantidad_fisicos2: { type: DataTypes.STRING },
        cantidad_faltante2: { type: DataTypes.STRING },
        cantidad_tiquete2: { type: DataTypes.STRING },
        descargado2: { type: DataTypes.STRING },
        nombre_juego3: { type: DataTypes.STRING },
        cantidad_bnet3: { type: DataTypes.STRING },
        cantidad_fisicos3: { type: DataTypes.STRING },
        cantidad_faltante3: { type: DataTypes.STRING },
        cantidad_tiquete3: { type: DataTypes.STRING },
        descargado3: { type: DataTypes.STRING },
        nombre_juego4: { type: DataTypes.STRING },
        cantidad_bnet4: { type: DataTypes.STRING },
        cantidad_fisicos4: { type: DataTypes.STRING },
        cantidad_faltante4: { type: DataTypes.STRING },
        cantidad_tiquete4: { type: DataTypes.STRING },
        descargado4: { type: DataTypes.STRING },
        totaldescargados: { type: DataTypes.STRING },
        totalvalor: { type: DataTypes.STRING },
        requisito1: { type: DataTypes.STRING },
        observacion1: { type: DataTypes.STRING },
        requisito2: { type: DataTypes.STRING },
        observacion2: { type: DataTypes.STRING },
        requisito3: { type: DataTypes.STRING },
        observacion3: { type: DataTypes.STRING },
        requisito4: { type: DataTypes.STRING },
        observacion4: { type: DataTypes.STRING },
        requisito5: { type: DataTypes.STRING },
        observacion5: { type: DataTypes.STRING },
        requisito6: { type: DataTypes.STRING },
        observacion6: { type: DataTypes.STRING },
        requisito7: { type: DataTypes.STRING },
        observacion7: { type: DataTypes.STRING },
        requisito8: { type: DataTypes.STRING },
        observacion8: { type: DataTypes.STRING },
        requisito9: { type: DataTypes.STRING },
        observacion9: { type: DataTypes.STRING },
        requisito10: { type: DataTypes.STRING },
        observacion10: { type: DataTypes.STRING },
        requisito11: { type: DataTypes.STRING },
        observacion11: { type: DataTypes.STRING },
        requisito12: { type: DataTypes.STRING },
        observacion12: { type: DataTypes.STRING },
        requisito13: { type: DataTypes.STRING },
        observacion13: { type: DataTypes.STRING },
        requisito14: { type: DataTypes.STRING },
        observacion14: { type: DataTypes.STRING },
        requisito15: { type: DataTypes.STRING },
        observacion15: { type: DataTypes.STRING },
        requisito16: { type: DataTypes.STRING },
        observacion16: { type: DataTypes.STRING },
        requisito17: { type: DataTypes.STRING },
        observacion17: { type: DataTypes.STRING },
        requisito18: { type: DataTypes.STRING },
        observacion18: { type: DataTypes.STRING },
        requisito19: { type: DataTypes.STRING },
        observacion19: { type: DataTypes.STRING },
        requisito20: { type: DataTypes.STRING },
        observacion20: { type: DataTypes.STRING },
        requisito21: { type: DataTypes.STRING },
        observacion21: { type: DataTypes.STRING },
        requisito22: { type: DataTypes.STRING },
        observacion22: { type: DataTypes.STRING },
        requisito23: { type: DataTypes.STRING },
        observacion23: { type: DataTypes.STRING },
        requisito24: { type: DataTypes.STRING },
        observacion24: { type: DataTypes.STRING },
        requisito25: { type: DataTypes.STRING },
        observacion25: { type: DataTypes.STRING },
        requisito26: { type: DataTypes.STRING },
        observacion26: { type: DataTypes.STRING },
        requisito27: { type: DataTypes.STRING },
        observacion27: { type: DataTypes.STRING },
        requisito28: { type: DataTypes.STRING },
        observacion28: { type: DataTypes.STRING },
        requisito29: { type: DataTypes.STRING },
        requisito30: { type: DataTypes.STRING },
        imagen_observacion: { type: DataTypes.STRING },
        nombre_observacion: { type: DataTypes.STRING },
        firma_auditoria: { type: DataTypes.STRING },
        firma_colocadora: { type: DataTypes.STRING },
        fechavisita: { type: DataTypes.STRING },
        horavisita: { type: DataTypes.STRING },
        latitud: { type: DataTypes.STRING },
        longitud: { type: DataTypes.STRING },

    }, {
        sequelize: getPoolArqueo,
        modelName: 'arqueo',
        tableName: empresa,
        timestamps: false
    });
    
};

export { arqueo, initChatBoxModel };

import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Personas } from '../models/personas.models'; 
import { empresa } from '../models/empresa.models';
import { Login_Rol } from '../models/Login_Rol.model';
import { Cargos } from '../models/Cargos.models';
import { Procesos } from '../models/Procesos.models';

export const getloguin = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const resultadoLogin = await Personas.findOne({
            include: [
                {
                    attributes: ['nombre_empresa'],
                    model: empresa,
                    required: true
                },
                { model: Login_Rol, as: 'rol' },
                { model: Cargos, as: 'cargo' },
                { model: Procesos, as: 'proceso' }
            ],
            where: {
                username: username,
                password: password,
                id_estado: 1
            }
        });

        if (resultadoLogin) {
            res.status(200).json(resultadoLogin);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
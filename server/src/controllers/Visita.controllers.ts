import { Request, Response } from 'express';
import { initChatBoxModel, Visita } from '../models/visitas.models';


export const getVisita = async (req: Request, res: Response): Promise<void> => {
    const data = req.params;
    const { zona } = data;
    const { page = '1', limit = '50' } = req.query; // Obtener los parámetros de paginación

    if (zona === undefined) {
        res.status(400).json('Zona no válida');
        return;
    }

    const empresa = zona === 'Multired' ? 'Multired' : 'Servired';
    initChatBoxModel(empresa);

    try {
        const offset = (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);
        const Chat = await Visita.findAll({
            attributes: [
                'nombres',
                'documento',
                'sucursal',
                'supervisor',
                'fechavisita',
                'horavisita',
            ],
            offset: offset,
            limit: parseInt(limit as string, 10),
            order: [['fechavisita', 'DESC']],
        });
        res.status(200).json(Chat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
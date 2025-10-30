import { Router } from "express";
import { getArqueo, getArqueos } from "../controllers/arqueo.controllers";
import { Programacionget, PostProgramacion, GetProgramacion } from "../controllers/programacion.controllers";
import { getVisita } from "../controllers/Visita.controllers";

export const arqueoRoute = Router();
 
arqueoRoute.get("/arqueo", getArqueo); // Cambiado de /login/:username a /:username

arqueoRoute.get("/arqueos/:zona/:id", getArqueos);

arqueoRoute.post("/cronograma/:zona", PostProgramacion);

arqueoRoute.get("/cronograma/:zona", Programacionget);

arqueoRoute.get("/cronogramaid/:zona/:id", GetProgramacion);

arqueoRoute.get("/visita/:zona", getVisita);



import { Router } from "express";
import { getArqueo, getArqueos } from "../controllers/arqueo.controllers";
import {
  Programacionget,
  PostProgramacion,
  GetProgramacion,
  ProgramacionInforme,
} from "../controllers/programacion.controllers";
import { getVisita } from "../controllers/Visita.controllers";
import { GetArqueoManual, PostArqueoManual } from "../controllers/ArqueoManual";

export const arqueoRoute = Router();

arqueoRoute.get("/arqueo", getArqueo); // Cambiado de /login/:username a /:username

arqueoRoute.post("/arqueos/:zona/:id", getArqueos);

arqueoRoute.post("/cronograma", PostProgramacion);

arqueoRoute.get("/cronogramainforme", ProgramacionInforme);

arqueoRoute.get("/getcronograma", Programacionget);

arqueoRoute.post("/cronogramaid/:zona/:id", GetProgramacion);

arqueoRoute.get("/visita", getVisita);

arqueoRoute.post("/arqueomanual/:zona", PostArqueoManual);

arqueoRoute.get("/getarqueomanual", GetArqueoManual);


import { Router } from "express";
import { getloguin } from "../controllers/login.controllers";

export const loginRouter = Router();

loginRouter.post('/login', getloguin); // Cambiado de /login/:username a /:username


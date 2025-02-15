import {criar, ver, teste} from "../controller/teste.js";
import { Router } from "express";

const routesTeste = Router();

routesTeste.get("/teste", teste);
routesTeste.get("/denuncia", ver);
routesTeste.post("/denuncia", criar);

export default routesTeste;
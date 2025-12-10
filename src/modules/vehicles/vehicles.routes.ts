import { Router } from "express";
import { vehicleController } from "./vehicles.controller";

const router = Router();

router.post("/",vehicleController.addVehicle);

export const vehiclesRouter = router;
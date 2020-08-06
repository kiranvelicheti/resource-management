import express, { Request, Response } from "express";
import { employeeController } from "../../controllers";

export const router = express.Router({
  strict: true
});

router.post("/", (req: Request, res: Response) => {
  employeeController.create(req, res);
});

router.get("/", (req: Request, res: Response) => {
  employeeController.read(req, res);
});

router.patch("/", (req: Request, res: Response) => {
  employeeController.update(req, res);
});

router.delete("/", (req: Request, res: Response) => {
  employeeController.delete(req, res);
});

import { Request, Response } from "express";
import { CrudController } from "../CrudController";
import * as mongoose from "mongoose";
const employeeSchema = new mongoose.Schema({
  name: String,
  address: String,
  designation: String
});
const Employee = mongoose.model("Employee", employeeSchema);

export class EmployeeController extends CrudController {
  public create(req: Request, res: Response): void {
    new Employee(req.body).save().then(() => {
      Employee.find().then(employees => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json(employees);
      });
    });
  }
  public read(req: Request, res: Response): void {
    Employee.find().then(employees => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).json(employees);
    });
  }
  public update(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }
  public delete(req: Request, res: Response): void {
    Employee.deleteOne({ name: req.body.name }).then(error =>
      res.status(200).json("Employee Deleted")
    );
  }
}

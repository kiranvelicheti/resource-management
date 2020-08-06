"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const CrudController_1 = require("../CrudController");
const mongoose = __importStar(require("mongoose"));
const employeeSchema = new mongoose.Schema({
    name: String,
    address: String,
    designation: String
});
const Employee = mongoose.model("Employee", employeeSchema);
class EmployeeController extends CrudController_1.CrudController {
    create(req, res) {
        new Employee(req.body).save().then(() => {
            Employee.find().then(employees => {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json(employees);
            });
        });
    }
    read(req, res) {
        Employee.find().then(employees => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json(employees);
        });
    }
    update(req, res) {
        throw new Error("Method not implemented.");
    }
    delete(req, res) {
        Employee.deleteOne({ name: req.body.name }).then(error => res.status(200).json("Employee Deleted"));
    }
}
exports.EmployeeController = EmployeeController;

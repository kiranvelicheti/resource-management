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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./config/constants");
const routes_1 = require("./routes");
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
var app = express_1.default();
app.use(bodyParser.json());
mongoose_1.default.connect("mongodb://localhost:27017/resource-management", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.listen(constants_1.PORT, () => {
    console.log(`Server is listening on port ${constants_1.PORT}`);
});
app.use(cors_1.default());
app.get("/products", function (req, res, next) {
    res.json({ msg: "This is CORS-enabled for all origins!" });
});
app.use("/employees", routes_1.employeeRouter);

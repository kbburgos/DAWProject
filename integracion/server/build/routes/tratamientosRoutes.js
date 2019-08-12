"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tratamientosController_1 = __importDefault(require("../controllers/tratamientosController"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post("/addTT", tratamientosController_1.default.addTipoT);
        this.router.post("/addTratamiento", tratamientosController_1.default.addTratamiento);
        this.router.delete("/deleteTT/:id", tratamientosController_1.default.deleteTipoT);
        this.router.delete("/deleteTratamiento/:id", tratamientosController_1.default.deleteTratamiento);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;

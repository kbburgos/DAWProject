"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appControllers_1 = __importDefault(require("../controllers/appControllers"));
class GamesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", appControllers_1.default.index);
    }
}
const gamesRoutes = new GamesRoutes();
exports.default = gamesRoutes.router;

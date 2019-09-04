"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('./../../models');
const Op = require("sequelize").Op;
class IndexController {
    index(req, res) {
        res.json({ log: "hello, world" });
    }
}
exports.default = new IndexController();

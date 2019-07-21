"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.send("hello 2");
    }
}
exports.default = new IndexController();

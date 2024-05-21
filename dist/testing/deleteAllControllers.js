"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllControllers = void 0;
const db_1 = require("../db/db");
const deleteAllControllers = (req, res) => {
    db_1.db.videos = [];
    res
        .status(204)
        .json({ message: 'All data is deleted' });
};
exports.deleteAllControllers = deleteAllControllers;

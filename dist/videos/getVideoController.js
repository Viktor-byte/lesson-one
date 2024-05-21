"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoController = void 0;
const db_1 = require("../db/db");
const getVideoController = (req, res) => {
    res
        .status(200)
        .json(db_1.db.videos);
};
exports.getVideoController = getVideoController;

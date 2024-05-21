"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findVideoController = void 0;
const db_1 = require("../db/db");
const findVideoController = (req, res) => {
    const foundVideo = db_1.db.videos.find(c => c.id === +req.params.id);
    if (!foundVideo) {
        res
            .status(404)
            .json({ message: 'not found' });
        return;
    }
    res
        .status(200)
        .json(foundVideo);
};
exports.findVideoController = findVideoController;

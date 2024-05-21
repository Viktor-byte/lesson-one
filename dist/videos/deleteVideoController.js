"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideoController = void 0;
const db_1 = require("../db/db");
const deleteVideoController = (req, res) => {
    const videoToDelete = db_1.db.videos.find(x => x.id === +req.params.id);
    if (videoToDelete) {
        db_1.db.videos = db_1.db.videos.filter(x => x.id !== +req.params.id);
        res
            .status(204)
            .json({ message: 'No Content' });
    }
    else {
        res
            .status(404)
            .json({ message: 'Not Found' });
    }
};
exports.deleteVideoController = deleteVideoController;

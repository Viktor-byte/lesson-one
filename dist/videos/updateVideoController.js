"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVideoController = void 0;
const db_1 = require("../db/db");
const createVideoController_1 = require("./createVideoController");
const updateVideoController = (req, res) => {
    const errors = (0, createVideoController_1.InputValidation)(req.body);
    if (errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors);
        return;
    }
    const videoToUdate = db_1.db.videos.find(x => x.id === +req.params.id);
    if (videoToUdate) {
        videoToUdate.title = req.body.title;
        videoToUdate.author = req.body.author;
        videoToUdate.availableResolutions = req.body.availableResolutions;
        videoToUdate.canBeDownloaded = req.body.canBeDownloaded;
        videoToUdate.minAgeRestriction = req.body.minAgeRestriction;
        videoToUdate.publicationDate = req.body.publicationDate;
        res
            .status(204);
    }
    res
        .status(404)
        .json({ message: 'Not Found' });
};
exports.updateVideoController = updateVideoController;

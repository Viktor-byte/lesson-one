"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideoController = exports.InputValidation = void 0;
const db_1 = require("../db/db");
const video_types_1 = require("../input-output-types/video-types");
const InputValidation = (video) => {
    const errors = {
        errorsMessages: []
    };
    if (typeof video.title !== 'string' || video.title.length > 40) {
        errors.errorsMessages.push({
            message: 'error', field: 'title'
        });
    }
    if (typeof video.author !== 'string' || video.author.length > 20) {
        errors.errorsMessages.push({
            message: 'error', field: 'author'
        });
    }
    if (!Array.isArray(video.availableResolutions) || video.availableResolutions.find(x => !video_types_1.Resolutions[x])) {
        errors.errorsMessages.push({
            message: 'error', field: 'availableResolutions'
        });
    }
    return errors;
};
exports.InputValidation = InputValidation;
const createVideoController = (req, res) => {
    const errors = (0, exports.InputValidation)(req.body);
    if (errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors);
        return;
    }
    const newVideo = Object.assign(Object.assign({}, req.body), { id: Date.now() + Math.random(), canBeDownloaded: true, minAgeRestriction: null, createdAt: new Date().toISOString(), publicationDate: new Date().toISOString() });
    db_1.db.videos = [...db_1.db.videos, newVideo];
    res
        .status(201)
        .json(newVideo);
};
exports.createVideoController = createVideoController;

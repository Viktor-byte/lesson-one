"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDB = exports.db = void 0;
exports.db = {
    videos: [],
};
const setDB = (dataset) => {
    if (!dataset) {
        exports.db.videos = [];
        return;
    }
    exports.db.videos = dataset.videos || exports.db.videos;
};
exports.setDB = setDB;

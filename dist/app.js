"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const settings_1 = require("./settings");
const index_1 = require("./videos/index");
const testing_1 = require("./testing");
const getVideoController_1 = require("./videos/getVideoController");
exports.app = (0, express_1.default)();
exports.app.get('/', (req, res) => {
    res.status(200).json({ version: '1.0' });
});
exports.app.use(express_1.default.json());
exports.app.use(settings_1.SETTINGS.PATH.VIDEOS, index_1.videosRouter);
exports.app.use(settings_1.SETTINGS.PATH.TESTING, testing_1.testingVideoRouter);
exports.app.get(settings_1.SETTINGS.PATH.VIDEOS, getVideoController_1.getVideoController);

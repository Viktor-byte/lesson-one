"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingVideoRouter = void 0;
const express_1 = require("express");
const deleteAllControllers_1 = require("./deleteAllControllers");
exports.testingVideoRouter = (0, express_1.Router)();
exports.testingVideoRouter.delete('/', deleteAllControllers_1.deleteAllControllers);

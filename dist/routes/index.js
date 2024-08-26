"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const titleRoutes_1 = __importDefault(require("./titleRoutes"));
const router = (0, express_1.Router)();
router.use('/titles', titleRoutes_1.default);
exports.default = router;

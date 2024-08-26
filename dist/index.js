"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const environment_1 = require("./config/environment");
const database_1 = __importDefault(require("./config/database"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = environment_1.environment.port || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
(0, database_1.default)();
app.get("/", (req, res) => {
    res.send("Express + TypeScriptd Server");
});
app.use('/api', index_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

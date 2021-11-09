"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./config/index");
const express_1 = __importDefault(require("express"));
const api_1 = require("./api");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
(0, index_1.createConfig)();
const port = process.env.APP_PORT || 3030;
const app = (0, express_1.default)();
(0, api_1.registerRouters)(app);
app.get('/', async (req, res) => {
    console.log(req.url);
    res.send('Im alive!');
});
(0, typeorm_1.createConnection)().then(() => app.listen(port, () => console.log(`Started on port ${port}`)));
//# sourceMappingURL=index.js.map
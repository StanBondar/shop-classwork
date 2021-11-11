"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const api_1 = require("./api");
const config_1 = require("./config");
(0, config_1.createConfig)();
const app = (0, express_1.default)();
app.get('/', async (req, res) => {
    console.log(req.url);
    res.send(`Im alive! ${config_1.EnvConfig.PORT}`);
});
(0, api_1.registerRouters)(app);
// createConnection().then(() =>
app.listen(config_1.EnvConfig.PORT, () => console.log(`Started on port ${config_1.EnvConfig.PORT}`));
// );
//# sourceMappingURL=index.js.map
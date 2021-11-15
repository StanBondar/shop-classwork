"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouters = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const auth_middleware_1 = require("./auth/auth.middleware");
const items_1 = __importDefault(require("./items"));
const route_1 = __importDefault(require("./purches/route"));
const lodash_1 = require("lodash");
const accounts_1 = __importDefault(require("./accounts"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const cards_1 = __importDefault(require("./cards"));
const registerRouters = (app) => {
    app.use((0, express_1.json)());
    app.use('/auth', auth_1.default);
    const filesPath = path_1.default.join(__dirname, '../db/files/');
    app.use((0, express_fileupload_1.default)());
    app.post('/upload', async (req, res) => {
        const file = req.files.test;
        await file.mv(filesPath + file.name);
        return res.send('Success');
        // return res.download(filesPath + '1.jpg');
    });
    app.get('/download/:fileName', async (req, res) => {
        const file = `${filesPath}${req.params.fileName}`;
        return res.download(file);
    });
    app.use('/', auth_middleware_1.authMiddleware);
    app.use('/whoami', (req, res) => {
        return res.send(req.user);
    });
    app.use('/purchases', route_1.default);
    app.use('/items', items_1.default);
    app.use('/accounts', accounts_1.default);
    app.use('/', (err, req, res, next) => {
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 400).send((0, lodash_1.omit)(err, 'statusCode'));
    });
    app.use('/accounts', accounts_1.default);
    app.use('/cards', cards_1.default);
};
exports.registerRouters = registerRouters;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfig = exports.EnvConfig = void 0;
const dotenv_1 = require("dotenv");
exports.EnvConfig = {
    SECRET_KEY: '',
};
const createConfig = () => {
    (0, dotenv_1.config)();
    exports.EnvConfig.PORT = Number(process.env.PORT) || 3000;
    exports.EnvConfig.SECRET_KEY = process.env.SECRET_KEY;
};
exports.createConfig = createConfig;
//# sourceMappingURL=index.js.map
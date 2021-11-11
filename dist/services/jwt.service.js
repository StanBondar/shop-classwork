"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const lodash_1 = require("lodash");
const config_1 = require("../config");
class JwtService {
    decode(token) {
        return (0, jsonwebtoken_1.verify)(token, config_1.EnvConfig.SECRET_KEY);
    }
    encode(data) {
        return (0, jsonwebtoken_1.sign)((0, lodash_1.pick)(data, 'login', 'id', 'role'), config_1.EnvConfig.SECRET_KEY, {
            expiresIn: '4h',
        });
    }
}
exports.default = new JwtService();
//# sourceMappingURL=jwt.service.js.map
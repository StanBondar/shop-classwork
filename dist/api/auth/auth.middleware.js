"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authByRoleMiddleware = exports.authMiddleware = void 0;
const user_entity_1 = require("../../db/entities/user.entity");
const jwt_service_1 = __importDefault(require("../../services/jwt.service"));
const authMiddleware = async (req, res, next) => {
    const token = (req.headers.authorization || '').split(' ')[1];
    try {
        const { id } = jwt_service_1.default.decode(token);
        const user = await user_entity_1.UserEntity.findOne(id);
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).send('Invalid Token');
    }
};
exports.authMiddleware = authMiddleware;
const authByRoleMiddleware = (role) => {
    return async (req, res, next) => {
        const user = req.user;
        if (!user || user.role !== role) {
            return res.status(401).send('Invalid Token');
        }
        next();
    };
};
exports.authByRoleMiddleware = authByRoleMiddleware;
//# sourceMappingURL=auth.middleware.js.map
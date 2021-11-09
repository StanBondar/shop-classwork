"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registration = void 0;
const lodash_1 = require("lodash");
const user_entity_1 = require("../../db/entities/user.entity");
const jwt_service_1 = __importDefault(require("../../services/jwt.service"));
const wrapper_helpers_1 = require("../../tools/wrapper.helpers");
exports.registration = (0, wrapper_helpers_1.wrapper)(async (req, res) => {
    const data = (0, lodash_1.pick)(req.body, 'login', 'password', 'role');
    const isLoginInUse = !!(await user_entity_1.UserEntity.findOne({ login: data.login }));
    if (isLoginInUse) {
        throw new wrapper_helpers_1.HttpError('Aaaa');
    }
    const user = new user_entity_1.UserEntity();
    (0, lodash_1.assign)(user, data);
    await user.save();
    res.status(201).send(`User with id ${user.id} created!`);
});
const login = async (req, res) => {
    const { password, login } = (0, lodash_1.pick)(req.body, 'password', 'login');
    const user = await user_entity_1.UserEntity.findOne({ login }, { select: ['password', 'id', 'role', 'login'] });
    if (!user || !user.verifyPassword(password)) {
        return res.status(400).send('I dont know you bro');
    }
    const token = jwt_service_1.default.encode(user);
    return res.send({ token });
};
exports.login = login;
//# sourceMappingURL=post.js.map
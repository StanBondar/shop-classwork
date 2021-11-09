"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_1 = require("./post");
const router = (0, express_1.Router)();
router.post('/registration', post_1.registration);
router.post('/login', post_1.login);
exports.default = router;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_1 = require("./get");
const wrapper_helpers_1 = require("../../tools/wrapper.helpers");
const user_entity_1 = require("../../db/entities/user.entity");
const router = (0, express_1.Router)();
router.get('/:id', (0, wrapper_helpers_1.checkEntityId)(user_entity_1.UserEntity), get_1.getUserAccount);
exports.default = router;
//# sourceMappingURL=route.js.map
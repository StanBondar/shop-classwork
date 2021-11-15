"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_1 = require("./get");
const post_1 = require("./post");
const patch_1 = require("./patch");
const delete_1 = require("./delete");
const router = (0, express_1.Router)();
router.get('/', get_1.getCards);
router.post('/', post_1.postCards);
router.patch('/', patch_1.patchCards);
router.delete('/', delete_1.deleteCards);
exports.default = router;
//# sourceMappingURL=index.js.map
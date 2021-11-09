"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wrapper_helpers_1 = require("../../tools/wrapper.helpers");
const get_1 = require("./get");
const post_1 = require("./post");
const post_item_request_1 = require("./requests/post-item.request");
const router = (0, express_1.Router)();
router.post('/', (0, wrapper_helpers_1.validationMiddleware)(post_item_request_1.PostItemRequest), post_1.postItems);
router.get('/', get_1.getItems);
exports.default = router;
//# sourceMappingURL=index.js.map
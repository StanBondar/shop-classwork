"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_1 = require("./get");
const put_1 = require("./put");
const post_1 = require("./post");
const delete_1 = require("./delete");
const patch_1 = require("./patch");
const purchase_entity_1 = require("../../db/entities/purchase.entity");
const wrapper_helpers_1 = require("../../tools/wrapper.helpers");
const post_item_request_1 = require("./requests/post-item.request");
const router = (0, express_1.Router)();
router.get('/', get_1.getPurches);
router.post('/', (0, wrapper_helpers_1.validationMiddleware)(post_item_request_1.PostPurchaseRequest), post_1.postPurchases);
router.put('/', put_1.putPurches);
router.delete('/', delete_1.deletePurches);
router.patch('/:id', (0, wrapper_helpers_1.checkEntityId)(purchase_entity_1.PurchaseEntity), (0, wrapper_helpers_1.validationMiddleware)(wrapper_helpers_1.PatchPurchaseRequest), patch_1.patchPurchases);
exports.default = router;
//# sourceMappingURL=route.js.map
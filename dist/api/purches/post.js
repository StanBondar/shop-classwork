"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPurchases = void 0;
const lodash_1 = require("lodash");
const purchase_entity_1 = require("../../db/entities/purchase.entity");
const wrapper_helpers_1 = require("../../tools/wrapper.helpers");
const item_entity_1 = require("../../db/entities/item.entity");
exports.postPurchases = (0, wrapper_helpers_1.wrapper)(async (req, res) => {
    const { itemId, count } = (0, lodash_1.pick)(req.body, 'itemId', 'count');
    const item = await item_entity_1.ItemEntity.findOne(itemId);
    if (!item) {
        // res.status(404).send('Invalid item chosen');
        throw new wrapper_helpers_1.HttpError('Invalid item chosen', 404);
    }
    if (item.quantity < count) {
        throw new wrapper_helpers_1.HttpError(`Only ${item.quantity} items available, But you have chosen ${count}. Please check your cart`);
    }
    const purchase = new purchase_entity_1.PurchaseEntity();
    item.quantity = item.quantity - count;
    item.save();
    (0, lodash_1.assign)(purchase, { item, itemQuantity: count });
    purchase.customer = req.user;
    await purchase.save();
    res.status(201).send('Items has been purchased');
});
//# sourceMappingURL=post.js.map
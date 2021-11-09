"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchPurchases = void 0;
const wrapper_helpers_1 = require("../../tools/wrapper.helpers");
const purchase_status_enum_1 = require("../../enums/purchase-status.enum");
exports.patchPurchases = (0, wrapper_helpers_1.wrapper)(async (req, res) => {
    const { status } = req.body;
    if (!status) {
        throw new wrapper_helpers_1.HttpError('Please, provide status to change');
    }
    const availableStatuses = Object.values(purchase_status_enum_1.PurchaseStatusEnum);
    if (!availableStatuses.includes(status)) {
        throw new wrapper_helpers_1.HttpError(`Please, provide valid status to change. Status have to be one of the next: ${availableStatuses.join(', ')}`);
    }
    const purchase = req.entity;
    if (purchase.customerId !== req.user.id) {
        throw new wrapper_helpers_1.HttpError('Go fuck yourself');
    }
    if (purchase.status === purchase_status_enum_1.PurchaseStatusEnum.CANCELLED) {
        throw new wrapper_helpers_1.HttpError('Cannot change status of cancelled order. Please create new.');
    }
    if (status === purchase_status_enum_1.PurchaseStatusEnum.CANCELLED) {
        const item = await purchase.item;
        item.quantity += purchase.itemQuantity;
        await item.save();
    }
    purchase.status = status;
    await purchase.save();
    return res
        .status(200)
        .send(`Purchase #${purchase.id} status has been changed to ${status}`);
});
//# sourceMappingURL=patch.js.map
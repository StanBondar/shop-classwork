"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPurches = void 0;
const wrapper_helpers_1 = require("../../tools/wrapper.helpers");
const purchase_status_enum_1 = require("../../enums/purchase-status.enum");
exports.getPurches = (0, wrapper_helpers_1.wrapper)(async (req, res) => {
    const { status } = req.query;
    const statuses = status ? [status] : Object.values(purchase_status_enum_1.PurchaseStatusEnum);
    const purchase = await req.user.purchases;
    res.status(200).send(purchase.filter((p) => statuses.includes(p.status)));
});
//# sourceMappingURL=get.js.map
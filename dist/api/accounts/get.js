"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccounts = void 0;
const typeorm_1 = require("typeorm");
const purchase_entity_1 = require("../../db/entities/purchase.entity");
const user_role_enum_1 = require("../../enums/user-role.enum");
const wrapper_helpers_1 = require("../../tools/wrapper.helpers");
const account_response_1 = require("./responses/account.response");
exports.getAccounts = (0, wrapper_helpers_1.wrapper)(async (req, res) => {
    const { entity, user } = req;
    if (user.role === user_role_enum_1.UserRoleEnum.SELLER) {
        const items = await user.items;
        const purchases = await purchase_entity_1.PurchaseEntity.find({
            where: {
                itemId: (0, typeorm_1.In)(items.map(el => el.id))
            }
        });
        const customer = purchases.map(el => el.customerId).find(el => el === entity.id);
        if (!customer) {
            throw new wrapper_helpers_1.HttpError('No user found', 404);
        }
        return res.status(200).send(new account_response_1.AccountResponse(entity));
    }
    else {
        {
            const purchases = await user.purchases;
            const sellersIds = await Promise.all(purchases.map(async (el) => {
                const item = await el.item;
                return item.sellerId;
            }));
            if (sellersIds.includes(entity.id)) {
                return res.status(200).send(new account_response_1.AccountResponse(entity));
            }
            else {
                throw new wrapper_helpers_1.HttpError('not found', 404);
            }
        }
    }
});
//# sourceMappingURL=get.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postItems = void 0;
const lodash_1 = require("lodash");
const item_entity_1 = require("../../db/entities/item.entity");
const user_role_enum_1 = require("../../enums/user-role.enum");
const wrapper_helpers_1 = require("../../tools/wrapper.helpers");
exports.postItems = (0, wrapper_helpers_1.wrapper)(async (req, res) => {
    const user = req.user;
    if (user.role !== user_role_enum_1.UserRoleEnum.SELLER) {
        throw new wrapper_helpers_1.HttpError(`This action is not permitted for role ${user.role}`);
    }
    const item = new item_entity_1.ItemEntity();
    (0, lodash_1.assign)(item, (0, lodash_1.pick)(req.body, 'price', 'quantity', 'title'));
    item.seller = user;
    await item.save();
    res.status(201).send(`Item has been created ${item.id}`);
});
//# sourceMappingURL=post.js.map
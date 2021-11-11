"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItems = void 0;
const wrapper_helpers_1 = require("../../tools/wrapper.helpers");
exports.getItems = (0, wrapper_helpers_1.wrapper)(async (req, res) => {
    const i2 = await req.user.items;
    return res.send(i2);
});
//# sourceMappingURL=get.js.map
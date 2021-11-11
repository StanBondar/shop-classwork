"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountResponse = void 0;
const lodash_1 = require("lodash");
class AccountResponse {
    constructor(data) {
        this.login = undefined;
        this.id = undefined;
        this.role = undefined;
        if (data) {
            (0, lodash_1.assign)(this, (0, lodash_1.pick)(data, (0, lodash_1.keys)(new AccountResponse())));
        }
    }
}
exports.AccountResponse = AccountResponse;
//# sourceMappingURL=account.response.js.map
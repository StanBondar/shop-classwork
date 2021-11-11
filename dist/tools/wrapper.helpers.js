"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = exports.PatchPurchaseRequest = exports.BaseRequest = exports.checkEntityId = exports.wrapper = exports.HttpValidationError = exports.HttpError = void 0;
const lodash_1 = require("lodash");
const purchase_status_enum_1 = require("../enums/purchase-status.enum");
const class_validator_1 = require("class-validator");
class HttpError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.HttpError = HttpError;
class HttpValidationError extends HttpError {
    constructor(errors) {
        super('Validation error', 400);
        this.errors = errors;
    }
}
exports.HttpValidationError = HttpValidationError;
function wrapper(func) {
    return async function (req, res, next) {
        try {
            await func.apply(this, [req, res, next]);
        }
        catch (err) {
            next(err);
        }
    };
}
exports.wrapper = wrapper;
const checkEntityId = (entity) => {
    return async (req, res, next) => {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send('Invalid item id provided');
        }
        const findedEntity = await entity.findOne(id);
        if (!findedEntity) {
            // return new HttpError("Invalid item id provided", 404);
            // TODO create wrapper for middleware and cover it
            return res.status(404).send('Invalid item id provided');
        }
        req.entity = findedEntity;
        next();
    };
};
exports.checkEntityId = checkEntityId;
class BaseRequest {
    constructor(data) {
        (0, lodash_1.assign)(this, data);
    }
}
exports.BaseRequest = BaseRequest;
class PatchPurchaseRequest extends BaseRequest {
}
__decorate([
    (0, class_validator_1.IsEnum)([purchase_status_enum_1.PurchaseStatusEnum.CANCELLED, purchase_status_enum_1.PurchaseStatusEnum.FULFILLED]),
    __metadata("design:type", String)
], PatchPurchaseRequest.prototype, "status", void 0);
exports.PatchPurchaseRequest = PatchPurchaseRequest;
const validationMiddleware = (entity) => wrapper(async (req, res, next) => {
    const body = req.body;
    const newEntity = new entity(body);
    const wqe = await (0, class_validator_1.validate)(newEntity);
    console.log(wqe);
    await (0, class_validator_1.validateOrReject)(newEntity).catch((errs) => {
        throw new HttpValidationError(errs);
    });
    next();
});
exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=wrapper.helpers.js.map
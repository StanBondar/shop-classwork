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
exports.PurchaseEntity = void 0;
const typeorm_1 = require("typeorm");
const purchase_status_enum_1 = require("../../enums/purchase-status.enum");
const base_entity_1 = require("./base.entity");
const item_entity_1 = require("./item.entity");
const user_entity_1 = require("./user.entity");
let PurchaseEntity = class PurchaseEntity extends base_entity_1.Base {
};
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: purchase_status_enum_1.PurchaseStatusEnum,
        default: purchase_status_enum_1.PurchaseStatusEnum.PENDING,
    }),
    __metadata("design:type", String)
], PurchaseEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PurchaseEntity.prototype, "itemId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PurchaseEntity.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 1,
    }),
    __metadata("design:type", Number)
], PurchaseEntity.prototype, "itemQuantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_entity_1.ItemEntity),
    __metadata("design:type", Promise)
], PurchaseEntity.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    __metadata("design:type", user_entity_1.UserEntity)
], PurchaseEntity.prototype, "customer", void 0);
PurchaseEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'purchases' })
], PurchaseEntity);
exports.PurchaseEntity = PurchaseEntity;
//# sourceMappingURL=purchase.entity.js.map
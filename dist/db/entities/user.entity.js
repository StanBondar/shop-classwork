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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const crypto_1 = __importDefault(require("crypto"));
const user_role_enum_1 = require("../../enums/user-role.enum");
const base_entity_1 = require("./base.entity");
const item_entity_1 = require("./item.entity");
const purchase_entity_1 = require("./purchase.entity");
let UserEntity = class UserEntity extends base_entity_1.Base {
    encryptPassword() {
        this.password = this.getPasswordHash(this.password);
    }
    verifyPassword(password) {
        const passwordHash = this.getPasswordHash(password);
        return this.password === passwordHash;
    }
    getPasswordHash(password) {
        return crypto_1.default
            .createHash('sha256')
            .update(password, 'binary')
            .digest('base64');
    }
};
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        unique: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "login", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_role_enum_1.UserRoleEnum,
        default: user_role_enum_1.UserRoleEnum.CUSTOMER,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        default: 300,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_entity_1.ItemEntity, (item) => item.seller),
    __metadata("design:type", Promise)
], UserEntity.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => purchase_entity_1.PurchaseEntity, (purchase) => purchase.customer),
    __metadata("design:type", Promise)
], UserEntity.prototype, "purchases", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserEntity.prototype, "encryptPassword", null);
UserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], UserEntity);
exports.UserEntity = UserEntity;
// console.log(a);
//# sourceMappingURL=user.entity.js.map
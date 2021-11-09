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
exports.PostItemRequest = exports.MIN_ITEM_PRICE = void 0;
const class_validator_1 = require("class-validator");
const wrapper_helpers_1 = require("../../../tools/wrapper.helpers");
exports.MIN_ITEM_PRICE = 1;
class PostItemRequest extends wrapper_helpers_1.BaseRequest {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(exports.MIN_ITEM_PRICE),
    __metadata("design:type", Number)
], PostItemRequest.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PostItemRequest.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PostItemRequest.prototype, "quantity", void 0);
exports.PostItemRequest = PostItemRequest;
//# sourceMappingURL=post-item.request.js.map
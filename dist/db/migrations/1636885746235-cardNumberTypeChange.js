"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardNumberTypeChange1636885746235 = void 0;
class cardNumberTypeChange1636885746235 {
    constructor() {
        this.name = 'cardNumberTypeChange1636885746235';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "cardNumber"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "cardNumber" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "cardNumber"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "cardNumber" integer NOT NULL`);
    }
}
exports.cardNumberTypeChange1636885746235 = cardNumberTypeChange1636885746235;
//# sourceMappingURL=1636885746235-cardNumberTypeChange.js.map
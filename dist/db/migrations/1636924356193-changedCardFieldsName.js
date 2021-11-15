"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changedCardFieldsName1636924356193 = void 0;
class changedCardFieldsName1636924356193 {
    constructor() {
        this.name = 'changedCardFieldsName1636924356193';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "expiredDate"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "cardType"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "cardNumber"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "expired" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "expired"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "cardNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "cardType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "expiredDate" character varying NOT NULL`);
    }
}
exports.changedCardFieldsName1636924356193 = changedCardFieldsName1636924356193;
//# sourceMappingURL=1636924356193-changedCardFieldsName.js.map
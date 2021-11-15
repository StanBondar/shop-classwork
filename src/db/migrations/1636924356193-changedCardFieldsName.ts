import {MigrationInterface, QueryRunner} from "typeorm";

export class changedCardFieldsName1636924356193 implements MigrationInterface {
    name = 'changedCardFieldsName1636924356193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "expiredDate"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "cardType"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "cardNumber"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "expired" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "expired"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "cardNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "cardType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "expiredDate" character varying NOT NULL`);
    }

}

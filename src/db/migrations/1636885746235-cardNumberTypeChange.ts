import {MigrationInterface, QueryRunner} from "typeorm";

export class cardNumberTypeChange1636885746235 implements MigrationInterface {
    name = 'cardNumberTypeChange1636885746235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "cardNumber"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "cardNumber" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "cardNumber"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "cardNumber" integer NOT NULL`);
    }

}

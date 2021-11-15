import {MigrationInterface, QueryRunner} from "typeorm";

export class UniqCardNumber1636979533756 implements MigrationInterface {
    name = 'UniqCardNumber1636979533756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "UQ_5deec73c016e2940ce4ced835e2" UNIQUE ("number")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "UQ_5deec73c016e2940ce4ced835e2"`);
    }

}

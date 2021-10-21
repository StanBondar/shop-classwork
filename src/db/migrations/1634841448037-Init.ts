import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1634841448037 implements MigrationInterface {
    name = 'Init1634841448037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."purchases_status_enum" AS ENUM('PENDING', 'CANCELLED', 'FULFILLED')`);
        await queryRunner.query(`CREATE TABLE "purchases" ("id" SERIAL NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deleteDate" TIMESTAMP, "status" "public"."purchases_status_enum" NOT NULL DEFAULT 'PENDING', "itemId" integer, "customerId" integer, CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('CUSTOMER', 'SELLER', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deleteDate" TIMESTAMP, "login" text NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'CUSTOMER', "password" character varying NOT NULL, "balance" numeric NOT NULL DEFAULT '300', CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" SERIAL NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deleteDate" TIMESTAMP, "price" integer NOT NULL, "title" character varying NOT NULL, "quantity" integer NOT NULL, "sellerId" integer, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "FK_a0fc991b61b29f2d0617ae41371" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "FK_04fd2f77d76adcfe5c78d6deb87" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_63e65ad885f4161dabb35d90e09" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_63e65ad885f4161dabb35d90e09"`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_04fd2f77d76adcfe5c78d6deb87"`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_a0fc991b61b29f2d0617ae41371"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "purchases"`);
        await queryRunner.query(`DROP TYPE "public"."purchases_status_enum"`);
    }

}

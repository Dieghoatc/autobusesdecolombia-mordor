import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFieldsTables1752802247372 implements MigrationInterface {
    name = 'UpdateFieldsTables1752802247372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" RENAME COLUMN "created_at" TO "description"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "countries" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "chassis" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP COLUMN "last_modification"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photographers" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "photos" ALTER COLUMN "created_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "photographers" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "description" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "created_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photos" ADD "last_modification" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chassis" ADD "created_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "countries" ADD "created_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "created_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "created_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "companies" RENAME COLUMN "description" TO "created_at"`);
    }

}

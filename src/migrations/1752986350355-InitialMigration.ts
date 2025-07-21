import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1752986350355 implements MigrationInterface {
    name = 'InitialMigration1752986350355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "slug" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "slug"`);
    }

}

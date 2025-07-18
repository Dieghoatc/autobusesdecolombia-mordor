import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultToCreatedAtInBodyworks1752797224477 implements MigrationInterface {
    name = 'AddDefaultToCreatedAtInBodyworks1752797224477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bodyworks" ALTER COLUMN "created_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bodyworks" ALTER COLUMN "created_at" DROP DEFAULT`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCreateAtfieldBodywork1752796968348 implements MigrationInterface {
    name = 'UpdateCreateAtfieldBodywork1752796968348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD "created_at" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD "created_at" date NOT NULL`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteFieldsBodyworkTable1752792961570 implements MigrationInterface {
    name = 'DeleteFieldsBodyworkTable1752792961570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP COLUMN "date_start"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP COLUMN "date_end"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD "date_end" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD "date_start" TIMESTAMP NOT NULL`);
    }

}

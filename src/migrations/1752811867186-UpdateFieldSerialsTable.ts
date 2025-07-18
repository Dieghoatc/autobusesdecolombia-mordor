import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFieldSerialsTable1752811867186 implements MigrationInterface {
    name = 'UpdateFieldSerialsTable1752811867186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "serials" ALTER COLUMN "company_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "serials" ALTER COLUMN "company_id" SET NOT NULL`);
    }

}

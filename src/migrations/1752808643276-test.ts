import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1752808643276 implements MigrationInterface {
    name = 'Test1752808643276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chassis" ALTER COLUMN "description" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chassis" ALTER COLUMN "description" DROP NOT NULL`);
    }

}

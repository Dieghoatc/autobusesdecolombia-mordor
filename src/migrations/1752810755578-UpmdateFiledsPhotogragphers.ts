import { MigrationInterface, QueryRunner } from "typeorm";

export class UpmdateFiledsPhotogragphers1752810755578 implements MigrationInterface {
    name = 'UpmdateFiledsPhotogragphers1752810755578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photographers" DROP CONSTRAINT "UQ_eb11643ce7440cd7b40efa11b86"`);
        await queryRunner.query(`ALTER TABLE "photographers" DROP CONSTRAINT "UQ_326173677b395ac71e093ded28c"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photographers" ADD CONSTRAINT "UQ_326173677b395ac71e093ded28c" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "photographers" ADD CONSTRAINT "UQ_eb11643ce7440cd7b40efa11b86" UNIQUE ("email")`);
    }

}

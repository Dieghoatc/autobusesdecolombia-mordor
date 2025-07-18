import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFieldSerialCode1752811966545 implements MigrationInterface {
    name = 'UpdateFieldSerialCode1752811966545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "serials" DROP CONSTRAINT "UQ_1878cd334630a7237b71ad1b51b"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "serials" ADD CONSTRAINT "UQ_1878cd334630a7237b71ad1b51b" UNIQUE ("serial_code")`);
    }

}

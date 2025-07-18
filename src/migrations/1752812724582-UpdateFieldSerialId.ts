import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFieldSerialId1752812724582 implements MigrationInterface {
    name = 'UpdateFieldSerialId1752812724582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_fc7f37349dd88a58bce279c98fa"`);
        await queryRunner.query(`ALTER TABLE "photos" ALTER COLUMN "serial_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_fc7f37349dd88a58bce279c98fa" FOREIGN KEY ("serial_id") REFERENCES "serials"("serial_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_fc7f37349dd88a58bce279c98fa"`);
        await queryRunner.query(`ALTER TABLE "photos" ALTER COLUMN "serial_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_fc7f37349dd88a58bce279c98fa" FOREIGN KEY ("serial_id") REFERENCES "serials"("serial_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

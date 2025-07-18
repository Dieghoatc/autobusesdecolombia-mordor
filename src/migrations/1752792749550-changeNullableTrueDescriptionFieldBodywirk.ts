import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeNullableTrueDescriptionFieldBodywirk1752792749550 implements MigrationInterface {
    name = 'ChangeNullableTrueDescriptionFieldBodywirk1752792749550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP CONSTRAINT "FK_50756b106c808feffe133f4effa"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD CONSTRAINT "UQ_50756b106c808feffe133f4effa" UNIQUE ("vehicle_id")`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD CONSTRAINT "FK_50756b106c808feffe133f4effa" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("vehicle_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP CONSTRAINT "FK_50756b106c808feffe133f4effa"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP CONSTRAINT "UQ_50756b106c808feffe133f4effa"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD CONSTRAINT "FK_50756b106c808feffe133f4effa" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("vehicle_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

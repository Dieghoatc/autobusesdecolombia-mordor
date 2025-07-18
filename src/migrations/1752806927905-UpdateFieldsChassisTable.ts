import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFieldsChassisTable1752806927905 implements MigrationInterface {
    name = 'UpdateFieldsChassisTable1752806927905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chassis" DROP CONSTRAINT "FK_d5d68b66ef680cd22875325ee35"`);
        await queryRunner.query(`ALTER TABLE "chassis" DROP CONSTRAINT "FK_cbcb9842c0e523c1d479b375860"`);
        await queryRunner.query(`ALTER TABLE "chassis" DROP CONSTRAINT "UQ_d5d68b66ef680cd22875325ee35"`);
        await queryRunner.query(`ALTER TABLE "chassis" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chassis" DROP CONSTRAINT "UQ_cbcb9842c0e523c1d479b375860"`);
        await queryRunner.query(`ALTER TABLE "chassis" ADD CONSTRAINT "FK_d5d68b66ef680cd22875325ee35" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chassis" ADD CONSTRAINT "FK_cbcb9842c0e523c1d479b375860" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("vehicle_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chassis" DROP CONSTRAINT "FK_cbcb9842c0e523c1d479b375860"`);
        await queryRunner.query(`ALTER TABLE "chassis" DROP CONSTRAINT "FK_d5d68b66ef680cd22875325ee35"`);
        await queryRunner.query(`ALTER TABLE "chassis" ADD CONSTRAINT "UQ_cbcb9842c0e523c1d479b375860" UNIQUE ("vehicle_id")`);
        await queryRunner.query(`ALTER TABLE "chassis" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chassis" ADD CONSTRAINT "UQ_d5d68b66ef680cd22875325ee35" UNIQUE ("brand_id")`);
        await queryRunner.query(`ALTER TABLE "chassis" ADD CONSTRAINT "FK_cbcb9842c0e523c1d479b375860" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("vehicle_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chassis" ADD CONSTRAINT "FK_d5d68b66ef680cd22875325ee35" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

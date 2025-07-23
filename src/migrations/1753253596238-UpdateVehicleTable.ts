import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateVehicleTable1753253596238 implements MigrationInterface {
    name = 'UpdateVehicleTable1753253596238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_73799befe8cf03cf49595d96d6d"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "brand_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "brand_id" integer`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_73799befe8cf03cf49595d96d6d" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

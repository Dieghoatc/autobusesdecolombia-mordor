import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewRelationshipVehicleTable1754123098461 implements MigrationInterface {
    name = 'AddNewRelationshipVehicleTable1754123098461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "Company_service_id" integer`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "company_service_id" integer`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_5ab9a69402f341afbea070d1f12" FOREIGN KEY ("company_service_id") REFERENCES "company_services"("company_service_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_5ab9a69402f341afbea070d1f12"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "company_service_id"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "Company_service_id"`);
    }

}

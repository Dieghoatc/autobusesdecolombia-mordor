import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAditionalVehicleColumn1754124299932 implements MigrationInterface {
    name = 'FixAditionalVehicleColumn1754124299932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "Company_service_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "Company_service_id" integer`);
    }

}

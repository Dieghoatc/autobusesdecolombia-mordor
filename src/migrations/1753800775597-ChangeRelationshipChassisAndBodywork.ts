import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRelationshipChassisAndBodywork1753800775597 implements MigrationInterface {
    name = 'ChangeRelationshipChassisAndBodywork1753800775597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP CONSTRAINT "FK_bbb4021244c454b07ffeeef3741"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_655b89bf3ac08e8b6776f775575"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_62860a5075e8b560dac316b466a"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP COLUMN "vehiclesVehicleId"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "chassis_id"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "bodywork_id"`);
        await queryRunner.query(`ALTER TABLE "models" ADD "chassis_id" integer`);
        await queryRunner.query(`ALTER TABLE "models" ADD "bodywork_id" integer`);
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "company_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "UQ_63e7e33fa9ee7faabb6534b6996" UNIQUE ("company_name")`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "FK_ccd543cf580c5e0f1c7b044ebe8" FOREIGN KEY ("chassis_id") REFERENCES "chassis"("chassis_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "FK_dd7b270a2da01b102588768d2f6" FOREIGN KEY ("bodywork_id") REFERENCES "bodyworks"("bodywork_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "FK_dd7b270a2da01b102588768d2f6"`);
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "FK_ccd543cf580c5e0f1c7b044ebe8"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "UQ_63e7e33fa9ee7faabb6534b6996"`);
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "company_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "models" DROP COLUMN "bodywork_id"`);
        await queryRunner.query(`ALTER TABLE "models" DROP COLUMN "chassis_id"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "bodywork_id" integer`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "chassis_id" integer`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD "vehiclesVehicleId" integer`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_62860a5075e8b560dac316b466a" FOREIGN KEY ("bodywork_id") REFERENCES "bodyworks"("bodywork_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_655b89bf3ac08e8b6776f775575" FOREIGN KEY ("chassis_id") REFERENCES "chassis"("chassis_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD CONSTRAINT "FK_bbb4021244c454b07ffeeef3741" FOREIGN KEY ("vehiclesVehicleId") REFERENCES "vehicles"("vehicle_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

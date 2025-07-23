import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCompaniRelations1753247468917 implements MigrationInterface {
    name = 'UpdateCompaniRelations1753247468917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_c8c9d14085d88002c64bfb06694"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_633dd8e013069e090ab81b8b2d8"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "company_serial_id"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "company_service_id"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "servicio" character varying`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "routes" character varying`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_a6f6fc4607b7715ccc77be05051" FOREIGN KEY ("company_serial_id") REFERENCES "company_serials"("company_serial_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_5ab9a69402f341afbea070d1f12" FOREIGN KEY ("company_service_id") REFERENCES "company_services"("company_service_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_5ab9a69402f341afbea070d1f12"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_a6f6fc4607b7715ccc77be05051"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "routes"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "servicio"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "company_service_id" integer`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "company_serial_id" integer`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_633dd8e013069e090ab81b8b2d8" FOREIGN KEY ("company_serial_id") REFERENCES "company_serials"("company_serial_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_c8c9d14085d88002c64bfb06694" FOREIGN KEY ("company_service_id") REFERENCES "company_services"("company_service_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

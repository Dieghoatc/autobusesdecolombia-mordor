import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSerialsAndServicesRelationship1753565445976 implements MigrationInterface {
    name = 'UpdateSerialsAndServicesRelationship1753565445976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_serials" DROP CONSTRAINT "FK_a51d781354a668c0c7bc23cbe6d"`);
        await queryRunner.query(`ALTER TABLE "company_services" DROP CONSTRAINT "FK_8887ba6608f01a5f67c7a1be44f"`);
        await queryRunner.query(`ALTER TABLE "company_serials" RENAME COLUMN "companiesCompanyId" TO "company_id"`);
        await queryRunner.query(`ALTER TABLE "company_services" RENAME COLUMN "companiesCompanyId" TO "company_id"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "company_serial_id"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "company_service_id"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "company_serial_id" integer`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "company_serials_company_serial_id_seq" OWNED BY "company_serials"."company_serial_id"`);
        await queryRunner.query(`ALTER TABLE "company_serials" ALTER COLUMN "company_serial_id" SET DEFAULT nextval('"company_serials_company_serial_id_seq"')`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "company_services_company_service_id_seq" OWNED BY "company_services"."company_service_id"`);
        await queryRunner.query(`ALTER TABLE "company_services" ALTER COLUMN "company_service_id" SET DEFAULT nextval('"company_services_company_service_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "company_serials" ADD CONSTRAINT "FK_9abaeb445ff842ea0f3c27c5931" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_services" ADD CONSTRAINT "FK_b5571c5712b23fe34e7e7dda8ed" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_a6f6fc4607b7715ccc77be05051" FOREIGN KEY ("company_serial_id") REFERENCES "company_serials"("company_serial_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_a6f6fc4607b7715ccc77be05051"`);
        await queryRunner.query(`ALTER TABLE "company_services" DROP CONSTRAINT "FK_b5571c5712b23fe34e7e7dda8ed"`);
        await queryRunner.query(`ALTER TABLE "company_serials" DROP CONSTRAINT "FK_9abaeb445ff842ea0f3c27c5931"`);
        await queryRunner.query(`ALTER TABLE "company_services" ALTER COLUMN "company_service_id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "company_services_company_service_id_seq"`);
        await queryRunner.query(`ALTER TABLE "company_serials" ALTER COLUMN "company_serial_id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "company_serials_company_serial_id_seq"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "company_serial_id"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "company_service_id" integer`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "company_serial_id" integer`);
        await queryRunner.query(`ALTER TABLE "company_services" RENAME COLUMN "company_id" TO "companiesCompanyId"`);
        await queryRunner.query(`ALTER TABLE "company_serials" RENAME COLUMN "company_id" TO "companiesCompanyId"`);
        await queryRunner.query(`ALTER TABLE "company_services" ADD CONSTRAINT "FK_8887ba6608f01a5f67c7a1be44f" FOREIGN KEY ("companiesCompanyId") REFERENCES "companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_serials" ADD CONSTRAINT "FK_a51d781354a668c0c7bc23cbe6d" FOREIGN KEY ("companiesCompanyId") REFERENCES "companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

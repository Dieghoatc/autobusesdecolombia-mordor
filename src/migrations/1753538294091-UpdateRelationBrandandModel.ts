import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationBrandandModel1753538294091 implements MigrationInterface {
    name = 'UpdateRelationBrandandModel1753538294091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_serials" DROP CONSTRAINT "FK_068450cc1d71063edbb0b6cebd0"`);
        await queryRunner.query(`ALTER TABLE "company_services" DROP CONSTRAINT "FK_32c8d0724b19cfc1e8043548f0f"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "company_serials_company_serial_id_seq" OWNED BY "company_serials"."company_serial_id"`);
        await queryRunner.query(`ALTER TABLE "company_serials" ALTER COLUMN "company_serial_id" SET DEFAULT nextval('"company_serials_company_serial_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "company_serials" ALTER COLUMN "company_serial_id" DROP DEFAULT`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "company_services_company_service_id_seq" OWNED BY "company_services"."company_service_id"`);
        await queryRunner.query(`ALTER TABLE "company_services" ALTER COLUMN "company_service_id" SET DEFAULT nextval('"company_services_company_service_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "company_services" ALTER COLUMN "company_service_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "FK_f2b1673c6665816ff753e81d1a0"`);
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "REL_f2b1673c6665816ff753e81d1a"`);
        await queryRunner.query(`ALTER TABLE "company_serials" ADD CONSTRAINT "FK_a51d781354a668c0c7bc23cbe6d" FOREIGN KEY ("companiesCompanyId") REFERENCES "companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_services" ADD CONSTRAINT "FK_8887ba6608f01a5f67c7a1be44f" FOREIGN KEY ("companiesCompanyId") REFERENCES "companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "FK_f2b1673c6665816ff753e81d1a0" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "FK_f2b1673c6665816ff753e81d1a0"`);
        await queryRunner.query(`ALTER TABLE "company_services" DROP CONSTRAINT "FK_8887ba6608f01a5f67c7a1be44f"`);
        await queryRunner.query(`ALTER TABLE "company_serials" DROP CONSTRAINT "FK_a51d781354a668c0c7bc23cbe6d"`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "REL_f2b1673c6665816ff753e81d1a" UNIQUE ("brand_id")`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "FK_f2b1673c6665816ff753e81d1a0" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_services" ALTER COLUMN "company_service_id" SET DEFAULT nextval('company_service_company_service_id_seq')`);
        await queryRunner.query(`ALTER TABLE "company_services" ALTER COLUMN "company_service_id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "company_services_company_service_id_seq"`);
        await queryRunner.query(`ALTER TABLE "company_serials" ALTER COLUMN "company_serial_id" SET DEFAULT nextval('company_serial_company_serial_id_seq')`);
        await queryRunner.query(`ALTER TABLE "company_serials" ALTER COLUMN "company_serial_id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "company_serials_company_serial_id_seq"`);
        await queryRunner.query(`ALTER TABLE "company_services" ADD CONSTRAINT "FK_32c8d0724b19cfc1e8043548f0f" FOREIGN KEY ("companiesCompanyId") REFERENCES "companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_serials" ADD CONSTRAINT "FK_068450cc1d71063edbb0b6cebd0" FOREIGN KEY ("companiesCompanyId") REFERENCES "companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

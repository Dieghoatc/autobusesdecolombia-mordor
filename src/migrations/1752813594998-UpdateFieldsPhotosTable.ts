import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFieldsPhotosTable1752813594998 implements MigrationInterface {
    name = 'UpdateFieldsPhotosTable1752813594998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_f7b47da1a50daa1aafcb27510a9"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_a74f42e665f8fde707f2f6c047b"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_a300a78db7beb39c34894b1c9a3"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_0a12d0edfea632488e30a8f390f"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_d741339e91995df8108659f20a6"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_3811669e6fb07fa931be040623e"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_09cb4018cf31055b1a4a720045f"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "UQ_f7b47da1a50daa1aafcb27510a9"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "UQ_a74f42e665f8fde707f2f6c047b"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "UQ_a300a78db7beb39c34894b1c9a3"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "UQ_0a12d0edfea632488e30a8f390f"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "UQ_d741339e91995df8108659f20a6"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "UQ_3811669e6fb07fa931be040623e"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "UQ_09cb4018cf31055b1a4a720045f"`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_f7b47da1a50daa1aafcb27510a9" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("vehicle_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_a74f42e665f8fde707f2f6c047b" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_0a12d0edfea632488e30a8f390f" FOREIGN KEY ("chassis_id") REFERENCES "chassis"("chassis_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_d741339e91995df8108659f20a6" FOREIGN KEY ("bodywork_id") REFERENCES "bodyworks"("bodywork_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_a300a78db7beb39c34894b1c9a3" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_3811669e6fb07fa931be040623e" FOREIGN KEY ("photographer_id") REFERENCES "photographers"("photographer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_09cb4018cf31055b1a4a720045f" FOREIGN KEY ("country_id") REFERENCES "countries"("country_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_09cb4018cf31055b1a4a720045f"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_3811669e6fb07fa931be040623e"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_a300a78db7beb39c34894b1c9a3"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_d741339e91995df8108659f20a6"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_0a12d0edfea632488e30a8f390f"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_a74f42e665f8fde707f2f6c047b"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_f7b47da1a50daa1aafcb27510a9"`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "UQ_09cb4018cf31055b1a4a720045f" UNIQUE ("country_id")`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "UQ_3811669e6fb07fa931be040623e" UNIQUE ("photographer_id")`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "UQ_d741339e91995df8108659f20a6" UNIQUE ("bodywork_id")`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "UQ_0a12d0edfea632488e30a8f390f" UNIQUE ("chassis_id")`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "UQ_a300a78db7beb39c34894b1c9a3" UNIQUE ("company_id")`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "UQ_a74f42e665f8fde707f2f6c047b" UNIQUE ("brand_id")`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "UQ_f7b47da1a50daa1aafcb27510a9" UNIQUE ("vehicle_id")`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_09cb4018cf31055b1a4a720045f" FOREIGN KEY ("country_id") REFERENCES "countries"("country_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_3811669e6fb07fa931be040623e" FOREIGN KEY ("photographer_id") REFERENCES "photographers"("photographer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_d741339e91995df8108659f20a6" FOREIGN KEY ("bodywork_id") REFERENCES "bodyworks"("bodywork_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_0a12d0edfea632488e30a8f390f" FOREIGN KEY ("chassis_id") REFERENCES "chassis"("chassis_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_a300a78db7beb39c34894b1c9a3" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_a74f42e665f8fde707f2f6c047b" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_f7b47da1a50daa1aafcb27510a9" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("vehicle_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

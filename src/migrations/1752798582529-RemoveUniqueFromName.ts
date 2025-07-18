import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniqueFromName1752798582529 implements MigrationInterface {
    name = 'RemoveUniqueFromName1752798582529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP CONSTRAINT "FK_0ef2e94df6e26c47b388bdd94f7"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP CONSTRAINT "FK_50756b106c808feffe133f4effa"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP CONSTRAINT "UQ_0ef2e94df6e26c47b388bdd94f7"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP CONSTRAINT "UQ_50756b106c808feffe133f4effa"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD CONSTRAINT "FK_0ef2e94df6e26c47b388bdd94f7" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD CONSTRAINT "FK_50756b106c808feffe133f4effa" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("vehicle_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP CONSTRAINT "FK_50756b106c808feffe133f4effa"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP CONSTRAINT "FK_0ef2e94df6e26c47b388bdd94f7"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD CONSTRAINT "UQ_50756b106c808feffe133f4effa" UNIQUE ("vehicle_id")`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD CONSTRAINT "UQ_0ef2e94df6e26c47b388bdd94f7" UNIQUE ("brand_id")`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD CONSTRAINT "FK_50756b106c808feffe133f4effa" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("vehicle_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD CONSTRAINT "FK_0ef2e94df6e26c47b388bdd94f7" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

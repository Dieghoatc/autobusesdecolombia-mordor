import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBodyworkColumnName1752784962838 implements MigrationInterface {
    name = 'UpdateBodyworkColumnName1752784962838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_d741339e91995df8108659f20a6"`);
        await queryRunner.query(`CREATE TABLE "bodyworks" ("bodywork_id" SERIAL NOT NULL, "brand_id" integer NOT NULL, "model" character varying NOT NULL, "description" character varying NOT NULL, "vehicle_id" integer NOT NULL, "date_start" TIMESTAMP NOT NULL, "date_end" TIMESTAMP NOT NULL, "active" boolean NOT NULL, "created_at" date NOT NULL, CONSTRAINT "UQ_0ef2e94df6e26c47b388bdd94f7" UNIQUE ("brand_id"), CONSTRAINT "UQ_42f2eaa7ffd6162dc926c3578bb" UNIQUE ("model"), CONSTRAINT "PK_fb9b1eef4a669ccc331bee8f1a8" PRIMARY KEY ("bodywork_id"))`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD CONSTRAINT "FK_0ef2e94df6e26c47b388bdd94f7" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD CONSTRAINT "FK_50756b106c808feffe133f4effa" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("vehicle_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_d741339e91995df8108659f20a6" FOREIGN KEY ("bodywork_id") REFERENCES "bodyworks"("bodywork_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_d741339e91995df8108659f20a6"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP CONSTRAINT "FK_50756b106c808feffe133f4effa"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP CONSTRAINT "FK_0ef2e94df6e26c47b388bdd94f7"`);
        await queryRunner.query(`DROP TABLE "bodyworks"`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_d741339e91995df8108659f20a6" FOREIGN KEY ("bodywork_id") REFERENCES "bodywork"("bodywork_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

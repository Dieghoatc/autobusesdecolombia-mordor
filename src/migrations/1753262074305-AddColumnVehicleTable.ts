import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnVehicleTable1753262074305 implements MigrationInterface {
    name = 'AddColumnVehicleTable1753262074305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicle_types" ("vehicle_type_id" SERIAL NOT NULL, "name" character varying, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_521e89eb074cfce4a101397064f" UNIQUE ("name"), CONSTRAINT "PK_9895ef28111f2ec309ac72ed0ec" PRIMARY KEY ("vehicle_type_id"))`);
        await queryRunner.query(`ALTER TABLE "models" ADD "vehicle_type_id" integer`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "UQ_763bcbddba17da2ae1271d5022e" UNIQUE ("vehicle_type_id")`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "vehicle_type_id" integer`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "FK_763bcbddba17da2ae1271d5022e" FOREIGN KEY ("vehicle_type_id") REFERENCES "vehicle_types"("vehicle_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "FK_763bcbddba17da2ae1271d5022e"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "vehicle_type_id"`);
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "UQ_763bcbddba17da2ae1271d5022e"`);
        await queryRunner.query(`ALTER TABLE "models" DROP COLUMN "vehicle_type_id"`);
        await queryRunner.query(`DROP TABLE "vehicle_types"`);
    }

}

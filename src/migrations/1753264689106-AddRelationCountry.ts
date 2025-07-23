import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationCountry1753264689106 implements MigrationInterface {
    name = 'AddRelationCountry1753264689106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_09cb4018cf31055b1a4a720045f" FOREIGN KEY ("country_id") REFERENCES "countries"("country_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_09cb4018cf31055b1a4a720045f"`);
    }

}
